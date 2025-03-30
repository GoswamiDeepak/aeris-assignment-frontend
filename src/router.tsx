import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Root from './layout/root';
import List from './pages/List';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: '/list',
                element: <List />,
            },
        ],
    },
    {
        path: '*',
        element: <div>Not found</div>,
    },
]);
