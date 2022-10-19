const express = require("express");
const connect = require("./db");
const cors = require("cors");
const config = require("./config.json");
const fileUplod = require("express-fileupload");
connect();
const app = express();

const host = config.server.host;
const port = config.server.port;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/UserAuth"));
app.use("/api/movies", require("./routes/Movies"));
app.use("/api/webseries", require("./routes/WebSeries"));

app.listen(port, () => {
  console.log(`App is running on ${host}:${port}`);
});
