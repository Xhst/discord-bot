import express, { Application, Request, Response } from "express";

export class Server {
  private app: Application;
  private port: number;

  constructor(port: number = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000) {
    this.app = express();
    this.port = port;
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });

    this.app.get("/", (_: Request, res: Response) => {
      res.send("Discord bot");
    });
  }
}
