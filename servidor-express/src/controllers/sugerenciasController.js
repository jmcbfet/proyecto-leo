const sugerenciasModel = require('../models/sugerenciasModel')

exports.ListarSugerencias = async (req,res) => {
    try {
        const sugerencias = await sugerenciasModel.ListarSugerencias()
        res.status(200).json(sugerencias)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarSugerencia = async (req,res) => {
    try {
        await sugerenciasModel.EliminarSugerencia(req.params)
        res.status(200).json({ msg: "La sugerencia ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarSugerencia = async (req,res) => {
    try {
        await sugerenciasModel.ActualizarSugerencia(req.params, req.body)
        res.status(200).json({ msg: "La sugerencia ha sido modificada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarSugerencia = async (req,res) => {
    try {
        await sugerenciasModel.AgregarSugerencia(req.body)
        res.status(200).json({ msg: "La sugerencia ha sido agregada" })
    } catch (error) {
        res.status(401).json(error)
    }  
}