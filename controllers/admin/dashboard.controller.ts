import { Request, Response } from "express";

//[get] /admin/dashboard
export const index = async (req: Request, res: Response): Promise<void> =>{
res.render("admin/pages/dashboard/index", {
  pageTitle: "Tổng quan"
});
};