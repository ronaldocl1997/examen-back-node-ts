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
exports.existeDescripcionCatalogoCargos = void 0;
//importamos el model de catalogo-cargos
const catalogo_cargos_1 = __importDefault(require("../models/catalogo-cargos"));
//validacion para ver si existe una descripcion con el mismo nombre en catalogo-cargos
const existeDescripcionCatalogoCargos = (descripcion = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeCatalogo = yield catalogo_cargos_1.default.findOne({
        where: {
            descripcion
        }
    });
    if (existeCatalogo) {
        throw new Error(`El catalogo ${descripcion} ya existe`);
    }
    ;
});
exports.existeDescripcionCatalogoCargos = existeDescripcionCatalogoCargos;
//# sourceMappingURL=db-validators.js.map