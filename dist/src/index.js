import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyShop } from '@/pages/shop/Shop.lazy';
import { Suspense } from 'react';
var root = document.querySelector('#root');
if (!root) {
    throw new Error('root element NOT found!');
}
var container = createRoot(root);
var router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        children: [
            {
                path: '/about',
                element: (_jsx(Suspense, { fallback: "Loading...", children: _jsx(LazyAbout, {}) })) // separate chunk js will be created
            },
            {
                path: '/shop',
                element: (_jsx(Suspense, { fallback: "Loading...", children: _jsx(LazyShop, {}) }))
            }
        ]
    }
]);
container.render(_jsx(RouterProvider, { router: router }));
