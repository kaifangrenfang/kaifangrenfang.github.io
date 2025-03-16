import React from "react"
import { Sidebar } from "./sidebar"
import { SidebarBottom } from "./sidebar-bottom"

export function Body({ children }) {
    return (
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
                <main className="w-full min-w-0 max-w-6xl px-6 pt-4 md:px-12">{children}</main>
            </article>
        </div>
    )
}
