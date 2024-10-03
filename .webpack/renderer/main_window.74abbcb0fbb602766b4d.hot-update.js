"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatefamily_vine"]("main_window",{

/***/ "./src/app.jsx":
/*!*********************!*\
  !*** ./src/app.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _components_example_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/example.jsx */ \"./src/components/example.jsx\");\n\n\n\nconst root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById(\"root\"));\nroot.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_example_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYXBwLmpzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUErQjtBQUNjO0FBQ0M7QUFHOUMsTUFBTUcsSUFBSSxHQUFHRiw0REFBVSxDQUFDRyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4REYsSUFBSSxDQUFDRyxNQUFNLGNBQ1BOLGdEQUFBLENBQUNFLCtEQUFPLE1BQUUsQ0FDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmFtaWx5LXZpbmUvLi9zcmMvYXBwLmpzeD85M2JjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEV4YW1wbGUgZnJvbSAnLi9jb21wb25lbnRzL2V4YW1wbGUuanN4J1xuXG5cbmNvbnN0IHJvb3QgPSBjcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKSlcbnJvb3QucmVuZGVyKFxuICAgIDxFeGFtcGxlIC8+XG4pXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVSb290IiwiRXhhbXBsZSIsInJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwiY3JlYXRlRWxlbWVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/app.jsx\n");

/***/ }),

/***/ "./src/components/example.jsx":
/*!************************************!*\
  !*** ./src/components/example.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Example)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Example() {\n  // Create state for filepath\n  const [filepath, setFilePath] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n\n  // Open a file dialog and update the filepath\n  async function addMedia() {\n    let test = await window.electronAPI.createMedia();\n  }\n  async function getMedia() {\n    let medias = await window.electronAPI.getMedia();\n    console.log(medias);\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Add Media to DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: addMedia\n  }, \"Add Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Read Media from DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: getMedia\n  }, \"Get Media\"));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9leGFtcGxlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDRTtBQUVqQixTQUFTRSxPQUFPQSxDQUFBLEVBQUc7RUFDOUI7RUFDQSxNQUFNLENBQUNDLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdILCtDQUFRLENBQUMsRUFBRSxDQUFDOztFQUU1QztFQUNBLGVBQWVJLFFBQVFBLENBQUEsRUFBRztJQUN0QixJQUFJQyxJQUFJLEdBQUcsTUFBTUMsTUFBTSxDQUFDQyxXQUFXLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0VBQ3JEO0VBRUEsZUFBZUMsUUFBUUEsQ0FBQSxFQUFHO0lBQ3RCLElBQUlDLE1BQU0sR0FBRyxNQUFNSixNQUFNLENBQUNDLFdBQVcsQ0FBQ0UsUUFBUSxDQUFDLENBQUM7SUFDaERFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixNQUFNLENBQUM7RUFDdkI7RUFFQSxvQkFDSVgsZ0RBQUEsQ0FBQUEsMkNBQUEscUJBQ0lBLGdEQUFBLGFBQUksMEJBQTRCLENBQUMsZUFDakNBLGdEQUFBO0lBQUtnQixPQUFPLEVBQUVYO0VBQVMsR0FBQyxXQUFjLENBQUMsZUFDdkNMLGdEQUFBLFdBQUksQ0FBQyxlQUNMQSxnREFBQSxhQUFJLDZCQUErQixDQUFDLGVBQ3BDQSxnREFBQTtJQUFLZ0IsT0FBTyxFQUFFTjtFQUFTLEdBQUMsV0FBYyxDQUN4QyxDQUFDO0FBRVgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbHktdmluZS8uL3NyYy9jb21wb25lbnRzL2V4YW1wbGUuanN4Pzc5YjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFeGFtcGxlKCkge1xuICAgIC8vIENyZWF0ZSBzdGF0ZSBmb3IgZmlsZXBhdGhcbiAgICBjb25zdCBbZmlsZXBhdGgsIHNldEZpbGVQYXRoXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gICAgLy8gT3BlbiBhIGZpbGUgZGlhbG9nIGFuZCB1cGRhdGUgdGhlIGZpbGVwYXRoXG4gICAgYXN5bmMgZnVuY3Rpb24gYWRkTWVkaWEoKSB7XG4gICAgICAgIGxldCB0ZXN0ID0gYXdhaXQgd2luZG93LmVsZWN0cm9uQVBJLmNyZWF0ZU1lZGlhKClcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNZWRpYSgpIHtcbiAgICAgICAgbGV0IG1lZGlhcyA9IGF3YWl0IHdpbmRvdy5lbGVjdHJvbkFQSS5nZXRNZWRpYSgpXG4gICAgICAgIGNvbnNvbGUubG9nKG1lZGlhcylcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgICAgPGgyPlRyeSB0byBBZGQgTWVkaWEgdG8gREI6IDwvaDI+XG4gICAgICAgICAgICA8YnRuIG9uQ2xpY2s9e2FkZE1lZGlhfT5BZGQgTWVkaWE8L2J0bj5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8aDI+VHJ5IHRvIFJlYWQgTWVkaWEgZnJvbSBEQjogPC9oMj5cbiAgICAgICAgICAgIDxidG4gb25DbGljaz17Z2V0TWVkaWF9PkdldCBNZWRpYTwvYnRuPlxuICAgICAgICA8Lz5cbiAgICApXG59XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VTdGF0ZSIsIkV4YW1wbGUiLCJmaWxlcGF0aCIsInNldEZpbGVQYXRoIiwiYWRkTWVkaWEiLCJ0ZXN0Iiwid2luZG93IiwiZWxlY3Ryb25BUEkiLCJjcmVhdGVNZWRpYSIsImdldE1lZGlhIiwibWVkaWFzIiwiY29uc29sZSIsImxvZyIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsIm9uQ2xpY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/example.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6c5f644454287df8dd30")
/******/ })();
/******/ 
/******/ }
);