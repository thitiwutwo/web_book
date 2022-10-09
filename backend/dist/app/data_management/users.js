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
exports.usersRouter = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
//get
usersRouter.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.users.findAll();
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
usersRouter.get('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield models_1.users.findOne({
                where: { id: req.params.id }
            });
            return res.json({ status: true, data: value });
        }
        catch (e) {
            return res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
//post
usersRouter.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let username = req.body.username;
            let password = req.body.password;
            let scope = 'profile';
            let name = req.body.name;
            let role_id = "1";
            let user = yield models_1.users.findOne({
                where: { username: username }
            });
            if (user) {
                return res.json({ status: false, data: "username already used" });
            }
            else {
                const bcrypt = require('bcryptjs');
                const salt = yield bcrypt.genSalt(10);
                const hash = yield bcrypt.hash(password, salt);
                let obj_user = yield models_1.users.create({
                    username: username,
                    password: hash,
                    scope: scope,
                    name: name,
                    role_id: parseInt(role_id),
                });
                return res.json({ status: true, data: obj_user });
            }
        }
        catch (e) {
            res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
//put
usersRouter.put('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let name = req.body.name;
            yield models_1.users.update({
                name: name,
            }, { where: { id: req.params.id } });
            let user = yield models_1.users.findByPk(req.params.id);
            return res.json({ status: true, data: user });
        }
        catch (e) {
            res.json({ status: false, data: "error", errorDetail: e.toString() });
        }
    });
});
//delete
usersRouter.delete('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let objuser = yield models_1.users.destroy({
                where: { id: req.params.id }
            });
            if (objuser) {
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
