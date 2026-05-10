/* Profile Routes */
import { Router } from 'express';
import { getProfile, updateProfile, updatePreferences } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/').get(getProfile).put(updateProfile);
router.put('/preferences', updatePreferences);

export default router;
