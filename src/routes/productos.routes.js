import express from "express"
import { getProducto, getProductoId, postProducto, putProducto, deleteProducto, UploadPictureProducto} from "../controllers/productos.controller"
import multer from "multer"
import { Authenticate } from "../helpers/token.helpers"
const productosRouter = express.Router()

const upload = multer ({
    storage: multer.diskStorage({})
}).fields([{name: "file", maxCount: 1}])

productosRouter.get("/productos", getProducto)
productosRouter.get("/productos/:id", getProductoId)
productosRouter.post("/productos", postProducto)
productosRouter.put("/productos/:id", putProducto)
productosRouter.delete("/productos/:id", deleteProducto)
productosRouter.put("/productos/foto/:id",[Authenticate, upload], UploadPictureProducto)

export default productosRouter