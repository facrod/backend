import express from "express"
import { getProducto, getProductoId, postProducto, putProducto, deleteProducto, UploadPictureProducto} from "../controllers/productos.controller"
import multer from "multer"
import { Authenticate } from "../helpers/token.helpers"
const productosRouter = express.Router()

const upload = multer ({
    storage: multer.diskStorage({})
}).fields([{name: "file", maxCount: 1}])

productosRouter.get("/prendas", getProducto)
productosRouter.get("/prendas/:id", getProductoId)
productosRouter.post("/prendas/:id", postProducto)
productosRouter.put("/prendas/:id", putProducto)
productosRouter.delete("/prendas/:id", deleteProducto)
productosRouter.put("/prendas/foto/:id",[Authenticate, upload], UploadPictureProducto)

export default productosRouter