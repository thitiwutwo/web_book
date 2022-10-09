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
exports.returningRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const models_2 = require("../../models");
const returningRouter = (0, express_1.Router)();
exports.returningRouter = returningRouter;
//get
returningRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let mydata = yield models_1.returning.findAll();
        res.json({ status: true, data: mydata });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//post
returningRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book_id = req.body.book_id;
        let user_id = req.body.user_id;
        let check_returning = yield models_2.book.findOne({ where: { book_id: book_id, borrowed: 1 } });
        if (check_returning) {
            let date_now = new Date();
            let date = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now.getDate();
            let data = yield models_1.returning.create({
                book_id: parseInt(book_id),
                user_id: parseInt(user_id),
                date: date
            });
            let bookUpdate = yield models_2.book.update({
                borrowed: 0
            }, { where: { book_id: req.body.book_id } });
            res.json({ status: true, data: data, bookUpdate });
        }
        else {
            res.json({ status: true, data: "didn't borrowed" });
        }
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//put
returningRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book_id = req.body.book_id;
        let user_id = req.body.user_id;
        yield models_1.returning.update({
            book_id: parseInt(book_id),
            user_id: parseInt(user_id),
        }, { where: { returning_id: req.params.id } });
        let data = yield models_1.returning.findByPk(req.params.id);
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//delete
returningRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objreturning = yield models_1.returning.destroy({ where: { returning_id: req.params.id } });
        if (objreturning) {
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
