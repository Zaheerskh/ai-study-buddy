import express from 'express';
import {
  createStudyMaterial,
  getStudyMaterials,
  getStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial
} from '../controllers/studyMaterialController.js';
import { protect } from '../middleware/auth.js';
import { validateStudyMaterial } from '../middleware/validator.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.route('/')
  .post(validateStudyMaterial, createStudyMaterial)
  .get(getStudyMaterials);

router.route('/:id')
  .get(getStudyMaterial)
  .put(updateStudyMaterial)
  .delete(deleteStudyMaterial);

export default router;
