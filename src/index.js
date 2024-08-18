"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.formatText = exports.searchAndReplace = exports.checkType = exports.Local = exports.SQLEditor = void 0;
class SQLEditor {
    constructor(initialQuery = "") {
        this.query = initialQuery;
    }
    read() {
        return this.query;
    }
    set(query) {
        this.query = query;
    }
    edit(additionalQuery) {
        this.query += additionalQuery;
    }
    execute() {
        return `Executing query: ${this.query}`;
    }
}
exports.SQLEditor = SQLEditor;
// 
const Local = (key, value) => {
    const trimmedValue = key.trim();
    if (typeof window !== "undefined") {
        window[trimmedValue] = `${value}`;
    }
    else if (typeof global !== "undefined") {
        global[trimmedValue] = `${value}`;
    }
    else {
        console[trimmedValue] = `${value}`;
    }
};
exports.Local = Local;
const checkType = (v, type) => {
    if (type === "String" && typeof v === "string") {
        return v;
    }
    else if (type === "Number" && typeof v === "number") {
        return v;
    }
    else if (type === "Boolean" && typeof v === "boolean") {
        return v;
    }
    else if (type === "Object" && typeof v === "object" && v !== null) {
        return v;
    }
    else if (type === "Function" && typeof v === "function") {
        return v;
    }
    else {
        throw new Error(`Value is not of type ${type}`);
    }
};
exports.checkType = checkType;
const searchAndReplace = (text, search, replacement) => {
    if (typeof search === "string") {
        return text.split(search).join(replacement);
    }
    return text.replace(search, replacement);
};
exports.searchAndReplace = searchAndReplace;
const formatText = (text, formatting) => {
    let formattedText = text;
    if (formatting.color) {
        formattedText = `<span style="color: ${formatting.color}">${formattedText}</span>`;
    }
    if (formatting.fontSize) {
        formattedText = `<span style="font-size: ${formatting.fontSize}">${formattedText}</span>`;
    }
    if (formatting.textAlign) {
        formattedText = `<div style="text-align: ${formatting.textAlign}">${formattedText}</div>`;
    }
    return formattedText;
};
exports.formatText = formatText;
const sqlEditor = new SQLEditor();
const Database = {
    Read: () => {
        return sqlEditor.read();
    },
    Set: (query) => {
        sqlEditor.set(query);
    },
    Edit: (additionalQuery) => {
        sqlEditor.edit(additionalQuery);
    },
    Execute: () => {
        return sqlEditor.execute();
    },
};
exports.Database = Database;
