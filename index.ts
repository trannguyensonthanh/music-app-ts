import express, {Express, Request, Response} from "express"
import dotenv from "dotenv";
import * as database from "./config/database";
// import cors from 'cors'
// import  routeApiVer1  from "./api/v1/routes/index.route";
// import bodyParser from 'body-parser'
const app: Express = express();
const port: number | string = process.env.PORT || 3000
dotenv.config();

app.set("views", `${__dirname}/views`); // đẩy dữ liệu ra views  sử dụng thêm __dirname để sử dụng trên cả online luôn
app.set("view engine", "pug"); // sử dụng pug
database.connect(); // kết nối với mongodb
app.get("/topics", async (req: Request, res: Response) => {
 res.render("client/pages/topics/index.pug");
}) 

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
