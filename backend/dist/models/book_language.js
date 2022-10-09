"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.book_language = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let book_language = class book_language extends sequelize_typescript_1.Model {
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
], book_language.prototype, "language_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.STRING(8)
    })
], book_language.prototype, "language_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.STRING(50)
    })
], book_language.prototype, "language_name", void 0);
book_language = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "book_language",
        timestamps: false
    })
], book_language);
exports.book_language = book_language;
