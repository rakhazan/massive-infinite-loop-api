import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) {
        return res.status(401).json({
            status: 'fail',
            message: 'Anda belum login'
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(403).json({
                status: 'fail',
                message: 'Anda tidak memiliki akses'
            })
        }
        next()
    })
}

export default verifyToken