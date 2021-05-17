const database = require('../database')

exports.ListarReservas = async () => {
    const sql = `
        SELECT r.id_reserva, m.descripcion, u.nombre, u.apellido, r.fecha_reserva 
        FROM mesas m, usuarios u, reservas r 
        WHERE r.id_mesa = m.id_mesa 
        AND r.id_usuario = u.id_usuario
    `
    return await database.query(sql)
}

exports.EliminarReserva = async (params) => {
    const { id } = params
    const sql = "DELETE FROM reservas WHERE id_reserva = ?"
    return await database.query(sql, [id])
}

exports.ActualizarReserva = async (params, body) => {
    const { id } = params
    const { id_mesa, id_usuario } = body
    const sql = "UPDATE reservas SET id_mesa = ?, id_usuario = ?, fecha_reserva = NOW() WHERE id_reserva = ?"
    return await database.query(sql, [id_mesa, id_usuario, id])
}

exports.AgregarReserva = async (body) => {
    const { id_mesa, id_usuario } = body
    const sql = "INSERT INTO reservas(id_mesa,id_usuario,fecha_reserva) VALUES (?,?,NOW())"
    return await database.query(sql, [id_mesa, id_usuario])
}