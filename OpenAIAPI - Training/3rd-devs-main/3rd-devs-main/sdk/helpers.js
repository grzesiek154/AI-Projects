"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidMessage = isValidMessage;
function isValidMessage(message) {
    return typeof message === 'object' &&
        'role' in message &&
        'content' in message &&
        typeof message.content === 'string';
}
