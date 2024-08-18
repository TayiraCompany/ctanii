export class SQLEditor {
  private query: string;

  constructor(initialQuery: string = "") {
    this.query = initialQuery;
  }

  read(): string {
    return this.query;
  }

  set(query: string): void {
    this.query = query;
  }

  edit(additionalQuery: string): void {
    this.query += additionalQuery;
  }

  execute(): string {
    return `Executing query: ${this.query}`;
  }
}
// 
const Local = (key: string, value: any): void => {
  const trimmedValue = key.trim();

  if (typeof window !== "undefined") {
    (window as Record<string, any>)[trimmedValue] = `${value}`;
  } else if (typeof global !== "undefined") {
    (global as Record<string, any>)[trimmedValue] = `${value}`;
  } else {
    (console as Record<string, any>)[trimmedValue] = `${value}`;
  }
};

const checkType = (v: any, type: string): any => {
  if (type === "String" && typeof v === "string") {
    return v;
  } else if (type === "Number" && typeof v === "number") {
    return v;
  } else if (type === "Boolean" && typeof v === "boolean") {
    return v;
  } else if (type === "Object" && typeof v === "object" && v !== null) {
    return v;
  } else if (type === "Function" && typeof v === "function") {
    return v;
  } else {
    throw new Error(`Value is not of type ${type}`);
  }
};

const searchAndReplace = (
  text: string,
  search: string | RegExp,
  replacement: string
): string => {
  if (typeof search === "string") {
    return text.split(search).join(replacement);
  }
  return text.replace(search, replacement);
};

type TextFormatting = {
  color?: string;
  fontSize?: string;
  textAlign?: "left" | "center" | "right";
};

const formatText = (text: string, formatting: TextFormatting): string => {
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

const sqlEditor = new SQLEditor();

const Database = {
  Read: (): string => {
    return sqlEditor.read();
  },
  Set: (query: string): void => {
    sqlEditor.set(query);
  },
  Edit: (additionalQuery: string): void => {
    sqlEditor.edit(additionalQuery);
  },
  Execute: (): string => {
    return sqlEditor.execute();
  },
};

export {
  Local,
  checkType,
  searchAndReplace,
  formatText,
  Database,
};
