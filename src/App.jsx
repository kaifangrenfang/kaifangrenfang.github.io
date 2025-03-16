import RootLayout from "../components/layout/layout"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
import { routesList } from "./routes/routes"


// import Home from "./routes/home/page.mdx"
// import About from "./routes/about/page.mdx"
// import Contact from "./routes/contact/page.mdx"
// import Markdown from "./routes/markdown/page.mdx"
// import Sample from "./routes/sample/page.mdx"
// import Table from "./routes/table/page.mdx"
// import Theme from "./routes/theme/page.mdx"

// const About = lazy(() => import("./routes/about/page.mdx"))
// const Contact = lazy(() => import("./routes/contact/page.mdx"))
// const Markdown = lazy(() => import("./routes/markdown/page.mdx"))
// const Sample = lazy(() => import("./routes/sample/page.mdx"))
// const Table = lazy(() => import("./routes/table/page.mdx"))
// const Theme = lazy(() => import("./routes/home/page.mdx"))



function App() {
    return (
        // <Routes>
        //     <Route element={<RootLayout />}>
        //         <Route index path="/" element={<Home />} />
        //         <Route path="/about" element={<About />} />
        //         <Route path="/contact" element={<Contact />} />
        //         <Route path="/markdown" element={<Markdown />} />
        //         <Route path="/sample" element={<Sample />} />
        //         <Route path="/table" element={<Table />} />
        //         <Route path="/theme" element={<Theme />} />
        //     </Route>
        // </Routes>
        <RouterProvider router={routesList} />
    )
}

export default App
