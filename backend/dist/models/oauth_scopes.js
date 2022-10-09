"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth_scopes = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let oauth_scopes = class oauth_scopes extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_typescript_1.DataType.INTEGER
    }),
    (0, sequelize_typescript_1.Index)({
        name: "id",
        using: "BTREE",
        order: "ASC",
        unique: true
    }),
    (0, sequelize_typescript_1.Index)({
        name: "oauth_scopes_id_unique",
        using: "BTREE",
        order: "ASC",
        unique: true
    }),
    (0, sequelize_typescript_1.Index)({
        name: "PRIMARY",
        using: "BTREE",
        order: "ASC",
        unique: true
    })
], oauth_scopes.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.STRING(80)
    })
], oauth_scopes.prototype, "scope", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        allowNull: true,
        type: sequelize_typescript_1.DataType.TINYINT
    })
], oauth_scopes.prototype, "is_default", void 0);
oauth_scopes = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "oauth_scopes",
        timestamps: false
    })
], oauth_scopes);
exports.oauth_scopes = oauth_scopes;
