const database = require('../database')

exports.ListarGaleria = async () => {
    const sql = "SELECT id_galeria, src, altText, caption FROM galeria"
    return await database.query(sql)
}

exports.EliminarGaleria = async (params) => {
    const { id } = params
    const sql = "DELETE FROM galeria WHERE id_galeria = ?"
    return await database.query(sql, [id])
}

exports.ActualizarGaleria = async (params, body) => {
    const { id } = params
    const { src, altText, caption } = body
    const sql = "UPDATE galeria SET src = ?, altText = ?, caption = ? WHERE id_galeria = ?"
    return await database.query(sql, [src, altText, caption, id])
}

exports.AgregarGaleria = async (body) => {
    const { src, altText, caption } = body
    const sql = "INSERT INTO galeria(src,altText,caption) VALUES (?,?,?)"
    return await database.query(sql, [src, altText, caption])
}