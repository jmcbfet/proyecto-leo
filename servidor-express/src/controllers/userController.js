const userModel = require('../models/userModel')

exports.ListarUsuarios = async (req,res) => {
    try {
        const usuarios = await userModel.ListarUsuarios()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarUsuario = async (req,res) => {
    try {
        await userModel.EliminarUsuario(req.params)
        res.status(200).json({ msg: "El usuario ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarUsuario = async (req,res) => {
    try {
        await userModel.ActualizarUsuario(req.params, req.body)
        res.status(200).json({ msg: "El usuario ha sido modificado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarUsuario = async (req,res) => {
    try {
        await userModel.AgregarUsuario(req.body)
        res.status(200).json({ msg: "El usuario ha sido agregado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.LoginUsuario = async (req,res) => {
    try {
        const usuario = await userModel.LoginUsuario(req.body)
        usuario.length > 0 ? res.status(200).json(usuario) : res.status(402).json({ msg: "usuario no valido" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ObtenerDatosUsuario = async (req,res) => {
    try {
        const usuario = await userModel.ObtenerDatosUsuario(req.params)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(401).json(error)
    }
}