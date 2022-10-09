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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookLanguagesRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const bookLanguagesRouter = (0, express_1.Router)();
exports.bookLanguagesRouter = bookLanguagesRouter;
//get
bookLanguagesRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let booklang = yield models_1.book_language.findAll();
        res.json({ status: true, data: booklang });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//post
bookLanguagesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let language_name = req.body.language_name;
        let language_code = req.body.language_code;
        let data = yield models_1.book_language.create({
            language_code: language_code,
            language_name: language_name,
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//put
bookLanguagesRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let language_name = req.body.language_name;
        let language_code = req.body.language_code;
        yield models_1.book_language.update({
            language_code: language_code,
            language_name: language_name,
        }, { where: { language_id: req.params.id } });
        let data = yield models_1.book_language.findByPk(req.params.id);
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//delete
bookLanguagesRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objauthor = yield models_1.book_language.destroy({ where: { language_id: req.params.id } });
        if (objauthor) {
            return res.json({ status: true, data: "success" });
        }
        else {
            return res.json({ status: false, data: "fail or not found" });
        }
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
