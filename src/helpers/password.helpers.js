import bcrypt from "bcrypt"

async function Encrypt (password) {
    const salt = parseInt(process.env.SALT, 10);
    return await bcrypt.hash(password, salt)
}

async function Compare (password, hash) {
    return await bcrypt.compare(password, hash)
}

export {Encrypt, Compare}