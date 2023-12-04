import db from '../../config/database.js'

export const getAll = () => {
    const sql = `SELECT * FROM customers`
    return db.execute(sql)
}