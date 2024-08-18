"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebSocket = void 0;
const handleWebSocket = (wss, path, handler) => {
    wss.on("connection", (ws, req) => {
        const enhancedReq = req;
        if (req.url === path) {
            handler(ws, enhancedReq);
        }
        else {
            ws.close(1000, "No handler found");
        }
    });
};
exports.handleWebSocket = handleWebSocket;
