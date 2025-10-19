import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router";
import Home from "@/Home.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
    }
]);

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <RouterProvider router={router}/>
    </ThemeProvider>
);
