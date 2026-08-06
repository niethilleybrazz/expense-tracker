const express = require('express')

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeControler.js")
const {protect} = require("../middleware/authMiddleware.js")

const router = express.Router()

router.post("/add", protect, addIncome)
router.get("/get", protect, getAllIncome)
router.get("/donwloadexcel", protect, downloadIncomeExcel)
router.delete("/:id", protect, deleteIncome)

module.exports = router