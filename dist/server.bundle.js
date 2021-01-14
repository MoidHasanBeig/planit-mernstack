/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/functions/projectFunctions.js":
/*!**************************************************!*\
  !*** ./src/server/functions/projectFunctions.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"@babel/runtime/helpers/defineProperty\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_socket_init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/socket_init */ \"./src/server/utils/socket_init.js\");\n/* harmony import */ var _userFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./userFunctions */ \"./src/server/functions/userFunctions.js\");\n/* harmony import */ var _models_projects_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../models/projects.model */ \"./src/server/models/projects.model.js\");\n/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../models/users.model */ \"./src/server/models/users.model.js\");\n/* harmony import */ var _models_notifications_model__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../models/notifications.model */ \"./src/server/models/notifications.model.js\");\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\n\n\n\n\n\nvar projectFunctions = new function () {\n  var _this = this;\n\n  //on creating new project\n  this.createProject = function (conf, res) {\n    var membersArr = conf.members.split(\",\");\n    membersArr.push(conf.creator.email);\n    var memberIds = [];\n    var projMembers = [];\n    _models_users_model__WEBPACK_IMPORTED_MODULE_5__.default.find({\n      email: {\n        $in: membersArr\n      }\n    }).exec(function (err, foundMembers) {\n      foundMembers && foundMembers.forEach(function (user) {\n        projMembers.push({\n          email: user.email,\n          name: user.username,\n          id: user._id,\n          image: user.image\n        });\n        memberIds.push(user._id);\n      });\n      var newProject = new _models_projects_model__WEBPACK_IMPORTED_MODULE_4__.default({\n        _id: new (mongoose__WEBPACK_IMPORTED_MODULE_1___default().mongo.ObjectId)(),\n        title: conf.title,\n        creator: conf.creator._id,\n        members: memberIds\n      });\n      newProject.save(function (err) {\n        if (!err) {\n          //add project id to each user document\n          _models_users_model__WEBPACK_IMPORTED_MODULE_5__.default.updateMany({\n            _id: {\n              $in: memberIds\n            }\n          }, {\n            $push: {\n              projects: newProject._id\n            }\n          }, function (err, docs) {\n            console.log(docs);\n          });\n          _userFunctions__WEBPACK_IMPORTED_MODULE_3__.default.updateNotificationCount(memberIds); //add contacts to all members of the project\n\n          _userFunctions__WEBPACK_IMPORTED_MODULE_3__.default.addContacts(memberIds); //create project room and join online users\n\n          memberIds.forEach(function (member) {\n            console.log(member);\n\n            if (_utils_socket_init__WEBPACK_IMPORTED_MODULE_2__.clients[member]) {\n              console.log(\"online:\", _utils_socket_init__WEBPACK_IMPORTED_MODULE_2__.clients[member].id);\n              _utils_socket_init__WEBPACK_IMPORTED_MODULE_2__.clients[member].join(newProject._id);\n            }\n          });\n\n          var projDetails = _objectSpread(_objectSpread({}, newProject._doc), {}, {\n            creator: {\n              username: conf.creator.username\n            }\n          });\n\n          _this.sendNotification({\n            type: 'newproject',\n            members: memberIds,\n            projId: newProject._id,\n            content: \"You've been added to \".concat(conf.title, \" project by \").concat(conf.creator.username),\n            projMembers: projMembers,\n            newProject: projDetails,\n            createdAt: new Date()\n          });\n\n          res.send('New project added');\n        }\n      });\n    });\n  }; //on sending a new notification\n\n\n  this.sendNotification = function (data) {\n    var newNotif = new _models_notifications_model__WEBPACK_IMPORTED_MODULE_6__.default({\n      _id: new (mongoose__WEBPACK_IMPORTED_MODULE_1___default().mongo.ObjectId)(),\n      project: data.projId,\n      content: data.content\n    });\n    newNotif.save(function (err) {\n      if (!err) {\n        if (data.type === 'newproject') {\n          //add notif id to each user document\n          _models_users_model__WEBPACK_IMPORTED_MODULE_5__.default.updateMany({\n            _id: {\n              $in: data.members\n            }\n          }, {\n            $push: {\n              notifications: newNotif._id\n            }\n          }, function (err, docs) {\n            console.log(docs);\n          });\n        } //send notif over socket\n\n\n        _utils_socket_init__WEBPACK_IMPORTED_MODULE_2__.io.to(data.projId).emit('notification', data);\n      }\n    });\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectFunctions);\n\n//# sourceURL=webpack://planit/./src/server/functions/projectFunctions.js?");

/***/ }),

/***/ "./src/server/functions/userFunctions.js":
/*!***********************************************!*\
  !*** ./src/server/functions/userFunctions.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _models_projects_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/projects.model */ \"./src/server/models/projects.model.js\");\n/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/users.model */ \"./src/server/models/users.model.js\");\n\n\nvar userFunctions = new function () {\n  this.addContacts = function (contacts) {\n    _models_users_model__WEBPACK_IMPORTED_MODULE_1__.default.updateMany({\n      _id: contacts\n    }, {\n      $addToSet: {\n        contacts: {\n          $each: contacts\n        }\n      }\n    }, function (err, docs) {\n      console.log(docs);\n    });\n  };\n\n  this.updateNotificationCount = function (contacts) {\n    _models_users_model__WEBPACK_IMPORTED_MODULE_1__.default.updateMany({\n      _id: contacts\n    }, {\n      $inc: {\n        newnotifcount: 1\n      }\n    }, function (err, docs) {\n      console.log(docs);\n    });\n  };\n\n  this.subscribe = function (projectId, socket) {\n    _models_projects_model__WEBPACK_IMPORTED_MODULE_0__.default.find({\n      _id: projectId\n    }, function (err, project) {\n      socket.join(project.name);\n    });\n  };\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userFunctions);\n\n//# sourceURL=webpack://planit/./src/server/functions/userFunctions.js?");

/***/ }),

/***/ "./src/server/models/notifications.model.js":
/*!**************************************************!*\
  !*** ./src/server/models/notifications.model.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Schema = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema);\nvar notificationSchema = new Schema({\n  project: {\n    type: Schema.Types.ObjectId,\n    ref: 'Project'\n  },\n  task: {\n    type: Schema.Types.ObjectId,\n    ref: 'Task'\n  },\n  to: {\n    type: Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  content: String\n}, {\n  timestamps: true\n});\nvar Notification = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Notification', notificationSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Notification);\n\n//# sourceURL=webpack://planit/./src/server/models/notifications.model.js?");

/***/ }),

/***/ "./src/server/models/projects.model.js":
/*!*********************************************!*\
  !*** ./src/server/models/projects.model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Schema = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema);\nvar projectSchema = new Schema({\n  _id: Schema.Types.ObjectId,\n  title: String,\n  creator: {\n    type: Schema.Types.ObjectId,\n    ref: 'User'\n  },\n  members: [{\n    type: Schema.Types.ObjectId,\n    ref: 'User'\n  }],\n  tasks: [{\n    type: Schema.Types.ObjectId,\n    ref: 'Task'\n  }]\n});\nvar Project = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Project', projectSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Project);\n\n//# sourceURL=webpack://planit/./src/server/models/projects.model.js?");

/***/ }),

/***/ "./src/server/models/users.model.js":
/*!******************************************!*\
  !*** ./src/server/models/users.model.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nvar Schema = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema);\nvar userSchema = new Schema({\n  username: String,\n  email: String,\n  userid: String,\n  image: String,\n  newnotifcount: Number,\n  contacts: [{\n    type: Schema.Types.ObjectId,\n    ref: 'User'\n  }],\n  projects: [{\n    type: Schema.Types.ObjectId,\n    ref: 'Project'\n  }],\n  notifications: [{\n    type: Schema.Types.ObjectId,\n    ref: 'Notification'\n  }],\n  sentMessages: [{\n    type: Schema.Types.ObjectId,\n    ref: 'IndivMsg'\n  }],\n  receivedMessages: [{\n    type: Schema.Types.ObjectId,\n    ref: 'IndivMsg'\n  }]\n});\nvar User = mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('User', userSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);\n\n//# sourceURL=webpack://planit/./src/server/models/users.model.js?");

/***/ }),

/***/ "./src/server/router.js":
/*!******************************!*\
  !*** ./src/server/router.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _routes_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/auth */ \"./src/server/routes/auth.js\");\n/* harmony import */ var _routes_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/project */ \"./src/server/routes/project.js\");\n/* harmony import */ var _routes_render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routes/render */ \"./src/server/routes/render.js\");\n/* harmony import */ var _routes_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/user */ \"./src/server/routes/user.js\");\n\n\n\n\n\nvar checkAuth = function checkAuth(req, res, next) {\n  if (req.isAuthenticated()) next();else res.redirect('/login');\n};\n\nvar router = function router(app, routerConf) {\n  //authentication\n  app.use(\"/auth/google\", _routes_auth__WEBPACK_IMPORTED_MODULE_0__.default); //login\n\n  app.use(\"/login\", function (req, res) {\n    if (req.isAuthenticated()) res.redirect(\"/\");else (0,_routes_render__WEBPACK_IMPORTED_MODULE_2__.default)(req, res, routerConf.prodMode, routerConf.compiler);\n  }); //logout\n\n  app.use(\"/logout\", function (req, res) {\n    req.logout();\n    res.redirect(\"/login\");\n  }); //redirect after auth check\n\n  app.all('*', checkAuth); //project\n\n  app.use(\"/project\", _routes_project__WEBPACK_IMPORTED_MODULE_1__.default); //user\n\n  app.use(\"/user\", _routes_user__WEBPACK_IMPORTED_MODULE_3__.default); //render html layout\n\n  app.use(function (req, res) {\n    return (0,_routes_render__WEBPACK_IMPORTED_MODULE_2__.default)(req, res, routerConf.prodMode, routerConf.compiler);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://planit/./src/server/router.js?");

/***/ }),

/***/ "./src/server/routes/auth.js":
/*!***********************************!*\
  !*** ./src/server/routes/auth.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\");\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth__WEBPACK_IMPORTED_MODULE_2__);\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\n\n // eslint-disable-line no-unused-vars\n\nvar authRouter = (0,express__WEBPACK_IMPORTED_MODULE_1__.Router)();\nvar authScope = 'https://www.googleapis.com/auth/userinfo';\nauthRouter.route(\"/\").get(passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate('google', {\n  scope: [\"\".concat(authScope, \".profile\"), \"\".concat(authScope, \".email\")]\n}));\nauthRouter.route(\"/callback\").get(passport__WEBPACK_IMPORTED_MODULE_0___default().authenticate('google', {\n  failureRedirect: '/login'\n}), function (req, res) {\n  return res.redirect('/');\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authRouter);\n\n//# sourceURL=webpack://planit/./src/server/routes/auth.js?");

/***/ }),

/***/ "./src/server/routes/project.js":
/*!**************************************!*\
  !*** ./src/server/routes/project.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _functions_projectFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions/projectFunctions */ \"./src/server/functions/projectFunctions.js\");\n\n\nvar projectRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nprojectRouter.route(\"/\").post(function (req, res) {\n  var projConf = {\n    title: req.body.title,\n    members: req.body.members,\n    creator: req.user\n  };\n  _functions_projectFunctions__WEBPACK_IMPORTED_MODULE_1__.default.createProject(projConf, res);\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectRouter);\n\n//# sourceURL=webpack://planit/./src/server/routes/project.js?");

/***/ }),

/***/ "./src/server/routes/render.js":
/*!*************************************!*\
  !*** ./src/server/routes/render.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nvar renderHtml = function renderHtml(req, res, prodMode, compiler) {\n  prodMode ? res.sendFile(__dirname + '/dist_index.html') : compiler.outputFileSystem.readFile(compiler.outputPath + '/dist_index.html', function (err, result) {\n    res.set('content-type', 'text/html');\n    res.send(result);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderHtml);\n\n//# sourceURL=webpack://planit/./src/server/routes/render.js?");

/***/ }),

/***/ "./src/server/routes/user.js":
/*!***********************************!*\
  !*** ./src/server/routes/user.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/users.model */ \"./src/server/models/users.model.js\");\n\n\nvar userRouter = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\nuserRouter.route(\"/\").get(function (req, res) {\n  var id = req.user._id;\n  _models_users_model__WEBPACK_IMPORTED_MODULE_1__.default.findById(id).populate({\n    path: 'projects',\n    populate: {\n      path: 'creator',\n      select: 'username'\n    }\n  }).populate('notifications').populate('contacts', 'username email _id image').exec(function (err, user) {\n    return res.send(user);\n  });\n});\nuserRouter.route(\"/readnotifs\").get(function (req, res) {\n  var id = req.user._id;\n  console.log('read');\n  _models_users_model__WEBPACK_IMPORTED_MODULE_1__.default.updateOne({\n    _id: id\n  }, {\n    newnotifcount: 0\n  }, function () {\n    return res.send('Notifications read');\n  });\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userRouter);\n\n//# sourceURL=webpack://planit/./src/server/routes/user.js?");

/***/ }),

/***/ "./src/server/serverDev.js":
/*!*********************************!*\
  !*** ./src/server/serverDev.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! http */ \"http\");\n/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./router */ \"./src/server/router.js\");\n/* harmony import */ var _utils_mongo_init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/mongo_init */ \"./src/server/utils/mongo_init.js\");\n/* harmony import */ var _utils_socket_init__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/socket_init */ \"./src/server/utils/socket_init.js\");\n/* harmony import */ var _utils_passport_init__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/passport_init */ \"./src/server/utils/passport_init.js\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! webpack */ \"webpack\");\n/* harmony import */ var webpack__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(webpack__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n/* harmony import */ var webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n/* harmony import */ var webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _webpack_client_config_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../webpack.client.config.js */ \"./webpack.client.config.js\");\n/* harmony import */ var _webpack_client_config_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_webpack_client_config_js__WEBPACK_IMPORTED_MODULE_10__);\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\n\n\n\n\n\n\n\n\n\n\nvar app = express__WEBPACK_IMPORTED_MODULE_0___default()();\nvar server = http__WEBPACK_IMPORTED_MODULE_1___default().createServer(app);\nvar port = process.env.PORT || 3000;\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default().json());\nvar argv = {\n  mode: \"development\"\n};\nvar devMode = argv.mode === 'development';\nvar prodMode = argv.mode === 'production'; //initialize utils\n\n(0,_utils_passport_init__WEBPACK_IMPORTED_MODULE_6__.default)(app, prodMode);\n(0,_utils_mongo_init__WEBPACK_IMPORTED_MODULE_4__.default)();\n(0,_utils_socket_init__WEBPACK_IMPORTED_MODULE_5__.default)(server);\nvar conf = _webpack_client_config_js__WEBPACK_IMPORTED_MODULE_10___default()(null, argv);\nvar compiler = webpack__WEBPACK_IMPORTED_MODULE_7___default()(conf);\nprodMode ? app.use(express__WEBPACK_IMPORTED_MODULE_0___default().static(__dirname)) : app.use(webpack_dev_middleware__WEBPACK_IMPORTED_MODULE_8___default()(compiler, {\n  publicPath: conf.output.publicPath\n}));\ndevMode && app.use(webpack_hot_middleware__WEBPACK_IMPORTED_MODULE_9___default()(compiler)); //initialize router\n\nvar routerConf = {\n  prodMode: prodMode,\n  compiler: compiler\n};\n(0,_router__WEBPACK_IMPORTED_MODULE_3__.default)(app, routerConf);\nserver.listen(port, function () {\n  console.log(\"server live @ \".concat(port));\n  console.log(\"development\");\n});\n\n//# sourceURL=webpack://planit/./src/server/serverDev.js?");

/***/ }),

/***/ "./src/server/utils/mongo_init.js":
/*!****************************************!*\
  !*** ./src/server/utils/mongo_init.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\nvar altlasUri = process.env.ATLAS_URI;\n\nvar mongoInit = function mongoInit() {\n  mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(altlasUri, {\n    useNewUrlParser: true,\n    useCreateIndex: true,\n    useUnifiedTopology: true\n  });\n  var db = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection);\n  db.on('error', console.error.bind(console, 'connection error:'));\n  db.once('open', function () {\n    console.log(\"MongoDB connected\");\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoInit);\n\n//# sourceURL=webpack://planit/./src/server/utils/mongo_init.js?");

/***/ }),

/***/ "./src/server/utils/passport_init.js":
/*!*******************************************!*\
  !*** ./src/server/utils/passport_init.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! passport */ \"passport\");\n/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-session */ \"express-session\");\n/* harmony import */ var express_session__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express_session__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\");\n/* harmony import */ var passport_google_oauth__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(passport_google_oauth__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _models_users_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/users.model */ \"./src/server/models/users.model.js\");\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\n\n\n\n\n\nvar passportInit = function passportInit(app, prodMode) {\n  app.use(express_session__WEBPACK_IMPORTED_MODULE_1___default()({\n    secret: process.env.SESSION_SECRET,\n    resave: false,\n    saveUninitialized: true\n  }));\n  app.use(passport__WEBPACK_IMPORTED_MODULE_0___default().initialize());\n  app.use(passport__WEBPACK_IMPORTED_MODULE_0___default().session());\n  var callbackUrL = prodMode ? \"https://simplan.herokuapp.com/auth/google/callback\" : \"http://localhost:3000/auth/google/callback\";\n  passport__WEBPACK_IMPORTED_MODULE_0___default().use(new passport_google_oauth__WEBPACK_IMPORTED_MODULE_2__.OAuth2Strategy({\n    clientID: process.env.CLIENT_ID,\n    clientSecret: process.env.CLIENT_SECRET,\n    callbackURL: callbackUrL\n  }, function (accessToken, refreshToken, profile, done) {\n    _models_users_model__WEBPACK_IMPORTED_MODULE_3__.default.findOne({\n      userid: profile.id\n    }, function (err, user) {\n      if (user) {\n        done(err, user);\n      } else {\n        var newUser = new _models_users_model__WEBPACK_IMPORTED_MODULE_3__.default({\n          username: profile.displayName,\n          email: profile.emails[0].value,\n          userid: profile.id,\n          image: profile.photos[0].value,\n          newnotifcount: 0\n        });\n        newUser.save();\n        done(err, newUser);\n      }\n    });\n  }));\n  passport__WEBPACK_IMPORTED_MODULE_0___default().serializeUser(function (user, done) {\n    done(null, user.id);\n  });\n  passport__WEBPACK_IMPORTED_MODULE_0___default().deserializeUser(function (id, done) {\n    _models_users_model__WEBPACK_IMPORTED_MODULE_3__.default.findById(id, function (err, user) {\n      done(err, user);\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (passportInit);\n\n//# sourceURL=webpack://planit/./src/server/utils/passport_init.js?");

/***/ }),

/***/ "./src/server/utils/socket_init.js":
/*!*****************************************!*\
  !*** ./src/server/utils/socket_init.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__,\n/* harmony export */   \"io\": () => /* binding */ io,\n/* harmony export */   \"clients\": () => /* binding */ clients\n/* harmony export */ });\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! socket.io */ \"socket.io\");\n/* harmony import */ var socket_io__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(socket_io__WEBPACK_IMPORTED_MODULE_0__);\n\nvar clients = {};\nvar io;\n\nvar socketInit = function socketInit(server) {\n  io = socket_io__WEBPACK_IMPORTED_MODULE_0__(server);\n  io.on('connection', function (socket) {\n    console.log('User connected', socket.id);\n    socket.on('userinfo', function (uid) {\n      clients[uid] = socket;\n      console.log(uid, clients[uid].id);\n    }); //on user disconnect\n\n    socket.on('disconnect', function () {\n      for (var uid in clients) {\n        clients[uid].id === socket.id && delete clients[uid];\n      }\n\n      console.log('user disconnected');\n    });\n  });\n  return io;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (socketInit);\n\n\n//# sourceURL=webpack://planit/./src/server/utils/socket_init.js?");

/***/ }),

/***/ "./webpack.client.config.js":
/*!**********************************!*\
  !*** ./webpack.client.config.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar MiniCssExtractPlugin = __webpack_require__(/*! mini-css-extract-plugin */ \"mini-css-extract-plugin\");\n\nvar TerserPlugin = __webpack_require__(/*! terser-webpack-plugin */ \"terser-webpack-plugin\");\n\nvar OptimizeCSSAssetsPlugin = __webpack_require__(/*! optimize-css-assets-webpack-plugin */ \"optimize-css-assets-webpack-plugin\");\n\nmodule.exports = function (env, argv) {\n  var devMode = argv.mode === 'development';\n  var prodMode = argv.mode === 'production';\n  var minimize = prodMode ? [new TerserPlugin({\n    parallel: true\n  }), new OptimizeCSSAssetsPlugin({})] : [];\n  var miniCssPlug = new MiniCssExtractPlugin({\n    filename: \"[name].css\",\n    chunkFilename: \"[id].css\"\n  });\n  var hmr = new webpack.HotModuleReplacementPlugin();\n  var noErr = new webpack.NoEmitOnErrorsPlugin();\n  var client = prodMode ? \"./src/client/index.js\" : ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', \"./src/client/index.js\"];\n  return {\n    entry: {\n      client: client\n    },\n    mode: \"development\",\n    target: \"web\",\n    devtool: devMode ? \"eval-source-map\" : \"hidden-source-map\",\n    module: {\n      rules: [{\n        enforce: \"pre\",\n        test: /\\.js$/,\n        exclude: /node_modules/,\n        loader: \"eslint-loader\",\n        options: {\n          emitWarning: true,\n          failOnError: false,\n          failOnWarning: false\n        }\n      }, {\n        test: /\\.(js|jsx)$/,\n        exclude: /(node_modules|bower_components)/,\n        loader: \"babel-loader\",\n        options: {\n          presets: [\"@babel/env\"]\n        }\n      }, {\n        // Loads the javacript into html template provided.\n        // Entry point is set below in HtmlWebPackPlugin in Plugins\n        test: /\\.html$/,\n        use: [{\n          loader: \"html-loader\"\n        }]\n      }, {\n        test: /\\.(png|svg|jpg|gif|ttf)$/,\n        use: ['file-loader']\n      }, {\n        // Loads CSS into a file when you import it via Javascript\n        // Rules are set in MiniCssExtractPlugin\n        test: /\\.(css|s[ac]ss)$/,\n        use: [prodMode ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader']\n      }]\n    },\n    resolve: {\n      extensions: [\"*\", \".js\", \".jsx\"]\n    },\n    optimization: {\n      minimize: true,\n      minimizer: minimize\n    },\n    output: {\n      path: path.resolve(__dirname, \"dist/\"),\n      publicPath: \"/\",\n      filename: \"[name].bundle.js\"\n    },\n    plugins: [new HtmlWebPackPlugin({\n      template: \"./src/client/index.html\",\n      publicPath: \"/\",\n      filename: \"dist_index.html\",\n      excludeChunks: ['server']\n    }), devMode ? hmr : function () {}, devMode ? noErr : function () {}, prodMode ? miniCssPlug : function () {}]\n  };\n};\n\n//# sourceURL=webpack://planit/./webpack.client.config.js?");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"@babel/runtime/helpers/defineProperty\");;\n\n//# sourceURL=webpack://planit/external_%22@babel/runtime/helpers/defineProperty%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"body-parser\");;\n\n//# sourceURL=webpack://planit/external_%22body-parser%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"dotenv\");;\n\n//# sourceURL=webpack://planit/external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express\");;\n\n//# sourceURL=webpack://planit/external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"express-session\");;\n\n//# sourceURL=webpack://planit/external_%22express-session%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"html-webpack-plugin\");;\n\n//# sourceURL=webpack://planit/external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"http\");;\n\n//# sourceURL=webpack://planit/external_%22http%22?");

/***/ }),

/***/ "mini-css-extract-plugin":
/*!******************************************!*\
  !*** external "mini-css-extract-plugin" ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"mini-css-extract-plugin\");;\n\n//# sourceURL=webpack://planit/external_%22mini-css-extract-plugin%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"mongoose\");;\n\n//# sourceURL=webpack://planit/external_%22mongoose%22?");

/***/ }),

/***/ "optimize-css-assets-webpack-plugin":
/*!*****************************************************!*\
  !*** external "optimize-css-assets-webpack-plugin" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"optimize-css-assets-webpack-plugin\");;\n\n//# sourceURL=webpack://planit/external_%22optimize-css-assets-webpack-plugin%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"passport\");;\n\n//# sourceURL=webpack://planit/external_%22passport%22?");

/***/ }),

/***/ "passport-google-oauth":
/*!****************************************!*\
  !*** external "passport-google-oauth" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"passport-google-oauth\");;\n\n//# sourceURL=webpack://planit/external_%22passport-google-oauth%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"path\");;\n\n//# sourceURL=webpack://planit/external_%22path%22?");

/***/ }),

/***/ "socket.io":
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"socket.io\");;\n\n//# sourceURL=webpack://planit/external_%22socket.io%22?");

/***/ }),

/***/ "terser-webpack-plugin":
/*!****************************************!*\
  !*** external "terser-webpack-plugin" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"terser-webpack-plugin\");;\n\n//# sourceURL=webpack://planit/external_%22terser-webpack-plugin%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack\");;\n\n//# sourceURL=webpack://planit/external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-dev-middleware\");;\n\n//# sourceURL=webpack://planit/external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = require(\"webpack-hot-middleware\");;\n\n//# sourceURL=webpack://planit/external_%22webpack-hot-middleware%22?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/server/serverDev.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;