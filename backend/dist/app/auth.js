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
exports.saveSession = exports.getUser = exports.saveRefreshToken = exports.saveAccessToken = exports.grantTypeAllowed = exports.getRefreshToken = exports.getClient = exports.getAccessToken = void 0;
const models_1 = require("../models");
function getAccessToken(bearerToken, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var token = yield models_1.oauth_access_tokens.findOne({
            where: { access_token: bearerToken },
        });
        if (token) {
            callback(null, {
                accessToken: token.access_token,
                clientId: token.client_id,
                expires: token.expires,
                userId: token.user_id,
            });
        }
        else {
            callback("Invalid Token");
        }
    });
}
exports.getAccessToken = getAccessToken;
function getClient(clientId, clientSecret, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var client = yield models_1.oauth_clients.findOne({ where: { client_id: clientId } });
        if (client) {
            if (client.client_secret == clientSecret) {
                callback(null, {
                    clientId: client.id,
                    clientSecret: client.client_secret,
                });
            }
        }
        else {
            callback("Invalid Client Key");
        }
    });
}
exports.getClient = getClient;
function getRefreshToken(bearerToken, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var result = yield models_1.oauth_refresh_tokens.findOne({
            where: { refresh_token: bearerToken },
        });
        if (result) {
            callback(null, result);
        }
        callback("Invalid Refresh Token");
    });
}
exports.getRefreshToken = getRefreshToken;
function grantTypeAllowed(clientId, grantType, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var grant = yield models_1.oauth_clients.findOne({
            where: { client_id: clientId, grant_types: grantType },
        });
        if (grant) {
            callback(false, true);
        }
        else {
            callback(false, false);
        }
    });
}
exports.grantTypeAllowed = grantTypeAllowed;
function saveAccessToken(accessToken, clientId, expires, userId, sessionId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let at = yield models_1.oauth_access_tokens.create({
                access_token: accessToken,
                client_id: clientId.clientId,
                user_id: userId.id,
                expires: expires,
            });
            if (at) {
                callback(null);
            }
            else {
                callback("Can not insert data to access token");
            }
        }
        catch (e) {
            console.log(e);
            callback("Can not insert data to access token");
        }
    });
}
exports.saveAccessToken = saveAccessToken;
function saveRefreshToken(refreshToken, clientId, expires, userId, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let rf = yield models_1.oauth_refresh_tokens.create({
                refresh_token: refreshToken,
                client_id: clientId,
                expires: expires,
                user_id: userId,
            });
            if (rf) {
                callback(null);
            }
            else {
                callback("Can not insert data to access token");
            }
        }
        catch (e) {
            callback("Can not insert data to access token");
        }
    });
}
exports.saveRefreshToken = saveRefreshToken;
/*
 * Required to support password grant type
 */
function getUser(username, password, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const bcrypt = require('bcryptjs');
        let user = yield models_1.users.findOne({
            where: { username: username },
        });
        if (user) {
            const isSame = yield bcrypt.compare(password, user.password);
            if (isSame) {
                callback(null, user);
            }
            else {
                callback("Invalid Password", false);
            }
        }
        else {
            callback("NOT FOUND", false);
        }
    });
}
exports.getUser = getUser;
function saveSession(req, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        callback(null, 1);
    });
}
exports.saveSession = saveSession;
