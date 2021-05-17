const reservaModel = require('../models/reservaModel')

exports.ListarReservas = async (req,res) => {
    try {
        const reservas = await reservaModel.ListarReservas()
        res.status(200).json(reservas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarReserva = async (req,res) => {
    try {
        await reservaModel.EliminarReserva(req.params)
        res.status(200).json({ msg: "La reserva ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarReserva = async (req,res) => {
    try {
        await reservaModel.ActualizarReserva(req.params, req.body)
        res.status(200).json({ msg: "La reserva ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarReserva = async (req,res) => {
    try {
        await reservaModel.AgregarReserva(req.body)
        res.status(200).json({ msg: "La reserva ha sido agregada" })
    } catch (error) {
        res.status(401).json(error)
    }
}