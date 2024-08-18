"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const ws_1 = __importDefault(require("ws"));
const url = __importStar(require("url"));
const staticFiles_1 = require("./staticFiles");
const websockets_1 = require("./websockets");
const utils_1 = require("./utils");
// Middleware to handle CORS
const handleCORS = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD, API");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
    }
    else {
        next();
    }
};
// Error handling middleware
const errorHandler = (req, res, next) => {
    try {
        next();
    }
    catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
        }
    }
};
const SwiftServeServer = () => {
    const routes = {};
    const middleware = [handleCORS, errorHandler];
    const webSocketHandlers = {};
    const use = (mw) => {
        middleware.push(mw);
    };
    const get = (path, handler) => {
        routes[`GET ${path}`] = handler;
    };
    const post = (path, handler) => {
        routes[`POST ${path}`] = handler;
    };
    const put = (path, handler) => {
        routes[`PUT ${path}`] = handler;
    };
    const del = (path, handler) => {
        routes[`DELETE ${path}`] = handler;
    };
    const patch = (path, handler) => {
        routes[`PATCH ${path}`] = handler;
    };
    const head = (path, handler) => {
        routes[`HEAD ${path}`] = handler;
    };
    const api = (path, version = "0", apiRequestType = "POST", handler) => {
        const method = apiRequestType.toUpperCase();
        if (!["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"].includes(method)) {
            throw new Error(`Invalid HTTP method: ${apiRequestType}`);
        }
        routes[`${method} /api/${version}${path}`] = handler;
    };
    const ws = (path, handler) => {
        webSocketHandlers[path] = handler;
    };
    const listen = (port, callback, hostname = "localhost") => {
        const server = http.createServer((req, res) => {
            const enhancedReq = req;
            const enhancedRes = res;
            const parsedUrl = url.parse(req.url || "", true);
            enhancedReq.query = parsedUrl.query;
            enhancedRes.status = (statusCode) => {
                res.statusCode = statusCode;
                return enhancedRes;
            };
            const collectBodyData = new Promise((resolve) => {
                const body = [];
                req
                    .on("data", (chunk) => body.push(chunk))
                    .on("end", () => {
                    const bodyString = Buffer.concat(body).toString();
                    try {
                        enhancedReq.body = JSON.parse(bodyString);
                    }
                    catch (_a) {
                        enhancedReq.body = bodyString;
                    }
                    resolve();
                });
            });
            enhancedRes.json = (body, statusCode = 200) => {
                if (!res.headersSent) {
                    res.statusCode = statusCode;
                    res.setHeader("Content-Type", "application/json");
                    res.write(JSON.stringify(body));
                    res.end();
                }
            };
            enhancedRes.send = (body, statusCode = 200) => {
                if (!res.headersSent) {
                    res.statusCode = statusCode;
                    res.setHeader("Content-Type", "text/plain");
                    res.write(typeof body === "string" ? body : body.toString());
                    res.end();
                }
            };
            enhancedRes.render = (view, options = {}, statusCode = 200) => {
                if (!res.headersSent) {
                    res.statusCode = statusCode;
                    res.setHeader("Content-Type", "text/html");
                    const renderedView = (0, utils_1.renderView)(view, options);
                    res.write(renderedView);
                    res.end();
                }
            };
            enhancedRes.redirect = (location, statusCode = 302) => {
                if (!res.headersSent) {
                    res.statusCode = statusCode;
                    res.setHeader("Location", location);
                    res.end();
                }
            };
            const next = () => {
                (0, staticFiles_1.handleStaticFiles)(enhancedReq, enhancedRes, () => {
                    if (middleware.length > 0) {
                        middleware.shift()(enhancedReq, enhancedRes, next);
                    }
                    else {
                        const routeKey = `${req.method} ${parsedUrl.pathname}`;
                        const handler = routes[routeKey];
                        if (handler) {
                            enhancedReq.params = (0, utils_1.parseUrlParams)(routeKey.split(" ")[1], parsedUrl.pathname || "");
                            handler(enhancedReq, enhancedRes);
                        }
                        else {
                            enhancedRes.send("Not Found", 404);
                        }
                    }
                });
            };
            collectBodyData.then(next);
        });
        const wss = new ws_1.default.Server({ server });
        Object.keys(webSocketHandlers).forEach((path) => {
            (0, websockets_1.handleWebSocket)(wss, path, webSocketHandlers[path]);
        });
        server.listen(port, () => {
            callback();
        });
    };
    return { use, get, post, put, del, patch, head, api, ws, listen };
};
exports.default = SwiftServeServer;
