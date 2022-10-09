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
exports.publishersRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const publishersRouter = (0, express_1.Router)();
exports.publishersRouter = publishersRouter;
//get
publishersRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield models_1.publisher.findAll();
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//post
publishersRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let publisher_name = req.body.publisher_name;
        let data = yield models_1.publisher.create({
            publisher_name: publisher_name,
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//put
publishersRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let publisher_name = req.body.publisher_name;
        yield models_1.publisher.update({
            publisher_name: publisher_name,
        }, { where: { publisher_id: req.params.id } });
        let data = yield models_1.publisher.findByPk(req.params.id);
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//delete
publishersRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objpublisher = yield models_1.publisher.destroy({ where: { publisher_id: req.params.id } });
        if (objpublisher) {
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
