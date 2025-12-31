import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate flashcards from content
 */
export const generateFlashcards = async (content) => {
  try {
    const prompt = `Generate 5-10 flashcards from the following study material. 
    Return a JSON array with objects containing "question" and "answer" fields.
    Make questions clear and answers concise.
    
    Study Material:
    ${content}
    
    Return ONLY valid JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const response = completion.choices[0].message.content.trim();
    // Try to extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    const flashcards = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response);
    
    return Array.isArray(flashcards) ? flashcards : [];
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw new Error('Failed to generate flashcards. Please try again.');
  }
};

/**
 * Generate quiz questions from content
 */
export const generateQuizQuestions = async (content) => {
  try {
    const prompt = `Generate 5-8 multiple choice quiz questions from the following study material.
    Return a JSON array with objects containing:
    - "question": the question text
    - "options": array of 4 option strings
    - "correctAnswer": index (0-3) of the correct option
    - "explanation": brief explanation of the correct answer
    
    Study Material:
    ${content}
    
    Return ONLY valid JSON array, no other text.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2500
    });

    const response = completion.choices[0].message.content.trim();
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    const questions = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(response);
    
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error('Error generating quiz questions:', error);
    throw new Error('Failed to generate quiz questions. Please try again.');
  }
};

/**
 * Generate study guide from content
 */
export const generateStudyGuide = async (content) => {
  try {
    const prompt = `Create a comprehensive study guide from the following material.
    Organize it with clear headings, bullet points, and key concepts.
    Make it easy to review and study from.
    
    Study Material:
    ${content}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful study assistant that creates well-organized study guides.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating study guide:', error);
    throw new Error('Failed to generate study guide. Please try again.');
  }
};

/**
 * Generate all study materials at once
 */
export const generateAllStudyMaterials = async (content) => {
  try {
    const [flashcards, questions, studyGuide] = await Promise.all([
      generateFlashcards(content),
      generateQuizQuestions(content),
      generateStudyGuide(content)
    ]);

    return {
      flashcards,
      questions,
      studyGuide
    };
  } catch (error) {
    console.error('Error generating all materials:', error);
    throw error;
  }
};

