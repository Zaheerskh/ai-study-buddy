import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studyMaterialAPI } from '../services/api';
import Notification from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';

const StudyRoom = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('flashcards'); // 'flashcards', 'quiz', 'studyGuide'
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' });

  useEffect(() => {
    loadMaterial();
  }, [materialId]);

  const loadMaterial = async () => {
    try {
      setLoading(true);
      const data = await studyMaterialAPI.getById(materialId);
      setMaterial(data);
    } catch (error) {
      setNotification({
        message: 'Failed to load study material',
        type: 'error'
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleFlashcardNext = () => {
    setFlipped(false);
    if (currentFlashcardIndex < material.generatedFlashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    }
  };

  const handleFlashcardPrev = () => {
    setFlipped(false);
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    }
  };

  const handleQuizAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    setShowQuizResults(true);
  };

  const getQuizScore = () => {
    if (!material.generatedQuestions) return 0;
    let correct = 0;
    material.generatedQuestions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Loading study material..." />
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">Study material not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: 'success' })}
      />

      <div className="mb-6">
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">{material.title}</h1>
      </div>

      {/* Mode Selector */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => {
            setMode('flashcards');
            setFlipped(false);
            setCurrentFlashcardIndex(0);
          }}
          className={`px-4 py-2 font-medium ${
            mode === 'flashcards'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Flashcards ({material.generatedFlashcards?.length || 0})
        </button>
        <button
          onClick={() => {
            setMode('quiz');
            setShowQuizResults(false);
            setQuizAnswers({});
          }}
          className={`px-4 py-2 font-medium ${
            mode === 'quiz'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Quiz ({material.generatedQuestions?.length || 0})
        </button>
        <button
          onClick={() => setMode('studyGuide')}
          className={`px-4 py-2 font-medium ${
            mode === 'studyGuide'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Study Guide
        </button>
      </div>

      {/* Flashcards Mode */}
      {mode === 'flashcards' && material.generatedFlashcards && material.generatedFlashcards.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <div
            onClick={() => setFlipped(!flipped)}
            className="bg-white rounded-lg shadow-lg p-8 min-h-[400px] flex items-center justify-center cursor-pointer transform transition-transform hover:scale-105"
          >
            <div className="text-center">
              {flipped ? (
                <div>
                  <p className="text-gray-600 mb-4">Answer:</p>
                  <p className="text-2xl font-semibold">
                    {material.generatedFlashcards[currentFlashcardIndex].answer}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">Question:</p>
                  <p className="text-2xl font-semibold">
                    {material.generatedFlashcards[currentFlashcardIndex].question}
                  </p>
                </div>
              )}
              <p className="text-sm text-gray-400 mt-4">
                Click to flip
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleFlashcardPrev}
              disabled={currentFlashcardIndex === 0}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-600">
              {currentFlashcardIndex + 1} / {material.generatedFlashcards.length}
            </span>
            <button
              onClick={handleFlashcardNext}
              disabled={currentFlashcardIndex === material.generatedFlashcards.length - 1}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Quiz Mode */}
      {mode === 'quiz' && material.generatedQuestions && material.generatedQuestions.length > 0 && (
        <div className="max-w-3xl mx-auto">
          {!showQuizResults ? (
            <div className="space-y-8">
              {material.generatedQuestions.map((question, qIndex) => (
                <div key={qIndex} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Question {qIndex + 1}: {question.question}
                  </h3>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className={`block p-4 border-2 rounded-lg cursor-pointer ${
                          quizAnswers[qIndex] === oIndex
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={oIndex}
                          checked={quizAnswers[qIndex] === oIndex}
                          onChange={() => handleQuizAnswer(qIndex, oIndex)}
                          className="mr-3"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <button
                  onClick={handleSubmitQuiz}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Quiz Results
              </h2>
              <p className="text-xl text-center mb-8">
                Score: {getQuizScore()} / {material.generatedQuestions.length}
              </p>
              <div className="space-y-8">
                {material.generatedQuestions.map((question, qIndex) => {
                  const isCorrect = quizAnswers[qIndex] === question.correctAnswer;
                  return (
                    <div
                      key={qIndex}
                      className={`p-6 border-2 rounded-lg ${
                        isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        Question {qIndex + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, oIndex) => (
                          <div
                            key={oIndex}
                            className={`p-3 rounded ${
                              oIndex === question.correctAnswer
                                ? 'bg-green-200 font-semibold'
                                : oIndex === quizAnswers[qIndex] && !isCorrect
                                ? 'bg-red-200'
                                : 'bg-gray-100'
                            }`}
                          >
                            {option}
                            {oIndex === question.correctAnswer && ' ✓'}
                          </div>
                        ))}
                      </div>
                      {question.explanation && (
                        <p className="mt-4 text-sm text-gray-600">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => {
                    setShowQuizResults(false);
                    setQuizAnswers({});
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Study Guide Mode */}
      {mode === 'studyGuide' && material.generatedStudyGuides && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-gray-800">
                {material.generatedStudyGuides}
              </pre>
            </div>
          </div>
        </div>
      )}

      {mode === 'flashcards' && (!material.generatedFlashcards || material.generatedFlashcards.length === 0) && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No flashcards available for this material.</p>
        </div>
      )}

      {mode === 'quiz' && (!material.generatedQuestions || material.generatedQuestions.length === 0) && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No quiz questions available for this material.</p>
        </div>
      )}

      {mode === 'studyGuide' && !material.generatedStudyGuides && (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No study guide available for this material.</p>
        </div>
      )}
    </div>
  );
};

export default StudyRoom;
