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
exports.authorRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const authorRouter = (0, express_1.Router)();
exports.authorRouter = authorRouter;
//get
authorRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mydata = yield models_1.author.findAll();
        res.json({ status: true, data: mydata });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//post
authorRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author_name = req.body.author_name;
        let data = yield models_1.author.create({
            author_name: author_name,
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//put
authorRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author_name = req.body.author_name;
        yield models_1.author.update({
            author_name: author_name,
        }, { where: { author_id: req.params.id } });
        let data = yield models_1.author.findByPk(req.params.id);
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//delete
authorRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objauthor = yield models_1.author.destroy({ where: { author_id: req.params.id } });
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
