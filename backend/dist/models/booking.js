"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrow = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let borrow = class borrow extends sequelize_typescript_1.Model {
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
], borrow.prototype, "borrow_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.INTEGER
    })
], borrow.prototype, "book_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.INTEGER
    })
], borrow.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.STRING(500)
    })
], borrow.prototype, "date", void 0);
borrow = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "borrow",
        timestamps: false
    })
], borrow);
exports.borrow = borrow;
