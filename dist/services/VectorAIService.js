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
exports.VectorAIService = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
class VectorAIService {
    constructor(huggingfaceApiUrl, huggingfaceApiKey) {
        this.huggingfaceApiUrl = huggingfaceApiUrl;
        this.huggingfaceApiKey = huggingfaceApiKey;
    }
    // Método para gerar o embedding de um texto usando a API da HuggingFace
    getEmbedding(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(`${this.huggingfaceApiUrl}/models/distilbert-base-uncased`, { inputs: text }, {
                    headers: {
                        'Authorization': `Bearer ${this.huggingfaceApiKey}`,
                    },
                });
                // Verifica a resposta da API
                if (response.data && response.data[0]) {
                    const embedding = response.data[0].embedding;
                    logger_1.Logger.log('Embedding generated successfully.');
                    return embedding;
                }
                else {
                    logger_1.Logger.error('Failed to retrieve embedding from HuggingFace API.');
                    return null;
                }
            }
            catch (error) {
                logger_1.Logger.error(`Error calling HuggingFace API: ${error}`);
                return null;
            }
        });
    }
}
exports.VectorAIService = VectorAIService;
