import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LazyAbout } from '@/pages/about/About.lazy';
import { LazyShop } from '@/pages/shop/Shop.lazy';
import { Suspense } from 'react';

const root = document.querySelector('#root');

if (!root) {
  throw new Error('root element NOT found!');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback="Loading...">
            <LazyAbout />
          </Suspense>
        ) // separate chunk js will be created
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback="Loading...">
            <LazyShop />
          </Suspense>
        )
      }
    ]
  }
]);

container.render(<RouterProvider router={router} />);
