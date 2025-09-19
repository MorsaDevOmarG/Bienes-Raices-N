/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// alert('Soy el mapa');\r\n(function () {\r\n  const lat = 20.67444163271174;\r\n  const lng = -103.38739216304566;\r\n  const mapa = L.map(\"mapa\").setView([lat, lng], 16);\r\n  let marker;\r\n\r\n  // Utilizar PROVIDER y GEOCODER\r\n  const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n  L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n    attribution:\r\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n  }).addTo(mapa);\r\n\r\n  // El PIN, draggable: para mover el PIN, autoPan: para que el mapa se mueva si el PIN llega a un borde, es decir; se vuelve a centrar\r\n  marker = L.marker([lat, lng], { draggable: true, autoPan: true }).addTo(mapa);\r\n\r\n  // Detectar movimiento del marker (pin)\r\n  marker.on(\"moveend\", function (e) {\r\n    marker = e.target;  // El marcador que se movió\r\n    const posicion = marker.getLatLng(); // Obtener la posición del marcador\r\n    mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)); // Centrar el mapa en la nueva posición del marcador\r\n    // console.log(posicion);\r\n\r\n    // Obtener la información de la calle al soltar el pin\r\n    geocodeService\r\n      .reverse()\r\n      .latlng(posicion, 16) // 16 es el nivel de precisión\r\n      .run(\r\n        function (error, resultado) {\r\n          // console.log(resultado);\r\n          marker.bindPopup(resultado.address.LongLabel); // Mostrar la dirección en un popup\r\n          marker.openPopup(); // Abrir el popup automáticamente\r\n        });\r\n  });\r\n\r\n  // 🚀 Agregar buscador\r\n  L.Control.geocoder({\r\n    defaultMarkGeocode: false, // Para manejar manualmente lo que hace al seleccionar\r\n  })\r\n    .on(\"markgeocode\", function (e) {\r\n      const bbox = e.geocode.bbox;\r\n      const poly = L.polygon([\r\n        bbox.getSouthEast(),\r\n        bbox.getNorthEast(),\r\n        bbox.getNorthWest(),\r\n        bbox.getSouthWest(),\r\n      ]).addTo(mapa);\r\n\r\n      // Centrar en el resultado\r\n      mapa.fitBounds(poly.getBounds());\r\n\r\n      // Mover marcador a la ubicación encontrada\r\n      const center = e.geocode.center;\r\n      marker.setLatLng(center);\r\n    })\r\n    .addTo(mapa);\r\n})();\r\n\n\n//# sourceURL=webpack://bienesraices/./src/js/mapa.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;