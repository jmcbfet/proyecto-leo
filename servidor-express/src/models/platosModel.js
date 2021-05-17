const database = require('../database')

exports.ListarPlatos = async () => {
    const sql = "SELECT id_plato, nombre, precio, imagen FROM platos"
    return await database.query(sql)
}

exports.EliminarPlato = async (params) => {
    const { id } = params
    const sql = "DELETE FROM platos WHERE id_plato = ?"
    return await database.query(sql, [id])
}

exports.ActualizarPlato = async (params, body) => {
    const { id } = params
    const { nombre, precio, imagen } = body
    const sql = "UPDATE platos SET nombre = ?, precio = ?, imagen = ? WHERE id_plato = ?"
    return await database.query(sql, [nombre, precio, imagen, id])
}

exports.AgregarPlato = async (body) => {
    const { nombre, precio, imagen } = body
    const sql = "INSERT INTO platos(nombre,precio,imagen) VALUES (?,?,?)"
    return await database.query(sql, [nombre, precio, imagen])
}