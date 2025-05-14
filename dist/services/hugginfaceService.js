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
exports.suggestQueryImprovements = exports.getEmbeddingFromText = void 0;
const axios_1 = __importDefault(require("axios"));
const HF_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';
const HF_TOKEN = process.env.HF_API_TOKEN || '';
function getEmbeddingFromText(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.post(HF_API_URL, { inputs: text }, {
            headers: { Authorization: `Bearer ${HF_TOKEN}` },
        });
        return res.data[0];
    });
}
exports.getEmbeddingFromText = getEmbeddingFromText;
function suggestQueryImprovements(query) {
    return __awaiter(this, void 0, void 0, function* () {
        // Placeholder simplificado
        return `Sugestão para '${query}': use cláusulas WHERE mais específicas.`;
    });
}
exports.suggestQueryImprovements = suggestQueryImprovements;
