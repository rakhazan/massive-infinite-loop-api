import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getAll, getDetail, insert, update as _update, hardDelete, softDelete, getDetailBy } from "./model.js"

export const get = async (req, res) => {
    try {
        const [data] = await getAll()

        return res.json({
            status: 'success',
            data: {
                user: data
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
    const { userId } = req.params
    try {
        const [data] = await getDetail(userId)

        if (!data) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data user tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            data: {
                user: data
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
    const { username, password, role } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        await insert([username, hashedPassword, role])

        return res.status(201).json({
            status: 'success',
            message: 'Berhasil menambahkan data user baru',
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const update = async (req, res) => {
    const { userId } = req.params
    const { username, role } = req.body

    try {
        let updatedData = { username, role, updated_at: new Date() }
        if (req.body.password != undefined) {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            updatedData = { ...updatedData, password: hashedPassword }
        }

        const updated = await _update(userId, updatedData)

        if (!updated) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data user tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menyimpan perubahan data user'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const destroy = async (req, res) => {
    const { userId } = req.params
    const { type } = req.query

    let del = false

    try {
        if (type !== undefined && type === 'hard') { del = await hardDelete(userId) }
        else { del = await softDelete(userId) }
        if (!del) {
            return res.status(404).json({
                status: 'fail',
                message: 'Data user tidak ditemukan'
            })
        }

        return res.json({
            status: 'success',
            message: 'Berhasil menghapus data user'
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    try {
        const [user] = await getDetailBy('username', username)
        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: 'Username tidak ditemukan'
            })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({
                status: 'fail',
                message: 'Password salah'
            })
        }
        const access_token = jwt.sign({
            userId: user.id,
            username: user.username,
            role: user.role
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: '60s',
        })

        const refresh_token = jwt.sign({
            userId: user.id,
            username: user.username,
            role: user.role
        }, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: '1d',
        })

        await _update(user.id, { refresh_token: refresh_token, updated_at: new Date() })

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
            domain: 'localhost'
        })

        res.json({
            status: 'success',
            access_token: access_token
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refresh_token = req.cookies.refreshToken
        console.log(refresh_token)
        if (!refresh_token) {
            return res.status(401).json({
                status: 'fail',
                message: 'Anda belum login'
            })
        }

        const [user] = await getDetailBy('refresh_token', refresh_token)
        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            })
        }

        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_KEY, (err, decode) => {
            if (err) {
                console.log(err)
                return res.status(403).json({
                    status: 'fail',
                    message: 'Anda tidak memiliki akses'
                })
            }

            const access_token = jwt.sign({
                userId: user.id,
                username: user.username,
                role: user.role
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: '60s'
            })

            return res.json({
                status: 'success',
                access_token: access_token
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error
        })
    }
}

export const logout = async (req, res) => {
    const refresh_token = req.cookies.refreshToken
    if (!refresh_token) return res.sendStatus(204)

    const [user] = await getDetailBy('refresh_token', refresh_token)
    if (!user) return res.sendStatus(204)

    await _update(user.id, { refresh_token: null, updated_at: new Date() })

    res.clearCookie('refreshToken')

    return res.json({
        status: 'success',
        message: 'Anda telah logout'
    })
}