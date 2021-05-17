const cuentasModel = require('../models/cuentasModel')

exports.ListarCuentas = async (req,res) => {
    try {
        const cuentas = await cuentasModel.ListarCuentas()
        res.status(200).json(cuentas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ListarCuentaPorUsuarioYMesa = async (req,res) => {
    try {
        const cuentas = await cuentasModel.ListarCuentaPorUsuarioYMesa(req.params)
        res.status(200).json(cuentas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ObtenerPrecioTotalCuenta = async (req,res) => {
    try {
        const total = await cuentasModel.ObtenerPrecioTotalCuenta(req.params)
        res.status(200).json(total)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ObtenerPrecioPorPlato = async (req,res) => {
    try {
        const total = await cuentasModel.ObtenerDatosDelPlato(req.params)
        res.status(200).json(total)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ObtenerDatosDelPlato = async (req,res) => {
    try {
        const cuentas = await cuentasModel.ObtenerDatosDelPlato(req.params)
        res.status(200).json(cuentas)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.EliminarCuenta = async (req,res) => {
    try {
        await cuentasModel.EliminarCuenta(req.params)
        res.status(200).json({ msg: "La cuenta ha sido eliminada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ActualizarCuenta = async (req,res) => {
    try {
        await cuentasModel.ActualizarCuenta(req.params, req.body)      
        res.status(200).json({ msg: "La cuenta ha sido modificada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.AgregarCuenta = async (req,res) => {
    try {
        await cuentasModel.AgregarCuenta(req.body)
        res.status(200).json({ msg: "La cuenta ha sido agregada" })
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ObtenerPrecioPorAnoPorCadaMes = async (req,res) => {
    try {
        const total = await cuentasModel.ObtenerPrecioPorAnoPorCadaMes(req.params, req.body)
        res.status(200).json(total)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.ListarAnos = async (req,res) => {
    try {
        const anos = await cuentasModel.ListarAnos()
        res.status(200).json(anos)
    } catch (error) {
        res.status(401).json(error)
    }
}