/* Itinerary Routes */
import { Router } from 'express';
import { getItinerary, addActivity, updateActivity, deleteActivity } from '../controllers/itineraryController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/:tripId', getItinerary);
router.post('/:tripId/activities', addActivity);
router.put('/:tripId/activities/:activityId', updateActivity);
router.delete('/:tripId/activities/:activityId', deleteActivity);

export default router;
