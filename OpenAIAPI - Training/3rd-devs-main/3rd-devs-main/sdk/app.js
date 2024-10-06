"use strict";
// This code sets up an Express server with a chat endpoint that uses OpenAI's API.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var OpenAIService_1 = require("./OpenAIService");
var helpers_1 = require("./helpers");
// Initialize Express server
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.listen(port, function () { return console.log("Server running at http://localhost:".concat(port, ". Listening for POST /api/chat requests")); });
// Define chat endpoint
app.post('/api/chat', _validateMessages, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var openaiService, messages, systemPrompt, answer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                openaiService = new OpenAIService_1.OpenAIService();
                messages = req.body.messages;
                systemPrompt = {
                    role: "system",
                    content: "You are a helpful assistant who speaks using as fewest words as possible."
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, openaiService.completion(__spreadArray([systemPrompt], messages, true))];
            case 2:
                answer = _a.sent();
                res.json(answer);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error in OpenAI completion:', error_1);
                res.status(500).json({ error: 'An error occurred while processing your request' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Middleware function to validate incoming messages
function _validateMessages(req, res, next) {
    var messages = req.body.messages;
    // Check if messages is an array and not empty
    if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing messages in request body' });
    }
    // Check if all messages have valid format
    if (!messages.every(helpers_1.isValidMessage)) {
        return res.status(400).json({ error: 'Invalid message format in request body' });
    }
    next();
}
