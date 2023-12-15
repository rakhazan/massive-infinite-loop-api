import db from '../../config/database.js'

export const getAll = () => {
    const sql = `SELECT * FROM customers WHERE is_deleted=0`
    return db.execute(sql)
}

export const getDetail = async (id) => {
    const sql = `SELECT * FROM customers WHERE is_deleted=0 AND id=? LIMIT 1`
    const [result] = await db.execute(sql, [id])
    return result || null
}

export const insert = (data) => {
    const sql = `INSERT INTO customers (fullname, phone) VALUES (?,?)`
    return db.execute(sql, data)
}

export const update = async (id, data) => {
    const columns = Object.keys(data).map(key => `${key}=?`).join(', ')
    const values = Object.values(data)

    const sql = `UPDATE customers SET ${columns} WHERE id=?`
    const [upd] = await db.execute(sql, [...values, id])
    return upd.affectedRows > 0
}

export const hardDelete = async (id) => {
    const sql = `DELETE FROM customers WHERE id=?`
    const [del] = await db.execute(sql, [id])
    return del.affectedRows > 0
}

export const softDelete = async (id) => {
    const sql = `UPDATE customers SET is_deleted=1 WHERE id=?`
    const [del] = await db.execute(sql, [id])
    return del.affectedRows > 0
}