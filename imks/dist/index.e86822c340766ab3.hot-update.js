"use strict";
self["webpackHotUpdateimks"]('index', {
"./src/App.tsx": (function (module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/jsx-dev-runtime.js");
/* ESM import */var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./node_modules/@mui/material/Select/Select.js");
/* ESM import */var _mui_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./node_modules/@mui/material/MenuItem/MenuItem.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react/index.js");
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* provided dependency */ var $ReactRefreshRuntime$ = __webpack_require__("./node_modules/@rspack/plugin-react-refresh/client/reactRefresh.js");

var _s = $RefreshSig$();


//přidání nového posuvníku...má se přesunou v rámci pořadí ostaních posuvníků dle času?
// umožnit editovat barvy
// umožnit přidávání sliders ke všem kanálů viz   const lineChartData: LineChartIntensityData = {
//   2: { color: cyan[500], legendTitle: "Světlo", series: [] },
//   3: { color: "#b6cf55", legendTitle: "Hnojení", series: [] },
// };
// dodělat překlady
//přidat návod
//kouknout na efektivitu renderů
const books = [
    {
        id: "1",
        name: "Harry Potter"
    },
    {
        id: "2",
        name: "Děti z Bulerbinu"
    },
    {
        id: "3",
        name: "Míšiny cesty"
    },
    {
        id: "4",
        name: "Mikulášovi patálie "
    }
];
function App() {
    _s();
    // const { datesData, intensitySeries } = useUpdateLineChart();
    const [selectedId, setSelectedId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(SelectField, {
        items: books,
        keyExtractor: (book)=>book.id,
        labelExtractor: (book)=>book.name,
        value: selectedId,
        onChange: (value)=>setSelectedId(value)
    }, void 0, false, {
        fileName: "/Users/VojtaTrainProgramming/Documents/IMKS/imks/src/App.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(App, "zZz4D6Y2sTfth3NKOYlrWUd0tSo=");
_c = App;
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);
const SelectField = (param)=>{
    let { items, keyExtractor, labelExtractor, value, onChange } = param;
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__["default"], {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        children: items.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_3__["default"], {
                value: keyExtractor(item),
                children: labelExtractor(item)
            }, keyExtractor(item), false, {
                fileName: "/Users/VojtaTrainProgramming/Documents/IMKS/imks/src/App.tsx",
                lineNumber: 84,
                columnNumber: 9
            }, undefined))
    }, void 0, false, {
        fileName: "/Users/VojtaTrainProgramming/Documents/IMKS/imks/src/App.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, undefined);
};
_c1 = SelectField;
var _c, _c1;
$RefreshReg$(_c, "App");
$RefreshReg$(_c1, "SelectField");

function $RefreshSig$() {
  return $ReactRefreshRuntime$.createSignatureFunctionForTransform();
}
function $RefreshReg$(type, id) {
  $ReactRefreshRuntime$.register(type, module.id + "_" + id);
}
Promise.resolve().then(function() {
  $ReactRefreshRuntime$.refresh(module.id, module.hot);
});


}),

},function(__webpack_require__) {
// webpack/runtime/get_full_hash
(() => {
__webpack_require__.h = () => ("aabd4453d1997369")
})();

}
);
//# sourceMappingURL=index.e86822c340766ab3.hot-update.js.map