const mesasModel = require('../models/mesasModel')

exports.ListarMesas = async (req,res) => {
    try {
        const mesas = await mesasModel.ListarMesas()
        res.status(200).json(mesas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ListarMesasDisponibles = async (req,res) => {
    try {
        const mesas = await mesasModel.ListarMesasDisponibles()
        res.status(200).json(mesas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarMesa = async (req,res) => {
    try {
        await mesasModel.EliminarMesa(req.params)
        res.status(200).json({ msg: "La mesa se ha eliminado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarMesa = async (req,res) => {
    try {
        await mesasModel.ActualizarMesa(req.params, req.body)
        res.status(200).json({ msg: "La mesa se ha modificado" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarMesa = async (req,res) => {
    try {
        await mesasModel.AgregarMesa(req.body)
        res.status(200).json({ msg: "La mesa se ha agregado" })
    } catch (error) {
        res.status(401).json(error)
    }
}