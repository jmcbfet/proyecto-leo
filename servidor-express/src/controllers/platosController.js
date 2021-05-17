const platosModel = require('../models/platosModel')

exports.ListarPlatos = async (req,res) => {
    try {
        const platos = platosModel.ListarPlatos()
        res.status(200).json(platos)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarPlato = async (req,res) => {
    try {
        await platosModel.EliminarPlato(req.params)
        res.status(200).json({ msg: "El plato se ha eliminado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarPlato = async (req,res) => {
    try {
        await platosModel.ActualizarPlato(req.params, req.body)
        res.status(200).json({ msg: "El plato se ha modificado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarPlato = async (req,res) => {
    try {
        await platosModel.AgregarPlato(req.body)
        res.status(200).json({ msg: "El plato se ha agregado" })
    } catch (error) {
        res.status(401).json(error)
    }
}