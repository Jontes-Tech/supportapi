import express from "express";
import fs from "fs";
import cors from "cors";

const app: express.Application = express();

const port: number = 3001;

let corsOptions = {
  origin: ["http://127.0.0.1:5173", "https://support.jontes.page"],
};
app.use(cors(corsOptions));

app.get("/users/:email", (req, res) => {
  if (fs.existsSync("users/" + req.params.email + ".json")) {
    let user = JSON.parse(
      fs.readFileSync("users/" + req.params.email + ".json", "utf8")
    );
    res.json({
      realname: user.name,
      subbeduntil: user.subbedUntil,
      plan: 'Obegränsad'
    });
  } else {
    res.status(404).json({ Error: "404 User Not Found!" });
  }
});

app.listen(port, () => {
  console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
