import express from 'express';
import { generateBudgetSuggestion } from '../controllers/aiController';

const router = express.Router();

router.get('/budget-suggestion/:tripId', generateBudgetSuggestion);

export default router;