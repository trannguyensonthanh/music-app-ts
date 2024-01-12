import express, {Express, Request, Response} from "express"
import dotenv from "dotenv";
import path from "path";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import {systemConfig} from "./config/system"
const app: Express = express();
const port: number | string = process.env.PORT || 3000
dotenv.config();
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.set("views", `${__dirname}/views`); // đẩy dữ liệu ra views  sử dụng thêm __dirname để sử dụng trên cả online luôn
app.set("view engine", "pug"); // sử dụng pug
database.connect(); // kết nối với mongodb
app.use(express.static(`${__dirname}/public`)); // sử dụng file static để cho code bk là file nào đc xuất ra  sử dụng thêm __dirname để sử dụng trên cả online luôn

// Sử dụng middleware để xử lý dữ liệu JSON
app.use(express.json());

// Sử dụng middleware để xử lý dữ liệu từ form-urlencoded
app.use(express.urlencoded({ extended: true }));

// tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// end tiny mce


clientRoutes(app);
adminRoutes(app);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
