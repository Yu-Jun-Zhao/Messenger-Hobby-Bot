/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/app.js":
/*!**********************!*\
  !*** ./build/app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst restify = __webpack_require__(/*! restify */ \"restify\");\r\nconst dotenv_1 = __webpack_require__(/*! dotenv */ \"dotenv\");\r\nconst botbuilder_1 = __webpack_require__(/*! botbuilder */ \"botbuilder\");\r\nconst botbuilder_azure_1 = __webpack_require__(/*! botbuilder-azure */ \"botbuilder-azure\");\r\nconst hobbyBot_1 = __webpack_require__(/*! ./dialogs/hobbyBot */ \"./build/dialogs/hobbyBot.js\");\r\nconst MainDialog_1 = __webpack_require__(/*! ./dialogs/MainDialog */ \"./build/dialogs/MainDialog.js\");\r\ndotenv_1.config();\r\nconst adapter = new botbuilder_1.BotFrameworkAdapter({\r\n    appId: process.env.MicrosoftAppId,\r\n    appPassword: process.env.MicrosoftAppPassword\r\n});\r\nadapter.onTurnError = (context, error) => __awaiter(this, void 0, void 0, function* () {\r\n    console.error(`\\n [onTurnError]: ${error}`);\r\n    yield context.sendActivity(\"Oops something went wrong\");\r\n    yield conversationState.delete(context);\r\n});\r\nconst blobStorage = new botbuilder_azure_1.BlobStorage({\r\n    containerName: process.env.CONTAINER,\r\n    storageAccountOrConnectionString: process.env.STORAGENAME\r\n});\r\nconst conversationState = new botbuilder_1.ConversationState(blobStorage);\r\nconst userState = new botbuilder_1.UserState(blobStorage);\r\nconst NAME = \"Clover\";\r\nconst mainDialog = new MainDialog_1.default(NAME);\r\nconst bot = new hobbyBot_1.default(NAME, conversationState, userState, mainDialog);\r\nlet server = restify.createServer();\r\nserver.listen(process.env.port || process.env.PORT || 3978, () => {\r\n    console.log(`${server.name} listening on ${server.url}`);\r\n});\r\nserver.post(\"/api/messages\", (req, res) => {\r\n    adapter.processActivity(req, res, (turnContext) => __awaiter(this, void 0, void 0, function* () {\r\n        yield bot.run(turnContext);\r\n    }));\r\n});\r\n//# sourceMappingURL=app.js.map\n\n//# sourceURL=webpack:///./build/app.js?");

/***/ }),

/***/ "./build/dialogs/MainDialog.js":
/*!*************************************!*\
  !*** ./build/dialogs/MainDialog.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nconst regularDialog_1 = __webpack_require__(/*! ./regularDialog */ \"./build/dialogs/regularDialog.js\");\r\nconst NEW_WATERFALL_DIALOG = \"newWaterFallDialog\";\r\nconst CONTINUE_WATERFALL_DIALOG = \"continueWaterFallDialog\";\r\nconst REGULAR_DIALOG = \"regularDialog\";\r\nconst CONVERSATION_TEXT = \"conversationText\";\r\nclass MainDialog extends botbuilder_dialogs_1.ComponentDialog {\r\n    constructor(botName) {\r\n        super(\"MainDialog\");\r\n        this._botName = botName;\r\n        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(NEW_WATERFALL_DIALOG, [\r\n            this.introStep.bind(this),\r\n            this.actStep.bind(this),\r\n            this.finalStep.bind(this)\r\n        ]))\r\n            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(CONTINUE_WATERFALL_DIALOG, [this.actStep, this.finalStep]))\r\n            .addDialog(new botbuilder_dialogs_1.TextPrompt(CONVERSATION_TEXT))\r\n            .addDialog(new regularDialog_1.default(REGULAR_DIALOG));\r\n        this.initialDialogId = NEW_WATERFALL_DIALOG;\r\n    }\r\n    run(turnContext, accessor) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const conversationData = yield accessor.get(turnContext, { conversationData: false });\r\n            if (conversationData.continueConversation) {\r\n                this.initialDialogId = CONTINUE_WATERFALL_DIALOG;\r\n            }\r\n            const dialogSet = new botbuilder_dialogs_1.DialogSet(accessor);\r\n            console.log(accessor);\r\n            dialogSet.add(this);\r\n            const dialogContext = yield dialogSet.createContext(turnContext);\r\n            const result = yield dialogContext.continueDialog();\r\n            if (result.status === botbuilder_dialogs_1.DialogTurnStatus.empty) {\r\n                conversationData.continueConversation = true;\r\n                yield dialogContext.beginDialog(this.id);\r\n            }\r\n        });\r\n    }\r\n    introStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (!process.env.LuisAppId || !process.env.LuisAPIKey || !process.env.LuisAPIHostName) {\r\n                yield stepContext.context.sendActivity(\"NOTE: LUIS is not configured. To enable all capabilities, add `LuisAppId`, `LuisAPIKey` and `LuisAPIHostName` to the .env file.\");\r\n                return yield stepContext.next();\r\n            }\r\n            yield stepContext.context.sendActivity(`My name is ${this._botName}. I am pleased to serve you.`);\r\n            return yield stepContext.prompt(CONVERSATION_TEXT, {\r\n                prompt: `What can I help you with? Ask for help if you don't know what I can do.`\r\n            });\r\n        });\r\n    }\r\n    actStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield stepContext.beginDialog(REGULAR_DIALOG);\r\n        });\r\n    }\r\n    finalStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield stepContext.endDialog();\r\n        });\r\n    }\r\n}\r\nexports.default = MainDialog;\r\n//# sourceMappingURL=MainDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/MainDialog.js?");

/***/ }),

/***/ "./build/dialogs/cancelAndHelpDialog.js":
/*!**********************************************!*\
  !*** ./build/dialogs/cancelAndHelpDialog.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nclass CancelAndHelpDialog extends botbuilder_dialogs_1.ComponentDialog {\r\n    onBeginDialog(innerDialogContext, options) {\r\n        const _super = Object.create(null, {\r\n            onBeginDialog: { get: () => super.onBeginDialog }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.interrupt(innerDialogContext);\r\n            if (result) {\r\n                return result;\r\n            }\r\n            return _super.onBeginDialog.call(this, innerDialogContext, options);\r\n        });\r\n    }\r\n    onContinueDialog(innerDialogContext) {\r\n        const _super = Object.create(null, {\r\n            onContinueDialog: { get: () => super.onContinueDialog }\r\n        });\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const result = yield this.interrupt(innerDialogContext);\r\n            if (result) {\r\n                return result;\r\n            }\r\n            return _super.onContinueDialog.call(this, innerDialogContext);\r\n        });\r\n    }\r\n    interrupt(innerDialogContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const text = innerDialogContext.context.activity.text.toLowerCase();\r\n            switch (text) {\r\n                case \"menu\":\r\n                case \"?\":\r\n                    yield innerDialogContext.context.sendActivity(\"You could \\n1. Weather Forecast. Ask me: What is the weather?\\n2. Find video on Youtube. Ask me: Find me TITLE on youtube.\\n3. Type quit to quit.\");\r\n                    return yield innerDialogContext.cancelAllDialogs();\r\n                case \"cancel\":\r\n                case \"quit\":\r\n                    yield innerDialogContext.context.sendActivity(\"Cancelling\");\r\n                    return yield innerDialogContext.cancelAllDialogs();\r\n            }\r\n        });\r\n    }\r\n}\r\nexports.default = CancelAndHelpDialog;\r\n//# sourceMappingURL=cancelAndHelpDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/cancelAndHelpDialog.js?");

/***/ }),

/***/ "./build/dialogs/dateResolverDialog.js":
/*!*********************************************!*\
  !*** ./build/dialogs/dateResolverDialog.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cancelAndHelpDialog_1 = __webpack_require__(/*! ./cancelAndHelpDialog */ \"./build/dialogs/cancelAndHelpDialog.js\");\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nconst moment = __webpack_require__(/*! moment */ \"moment\");\r\nconst momentTimezone = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\r\nconst WATERFALL_DIALOG = \"waterFallDialog\";\r\nconst CHOICE_PROMPT = \"choicePrompt\";\r\nclass DateResolverDialog extends cancelAndHelpDialog_1.default {\r\n    constructor(id) {\r\n        super(id || \"dateResolverDialog\");\r\n        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.initialStep.bind(this), this.finalStep.bind(this)])).addDialog(new botbuilder_dialogs_1.ChoicePrompt(CHOICE_PROMPT));\r\n        this.initialDialogId = WATERFALL_DIALOG;\r\n    }\r\n    initialStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const options = stepContext.options;\r\n            const date = options.date;\r\n            const promptMsg = \"Choose a date. I can forecast up to 5 days.\";\r\n            const repromptMsg = \"For best result, please choose an option.\";\r\n            const now = moment(momentTimezone().tz(\"America/Los_Angeles\"));\r\n            const dateChoice = [\r\n                now.format(\"ddd YYYY-MM-DD\"),\r\n                now.add({ days: 1 }).format(\"ddd YYYY-MM-DD\"),\r\n                now.add({ days: 1 }).format(\"ddd YYYY-MM-DD\"),\r\n                now.add({ days: 1 }).format(\"ddd YYYY-MM-DD\"),\r\n                now.add({ days: 1 }).format(\"ddd YYYY-MM-DD\"),\r\n                now.add({ days: 1 }).format(\"ddd YYYY-MM-DD\")\r\n            ];\r\n            if (!date) {\r\n                return yield stepContext.prompt(CHOICE_PROMPT, {\r\n                    prompt: promptMsg,\r\n                    retryPrompt: repromptMsg,\r\n                    choices: dateChoice\r\n                });\r\n            }\r\n        });\r\n    }\r\n    finalStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const pdt = moment(stepContext.result.value, \"ddd YYYY-MM-DD\").format(\"YYYY-MM-DD\");\r\n            const utc = pdt;\r\n            const currentDay = pdt === moment(momentTimezone().tz(\"America/Los_Angeles\")).format(\"YYYY-MM-DD\");\r\n            const dateData = {\r\n                pdt,\r\n                utc,\r\n                currentDay\r\n            };\r\n            return yield stepContext.endDialog(dateData);\r\n        });\r\n    }\r\n}\r\nexports.default = DateResolverDialog;\r\n//# sourceMappingURL=dateResolverDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/dateResolverDialog.js?");

/***/ }),

/***/ "./build/dialogs/findDialog.js":
/*!*************************************!*\
  !*** ./build/dialogs/findDialog.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cancelAndHelpDialog_1 = __webpack_require__(/*! ./cancelAndHelpDialog */ \"./build/dialogs/cancelAndHelpDialog.js\");\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nconst youtubeDataHelper_1 = __webpack_require__(/*! ../helpers/youtubeDataHelper */ \"./build/helpers/youtubeDataHelper.js\");\r\nconst cardHelper_1 = __webpack_require__(/*! ../helpers/cardHelper */ \"./build/helpers/cardHelper.js\");\r\nconst FIND_WATERFALL = \"findWaterfall\";\r\nconst TEXT_PROMPT = \"textPrompt\";\r\nconst CHOOSE_PROMPT = \"choosePrompt\";\r\nconst START_VIDEO_WATERFALL = \"startVideoWaterfall\";\r\nconst FIND_VIDEO_WATERFALL = \"findVideoWaterfall\";\r\nconst NUMBER_PROMPT = \"numberPrompt\";\r\nclass FindDialog extends cancelAndHelpDialog_1.default {\r\n    constructor(id) {\r\n        super(id || \"FindDialog\");\r\n        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(FIND_WATERFALL, [\r\n            this.choiceStep.bind(this),\r\n            this.nameStep.bind(this),\r\n            this.splitStep.bind(this)\r\n        ]))\r\n            .addDialog(new botbuilder_dialogs_1.ChoicePrompt(CHOOSE_PROMPT))\r\n            .addDialog(new FindVideoDialog(START_VIDEO_WATERFALL))\r\n            .addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT));\r\n        this.initialDialogId = FIND_WATERFALL;\r\n    }\r\n    choiceStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const youtubeData = stepContext.options;\r\n            if (!youtubeData.itemType && !youtubeData.platform) {\r\n                return yield stepContext.prompt(CHOOSE_PROMPT, {\r\n                    prompt: \"video or products(Not supported yet)?\",\r\n                    choices: [\"video\", \"product\"]\r\n                });\r\n            }\r\n            return yield stepContext.next({ value: youtubeData.itemType });\r\n        });\r\n    }\r\n    nameStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const youtubeData = stepContext.options;\r\n            youtubeData.itemType = stepContext.result.value;\r\n            if (!youtubeData.name) {\r\n                return yield stepContext.prompt(TEXT_PROMPT, {\r\n                    prompt: `What is the name?`\r\n                });\r\n            }\r\n            return yield stepContext.next(youtubeData.name);\r\n        });\r\n    }\r\n    splitStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const youtubeData = stepContext.options;\r\n            youtubeData.name = stepContext.result;\r\n            if (youtubeData.platform === \"youtube\") {\r\n                return yield stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);\r\n            }\r\n            else if (youtubeData.platform === \"amazon\") {\r\n            }\r\n            if (youtubeData.itemType === \"video\") {\r\n                return yield stepContext.beginDialog(START_VIDEO_WATERFALL, stepContext.options);\r\n            }\r\n            else if (youtubeData.itemType === \"product\") {\r\n            }\r\n            return yield stepContext.endDialog();\r\n        });\r\n    }\r\n}\r\nexports.FindDialog = FindDialog;\r\nclass FindVideoDialog extends cancelAndHelpDialog_1.default {\r\n    constructor(id) {\r\n        super(id || \"findVideoDialog\");\r\n        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(FIND_VIDEO_WATERFALL, [this.numberStep.bind(this), this.apiStep.bind(this)])).addDialog(new botbuilder_dialogs_1.NumberPrompt(NUMBER_PROMPT, this.resultsPromptValidator.bind(this)));\r\n        this.initialDialogId = FIND_VIDEO_WATERFALL;\r\n    }\r\n    numberStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield stepContext.prompt(NUMBER_PROMPT, {\r\n                prompt: \"How many videos do you want? Max:10\"\r\n            });\r\n        });\r\n    }\r\n    apiStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const youtubeData = stepContext.options;\r\n            youtubeData.max = stepContext.result;\r\n            const youtubeApiRes = yield youtubeDataHelper_1.default.query(youtubeData);\r\n            const attachmentsCards = youtubeApiRes.length > 2 ? cardHelper_1.createAdaptiveCards(youtubeApiRes) : cardHelper_1.createAnimationCards(youtubeApiRes);\r\n            yield stepContext.context.sendActivity({\r\n                attachments: attachmentsCards\r\n            });\r\n            return yield stepContext.endDialog();\r\n        });\r\n    }\r\n    resultsPromptValidator(promptContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return promptContext.recognized.value > 0 && promptContext.recognized.value <= 10;\r\n        });\r\n    }\r\n}\r\nexports.FindVideoDialog = FindVideoDialog;\r\n//# sourceMappingURL=findDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/findDialog.js?");

/***/ }),

/***/ "./build/dialogs/hobbyBot.js":
/*!***********************************!*\
  !*** ./build/dialogs/hobbyBot.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_1 = __webpack_require__(/*! botbuilder */ \"botbuilder\");\r\nclass HobbyBot extends botbuilder_1.ActivityHandler {\r\n    constructor(name, conversationState, userState, dialog) {\r\n        super();\r\n        this._name = name;\r\n        this._conversationState = conversationState;\r\n        this._userState = userState;\r\n        this._dialog = dialog;\r\n        this._dialogState = this._conversationState.createProperty(\"DialogState\");\r\n        this.onMessage((turnContext, next) => __awaiter(this, void 0, void 0, function* () {\r\n            console.log(\"Running Dialogs\");\r\n            yield this._dialog.run(turnContext, this._dialogState);\r\n            yield next();\r\n        }));\r\n        this.onDialog((turnContext, next) => __awaiter(this, void 0, void 0, function* () {\r\n            yield this._conversationState.saveChanges(turnContext, false);\r\n            yield next();\r\n        }));\r\n    }\r\n}\r\nexports.default = HobbyBot;\r\n//# sourceMappingURL=hobbyBot.js.map\n\n//# sourceURL=webpack:///./build/dialogs/hobbyBot.js?");

/***/ }),

/***/ "./build/dialogs/regularDialog.js":
/*!****************************************!*\
  !*** ./build/dialogs/regularDialog.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cancelAndHelpDialog_1 = __webpack_require__(/*! ./cancelAndHelpDialog */ \"./build/dialogs/cancelAndHelpDialog.js\");\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nconst qnaHelper_1 = __webpack_require__(/*! ../helpers/qnaHelper */ \"./build/helpers/qnaHelper.js\");\r\nconst luisHelper_1 = __webpack_require__(/*! ../helpers/luisHelper */ \"./build/helpers/luisHelper.js\");\r\nconst searchWeatherDialog_1 = __webpack_require__(/*! ./searchWeatherDialog */ \"./build/dialogs/searchWeatherDialog.js\");\r\nconst findDialog_1 = __webpack_require__(/*! ./findDialog */ \"./build/dialogs/findDialog.js\");\r\nconst WATERFALL_DIALOG = \"waterFallDialog\";\r\nconst TEXT_PROMPT = \"textPrompt\";\r\nconst SEARCH_WEATHER_DIALOG = \"searchWeatherDialog\";\r\nconst FIND_DIALOG = \"findDialog\";\r\nclass RegularDialog extends cancelAndHelpDialog_1.default {\r\n    constructor(id) {\r\n        super(id || \"regularDialog\");\r\n        this._qnaHelper = new qnaHelper_1.default();\r\n        this._luisHelper = new luisHelper_1.default();\r\n        this.addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))\r\n            .addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [this.actStep.bind(this)]))\r\n            .addDialog(new searchWeatherDialog_1.default(SEARCH_WEATHER_DIALOG))\r\n            .addDialog(new findDialog_1.FindDialog(FIND_DIALOG));\r\n        this.initialDialogId = WATERFALL_DIALOG;\r\n    }\r\n    actStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const answers = yield this._qnaHelper.qnaQuery(stepContext.context);\r\n            const qnaScore = answers[0] ? answers[0].score : 0;\r\n            const intentDetail = yield this._luisHelper.executeLuisQuery(stepContext.context);\r\n            const intentScore = intentDetail.score;\r\n            if (intentScore >= qnaScore && intentScore >= 0.7) {\r\n                switch (intentDetail.intent) {\r\n                    case \"SearchWeather\":\r\n                        return yield stepContext.beginDialog(SEARCH_WEATHER_DIALOG, intentDetail.data);\r\n                    case \"Find\":\r\n                        return yield stepContext.beginDialog(FIND_DIALOG, intentDetail.data);\r\n                }\r\n            }\r\n            else if (answers[0]) {\r\n                yield stepContext.context.sendActivity(answers[0].answer);\r\n            }\r\n            else {\r\n                yield stepContext.context.sendActivity(\"Sorry. I do not understand what you just said.\");\r\n            }\r\n            return yield stepContext.endDialog();\r\n        });\r\n    }\r\n}\r\nexports.default = RegularDialog;\r\n//# sourceMappingURL=regularDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/regularDialog.js?");

/***/ }),

/***/ "./build/dialogs/searchWeatherDialog.js":
/*!**********************************************!*\
  !*** ./build/dialogs/searchWeatherDialog.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cancelAndHelpDialog_1 = __webpack_require__(/*! ./cancelAndHelpDialog */ \"./build/dialogs/cancelAndHelpDialog.js\");\r\nconst botbuilder_dialogs_1 = __webpack_require__(/*! botbuilder-dialogs */ \"botbuilder-dialogs\");\r\nconst locationSearch_1 = __webpack_require__(/*! ../helpers/locationSearch */ \"./build/helpers/locationSearch.js\");\r\nconst dateResolverDialog_1 = __webpack_require__(/*! ./dateResolverDialog */ \"./build/dialogs/dateResolverDialog.js\");\r\nconst axios_1 = __webpack_require__(/*! axios */ \"axios\");\r\nconst WATERFALL_DIALOG = \"waterFallDialog\";\r\nconst TEXT_PROMPT = \"textPrompt\";\r\nconst DATE_RESOLVER = \"dateResolver\";\r\nconst UTC_TO_PST_11AM = \"18:00:00\";\r\nclass SearchWeatherDialog extends cancelAndHelpDialog_1.default {\r\n    constructor(id) {\r\n        super(id || \"searchWeatherDialog\");\r\n        this.addDialog(new botbuilder_dialogs_1.WaterfallDialog(WATERFALL_DIALOG, [\r\n            this.cityStep.bind(this),\r\n            this.checkCityStep.bind(this),\r\n            this.countryStep.bind(this),\r\n            this.checkCountryStep.bind(this),\r\n            this.timeStep.bind(this),\r\n            this.apiStep.bind(this)\r\n        ]))\r\n            .addDialog(new botbuilder_dialogs_1.TextPrompt(TEXT_PROMPT))\r\n            .addDialog(new dateResolverDialog_1.default(DATE_RESOLVER));\r\n    }\r\n    cityStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            if (!weatherDetails.city) {\r\n                return yield stepContext.prompt(TEXT_PROMPT, { prompt: \"Please enter the city name.\" });\r\n            }\r\n            return yield stepContext.next(weatherDetails.city);\r\n        });\r\n    }\r\n    checkCityStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            const city = this.capitalizeCityName(stepContext.result);\r\n            let countryCode = locationSearch_1.default.getCountryCode(city);\r\n            if (countryCode === false) {\r\n                return yield stepContext.replaceDialog(WATERFALL_DIALOG, {});\r\n            }\r\n            weatherDetails.city = city;\r\n            return yield stepContext.next(countryCode);\r\n        });\r\n    }\r\n    countryStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            const countryCode = stepContext.result;\r\n            if (countryCode === true) {\r\n                return yield stepContext.prompt(TEXT_PROMPT, {\r\n                    prompt: \"Please specify the country. Enter for example: United States\"\r\n                });\r\n            }\r\n            return yield stepContext.next(countryCode);\r\n        });\r\n    }\r\n    checkCountryStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            const countryCode = locationSearch_1.default.countryNameToCode(stepContext.result);\r\n            if (countryCode === undefined) {\r\n                return yield stepContext.replaceDialog(WATERFALL_DIALOG, {});\r\n            }\r\n            weatherDetails.country = countryCode;\r\n            return yield stepContext.next();\r\n        });\r\n    }\r\n    timeStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            if (!weatherDetails.date) {\r\n                return yield stepContext.beginDialog(DATE_RESOLVER, { date: weatherDetails.date });\r\n            }\r\n            return yield stepContext.next(weatherDetails.date);\r\n        });\r\n    }\r\n    apiStep(stepContext) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const weatherDetails = stepContext.options;\r\n            weatherDetails.date = stepContext.result;\r\n            let weather;\r\n            let temperature;\r\n            try {\r\n                if (weatherDetails.date.currentDay) {\r\n                    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherDetails.city},${weatherDetails.country}&appid=${process.env.weatherAPIKey}`);\r\n                    weather = response.data.weather[0].description;\r\n                    temperature = this.kelvinToFah(response.data.main.temp).toFixed(2);\r\n                }\r\n                else {\r\n                    const response = yield axios_1.default.get(`https://api.openweathermap.org/data/2.5/forecast?q=${weatherDetails.city},${weatherDetails.country}&appid=${process.env.weatherAPIKey}`);\r\n                    const weatherList = response.data.list;\r\n                    const weatherNode = weatherList.find(element => {\r\n                        return element.dt_txt === `${weatherDetails.date.utc} ${UTC_TO_PST_11AM}`;\r\n                    });\r\n                    weather = weatherNode !== undefined ? weatherNode.weather[0].description : \"not available (up to 5 days only).\";\r\n                    temperature = weatherNode !== undefined ? this.kelvinToFah(weatherNode.main.temp).toFixed(2) : \"N/A\";\r\n                }\r\n                yield stepContext.context.sendActivity(`The weather in ${weatherDetails.city}, ${weatherDetails.country} on ${weatherDetails.date.pdt} PDT/PST is ${weather}, ${temperature} degrees fahrenheit.`);\r\n            }\r\n            catch (err) {\r\n                console.log(err);\r\n            }\r\n            return yield stepContext.endDialog();\r\n        });\r\n    }\r\n    capitalizeCityName(city) {\r\n        return city\r\n            .split(\" \")\r\n            .map(city => city.charAt(0).toUpperCase() + city.slice(1))\r\n            .join(\" \");\r\n    }\r\n    kelvinToFah(kel) {\r\n        return (kel - 273.15) * (9 / 5) + 32;\r\n    }\r\n}\r\nexports.default = SearchWeatherDialog;\r\n//# sourceMappingURL=searchWeatherDialog.js.map\n\n//# sourceURL=webpack:///./build/dialogs/searchWeatherDialog.js?");

/***/ }),

/***/ "./build/helpers/cardHelper.js":
/*!*************************************!*\
  !*** ./build/helpers/cardHelper.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_1 = __webpack_require__(/*! botbuilder */ \"botbuilder\");\r\nfunction createAdaptiveCard(youtubeData) {\r\n    const card = botbuilder_1.CardFactory.adaptiveCard({\r\n        type: \"AdaptiveCard\",\r\n        body: [\r\n            {\r\n                type: \"FactSet\",\r\n                facts: [\r\n                    {\r\n                        title: \"Link\",\r\n                        value: youtubeData.link\r\n                    },\r\n                    {\r\n                        title: \"Title\",\r\n                        value: youtubeData.title\r\n                    },\r\n                    {\r\n                        title: \"By\",\r\n                        value: youtubeData.channelTitle\r\n                    },\r\n                    {\r\n                        title: \"length\",\r\n                        value: youtubeData.length\r\n                    }\r\n                ]\r\n            }\r\n        ]\r\n    });\r\n    return card;\r\n}\r\nfunction createAnimationCard(youtubeData) {\r\n    const card = botbuilder_1.CardFactory.animationCard(youtubeData.title, [youtubeData.link]);\r\n    return card;\r\n}\r\nfunction createAdaptiveCards(youtubeDataRes) {\r\n    const attachments = [];\r\n    for (let i = 0; i < youtubeDataRes.length; i++) {\r\n        attachments.push(createAdaptiveCard(youtubeDataRes[i]));\r\n    }\r\n    return attachments;\r\n}\r\nexports.createAdaptiveCards = createAdaptiveCards;\r\nfunction createAnimationCards(youtubeDataRes) {\r\n    const attachments = [];\r\n    for (let i = 0; i < youtubeDataRes.length; i++) {\r\n        attachments.push(createAnimationCard(youtubeDataRes[i]));\r\n    }\r\n    return attachments;\r\n}\r\nexports.createAnimationCards = createAnimationCards;\r\n//# sourceMappingURL=cardHelper.js.map\n\n//# sourceURL=webpack:///./build/helpers/cardHelper.js?");

/***/ }),

/***/ "./build/helpers/locationSearch.js":
/*!*****************************************!*\
  !*** ./build/helpers/locationSearch.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cities = __webpack_require__(/*! all-the-cities */ \"all-the-cities\");\r\nconst country_list_1 = __webpack_require__(/*! country-list */ \"country-list\");\r\nclass LocationSearch {\r\n    static getCitiesInfo(cityName) {\r\n        const cityArray = cities.filter(city => {\r\n            return city.name.match(`^${cityName}$`);\r\n        });\r\n        return cityArray;\r\n    }\r\n    static getCountryCode(cityName) {\r\n        const cityArray = LocationSearch.getCitiesInfo(cityName);\r\n        if (cityArray.length === 1) {\r\n            return cityArray[0].country;\r\n        }\r\n        else if (cityArray.length > 1) {\r\n            return true;\r\n        }\r\n        else {\r\n            return false;\r\n        }\r\n    }\r\n    static countryNameToCode(countryName) {\r\n        const name = country_list_1.getName(countryName);\r\n        if (name === undefined)\r\n            return country_list_1.getCode(countryName);\r\n        return countryName.toUpperCase();\r\n    }\r\n}\r\nexports.default = LocationSearch;\r\n//# sourceMappingURL=locationSearch.js.map\n\n//# sourceURL=webpack:///./build/helpers/locationSearch.js?");

/***/ }),

/***/ "./build/helpers/luisHelper.js":
/*!*************************************!*\
  !*** ./build/helpers/luisHelper.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_ai_1 = __webpack_require__(/*! botbuilder-ai */ \"botbuilder-ai\");\r\nconst moment = __webpack_require__(/*! moment */ \"moment\");\r\nconst momentTimezone = __webpack_require__(/*! moment-timezone */ \"moment-timezone\");\r\nconst MOMENT_ARR_DATE_PARSE = [\"MM-DD-YYYY\", \"YYYY-MM-DD\", \"M-D-YYYY\", \"YYYY-M-D\", \"M-DD-YYYY\", \"YYYY-MM-D\"];\r\nclass LuisHelper {\r\n    constructor() {\r\n        this._luisRecognizer = new botbuilder_ai_1.LuisRecognizer({\r\n            applicationId: process.env.LuisAppId,\r\n            endpointKey: process.env.LuisAPIKey,\r\n            endpoint: `https://${process.env.LuisAPIHostName}`\r\n        });\r\n    }\r\n    executeLuisQuery(context) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const recognizerResult = yield this._luisRecognizer.recognize(context);\r\n            const intent = botbuilder_ai_1.LuisRecognizer.topIntent(recognizerResult, \"None\", 0.7);\r\n            let intentData = {\r\n                intent,\r\n                score: intent !== \"None\" ? recognizerResult.intents[intent].score : 0,\r\n                data: {}\r\n            };\r\n            switch (intentData.intent) {\r\n                case \"SearchWeather\": {\r\n                    const city = LuisHelper.geographyEntity(recognizerResult);\r\n                    const date = LuisHelper.parseDateTimeEntity(recognizerResult);\r\n                    intentData.data = {\r\n                        city,\r\n                        date\r\n                    };\r\n                    break;\r\n                }\r\n                case \"Find\":\r\n                    const name = LuisHelper.parsePatternAny(recognizerResult, \"itemName\");\r\n                    const itemType = LuisHelper.getEntityType(recognizerResult, \"video\", \"product\");\r\n                    const platform = LuisHelper.parseListEntity(recognizerResult, \"platform\");\r\n                    intentData.data = {\r\n                        name,\r\n                        itemType,\r\n                        platform\r\n                    };\r\n                    break;\r\n                case \"Cancel\":\r\n                    break;\r\n            }\r\n            return intentData;\r\n        });\r\n    }\r\n    static getEntityType(recognizerResult, ...entityNames) {\r\n        for (let i = 0; i < entityNames.length; i++) {\r\n            const entity = recognizerResult.entities[entityNames[i]];\r\n            if (entity)\r\n                return entityNames[i];\r\n        }\r\n        return undefined;\r\n    }\r\n    static parsePatternAny(recognizerResult, entityName) {\r\n        const entity = recognizerResult.entities[entityName];\r\n        if (!entity || !entity[0])\r\n            return undefined;\r\n        return entity[0];\r\n    }\r\n    static parseListEntity(recognizerResult, entityName) {\r\n        const entity = recognizerResult.entities[entityName];\r\n        if (!entity || !entity[0])\r\n            return undefined;\r\n        const itemName = entity[0][0];\r\n        return itemName;\r\n    }\r\n    static geographyEntity(recognizerResult) {\r\n        const geoEntity = recognizerResult.entities[\"geographyV2_city\"];\r\n        if (!geoEntity || !geoEntity[0])\r\n            return undefined;\r\n        const nameArr = geoEntity[0].split(\" \");\r\n        const name = nameArr\r\n            .map(element => {\r\n            return element.charAt(0).toUpperCase() + element.slice(1);\r\n        })\r\n            .join(\" \");\r\n        return name;\r\n    }\r\n    static parseDateTimeEntity(recognizerResult) {\r\n        const dateTimeEntity = recognizerResult.entities[\"datetime\"];\r\n        if (!dateTimeEntity || !dateTimeEntity[0])\r\n            return undefined;\r\n        const timex = dateTimeEntity[0][\"timex\"];\r\n        if (!timex || !timex[0])\r\n            return undefined;\r\n        const now = momentTimezone()\r\n            .tz(\"America/Los_Angeles\")\r\n            .format(\"YYYY-MM-DD\");\r\n        const utc = moment(momentTimezone()\r\n            .tz(\"Africa/Abidjan\")\r\n            .format(\"YYYY-MM-DD\"));\r\n        const text = recognizerResult.text;\r\n        const regex = /(\\d{4}|\\d{2}|\\d{1})[./-](\\d{2}|\\d{1})[./-](\\d{4}|\\d{2}|\\d{1})/;\r\n        const parsedArr = text.match(regex);\r\n        const dateData = {};\r\n        console.log(\"parsedArr-->\" + parsedArr);\r\n        if (parsedArr && parsedArr.length > 0 && moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).isValid()) {\r\n            dateData.pdt = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format(\"YYYY-MM-DD\");\r\n            dateData.utc = moment(parsedArr[0], MOMENT_ARR_DATE_PARSE).format(\"YYYY-MM-DD\");\r\n            dateData.currentDay = dateData.pdt !== now ? false : true;\r\n            return dateData;\r\n        }\r\n        const diffByDay = utc.diff(now, \"days\");\r\n        console.log(\"utc: \" + utc + \" now:\" + now + \" different by days: \" + diffByDay);\r\n        dateData.utc =\r\n            timex[0] !== \"PRESENT_REF\"\r\n                ? moment(timex[0], \"YYYY-MM-DD\")\r\n                    .subtract({ days: diffByDay })\r\n                    .format(\"YYYY-MM-DD\")\r\n                : momentTimezone()\r\n                    .tz(\"Africa/Abidjan\")\r\n                    .format(\"YYYY-MM-DD\");\r\n        dateData.pdt =\r\n            timex[0] !== \"PRESENT_REF\"\r\n                ? dateData.utc\r\n                : momentTimezone()\r\n                    .tz(\"America/Los_Angeles\")\r\n                    .format(\"YYYY-MM-DD\");\r\n        if (timex[0] === \"PRESENT_REF\" || timex[0].split(\"T\")[0] === moment(utc).format(\"YYYY-MM-DD\"))\r\n            dateData.currentDay = true;\r\n        else\r\n            dateData.currentDay = false;\r\n        return dateData;\r\n    }\r\n}\r\nexports.default = LuisHelper;\r\n//# sourceMappingURL=luisHelper.js.map\n\n//# sourceURL=webpack:///./build/helpers/luisHelper.js?");

/***/ }),

/***/ "./build/helpers/qnaHelper.js":
/*!************************************!*\
  !*** ./build/helpers/qnaHelper.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst botbuilder_ai_1 = __webpack_require__(/*! botbuilder-ai */ \"botbuilder-ai\");\r\nclass QnAHelper {\r\n    constructor() {\r\n        this._qnaMaker = new botbuilder_ai_1.QnAMaker({\r\n            knowledgeBaseId: process.env.KBId,\r\n            endpointKey: process.env.qnaEndPointKey,\r\n            host: process.env.qnaHostName\r\n        });\r\n    }\r\n    qnaQuery(context) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const qnaMakerResults = yield this._qnaMaker.getAnswers(context, {\r\n                scoreThreshold: 0.65,\r\n                top: 3\r\n            });\r\n            return Promise.resolve(qnaMakerResults);\r\n        });\r\n    }\r\n}\r\nexports.default = QnAHelper;\r\n//# sourceMappingURL=qnaHelper.js.map\n\n//# sourceURL=webpack:///./build/helpers/qnaHelper.js?");

/***/ }),

/***/ "./build/helpers/youtubeDataHelper.js":
/*!********************************************!*\
  !*** ./build/helpers/youtubeDataHelper.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst googleapis_1 = __webpack_require__(/*! googleapis */ \"googleapis\");\r\nconst axios_1 = __webpack_require__(/*! axios */ \"axios\");\r\nconst moment = __webpack_require__(/*! moment */ \"moment\");\r\nclass YoutubeDataHelper {\r\n    static query(reqData) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const youtube = googleapis_1.google.youtube({\r\n                version: \"v3\",\r\n                auth: process.env.youtubeAPIKey\r\n            });\r\n            const results = yield youtube.search.list({\r\n                part: \"snippet\",\r\n                q: reqData.name,\r\n                maxResults: reqData.max,\r\n                order: \"relevance\",\r\n                videoDuration: \"any\",\r\n                type: \"video\"\r\n            });\r\n            const youtubeResults = [];\r\n            for (let i = 0; i < results.data.items.length; i++) {\r\n                const item = results.data.items[i];\r\n                const contentRes = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?id=${item.id.videoId}&part=contentDetails&key=${process.env.youtubeAPIKey}`);\r\n                let duration;\r\n                if (contentRes.data.items) {\r\n                    const d = moment.duration(contentRes.data.items[0].contentDetails.duration);\r\n                    duration = moment(d.asMilliseconds()).format(\"mm:ss\");\r\n                }\r\n                const youtubeResponseData = {\r\n                    title: item.snippet.title,\r\n                    channelTitle: item.snippet.channelTitle,\r\n                    link: `https://www.youtube.com/watch?v=${item.id.videoId}`,\r\n                    length: duration\r\n                };\r\n                youtubeResults.push(youtubeResponseData);\r\n            }\r\n            return youtubeResults;\r\n        });\r\n    }\r\n}\r\nexports.default = YoutubeDataHelper;\r\n//# sourceMappingURL=youtubeDataHelper.js.map\n\n//# sourceURL=webpack:///./build/helpers/youtubeDataHelper.js?");

/***/ }),

/***/ "./server.js":
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./build/app */ \"./build/app.js\");\r\n\n\n//# sourceURL=webpack:///./server.js?");

/***/ }),

/***/ "all-the-cities":
/*!*********************************!*\
  !*** external "all-the-cities" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"all-the-cities\");\n\n//# sourceURL=webpack:///external_%22all-the-cities%22?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");\n\n//# sourceURL=webpack:///external_%22axios%22?");

/***/ }),

/***/ "botbuilder":
/*!*****************************!*\
  !*** external "botbuilder" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"botbuilder\");\n\n//# sourceURL=webpack:///external_%22botbuilder%22?");

/***/ }),

/***/ "botbuilder-ai":
/*!********************************!*\
  !*** external "botbuilder-ai" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"botbuilder-ai\");\n\n//# sourceURL=webpack:///external_%22botbuilder-ai%22?");

/***/ }),

/***/ "botbuilder-azure":
/*!***********************************!*\
  !*** external "botbuilder-azure" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"botbuilder-azure\");\n\n//# sourceURL=webpack:///external_%22botbuilder-azure%22?");

/***/ }),

/***/ "botbuilder-dialogs":
/*!*************************************!*\
  !*** external "botbuilder-dialogs" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"botbuilder-dialogs\");\n\n//# sourceURL=webpack:///external_%22botbuilder-dialogs%22?");

/***/ }),

/***/ "country-list":
/*!*******************************!*\
  !*** external "country-list" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"country-list\");\n\n//# sourceURL=webpack:///external_%22country-list%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "googleapis":
/*!*****************************!*\
  !*** external "googleapis" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"googleapis\");\n\n//# sourceURL=webpack:///external_%22googleapis%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "moment-timezone":
/*!**********************************!*\
  !*** external "moment-timezone" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment-timezone\");\n\n//# sourceURL=webpack:///external_%22moment-timezone%22?");

/***/ }),

/***/ "restify":
/*!**************************!*\
  !*** external "restify" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"restify\");\n\n//# sourceURL=webpack:///external_%22restify%22?");

/***/ })

/******/ });