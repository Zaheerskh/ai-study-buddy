import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studyMaterialAPI } from '../services/api';
import Notification from '../components/Notification';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    originalContent: '',
    tags: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const data = await studyMaterialAPI.getAll();
      setMaterials(data);
    } catch (error) {
      setNotification({
        message: 'Failed to load study materials',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.originalContent) {
      setNotification({
        message: 'Title and content are required',
        type: 'error'
      });
      return;
    }

    try {
      setSubmitting(true);
      const tagsArray = formData.tags
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      await studyMaterialAPI.create({
        title: formData.title,
        originalContent: formData.originalContent,
        tags: tagsArray
      });

      setNotification({
        message: 'Study material created successfully! AI generation in progress...',
        type: 'success'
      });
      
      setFormData({ title: '', originalContent: '', tags: '' });
      setShowCreateForm(false);
      loadMaterials();
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to create study material',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this study material?')) {
      return;
    }

    try {
      await studyMaterialAPI.delete(id);
      setNotification({
        message: 'Study material deleted successfully',
        type: 'success'
      });
      loadMaterials();
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || 'Failed to delete study material',
        type: 'error'
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="lg" text="Loading study materials..." />
        </div>
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

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Study Materials</h1>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
        >
          {showCreateForm ? 'Cancel' : '+ Create New'}
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Study Material</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter a title for your study material"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="originalContent"
                value={formData.originalContent}
                onChange={handleChange}
                rows="8"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Paste or type your study material here..."
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., math, science, history"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Generating study materials...</span>
                </>
              ) : (
                'Generate Study Materials'
              )}
            </button>
          </form>
        </div>
      )}

      {materials.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-4">
            You don't have any study materials yet.
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Create Your First Study Material
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div key={material._id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{material.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {material.originalContent.substring(0, 150)}...
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {material.tags && material.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-gray-500 mb-4">
                <p>Flashcards: {material.generatedFlashcards?.length || 0}</p>
                <p>Questions: {material.generatedQuestions?.length || 0}</p>
                <p>Study Guide: {material.generatedStudyGuides ? 'Yes' : 'No'}</p>
              </div>

              <div className="flex space-x-2">
                <Link
                  to={`/study-room/${material._id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Study
                </Link>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  aria-label="Delete study material"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
