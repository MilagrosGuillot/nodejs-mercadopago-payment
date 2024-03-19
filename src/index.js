import express from "express"
import payment from "./routes/payment.routes.js"
import { PORT } from "./config.js"
import morgan from "morgan"


const app = express()
app.use(payment)
app.use(morgan("dev"))

app.listen(3000)
console.log("Server on port" , PORT)