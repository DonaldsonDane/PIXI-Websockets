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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var signalR = require("@microsoft/signalr");
require("./css/main.css");
var pixi_js_1 = require("pixi.js");
var ui_1 = require("@pixi/ui");
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this._app = new pixi_js_1.Application();
        this._sendButton = new ui_1.Button(new pixi_js_1.Graphics().fill(0xBBAFFC).rect(50, 50, 100, 50).fill());
        this._messageDisplay = new pixi_js_1.Graphics().fill(0xff0000).rect(0, 0, 500, 500).fill();
        this._userName = "Dane Donaldson";
        this._connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();
        this._connection.on("messageReceived", function (username, message) {
            console.log("".concat(username, " has sent the message: ").concat(message));
            var messageText = new pixi_js_1.Text({
                text: message,
                style: {
                    fontFamily: 'short-stack',
                }
            });
            messageText.localColor = 0xbbcaaf;
            _this._messageDisplay.addChild(messageText);
        });
        this._sendButton.onPress.connect(function () {
            _this.SendMessage();
        });
        this._connection.start().then(function () {
            console.log("SignalR connection established");
        }).catch(function (err) {
            console.error("Error establishing SignalR connection: ", err);
        });
    }
    Game.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._app.init({
                            background: '#1099bb',
                            resizeTo: window
                        })];
                    case 1:
                        _a.sent();
                        this._app.stage.interactive = true;
                        this._app.stage.addChild(this._messageDisplay);
                        this._app.stage.addChild(this._sendButton.view);
                        document.body.appendChild(this._app.canvas);
                        return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.SendMessage = function () {
        this._defaultMessage = "Sausages";
        this._connection.send("newMessage", this._userName, this._defaultMessage).then(function () {
            console.log("Message sent");
        }).catch(function (err) {
            console.error("Error sending message: ", err);
        });
    };
    Game.GetInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
exports.Game = Game;
var game = Game.GetInstance();
game.init();
