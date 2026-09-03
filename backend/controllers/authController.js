const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Gera JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"})
}

// Register User
exports.registerUser = async (req, res, next) => {
    const { fullName, email, password, profileImgUrl } = req.body || {};

    // Validacoes
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Todos os campos devem ser preenchidos" })
    }

    try {
        // Checa se o email ja existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email já em uso" })
        }

        const user = await User.create({
            fullName, 
            email,
            password, 
            profileImgUrl
        });

        return res.status(201).json({
            id: user._id, 
            user,
            token: generateToken(user._id)
        });

    } catch (err) {
        if (typeof next === "function") {
            return res.status(500).json({ message: "Erro ao criar Usuário", error: err.message });
        }
        return res.status(500).json({ message: "Erro interno no servidor", error: err.message });
    }
};

// Login User
exports.loginUser = async(req,res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Todos os campos devem ser preenchidos"})
    }
    try {
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message :"Email ou senha inválidos"})
        }

        res.status(200).json({
            id: user._id, 
            user,
            token: generateToken(user._id)
        })
    } catch(err){
        if (typeof next === "function") {
            return res.status(500).json({ message: "Erro ao fazer login", error: err.message });
        }

        return res.status(500).json({ message: "Erro interno no servidor", error: err.message });
    }
}

// Get User Info
exports.getUserInfo = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password")

        if(!user){
            return res.status(404).json({message: "Usuario não encontrado"})
        }

        res.status(200).json(user)
    } catch(err){
        if (typeof next === "function") {
            return res.status(500).json({ message: "Erro ao criar Usuário", error: err.message });
        }
        return res.status(500).json({ message: "Erro interno no servidor", error: err.message });
    }
}