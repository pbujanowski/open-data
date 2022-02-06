import { Request, Response } from "express";

const homeController = () => {
  const index = (req: Request, res: Response) => {
    res.send("Open Data API");
  };

  return { index };
};

const HomeController = homeController();

export default HomeController;
