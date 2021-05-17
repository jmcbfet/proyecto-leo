const comentariosModel = require('../models/comentariosModel')

exports.ListarComentarios = async (req,res) => {
    try {
        const comentarios = await comentariosModel.ListarComentarios()
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ListarComentariosPorPlato = async (req,res) => {
    try {
        const comentarios = await comentariosModel.ListarComentariosPorPlato(req.params)
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarComentario = async (req,res) => {
    try {
        await comentariosModel.EliminarComentario(req.params)
        res.status(200).json({ msg: "El comentario ha sido eliminado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarComentario = async (req,res) => {
    try {
        await comentariosModel.ActualizarComentario(req.params, req.body)
        res.status(200).json({ msg: "El comentario se ha modificado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarComentario = async (req,res) => {
    try {
        await comentariosModel.AgregarComentario(req.body)
        res.status(200).json({ msg: "El comentario ha sido agregado" })
    } catch (error) {
        res.status(401).json(error)
    }
}