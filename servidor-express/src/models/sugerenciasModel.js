const database = require('../database')

exports.ListarSugerencias = async () => {
    const sql = "SELECT id_sugerencia, correo, descripcion FROM sugerencias"
    return await database.query(sql)
}

exports.EliminarSugerencia = async (params) => {
    const { id } = params
    const sql = "DELETE FROM sugerencias WHERE id_sugerencia = ?"
    return await database.query(sql, [id])
}

exports.ActualizarSugerencia = async (params, body) => {
    const { id } = params
    const { correo, descripcion } = body
    const sql = "UPDATE sugerencias SET correo = ?, descripcion = ? WHERE id_sugerencia = ?"
    return await database.query(sql, [correo, descripcion, id])
}

exports.AgregarSugerencia = async (body) => {
    const { correo, descripcion } = body
    const sql = "INSERT INTO sugerencias(correo,descripcion) VALUES (?,?)"
    return await database.query(sql, [correo, descripcion])
}