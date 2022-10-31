import * as express from "express";
import * as fs from "fs";
import * as cors from "cors";
import * as dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


dotenv.config()

const app: express.Application = express();

let corsOptions = {
  origin: ["http://127.0.0.1:5173", "https://support.jontes.page"],
};
app.use(cors(corsOptions));
app.use(limiter)

app.get("/users/:email", (req, res) => {
  if (fs.existsSync("users/" + req.params.email + ".json")) {
    let user = JSON.parse(
      fs.readFileSync("users/" + req.params.email + ".json", "utf8")
    );
    res.json({
      realname: user.name,
      subbeduntil: user.subbedUntil,
      plan: user.plan
    });
  } else {
    res.status(404).json({ Error: "404 User Not Found!" });
  }
});

app.listen(process.env.SUPPORTAPIPORT, () => {
  console.log(`http://localhost:${process.env.SUPPORTAPIPORT}/`);
});
