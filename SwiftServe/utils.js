"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUrlParams = exports.renderView = void 0;
const renderView = (view, options) => {
    return `<html><body><h1>${view}</h1><p>${JSON.stringify(options)}</p></body></html>`;
};
exports.renderView = renderView;
const parseUrlParams = (routePath, actualPath) => {
    const params = {};
    const routeParts = routePath.split("/");
    const pathParts = actualPath.split("/");
    routeParts.forEach((part, i) => {
        if (part.startsWith(":")) {
            const paramName = part.substring(1);
            params[paramName] = pathParts[i];
        }
    });
    return params;
};
exports.parseUrlParams = parseUrlParams;
