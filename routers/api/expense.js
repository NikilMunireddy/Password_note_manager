const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Expense = require('../../models/Expense')
const Users = require('../../models/Users')


//@route    GET api/expense
// @desc    Get all Expenses
//@Access   Private

router.get('/', auth, async(req, res)=>{
  try {
    const allExpense = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(allExpense);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
})