"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortenURL = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const shortenURL = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const linkRequest = {
        destination: url,
        domain: { fullName: "rebrand.ly" },
    };
    const headers = {
        'Content-Type': 'application/json',
        'apikey': process.env.REBRANDLY_API_KEY,
    };
    try {
        const response = yield axios_1.default.post(constants_1.REBRANDLY_ENDPOINT, linkRequest, { headers });
        return {
            success: true,
            data: response.data.shortUrl,
        };
    }
    catch (error) {
        console.log('shortenURL ERROR: ', error);
        return {
            success: false,
            status: error.response.status || 400,
            message: error.response.data.message || 'Error occurred when shortening the url',
        };
    }
});
exports.shortenURL = shortenURL;
