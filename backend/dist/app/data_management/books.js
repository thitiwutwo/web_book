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
exports.booksRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const models_2 = require("../../models");
const models_3 = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const booksRouter = (0, express_1.Router)();
exports.booksRouter = booksRouter;
let multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/public/image/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            cb(new Error('Please upload an image.'));
        }
        cb(undefined, true);
    }
});
let upload = multer({ storage: storage });
// get
booksRouter.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                limit: 10,
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/getByLang/:lang", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                where: {
                    language_id: req.params.lang,
                },
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/get/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findOne({
                where: {
                    book_id: req.params.id,
                },
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/getAll", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll();
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/getAll/:start", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                offset: parseInt(req.params.start),
                limit: 10,
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/getAll/:start/:max", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                offset: parseInt(req.params.start),
                limit: parseInt(req.params.max) || 10,
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/search", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let keyword = req.body.keyword;
            let value = yield models_1.book.findAll({
                where: { title: { [Op.like]: keyword + '%' } },
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/book_author", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            models_1.book.hasMany(models_2.book_author, { foreignKey: 'book_id' });
            models_2.book_author.belongsTo(models_1.book, { foreignKey: 'book_id' });
            models_3.author.hasMany(models_2.book_author, { foreignKey: 'author_id' });
            models_2.book_author.belongsTo(models_3.author, { foreignKey: 'author_id' });
            let value = yield models_2.book_author.findAll({
                include: [
                    { model: models_1.book },
                    { model: models_3.author }
                ]
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/borrow", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                where: { borrowed: 1 }
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
booksRouter.get("/not_borrow", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.book.findAll({
                where: { borrowed: 0 }
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({
                status: false,
                data: "error",
                errorDetail: e.toString(),
            });
        }
    });
});
// post
// booksRouter.post("/upload_img",upload.single('book_img'),async function (req, res){
//     let book_img: string = req.file.filename;
//     return res.json({ status: true, data: book_img});
// })
booksRouter.post("/", upload.single('book_img'), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let title = req.body.title;
            let isbn13 = req.body.isbn13;
            let language_id = req.body.language_id;
            let num_pages = req.body.num_pages;
            let publication_date = req.body.publication_date;
            let publisher_id = req.body.publisher_id;
            let book_img = req.file.filename;
            let borrowed = "0";
            let author_id = req.body.author_id;
            let objbook = yield models_1.book.create({
                title: title,
                isbn13: isbn13,
                language_id: parseInt(language_id),
                num_pages: parseInt(num_pages),
                publication_date: publication_date,
                publisher_id: parseInt(publisher_id),
                book_img: book_img,
                borrowed: parseInt(borrowed)
            });
            let author = yield models_2.book_author.create({
                book_id: objbook.book_id,
                author_id: author_id,
            });
            return res.json({ status: true, data: objbook, author });
        }
        catch (e) {
            return res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
// put or update
booksRouter.put("/:id", upload.single('book_img'), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let title = req.body.title;
            let isbn13 = req.body.isbn13;
            let language_id = req.body.language_id;
            let num_pages = req.body.num_pages;
            let publication_date = req.body.publication_date;
            let publisher_id = req.body.publisher_id;
            let book_img = req.file.filename;
            let borrowed = "0";
            yield models_1.book.update({
                title: title,
                isbn13: isbn13,
                language_id: parseInt(language_id),
                num_pages: parseInt(num_pages),
                publication_date: publication_date,
                publisher_id: parseInt(publisher_id),
                book_img: book_img,
                borrowed: parseInt(borrowed)
            }, { where: { book_id: req.params.id } });
            let mybook = yield models_1.book.findByPk(req.params.id);
            return res.json({ status: true, data: mybook });
        }
        catch (e) {
            res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
// delete
booksRouter.delete("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objbook = yield models_1.book.destroy({ where: { book_id: req.body.id } });
            if (objbook) {
                return res.json({ status: true, data: "success" });
            }
            else {
                return res.json({ status: false, data: "fail or not found" });
            }
        }
        catch (e) {
            res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
