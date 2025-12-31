import StudyMaterial from '../models/StudyMaterial.js';
import { generateAllStudyMaterials } from '../services/aiService.js';

// @desc    Create new study material with AI generation
// @route   POST /api/study-materials
// @access  Private
export const createStudyMaterial = async (req, res, next) => {
  try {
    const { title, originalContent, tags } = req.body;

    // Generate AI content
    let generatedData = {
      flashcards: [],
      questions: [],
      studyGuide: ''
    };

    try {
      generatedData = await generateAllStudyMaterials(originalContent.trim());
    } catch (aiError) {
      console.error('AI generation error:', aiError);
      // Continue with empty data if AI fails - material will still be created
    }

    const studyMaterial = await StudyMaterial.create({
      userId: req.user._id,
      title: title.trim(),
      originalContent: originalContent.trim(),
      generatedFlashcards: generatedData.flashcards || [],
      generatedQuestions: generatedData.questions || [],
      generatedStudyGuides: generatedData.studyGuide || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [])
    });

    res.status(201).json({
      success: true,
      data: studyMaterial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all study materials for logged-in user
// @route   GET /api/study-materials
// @access  Private
export const getStudyMaterials = async (req, res, next) => {
  try {
    const studyMaterials = await StudyMaterial.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select('-userId'); // User ID is not needed in response since user already knows their ID
    
    res.status(200).json({
      success: true,
      count: studyMaterials.length,
      data: studyMaterials
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single study material
// @route   GET /api/study-materials/:id
// @access  Private
export const getStudyMaterial = async (req, res, next) => {
  try {
    const studyMaterial = await StudyMaterial.findById(req.params.id);

    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }

    // Check if user owns this material
    if (studyMaterial.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this study material'
      });
    }

    res.status(200).json({
      success: true,
      data: studyMaterial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update study material
// @route   PUT /api/study-materials/:id
// @access  Private
export const updateStudyMaterial = async (req, res, next) => {
  try {
    const studyMaterial = await StudyMaterial.findById(req.params.id);

    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }

    // Check if user owns this material
    if (studyMaterial.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this study material'
      });
    }

    const { title, originalContent, tags, generatedFlashcards, generatedQuestions, generatedStudyGuides } = req.body;

    if (title !== undefined) studyMaterial.title = title.trim();
    if (originalContent !== undefined) studyMaterial.originalContent = originalContent.trim();
    if (tags !== undefined) {
      studyMaterial.tags = Array.isArray(tags) 
        ? tags 
        : (tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : []);
    }
    if (generatedFlashcards !== undefined) studyMaterial.generatedFlashcards = generatedFlashcards;
    if (generatedQuestions !== undefined) studyMaterial.generatedQuestions = generatedQuestions;
    if (generatedStudyGuides !== undefined) studyMaterial.generatedStudyGuides = generatedStudyGuides;

    const updatedMaterial = await studyMaterial.save();
    
    res.status(200).json({
      success: true,
      data: updatedMaterial
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete study material
// @route   DELETE /api/study-materials/:id
// @access  Private
export const deleteStudyMaterial = async (req, res, next) => {
  try {
    const studyMaterial = await StudyMaterial.findById(req.params.id);

    if (!studyMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }

    // Check if user owns this material
    if (studyMaterial.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this study material'
      });
    }

    await studyMaterial.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Study material deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
