# ctanii

`const {
  Local,
  checkType,
  Database,
  searchAndReplace,
  formatText,
} = require("./src/index.js");

Local("myDynamicProperty", "This is a test value");
console.log(
  global.myDynamicProperty ||
    (typeof window !== "undefined" ? window.myDynamicProperty : null)
);

try {
  console.log(checkType("Hello", "String"));
  console.log(checkType(123, "Number"));
  console.log(checkType(true, "Boolean"));
  console.log(checkType({ key: "value" }, "Object"));
  console.log(checkType(() => {}, "Function"));
} catch (error) {
  console.error(error.message);
}

try {
  Database.Set("SELECT * FROM users");
  console.log("Database Read:", Database.Read());
  Database.Edit(" WHERE age > 25");
  console.log("Database Read After Edit:", Database.Read());
  console.log("Database Execute:", Database.Execute());
} catch (error) {
  console.error(error.message);
}

try {
  const text = "Hello world! Hello everyone!";
  const result = searchAndReplace(text, "Hello", "Hi");
  console.log("Search and Replace Result:", result);
} catch (error) {
  console.error(error.message);
}

try {
  console.log("Uppercase:", formatText("hello world", "uppercase"));
  console.log("Lowercase:", formatText("HELLO WORLD", "lowercase"));
  console.log("Capitalize:", formatText("hello world", "capitalize"));
} catch (error) {
  console.error(error.message);
}
`

# SwiftServe 

`
import swiftServe from "./SwiftServe/SwiftServeServer";
import path from "path";

const app = swiftServe();

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

app.get("/hello", (req, res) => {
  res.send( "Hello, World!" );
});

app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("Data received");
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  if (userId === "111") {
    res.json({ Hello: 1212 });
  } else {
    res.json({ userId });
  }
});

app.ws("/chat", (ws, req) => {
  ws.on("message", (message: any) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});`