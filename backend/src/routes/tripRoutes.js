/* Trip Routes */
import { Router } from 'express';
import { getTrips, getTrip, createTrip, updateTrip, deleteTrip } from '../controllers/tripController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/').get(getTrips).post(createTrip);
router.route('/:id').get(getTrip).put(updateTrip).delete(deleteTrip);

export default router;
