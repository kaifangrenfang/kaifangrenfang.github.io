import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Table",
        href: "/table",
    },
    {
        title: "Sample",
        href: "/sample",
    },
    {
        title: "Theme",
        href: "/theme",
    },
    {
        title: "Markdown",
        href: "/markdown",
    },
    {
        title: "Contact",
        href: "/contact",
    },
]

const MenuItem = ({ item, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = useLocation().pathname
    const isActive = pathname === item.href

    if (item.type === "section") {
        return (
            <li className="[word-break:break-word] mt-5 mb-2 px-2 py-1.5 text-sm font-semibold text-gray-900 first:mt-0 dark:text-gray-100">
                <div className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    {item.title}
                </div>
            </li>
        )
    }

    const commonClasses =
        "flex rounded px-2 py-1.5 text-sm transition-colors [word-break:break-word] cursor-pointer [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] contrast-more:border " +
        (isActive
            ? "bg-primary-100 font-semibold text-primary-800 dark:bg-primary-400/10 dark:text-primary-600 contrast-more:border-primary-500 contrast-more:dark:border-primary-500"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-400 dark:hover:bg-primary-100/5 dark:hover:text-gray-50 contrast-more:text-gray-900 contrast-more:dark:text-gray-50 contrast-more:border-transparent contrast-more:hover:border-gray-900 contrast-more:dark:hover:border-gray-50")

    if (item.hasChildren) {
        return (
            <li>
                <div className="flex items-center">
                    <Link to={item.href} className={commonClasses + " flex-1"} onClick={() => setIsOpen(!isOpen)}>
                        {item.title}
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-primary-100/5 rounded-md">
                        <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={"h-[18px] min-w-[18px] rounded-sm transform transition-transform " + (isOpen ? "rotate-90" : "")}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
                <div className="transform-gpu overflow-hidden transition-all ease-in-out motion-reduce:transition-none" style={{ height: isOpen ? "auto" : "0px" }}>
                    <div
                        className={
                            "transition-opacity duration-500 ease-in-out motion-reduce:transition-none " + (isOpen ? "opacity-100" : "opacity-0") + " ltr:pr-0 rtl:pl-0 pt-1"
                        }
                    >
                        <ul className="flex flex-col gap-1 relative before:absolute before:inset-y-1 before:w-px before:bg-gray-200 dark:before:bg-neutral-800 ltr:pl-3 ltr:before:left-0 rtl:pr-3 rtl:before:right-0 ltr:ml-3 rtl:mr-3">
                            {item.children.map((child, index) => (
                                <MenuItem key={index} item={child} level={level + 1} />
                            ))}
                        </ul>
                    </div>
                </div>
            </li>
        )
    }

    return (
        <li className="flex flex-col gap-1">
            <a href={item.href} className={commonClasses}>
                {item.title}
            </a>
        </li>
    )
}

const Sidebar = () => {
    return (
        <aside className="nextra-sidebar-container flex flex-col md:top-16 md:shrink-0 motion-reduce:transform-none transform-gpu transition-all ease-in-out print:hidden md:w-64 md:sticky md:self-start max-md:[transform:translate3d(0,-100%,0)]">
            <div className="overflow-y-auto overflow-x-hidden p-4 grow md:h-[calc(100vh-var(--nextra-navbar-height)-var(--nextra-menu-height))] nextra-scrollbar">
                <ul className="flex flex-col gap-1">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export { Sidebar }
