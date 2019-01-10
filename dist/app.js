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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _objects_Oscillator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objects/Oscillator */ "./src/js/objects/Oscillator.js");

var l = new _objects_Oscillator__WEBPACK_IMPORTED_MODULE_0__["default"]();
console.log('test');
console.log(l);
/*
    APP NOTES & PLANNING

    init file sets the things up



    mouse wheel to change note length?

*/

/***/ }),

/***/ "./src/js/objects/Oscillator.js":
/*!**************************************!*\
  !*** ./src/js/objects/Oscillator.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _session_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../session/store */ "./src/js/session/store.js");
!(function webpackMissingModule() { var e = new Error("Cannot find module 'Vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }



console.log(!(function webpackMissingModule() { var e = new Error("Cannot find module 'Vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var Oscillator =
/*#__PURE__*/
function (_Vue) {
  _inherits(Oscillator, _Vue);

  function Oscillator() {
    var _this;

    _classCallCheck(this, Oscillator);

    var id = 0;
    console.log(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.id = id; // also set up the actual oscillator

    return _possibleConstructorReturn(_this);
  }

  return Oscillator;
}(!(function webpackMissingModule() { var e = new Error("Cannot find module 'Vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

!(function webpackMissingModule() { var e = new Error("Cannot find module 'Vue'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).component('Oscillator', {
  props: {
    isPlaying: false
  },
  data: function data() {
    return {
      volume: 80,
      waveform: sine
    };
  },
  template: "\n        <div>\n            <h2>Oscillator {{ this.id }}</h2>\n            <select>\n                <option value=\"sine/sqr\">sine</option>\n                <option value=\"sine/saw\">square</option>\n                <option value=\"sine/saw\">saw</option>\n            </select>\n            <input type=\"range\" id=\"volume\" />\n            <input type=\"range\" id=\"lowpass\" />\n            <input type=\"range\" id=\"resonance\" />\n        </div>\n    ",
  created: function created() {// initialise the oscillator
  },
  methods: {}
}); // class Oscillator extends React.Component {
//     constructor() {
//         this.id = store.getOscillatorCount();
//         this.wavetable = wavetable
//         store.incrementOscCount();
//     }
//     delete() {
//         // delete the object & dom element
//         // then:
//         store.decrementOscCount()
//     }
//     render() {
//         return (
//             <div>
//                 <h2>Oscillator {this.id}</h2>
//                 <select>
//                     <option value="sine/sqr"></option>
//                     <option value="sine/saw"></option>
//                 </select>
//                 <input type="range" id="wt pos" />
//                 <input type="range" id="volume" />
//                 <input type="range" id="lowpass" />
//                 <input type="range" id="resonance" />
//             </div>
//         );
//     }
//     getPitch(note) {
//         var notes = [
//             A4,B4,C4
//         ];
//         notes.forEach(function() {
//             // dividing / multiply highest frequency by
//             // each notes index in the array
//         });
//     }
// }

/* harmony default export */ __webpack_exports__["default"] = (Oscillator);

/***/ }),

/***/ "./src/js/session/init.js":
/*!********************************!*\
  !*** ./src/js/session/init.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/js/session/store.js");

var audioContext;
var audioCtx;

function init() {
  audioContext = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContext();
}

init();

/***/ }),

/***/ "./src/js/session/store.js":
/*!*********************************!*\
  !*** ./src/js/session/store.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init */ "./src/js/session/init.js");

var store = {
  data: {
    audioContext: window.AudioContext || window.webkitAudioContext,
    audioCtx: new AudioContext()
  },
  getAudioContext: function getAudioContext() {
    return store.data.audioCtx;
  },
  values: {
    bpm: 90,
    noteLength: '1/4',
    pitches: {// figure out an algorithm to divide the pitches,
      // don't hard code this
      // also should be a function and not an obj
    }
  },
  getPitch: function getPitch(note) {// 
  }
};

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***********************************************************************************!*\
  !*** multi ./src/js/app.js ./src/js/objects ./src/js/session ./src/scss/app.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/charlie/Code/piano-roll/src/js/app.js */"./src/js/app.js");
!(function webpackMissingModule() { var e = new Error("Cannot find module '/home/charlie/Code/piano-roll/src/js/objects'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module '/home/charlie/Code/piano-roll/src/js/session'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
module.exports = __webpack_require__(/*! /home/charlie/Code/piano-roll/src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });