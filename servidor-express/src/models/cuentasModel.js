const database = require('../database')

exports.ListarCuentas = async () => {
    const sql = `
        SELECT c.id_cuenta, u.id_usuario, m.descripcion, p.nombre, p.precio, u.apellido 
        FROM cuentas c, mesas m, platos p, usuarios u 
        WHERE c.id_mesa = m.id_mesa 
        AND c.id_plato = p.id_plato 
        AND c.id_usuario = u.id_usuario
    `
    return await database.query(sql)
}

exports.ListarCuentaPorUsuarioYMesa = async (params) => {
    const { id_usuario, id_mesa } = params
    const sql = `
        SELECT c.id_cuenta, m.descripcion, p.nombre, p.precio, u.apellido 
        FROM cuentas c, mesas m, platos p, usuarios u 
        WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato 
        AND c.id_usuario = u.id_usuario 
        AND u.id_usuario = ? 
        AND c.id_mesa = ?
    `
    return await database.query(sql, [id_usuario, id_mesa])
}

exports.ObtenerPrecioTotalCuenta = async (params) => {
    const { id_usuario, id_mesa } = params
    const sql = `
        SELECT SUM(p.precio) as total 
        FROM cuentas c, mesas m, platos p, usuarios u 
        WHERE c.id_mesa = m.id_mesa 
        AND c.id_plato = p.id_plato 
        AND c.id_usuario = u.id_usuario 
        AND u.id_usuario = ? 
        AND c.id_mesa = ?
    `
    return await database.query(sql, [id_usuario, id_mesa])
}

exports.ObtenerPrecioPorPlato = async (params) => {
    const { id_usuario, id_mesa, id_cuenta } = params
    const sql = `
        SELECT p.precio as total 
        FROM cuentas c, mesas m, platos p, usuarios u 
        WHERE c.id_mesa = m.id_mesa 
        AND c.id_plato = p.id_plato 
        AND c.id_usuario = u.id_usuario 
        AND u.id_usuario = ? 
        AND c.id_mesa = ? 
        AND c.id_cuenta = ?
    `
    return await database.query(sql, [id_usuario, id_mesa, id_cuenta])
}

exports.ObtenerDatosDelPlato = async (params) => {
    const { id_plato } = params
    const sql = `
        SELECT c.id_cuenta, m.descripcion, p.nombre, p.precio, u.apellido 
        FROM cuentas c, mesas m, platos p, usuarios u 
        WHERE c.id_mesa = m.id_mesa 
        AND c.id_plato = p.id_plato 
        AND c.id_usuario = u.id_usuario 
        AND p.id_plato = ? 
        ORDER BY c.id_cuenta 
        DESC LIMIT 1
    `
    return await database.query(sql, [id_plato])
}

exports.EliminarCuenta = async (params) => {
    const { id } = params
    const sql = "DELETE FROM cuentas WHERE id_cuenta = ?"
    return database.query(sql, [id])
}

exports.ActualizarCuenta = async (params, body) => {
    const { id } = params
    const { id_mesa, id_plato } = body
    const sql = "UPDATE cuentas SET id_mesa = ?, id_plato = ? WHERE id_cuenta = ?"
    return await database.query(sql, [id_mesa, id_plato, id])
}

exports.AgregarCuenta = async (body) => {
    const { id_mesa, id_plato, id_usuario } = body
    const sql = "INSERT INTO cuentas(id_mesa,id_plato,id_usuario,fecha_cuenta) VALUES (?,?,?,NOW())"
    return await database.query(sql, [id_mesa, id_plato, id_usuario])
}

exports.ObtenerPrecioPorAnoPorCadaMes = async (params, body) => {
    const { month } = params
    const { year } = body
    const sql = "SELECT SUM(p.precio) as total_mes FROM cuentas c, platos p WHERE c.id_plato = p.id_plato AND YEAR(c.fecha_cuenta) = ? AND MONTH(c.fecha_cuenta) = ?"
    return await database.query(sql, [year, month])
}

exports.ListarAnos = async () => {
    const sql = "SELECT YEAR(fecha_cuenta) as year FROM cuentas GROUP BY YEAR(fecha_cuenta) HAVING COUNT(*) > 1"
    return await database.query(sql)
}
