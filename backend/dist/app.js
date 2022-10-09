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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = require("./app/data_management/books");
const book_languages_1 = require("./app/data_management/book_languages");
const publishers_1 = require("./app/data_management/publishers");
const users_1 = require("./app/data_management/users");
const author_1 = require("./app/data_management/author");
const borrow_1 = require("./app/data_management/borrow");
const auth_1 = require("./app/auth");
const models_1 = require("./models");
var oauthserver = require("@shoppredigital/oauth2-server");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// add oauth 2.0
app.oauth = oauthserver({
    model: {
        getAccessToken: auth_1.getAccessToken,
        getClient: auth_1.getClient,
        getRefreshToken: auth_1.getRefreshToken,
        grantTypeAllowed: auth_1.grantTypeAllowed,
        saveAccessToken: auth_1.saveAccessToken,
        saveRefreshToken: auth_1.saveRefreshToken,
        getUser: auth_1.getUser,
        saveSession: auth_1.saveSession,
    },
    grants: ["password"],
    debug: true,
});
app.all("/oauth/login", app.oauth.grant());
app.get("/me", app.oauth.authorise(), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield models_1.users.findByPk(req.user.id);
        res.json({ status: true, data: user });
    });
});
app.get("/", function (req, res) {
    res.send("<h1>Hello World!! - My API</h1>");
});
app.use("/data/books", books_1.booksRouter);
app.use("/data/book_languages", book_languages_1.bookLanguagesRouter);
app.use("/data/publishers", publishers_1.publishersRouter);
app.use("/data/users", users_1.usersRouter);
app.use("/data/author", author_1.authorRouter);
app.use("/data/borrow", borrow_1.borrowRouter);
app.use(app.oauth.errorHandler());
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});
