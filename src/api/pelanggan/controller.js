import { getAll } from "./model.js"

export const get = async (req, res) => {
    try {
        const [data] = await getAll()

        return res.json({
            status: 'success',
            data: {
                customers: data
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

