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