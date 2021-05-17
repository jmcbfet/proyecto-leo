const database = require('../database')

exports.ListarComentarios = async () => {
    const sql = `
        SELECT c.id_comentario, p.id_plato, p.nombre, c.comentario 
        FROM comentarios c, platos p 
        WHERE c.id_plato = p.id_plato
    `
    return await database.query(sql)
}

exports.ListarComentariosPorPlato = async (params) => {
    const { id } = params
    const sql = `
        SELECT c.id_comentario, p.id_plato, p.nombre, c.comentario 
        FROM comentarios c, platos p 
        WHERE c.id_plato = p.id_plato AND p.id_plato = ?
    `
    return await database.query(sql, [id])
}

exports.EliminarComentario = async (params) => {
    const { id } = params
    const sql = "DELETE FROM comentarios WHERE id_comentario = ?"
    return await database.query(sql, [id])
}

exports.ActualizarComentario = async (params, body) => {
    const { id } = params
    const { comentario } = body
    const sql = "UPDATE comentarios SET comentario = ? WHERE id_comentario = ?"
    return await database.query(sql, [comentario, id])
}

exports.AgregarComentario = async (body) => {
    const { id_plato, comentario } = body
    const sql = "INSERT INTO comentarios(id_plato,comentario) VALUES (?,?)"
    return await database.query(sql, [id_plato, comentario])
}