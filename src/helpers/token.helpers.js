import  jwt  from "jsonwebtoken";

function Authenticate (req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")
    if (!token) {
        return res.status(400).json({
            ok: false
        })
    }

    jwt.verify(token, process.env.SECRETO, (err, payload) => {
        if(!err) req.payload = payload
        next()
    })
}

export { Authenticate } 