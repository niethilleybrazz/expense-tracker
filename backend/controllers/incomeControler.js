const User = require("../models/User")
const Income = require("../models/Income")


// Adiciona a renda
exports.addIncome = async (req, res, next) => {
    const userId = req.user.id

    try{
        const {icon, source, amount, date} = req.body

        // Validacao para campos em branco
        if (!amount || !source || !date) {
            return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
        }    

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save()
        res.status(200).json(newIncome)

    } catch(error){
        res.status(500).json({message: "Server Error"})
    }
}
// Pega toda a renda
exports.getAllIncome = async (req, res, next) => {

}
// Deleta a renda
exports.deleteIncome = async (req, res, next) => {

}
// Download da renda em formato Excel
exports.downloadIncomeExcel = async (req, res, next) => {

}