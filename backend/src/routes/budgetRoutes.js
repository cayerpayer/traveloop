/* Budget Routes */
import { Router } from 'express';
import { getBudget, updateBudget, addExpense, updateExpense, deleteExpense } from '../controllers/budgetController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.route('/:tripId').get(getBudget).put(updateBudget);
router.post('/:tripId/expenses', addExpense);
router.put('/:tripId/expenses/:expenseId', updateExpense);
router.delete('/:tripId/expenses/:expenseId', deleteExpense);

export default router;
