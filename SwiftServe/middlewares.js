"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = void 0;
const applyMiddleware = (middleware, req, res, next) => {
    let index = 0;
    const processMiddleware = () => {
        if (index < middleware.length) {
            middleware[index++](req, res, processMiddleware);
        }
        else {
            next();
        }
    };
    processMiddleware();
};
exports.applyMiddleware = applyMiddleware;
