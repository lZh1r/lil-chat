import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "@/Home.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    }
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
);
