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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Example)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction Example() {\n  // Create state for filepath\n  const [filepath, setFilePath] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"\");\n  const [mediaCreationStatus, setMediaCreationStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(\"Try to add Media!\");\n  const [medias, setMedia] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n\n  // Open a file dialog and update the filepath\n  async function addMedia() {\n    let failed = await window.electronAPI.createMedia();\n    if (!failed) {\n      setMediaCreationStatus(\"Sucessfully added media to DB!\");\n    } else {\n      setMediaCreationStatus(\"Failed to add media to DB :(\");\n    }\n  }\n  async function getMedia() {\n    setMedias(window.electronAPI.getMedia());\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Add Media to DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: addMedia\n  }, \"Add Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"br\", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"h2\", null, \"Try to Read Media from DB: \"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"btn\", {\n    onClick: getMedia\n  }, \"Get Media\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"ol\", null, medias.map(media => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"li\", null, media, \" \"))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9leGFtcGxlLmpzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEI7QUFDRTtBQUVqQixTQUFTRSxPQUFPQSxDQUFBLEVBQUc7RUFDOUI7RUFDQSxNQUFNLENBQUNDLFFBQVEsRUFBRUMsV0FBVyxDQUFDLEdBQUdILCtDQUFRLENBQUMsRUFBRSxDQUFDO0VBQzVDLE1BQU0sQ0FBQ0ksbUJBQW1CLEVBQUVDLHNCQUFzQixDQUFDLEdBQUdMLCtDQUFRLENBQUMsbUJBQW1CLENBQUM7RUFDbkYsTUFBTSxDQUFDTSxNQUFNLEVBQUVDLFFBQVEsQ0FBQyxHQUFHUCwrQ0FBUSxDQUFDLEVBQUUsQ0FBQzs7RUFFdkM7RUFDQSxlQUFlUSxRQUFRQSxDQUFBLEVBQUc7SUFDdEIsSUFBSUMsTUFBTSxHQUFHLE1BQU1DLE1BQU0sQ0FBQ0MsV0FBVyxDQUFDQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxJQUFJLENBQUNILE1BQU0sRUFBRTtNQUNUSixzQkFBc0IsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUM1RCxDQUFDLE1BQU07TUFDSEEsc0JBQXNCLENBQUMsOEJBQThCLENBQUM7SUFDMUQ7RUFDSjtFQUVBLGVBQWVRLFFBQVFBLENBQUEsRUFBRztJQUN0QkMsU0FBUyxDQUFDSixNQUFNLENBQUNDLFdBQVcsQ0FBQ0UsUUFBUSxDQUFDLENBQUMsQ0FBQztFQUM1QztFQUVBLG9CQUNJZCxnREFBQSxDQUFBQSwyQ0FBQSxxQkFDSUEsZ0RBQUEsYUFBSSwwQkFBNEIsQ0FBQyxlQUNqQ0EsZ0RBQUE7SUFBS2tCLE9BQU8sRUFBRVQ7RUFBUyxHQUFDLFdBQWMsQ0FBQyxlQUN2Q1QsZ0RBQUEsV0FBSSxDQUFDLGVBQ0xBLGdEQUFBLGFBQUksNkJBQStCLENBQUMsZUFDcENBLGdEQUFBO0lBQUtrQixPQUFPLEVBQUVKO0VBQVMsR0FBQyxXQUFjLENBQUMsZUFDdkNkLGdEQUFBLGFBQ0tPLE1BQU0sQ0FBQ1ksR0FBRyxDQUFFQyxLQUFLLGlCQUNkcEIsZ0RBQUEsYUFBS29CLEtBQUssRUFBQyxHQUFLLENBQ25CLENBQ0QsQ0FDTixDQUFDO0FBRVgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mYW1pbHktdmluZS8uL3NyYy9jb21wb25lbnRzL2V4YW1wbGUuanN4Pzc5YjQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFeGFtcGxlKCkge1xuICAgIC8vIENyZWF0ZSBzdGF0ZSBmb3IgZmlsZXBhdGhcbiAgICBjb25zdCBbZmlsZXBhdGgsIHNldEZpbGVQYXRoXSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFttZWRpYUNyZWF0aW9uU3RhdHVzLCBzZXRNZWRpYUNyZWF0aW9uU3RhdHVzXSA9IHVzZVN0YXRlKFwiVHJ5IHRvIGFkZCBNZWRpYSFcIik7XG4gICAgY29uc3QgW21lZGlhcywgc2V0TWVkaWFdID0gdXNlU3RhdGUoW10pXG5cbiAgICAvLyBPcGVuIGEgZmlsZSBkaWFsb2cgYW5kIHVwZGF0ZSB0aGUgZmlsZXBhdGhcbiAgICBhc3luYyBmdW5jdGlvbiBhZGRNZWRpYSgpIHtcbiAgICAgICAgbGV0IGZhaWxlZCA9IGF3YWl0IHdpbmRvdy5lbGVjdHJvbkFQSS5jcmVhdGVNZWRpYSgpO1xuICAgICAgICBpZiAoIWZhaWxlZCkge1xuICAgICAgICAgICAgc2V0TWVkaWFDcmVhdGlvblN0YXR1cyhcIlN1Y2Vzc2Z1bGx5IGFkZGVkIG1lZGlhIHRvIERCIVwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0TWVkaWFDcmVhdGlvblN0YXR1cyhcIkZhaWxlZCB0byBhZGQgbWVkaWEgdG8gREIgOihcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhKCkge1xuICAgICAgICBzZXRNZWRpYXMod2luZG93LmVsZWN0cm9uQVBJLmdldE1lZGlhKCkpXG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMj5UcnkgdG8gQWRkIE1lZGlhIHRvIERCOiA8L2gyPlxuICAgICAgICAgICAgPGJ0biBvbkNsaWNrPXthZGRNZWRpYX0+QWRkIE1lZGlhPC9idG4+XG4gICAgICAgICAgICA8YnIvPlxuICAgICAgICAgICAgPGgyPlRyeSB0byBSZWFkIE1lZGlhIGZyb20gREI6IDwvaDI+XG4gICAgICAgICAgICA8YnRuIG9uQ2xpY2s9e2dldE1lZGlhfT5HZXQgTWVkaWE8L2J0bj5cbiAgICAgICAgICAgIDxvbD5cbiAgICAgICAgICAgICAgICB7bWVkaWFzLm1hcCgobWVkaWEpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGxpPnttZWRpYX0gPC9saT5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvb2w+XG4gICAgICAgIDwvPlxuICAgIClcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiRXhhbXBsZSIsImZpbGVwYXRoIiwic2V0RmlsZVBhdGgiLCJtZWRpYUNyZWF0aW9uU3RhdHVzIiwic2V0TWVkaWFDcmVhdGlvblN0YXR1cyIsIm1lZGlhcyIsInNldE1lZGlhIiwiYWRkTWVkaWEiLCJmYWlsZWQiLCJ3aW5kb3ciLCJlbGVjdHJvbkFQSSIsImNyZWF0ZU1lZGlhIiwiZ2V0TWVkaWEiLCJzZXRNZWRpYXMiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJvbkNsaWNrIiwibWFwIiwibWVkaWEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/example.jsx\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1fa817ec4a6976950846")
/******/ })();
/******/ 
/******/ }
);