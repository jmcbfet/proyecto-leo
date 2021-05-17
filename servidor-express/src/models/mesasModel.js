const database = require('../database')

exports.ListarMesas = async () => {
    const sql = "SELECT id_mesa, descripcion, disponible FROM mesas"
    return await database.query(sql)
}

exports.ListarMesasDisponibles = async () => {
    const sql = "SELECT id_mesa, descripcion FROM mesas WHERE disponible = 1"
    return await database.query(sql)
}

exports.EliminarMesa = async (params) => {
    const { id } = params
    const sql = "DELETE FROM mesas WHERE id_mesa = ?"
    return await database.query(sql, [id])
}

exports.ActualizarMesa = async (params, body) => {
    const { id } = params
    const { descripcion, disponible } = body
    const sql = "UPDATE mesas SET descripcion = ?, disponible = ? WHERE id_mesa = ?"
    return await database.query(sql, [descripcion, disponible, id])
}

exports.AgregarMesa = async (body) => {
    const { descripcion } = body
    const sql = "INSERT INTO mesas(descripcion,disponible) VALUES (?,1)"
    return await database.query(sql, [descripcion])
}