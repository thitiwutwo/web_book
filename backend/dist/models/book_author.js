"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_author = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let book_author = class book_author extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    (0, sequelize_typescript_1.Index)({
        name: "PRIMARY",
        using: "BTREE",
        order: "ASC",
        unique: true
    })
], book_author.prototype, "book_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    (0, sequelize_typescript_1.Index)({
        name: "fk_ba_author",
        using: "BTREE",
        order: "ASC",
        unique: false
    }),
    (0, sequelize_typescript_1.Index)({
        name: "PRIMARY",
        using: "BTREE",
        order: "ASC",
        unique: true
    })
], book_author.prototype, "author_id", void 0);
book_author = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "book_author",
        timestamps: false
    })
], book_author);
exports.book_author = book_author;
