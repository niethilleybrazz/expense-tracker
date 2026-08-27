const express = require('express')

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseControler.js")
const {protect} = require("../middleware/authMiddleware.js")

const router = express.Router()

router.post("/add", protect, addExpense)
router.get("/get", protect, getAllExpense)
router.get("/donwloadexcel", protect, downloadExpenseExcel)
router.delete("/:id", protect, deleteExpense)

module.exports = router 