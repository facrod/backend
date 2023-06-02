import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connect from "./Db/db"
import prendasRouter from "./routes/prendas.routes"
import userRoute from "./routes/usuario.routes"

dotenv.config() //permite utilizar env para poder ocultar datos importantes

const app = express()

app.use(express.json()) //parsea el body
app.use(cors()) //permite vincular el back con el front, en este caso react

app.use (prendasRouter) //utiliza la routa de prendas 
app.use (userRoute) //ruta de usuarios

connect() // permite conectar a la Db

app.listen(process.env.PUERTO, () => {
    console.log("Escuchando puerto " + process.env.PUERTO)
})