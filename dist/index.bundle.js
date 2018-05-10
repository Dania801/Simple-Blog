module.exports =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-dev'
};

const testConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-test'
};

const prodConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-prod'
};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(4);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(21);

var _validator2 = _interopRequireDefault(_validator);

var _bcryptNodejs = __webpack_require__(13);

var _user = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'User name is required!'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minLength: [6, 'Password needs to be longer!'],
    validator: {
      validator(password) {
        return _user.passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!'
    }
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(18);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.default = {
  signup: {
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(passwordReg).required(),
    firstName: _joi2.default.string().required(),
    lastName: _joi2.default.string().required(),
    userName: _joi2.default.string().required()
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(4);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console*/

_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (e) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('MongoDB is running!')).on('error', err => {
  throw err;
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(19);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(14);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(15);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(17);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(5);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(11);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(6);

var _middlewares = __webpack_require__(7);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(8);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middlewares2.default)(app);

app.get('/', (req, res) => {
  res.send('Hello world');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
      Server running on port: ${_constants2.default.PORT}
      -----------------------------
      Running on ${process.env.PORT}
      -----------------------------
      Make something great!
      ----------------------------- 
    `);
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json(e);
  }
}

async function login(req, res, next) {
  console.log('hello , im inside the controller');
  res.status(200).json(req.user);
  return next();
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _expressValidation = __webpack_require__(16);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(10);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(3);

var _user3 = _interopRequireDefault(_user2);

var _auth = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();
routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signUp);
routes.post('/login', _auth.authLocal, userController.login);

exports.default = routes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLocal = undefined;

var _passport = __webpack_require__(5);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(20);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = __webpack_require__(2);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
  usernameField: 'email'
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });
    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(localStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ })
/******/ ]);