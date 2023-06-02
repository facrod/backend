import express from "express"
import { getPrenda, getPrendaId, postPrenda, putPrenda, deletePrenda} from "../controllers/prendas.controller"

const prendasRouter = express.Router()

prendasRouter.get("/prendas", getPrenda)
prendasRouter.get("/prendas/:id", getPrendaId)
prendasRouter.post("/prendas/:id", postPrenda)
prendasRouter.put("/prendas/:id", putPrenda)
prendasRouter.delete("/prendas/:id", deletePrenda)


export default prendasRouter