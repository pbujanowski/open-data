import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
  res.send("Open Data API");
};

export { index };
