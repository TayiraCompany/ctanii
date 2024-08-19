const CTANII = require("../src/index");

console.log("ToNumber:", CTANII.Converters.ToNumber("123abc")); // 123
console.log("ToString:", CTANII.Converters.ToString(456)); // "456"
console.log("ToUpperCase:", CTANII.Converters.ToUpperCase("hello world")); // "HELLO WORLD"
console.log("ToLowerCase:", CTANII.Converters.ToLowerCase("HELLO WORLD")); // "hello world"
console.log("ToJSON:", CTANII.Converters.ToJSON('{"name":"John"}')); // { name: "John" }
console.log("FromJSON:", CTANII.Converters.FromJSON({ name: "John" })); // '{"name":"John"}'
console.log("ToMD5:", CTANII.Converters.ToMD5("password")); // "5f4dcc3b5aa765d61d8327deb882cf99"

// اختبارات الأدوات (Utils)
console.log("ValidateIP:", CTANII.Utils.ValidateIP("192.168.1.1")); // true
console.log("FormatDate:", CTANII.Utils.FormatDate(new Date(), "YYYY-MM-DD")); // "2024-08-19" (مثال)
console.log("DateDifference:", CTANII.Utils.DateDifference("2024-08-01", "2024-08-19")); // "18 days"
console.log("ValidateHexColor:", CTANII.Utils.ValidateHexColor("#ff5733")); // true
console.log("CalculatePixelDistance:", CTANII.Utils.CalculatePixelDistance(0, 0, 3, 4)); // 5
console.log("GenerateUUID:", CTANII.Utils.GenerateUUID()); // توليد UUID جديد
console.log("ParseURL:", CTANII.Utils.ParseURL("https://example.com/path?query=123")); 
// { protocol: 'https:', host: 'example.com', pathname: '/path', search: '?query=123' }
console.log("FindDuplicates:", CTANII.Utils.FindDuplicates([1, 2, 2, 3, 4, 4, 5])); // [2, 4]
console.log("UniqueValues:", CTANII.Utils.UniqueValues([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
console.log("GenerateRandomString:", CTANII.Utils.GenerateRandomString(10)); // توليد سلسلة عشوائية بطول 10
console.log("ValidateStrongPassword:", CTANII.Utils.ValidateStrongPassword("StrongP@ssword1")); // true
