import usuarioSchema from "../models/usuarios";
import { Error, Sucess } from "./productos.controller";
import {Encrypt, Compare} from "../helpers/password.helpers"
import jwt from "jsonwebtoken";


async function getUser (req, res) {
    try {
        const result = await usuarioSchema.find()
        return res.json(Sucess(result))

    } catch (error) {
        Error(err)
    }

}

async function newUser (req, res) {
    try {
    const {nombre, apellido, email, password, repassword} = req.body

    if(password === repassword){
        const pw = await Encrypt(password)

        const usuario = await usuarioSchema.create({
            nombre,
            apellido,
            email,
            password: pw,
    })

        return res.status(200).json({
            ok: true,
            user: usuario,
        })      
    } else {
        return res.status(400).json({
            ok: false,
            err: "Las contraseñas deben ser iguales."
        })
    }
    } catch (err) {
        return res.json(Error(err))
    }
}


async function login (req, res) {
    const {email, password} = req.body

    const userLogged = await usuarioSchema.findOne({email})

    if (!userLogged) {
        return res
              .status(400)
              .json({ 
                ok: false, 
                error: "Usuario o Contraseña incorrectos" 
                
            })}
        
    const passwordCheck = await Compare(password, userLogged.password)

        if (!passwordCheck){
            return res
            .status(400)
            .json({ ok: false, error: "Usuario o Contraseña incorrectos" })}

    const token = userLogged.generateAccesToken();
    const logedT = true
    const usuario = await usuarioSchema.findOneAndUpdate({email:userLogged.email}, {
        loged: logedT,
    })
    usuario.loged = logedT
    return res.json({
        ok: true,
        data: token,
        user: usuario,
    })

}

async function logOut (req, res) {
    const {authorization} = req.headers
    const tokenLG = authorization.split(" ")[1]
    const decodedT = jwt.decode(tokenLG)
    const usuario = await usuarioSchema.findOneAndUpdate({nombre: decodedT.nombre}, {
        $set: {
            loged: false,
        }
    })  
    usuario.loged = false
    return res.json({
        ok:true,
        user: usuario,
    })
}


export {newUser, getUser, login, logOut}