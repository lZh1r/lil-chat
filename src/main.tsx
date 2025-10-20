import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Layout from "@/components/layout/Layout.tsx";
import Home from "@/Home.tsx";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                path: "",
                Component: Home
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <RouterProvider router={router}/>
    </ThemeProvider>
);
