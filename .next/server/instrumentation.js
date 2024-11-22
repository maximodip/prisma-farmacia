"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "instrumentation";
exports.ids = ["instrumentation"];
exports.modules = {

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("module");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "(instrument)/./src/instrumentation.ts":
/*!********************************!*\
  !*** ./src/instrumentation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/* harmony import */ var _vercel_otel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vercel/otel */ \"(instrument)/./node_modules/@vercel/otel/dist/node/index.js\");\n\nfunction register() {\n    (0,_vercel_otel__WEBPACK_IMPORTED_MODULE_0__.registerOTel)({\n        serviceName: \"prisma-farmacia\"\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUEwQztBQUVuQyxTQUFTQztJQUNkRCwwREFBWUEsQ0FBQztRQUFDRSxhQUFhO0lBQWlCO0FBQzlDIiwic291cmNlcyI6WyIvaG9tZS9tYXgvZGV2L3ByaXNtYS1mYXJtYWNpYS9zcmMvaW5zdHJ1bWVudGF0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVnaXN0ZXJPVGVsfSBmcm9tIFwiQHZlcmNlbC9vdGVsXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIoKSB7XHJcbiAgcmVnaXN0ZXJPVGVsKHtzZXJ2aWNlTmFtZTogXCJwcmlzbWEtZmFybWFjaWFcIn0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJyZWdpc3Rlck9UZWwiLCJyZWdpc3RlciIsInNlcnZpY2VOYW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/@opentelemetry","vendor-chunks/@vercel"], () => (__webpack_exec__("(instrument)/./src/instrumentation.ts")));
module.exports = __webpack_exports__;

})();