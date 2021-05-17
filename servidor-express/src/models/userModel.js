const database = require('../database')

exports.ListarUsuarios = async () => {
    const sql = "SELECT u.id_usuario ,u.nombre, u.apellido, u.correo, u.password, u.id_rol, r.descripcion FROM usuarios u, roles r WHERE u.id_rol = r.id_rol"
    return await database.query(sql)
}

exports.EliminarUsuario = async (params) => {
    const { id } = params
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?"
    return await database.query(sql, [id])
}

exports.ActualizarUsuario = async (params, body) => {
    const { id } = params
    const { nombre, apellido, correo, password, id_rol } = body
    const sql = "UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, password = ?, id_rol = ? WHERE id_usuario = ?"
    return await database.query(sql, [nombre, apellido, correo, password, id_rol, id])
}

exports.AgregarUsuario = async (body) => {
    const { nombre, apellido, correo, password, id_rol } = body
    const sql = "INSERT INTO usuarios(nombre,apellido,correo,password,id_rol) VALUES (?,?,?,?,?)"
    return await database.query(sql, [nombre, apellido, correo, password, id_rol])
}

exports.LoginUsuario = async (body) => {
    const { correo, password } = body
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?"
    return await database.query(sql, [correo, password])
}

exports.ObtenerDatosUsuario = async (params) => {
    const { correo, password } = params
    const sql = "SELECT id_usuario,nombre,apellido,correo,password,id_rol FROM usuarios WHERE correo = ? AND password = ?"
    return await database.query(sql, [correo, password])
}