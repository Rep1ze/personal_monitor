import express from "express"
import { loginGet, loginPost, registerGet, registerPost,homeGet,homePost, serviceYoutubePost, servicesDashBoardPost, servicesPostgresPost,} from "../controllers/controllers.mjs";

export const routerAPI = express.Router()
export const routerServices = express.Router()

routerAPI.post("/register",registerPost)
routerAPI.get("/register",registerGet)
routerAPI.post("/login",loginPost)
routerAPI.get("/login",loginGet)
routerAPI.get("/home",homeGet)
routerAPI.post("/home",homePost)


routerServices.post("/dashboard",servicesDashBoardPost)
routerServices.post("/postgres",servicesPostgresPost)
routerServices.post("/cache",servicesPostgresPost)
routerServices.post("/youtube",serviceYoutubePost)

