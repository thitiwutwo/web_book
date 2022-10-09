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
exports.borrowRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const models_2 = require("../../models");
const borrowRouter = (0, express_1.Router)();
exports.borrowRouter = borrowRouter;
//get
borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield models_1.borrow.findAll();
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
borrowRouter.get("/book_not_return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield models_1.borrow.findAll({
            where: { is_return: 0 }
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
borrowRouter.get("/boom_return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let data = yield models_1.borrow.findAll({
            where: { is_return: 1 }
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
borrowRouter.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user_id = req.params.id;
        let data = yield models_1.borrow.findAll({
            where: { user_id: user_id }
        });
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//post
borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book_id = req.body.book_id;
        let user_id = req.body.user_id;
        let check_borrow = yield models_2.book.findOne({ where: { book_id: book_id, borrowed: 0 } });
        if (check_borrow) {
            let date_now = new Date();
            let date_borrow = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now.getDate();
            let data = yield models_1.borrow.create({
                book_id: parseInt(book_id),
                user_id: parseInt(user_id),
                date_borrow: date_borrow
            });
            let bookUpdate = yield models_2.book.update({
                borrowed: 1
            }, { where: { book_id: req.body.book_id } });
            res.json({ status: true, data: data, bookUpdate });
        }
        else {
            res.status(201).json({ status: false, data: "already borrowed" });
        }
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//put
borrowRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book_id = req.body.book_id;
        let user_id = req.body.user_id;
        yield models_1.borrow.update({
            book_id: parseInt(book_id),
            user_id: parseInt(user_id),
        }, { where: { borrow_id: req.params.id } });
        let data = yield models_1.borrow.findByPk(req.params.id);
        res.json({ status: true, data: data });
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
borrowRouter.put("/return/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book_id = req.body.book_id;
        let check_borrow = yield models_2.book.findOne({ where: { book_id: book_id, borrowed: 1 } });
        if (check_borrow) {
            let date_now = new Date();
            let date_return = date_now.getFullYear() + "-" + (date_now.getMonth() + 1) + "-" + date_now.getDate();
            yield models_1.borrow.update({
                is_return: 1,
                date_return: date_return,
            }, { where: { borrow_id: req.params.id } });
            let bookUpdate = yield models_2.book.update({
                borrowed: 0
            }, { where: { book_id: req.body.book_id } });
            let data = yield models_1.borrow.findByPk(req.params.id);
            res.json({ status: true, data: data, bookUpdate });
        }
        else {
            res.json({ status: false, data: "didn't borrow" });
        }
    }
    catch (e) {
        res.json({ status: false, data: "error", errorDetail: e.toString() });
    }
}));
//delete
borrowRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let objborrow = yield models_1.borrow.destroy({ where: { borrow_id: req.params.id } });
        if (objborrow) {
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
