const galeriasModel = require('../models/galeriasModel')

exports.ListarGaleria = async (req,res) => {
    try {
        const galeria = await galeriasModel.ListarGaleria()
        res.status(200).json(galeria)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarGaleria = async (req,res) => {
    try {
        await galeriasModel.EliminarGaleria(req.params)
        res.status(200).json({ msg: "La foto ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarGaleria = async (req,res) => {
    try {
        await galeriasModel.ActualizarGaleria(req.params, req.body)
        res.status(200).json({ msg: "La foto ha sido modificada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarGaleria = async (req,res) => {
    try {
        await galeriasModel.AgregarGaleria(req.body)
        res.status(200).json({ msg: "La foto ha sido agregada" })
    } catch (error) {
        res.status(401).json(error)
    }
}