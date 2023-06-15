import express from "express"
import { getPrenda, getPrendaId, postPrenda, putPrenda, deletePrenda, UploadPicturePrenda} from "../controllers/prendas.controller"
import multer from "multer"
import { Authenticate } from "../helpers/token.helpers"
const prendasRouter = express.Router()

const upload = multer ({
    storage: multer.diskStorage({})
}).fields([{name: "file", maxCount: 1}])

prendasRouter.get("/prendas", getPrenda)
prendasRouter.get("/prendas/:id", getPrendaId)
prendasRouter.post("/prendas/:id", postPrenda)
prendasRouter.put("/prendas/:id", putPrenda)
prendasRouter.delete("/prendas/:id", deletePrenda)
prendasRouter.put("/prendas/foto/:id",[Authenticate, upload], UploadPicturePrenda)

export default prendasRouter