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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield connection_1.default.from("books").select("*");
    res.status(200).json(data);
});
exports.getAll = getAll;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { data, error } = yield connection_1.default.from("books").select("*").eq("id", id);
    res.status(200).json(data);
});
exports.getOne = getOne;
const createOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const { error } = yield connection_1.default.from("books").insert({ name }).select();
    res.json({ error });
});
exports.createOne = createOne;
const updateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    const { error } = yield connection_1.default
        .from("books")
        .update(name)
        .eq("id", id)
        .select();
    res.json({ error });
});
exports.updateOne = updateOne;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { error } = yield connection_1.default.from("books").delete().eq("id", id).select();
    res.json({ error });
});
exports.deleteOne = deleteOne;
