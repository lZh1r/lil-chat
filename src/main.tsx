import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, redirect, RouterProvider} from "react-router";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import Layout from "@/components/layout/Layout.tsx";
import Home from "@/Home.tsx";
import Chat from "@/Chat.tsx";
import Models from "@/Models.tsx";

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                path: "",
                Component: Home
            },
            {
                path: "chat/:chatId",
                loader: ({params}) => {
                    return params;
                },
                Component: Chat
            },
            {
                path: "chat",
                loader: () => {
                    throw redirect("/");
                }
            },
            {
                path: "models",
                Component: Models
            }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
        <RouterProvider router={router}/>
    </ThemeProvider>
);
