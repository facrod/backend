import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connect from "./Db/db"
import prendasRouter from "./routes/prendas.routes"

dotenv.config() //permite utilizar env para poder ocultar datos importantes

const app = express()

app.use(express.json()) //parse el body
app.use(cors()) //permite vincular el back con el front, en este caso react

app.use (prendasRouter) //utiliza la routa de prendas 

connect() // permite conectar a la Db

app.listen(process.env.PUERTO, () => {
    console.log("Escuchando puerto " + process.env.PUERTO)
})