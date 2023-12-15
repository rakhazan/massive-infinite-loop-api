import { getAll, getDetail, insert, update as _update, hardDelete } from "./model.js"

export const get = async (req, res) => {
    try {
        const [data] = await getAll()

        return res.json({
            status: 'success',
            data: {
                perawatan: data
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
    const { treatmentId } = req.params
    try {
        const [data] = await getDetail(treatmentId)

        if (!data) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data perawatan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            data: {
                perawatan: data
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const findByKode = async (req, res) => {
    const { kode } = req.params
    try {
        const [data] = await getDetail(kode)

        if (!data) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data perawatan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            data: {
                perawatan: data
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
    const { kode, pelanggan_id, tipe_sepatu, jenis_layanan, harga } = req.body
    try {
        await insert([kode, pelanggan_id, tipe_sepatu, jenis_layanan, harga])

        return res.status(201).json({
            status: 'success',
            message: 'Berhasil menambahkan data perawatan baru',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const update = async (req, res) => {
    const { treatmentId } = req.params
    const { fullname, phone } = req.body
    try {
        const date = new Date().toISOString()
        const updated = await _update(treatmentId, { fullname, phone, updated_at: date })

        if (!updated) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data perawatan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menyimpan perubahan data perawatan'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const destroy = async (req, res) => {
    const { treatmentId } = req.params
    try {
        const del = await hardDelete(treatmentId)
        if (!del) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data perawatan tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menghapus data perawatan'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}