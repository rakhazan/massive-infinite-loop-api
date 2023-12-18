import { getAll, getDetail, insert, update as _update, hardDelete, softDelete } from "./model.js"

export const get = async (req, res) => {
    try {
        const [data] = await getAll()

        return res.json({
            status: 'success',
            data: {
                pelanggan: data
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const find = async (req, res) => {
    const { pelangganId } = req.params
    try {
        const [data] = await getDetail(pelangganId)

        if (!data) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data pelanggan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            data: {
                pelanggan: data
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const store = async (req, res) => {
    const { fullname, phone } = req.body
    try {
        await insert([fullname, phone])

        return res.status(201).json({
            status: 'success',
            message: 'Berhasil menambahkan data pelanggan baru',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const update = async (req, res) => {
    const { pelangganId } = req.params
    const { fullname, phone } = req.body
    try {
        const updated = await _update(pelangganId, { fullname, phone, updated_at: new Date() })

        if (!updated) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data pelanggan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menyimpan perubahan data pelanggan'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const destroy = async (req, res) => {
    const { pelangganId } = req.params
    const { type } = req.query

    let del = false

    try {
        if (type !== undefined && type === 'hard') { del = await hardDelete(pelangganId) }
        else { del = await softDelete(pelangganId) }
        if (!del) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data pelanggan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menghapus data pelanggan'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}