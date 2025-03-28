import RootLayout from "../components/layout/layout"
import { Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

import MdxProviderWrapper from "@/components/MdxProviderWrapper"
import { Header } from "@/components/layout/header"
import { Body } from "@/components/layout/body"
import { Footer } from "@/components/layout/footer"
import { Sidebar } from "@/components/layout/sidebar"
import { SidebarBottom } from "@/components/layout/sidebar-bottom"

import Home from "./routes/table/page.mdx"
const About = lazy(() => import("./routes/about/page.mdx"))
const BRDF = lazy(() => import("./routes/brdf/page.mdx"))
const Contact = lazy(() => import("./routes/contact/page.mdx"))
const Markdown = lazy(() => import("./routes/markdown/page.mdx"))
const Sample = lazy(() => import("./routes/sample/page.mdx"))
const Table = lazy(() => import("./routes/home/page.mdx"))
const Theme = lazy(() => import("./routes/theme/page.mdx"))

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
        <div dir="ltr">
            <Header />
            <div className="auto flex max-w-[90rem]">
                <div className="motion-reduce:transition-none [transition:background-color1.5sease] bg-transparent"></div>
                <aside className="openhuman-sidebar-container flex flex-col md:top-16 md:shrink-0 motion-reduce:transform-none transform-gpu transition-all ease-in-out print:hidden md:w-64 md:sticky md:self-start max-md:[transform:translate3d(0,-100%,0)]">
                    <div className="overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-var(--openhuman-navbar-height)-var(--openhuman-menu-height))] openhuman-scrollbar">
                        <div className="transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none">
                            <div className="transition-opacity duration-500 ease-in-out motion-reduce:transition-none opacity-100">
                                <Sidebar />
                            </div>
                        </div>
                    </div>

                    <SidebarBottom />
                </aside>
                <div id="reach-skip-nav"></div>
                <article className="w-full break-words openhuman-content flex min-h-[calc(100vh-var(--openhuman-navbar-height))] min-w-0 justify-center pb-8 pr-[calc(env(safe-area-inset-right)-1.5rem)]">
                    <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">
                        <MdxProviderWrapper>
                            <Routes>
                                <Route index path="/" element={<BRDF />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/brdf" element={<BRDF />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/markdown" element={<Markdown />} />
                                <Route path="/sample" element={<Sample />} />
                                <Route path="/table" element={<Table />} />
                                <Route path="/theme" element={<Theme />} />
                            </Routes>
                        </MdxProviderWrapper>
                    </main>
                </article>
            </div>
            {/* <Body>
                
            </Body> */}
            <Footer />
        </div>
    )
}
// <RouterProvider router={routesList} />

export default App
