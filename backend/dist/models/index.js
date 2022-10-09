"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
const author_1 = require("./author");
const book_1 = require("./book");
const book_author_1 = require("./book_author");
const book_language_1 = require("./book_language");
const borrow_1 = require("./borrow");
const oauth_access_tokens_1 = require("./oauth_access_tokens");
const oauth_authorization_codes_1 = require("./oauth_authorization_codes");
const oauth_clients_1 = require("./oauth_clients");
const oauth_refresh_tokens_1 = require("./oauth_refresh_tokens");
const oauth_scopes_1 = require("./oauth_scopes");
const publisher_1 = require("./publisher");
const users_1 = require("./users");
sequelize_1.my_sequelize.addModels([
    author_1.author,
    book_1.book,
    book_author_1.book_author,
    book_language_1.book_language,
    borrow_1.borrow,
    oauth_access_tokens_1.oauth_access_tokens,
    oauth_authorization_codes_1.oauth_authorization_codes,
    oauth_clients_1.oauth_clients,
    oauth_refresh_tokens_1.oauth_refresh_tokens,
    oauth_scopes_1.oauth_scopes,
    publisher_1.publisher,
    users_1.users,
]);
__exportStar(require("./author"), exports);
__exportStar(require("./book"), exports);
__exportStar(require("./book_author"), exports);
__exportStar(require("./book_language"), exports);
__exportStar(require("./borrow"), exports);
__exportStar(require("./oauth_access_tokens"), exports);
__exportStar(require("./oauth_authorization_codes"), exports);
__exportStar(require("./oauth_clients"), exports);
__exportStar(require("./oauth_refresh_tokens"), exports);
__exportStar(require("./oauth_scopes"), exports);
__exportStar(require("./publisher"), exports);
__exportStar(require("./users"), exports);
