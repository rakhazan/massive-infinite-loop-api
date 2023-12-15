import db from '../../config/database.js'

export const getAll = () => {
    const sql = `SELECT t.*, c.fullname, c.phone FROM treatments t LEFT JOIN customers c ON t.pelanggan_id=c.id`
    return db.execute(sql)
}

export const getDetail = async (id) => {
    const sql = `SELECT * FROM treatments WHERE id=? OR kode=? LIMIT 1`
    const [result] = await db.execute(sql, [id, id])
    return result || null
}

export const insert = (data) => {
    // const kode = ''
    const sql = `INSERT INTO treatments (kode, pelanggan_id, tipe_sepatu, jenis_layanan, harga) VALUES (?,?,?,?,?)`
    return db.execute(sql, data)
}

export const update = async (id, data) => {
    const columns = Object.keys(data).map(key => `${key}=?`).join(', ')
    const values = Object.values(data)

    const sql = `UPDATE treatments SET ${columns} WHERE id=?`
    const [upd] = await db.execute(sql, [...values, id])
    return upd.affectedRows > 0
}

export const hardDelete = async (id) => {
    const sql = `DELETE FROM treatments WHERE id=?`
    const [del] = await db.execute(sql, [id])
    return del.affectedRows > 0
}

// export const softDelete = async (id) => {
//     const sql = `UPDATE treatments SET is_deleted=1 WHERE id=?`
//     const [del] = await db.execute(sql, [id])
//     return del.affectedRows > 0
// }