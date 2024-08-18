const SwiftServeServer = require("./src/index.ts");

const app = SwiftServeServer();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000/");
});
