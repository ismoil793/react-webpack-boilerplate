import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet } from 'react-router-dom';
import styles from './AnotherStyles.module.scss';
// import './App.scss';
import imgPng from '@/assets/JavaScript-logo.png';
import imgJpg from '@/assets/1.jpg';
import SVGIcon from '@/assets/board.svg';
export var App = function () {
    return (_jsxs("div", { children: [_jsxs("div", { children: [_jsx("img", { width: 100, src: imgPng, alt: "img png" }), _jsx("img", { width: 100, src: imgJpg, alt: "img jpg" }), _jsx(SVGIcon, { width: 100, height: 100, color: "red" })] }), _jsx("div", { children: _jsxs("p", { children: [_jsx("strong", { children: "__ISMOIL_GLOBAL__:" }), " ", __ISMOIL_GLOBAL__] }) }), _jsxs("div", { className: styles.blue, children: ["App", _jsxs("div", { children: [_jsx("div", { children: _jsx(Link, { to: "/", children: "home" }) }), _jsx("div", { children: _jsx(Link, { to: "/about", children: "about" }) }), _jsx("div", { children: _jsx(Link, { to: "/shop", children: "shop" }) })] })] }), _jsx("div", { children: _jsx(Outlet, {}) })] }));
};
