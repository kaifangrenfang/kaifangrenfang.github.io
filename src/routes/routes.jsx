import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/components/layout/layout"

import Home from "./theme/page.mdx"
import { lazy } from "react"
const About = lazy(() => import("./about/page.mdx"))
const Contact = lazy(() => import("./contact/page.mdx"))
const Markdown = lazy(() => import("./markdown/page.mdx"))
const Sample = lazy(() => import("./sample/page.mdx"))
const Table = lazy(() => import("./table/page.mdx"))
const Theme = lazy(() => import("./home/page.mdx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/markdown", element: <Markdown /> },
            { path: "/sample", element: <Sample /> },
            { path: "/table", element: <Table /> },
            { path: "/theme", element: <Theme /> },
        ],
    },
])

export { router }
