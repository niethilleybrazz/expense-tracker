const User = require("../models/User")
const xlsx = require('xlsx')
const Expense = require("../models/Expense")

exports.addExpense = async (req, res, next) => {
    const userId = req.user.id

    try{
        const {icon, category, amount, date} = req.body

        // Validacao para campos em branco
        if (!amount || !category || !date) {
            return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
        }    

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save()
        res.status(200).json(newExpense)

    } catch(error){
        res.status(500).json({message: "Erro no servidor"})
    }
}

exports.getAllExpense = async (req, res, next) => {
    const userId = req.user.id

    try{
        const expense = await Expense.find({userId}).sort({date: -1})
        res.json(expense)
    } catch(error){
        res.status(500).json({message: "Erro no servidor"})
    }

}

exports.deleteExpense= async (req, res, next) => {
    try{
        await Expense.findByIdAndDelete(req.params.id)
        res.json({message: "Gasto deletado com sucesso"})
    } catch(error) {
        res.status(500).json({message: "Erro no servidor"})
    }
}

exports.downloadExpenseExcel = async (req, res, next) => {
    const userId = req.user.id
    try {
        const expense = await Expense.find({userId}).sort({date: -1})
        
        const data = income.map(item => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new()
        const ws = xlsx.utils.json_to_sheet(data)
        
        xlsx.utils.book_append_sheet(wb, ws, "Expense") 
        
        xlsx.writeFile(wb, 'expense_details.xlsx')
        res.download('expense_details.xlsx')
    } catch (error) {
        res.status(500).json({message: "Erro no servidor"})
    }
} 