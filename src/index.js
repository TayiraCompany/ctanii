// Function Converters

function ToNumber(value) {
  if (typeof value === "string") {
    const cleanedValue = value.replace(/\D/g, ""); 
    return Number(cleanedValue);
  } else if (typeof value === "number") {
    return value; 
  } else {
    return "Value is not a valid Number"; 
  }
}

function ToString(value) {
  if (typeof value === "string") {
    const cleanedValue = value.replace(/\D/g, ""); 
    return String(cleanedValue); 
  } else if (typeof value === "number") {
    return String(value); 
  } else {
    return "Value is not a valid String";
  }
}

function ToUpperCase(value) {
  if (typeof value === "string") {
    return value.toUpperCase(); 
  } else {
    return "Value is not a valid String"; 
  }
}

function ToLowerCase(value) {
  if (typeof value === "string") {
    return value.toLowerCase(); 
  } else {
    return "Value is not a valid String"; 
  }
}

function ToJSON(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return "Invalid JSON string";
  }
}

function FromJSON(value) {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return "Invalid JavaScript object";
  }
}

function ValidateIP(ip) {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}

function FormatDate(date, format) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

function DateDifference(date1, date2) {
  const diffTime = Math.abs(new Date(date2) - new Date(date1));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days`;
}

function ValidateHexColor(color) {
  const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexRegex.test(color);
}

function CalculatePixelDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function CreateNumberRange(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function FindDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of arr) {
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }
  return Array.from(duplicates);
}

function ArrayStatistics(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const avg = sum / arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return { sum, avg, min, max };
}

function ValidateDomain(domain) {
  const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/;
  return domainRegex.test(domain);
}

function ValidatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

function ObjectToArray(obj) {
  return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
}

function ArrayToObject(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {});
}

function CalculateSquareRoot(value) {
  return Math.sqrt(value);
}

const crypto = require("crypto");
function ToMD5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

function ElementExists(arr, value) {
  return arr.includes(value);
}

function AreArraysEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function ParseURL(url) {
  try {
    const parsedUrl = new URL(url);
    return {
      protocol: parsedUrl.protocol,
      host: parsedUrl.host,
      pathname: parsedUrl.pathname,
      search: parsedUrl.search,
    };
  } catch (e) {
    return "Invalid URL";
  }
}

function TimeDifference(time1, time2) {
  const [hours1, minutes1] = time1.split(":").map(Number);
  const [hours2, minutes2] = time2.split(":").map(Number);
  const diffMinutes = Math.abs(
    hours1 * 60 + minutes1 - (hours2 * 60 + minutes2)
  );
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours} hours and ${diffMinutes % 60} minutes`;
}

function FindMax(arr) {
  return Math.max(...arr);
}

function FindMin(arr) {
  return Math.min(...arr);
}

function GenerateRandomArray(length, min, max) {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

function SafeJSONParse(str) {
  try {
    return { valid: true, result: JSON.parse(str) };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

function CapitalizeWords(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

function ReverseArray(arr) {
  return arr.reverse();
}

function CalculateSize(obj) {
  if (Array.isArray(obj)) {
    return obj.length;
  } else if (typeof obj === "object") {
    return Object.keys(obj).length;
  }
  return 0;
}

function ValidateHTML(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
}

function ParseQueryString(queryString) {
  return Object.fromEntries(new URLSearchParams(queryString).entries());
}

function UniqueValues(arr) {
  return [...new Set(arr)];
}

function SumObjectValues(obj) {
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
}

function FindMatchingObjects(arr, criteria) {
  return arr.filter((obj) =>
    Object.keys(criteria).every((key) => obj[key] === criteria[key])
  );
}

function ValidateUUID(uuid) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

function GenerateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join("");
}

function ValidateCSV(csvString) {
  const rows = csvString.trim().split("\n");
  const columnCount = rows[0].split(",").length;
  return rows.every((row) => row.split(",").length === columnCount);
}

function ToSortedJSON(value) {
  return JSON.stringify(value, Object.keys(value).sort());
}

function CalculatePercentage(part, total) {
  return ((part / total) * 100).toFixed(2) + "%";
}

function ValidateStrongPassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function TimeElapsedSince(date) {
  const now = new Date();
  const past = new Date(date);
  const diffTime = now - past;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays} days ago`;
}

const Converters = {
  ToNumber: (value) => ToNumber(value),
  ToString: (value) => ToString(value),
  ToUpperCase: (value) => ToUpperCase(value),
  ToLowerCase: (value) => ToLowerCase(value),
  ToJSON: (value) => ToJSON(value),
  FromJSON: (value) => FromJSON(value),
  TextToBinary: (text) => TextToBinary(text),
  BinaryToText: (binary) => BinaryToText(binary),
  ToMD5: (value) => ToMD5(value),
};

const Utils = {
  CheckPermission: (role, requiredRole) => CheckPermission(role, requiredRole),
  Calculate: (operation, a, b) => Calculate(operation, a, b),
  ValidateEmail: (email) => ValidateEmail(email),
  ValidatePhoneNumber: (phoneNumber) => ValidatePhoneNumber(phoneNumber),
  GenerateUUID: () => GenerateUUID(),
  MeasureExecutionTime: (fn) => MeasureExecutionTime(fn),
  WordCount: (text) => WordCount(text),
  FormatDate: (date, format) => FormatDate(date, format),
  DateDifference: (date1, date2) => DateDifference(date1, date2),
  ValidateHexColor: (color) => ValidateHexColor(color),
  CalculatePixelDistance: (x1, y1, x2, y2) =>
    CalculatePixelDistance(x1, y1, x2, y2),
  CreateNumberRange: (start, end) => CreateNumberRange(start, end),
  FindDuplicates: (arr) => FindDuplicates(arr),
  ArrayStatistics: (arr) => ArrayStatistics(arr),
  ValidateDomain: (domain) => ValidateDomain(domain),
  ValidatePassword: (password) => ValidatePassword(password),
  ObjectToArray: (obj) => ObjectToArray(obj),
  ArrayToObject: (arr) => ArrayToObject(arr),
  CalculateSquareRoot: (value) => CalculateSquareRoot(value),
  ElementExists: (arr, value) => ElementExists(arr, value),
  AreArraysEqual: (arr1, arr2) => AreArraysEqual(arr1, arr2),
  ParseURL: (url) => ParseURL(url),
  TimeDifference: (time1, time2) => TimeDifference(time1, time2),
  FindMax: (arr) => FindMax(arr),
  FindMin: (arr) => FindMin(arr),
  GenerateRandomArray: (length, min, max) =>
    GenerateRandomArray(length, min, max),
  SafeJSONParse: (str) => SafeJSONParse(str),
  CapitalizeWords: (text) => CapitalizeWords(text),
  ReverseArray: (arr) => ReverseArray(arr),
  CalculateSize: (obj) => CalculateSize(obj),
  ValidateHTML: (html) => ValidateHTML(html),
  ParseQueryString: (queryString) => ParseQueryString(queryString),
  UniqueValues: (arr) => UniqueValues(arr),
  SumObjectValues: (obj) => SumObjectValues(obj),
  FindMatchingObjects: (arr, criteria) => FindMatchingObjects(arr, criteria),
  ValidateUUID: (uuid) => ValidateUUID(uuid),
  GenerateRandomString: (length) => GenerateRandomString(length),
  ValidateCSV: (csvString) => ValidateCSV(csvString),
  ToSortedJSON: (value) => ToSortedJSON(value),
  CalculatePercentage: (part, total) => CalculatePercentage(part, total),
  ValidateStrongPassword: (password) => ValidateStrongPassword(password),
  TimeElapsedSince: (date) => TimeElapsedSince(date),
  ValidateIP: (ip) => ValidateIP(ip)
};

const CTANII = {
  Converters: Converters,
  Utils: Utils,
};

module.exports = CTANII;
