export function TOC() {
    return (
        <nav className="nextra-toc order-last max-xl:hidden w-64 shrink-0 print:hidden" aria-label="table of contents">
            <div className="grid grid-rows-[min-content_1fr_min-content] sticky top-(--nextra-navbar-height) text-sm max-h-[calc(100vh-var(--nextra-navbar-height))]">
                {/* <p className="pt-6 px-4 font-semibold tracking-tight">On This Page</p> */}
                {/* <ul className="p-4 nextra-scrollbar overscroll-y-contain overflow-y-auto hyphens-auto nextra-mask">
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#static-head-tags"
                            className="focus-visible:nextra-focus font-semibold block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            Static Head Tags
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#dynamic-tags-based-on-page"
                            className="focus-visible:nextra-focus font-semibold block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            Dynamic Tags Based on Page
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#via-markdown-front-matter"
                            className="focus-visible:nextra-focus ms-3 block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            via Markdown front matter
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#via-exporting-metadata-object"
                            className="focus-visible:nextra-focus ms-3 block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            via exporting{" "}
                            <code className="nextra-code" dir="ltr">
                                metadata
                            </code>{" "}
                            object
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#in-dynamic-routes-with-catch-all-segment"
                            className="focus-visible:nextra-focus ms-3 block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            in{" "}
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#theme-color"
                            className="focus-visible:nextra-focus font-semibold block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            Theme Color
                        </a>
                    </li>
                    <li className="my-2 scroll-my-6 scroll-py-6">
                        <a
                            href="#favicon-glyph"
                            className="focus-visible:nextra-focus font-semibold block transition-colors subpixel-antialiased text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 contrast-more:text-gray-900 contrast-more:underline contrast-more:dark:text-gray-50 break-words"
                        >
                            Favicon Glyph
                        </a>
                    </li>
                </ul> */}
                {/* <div className="grid gap-2 py-4 mx-4 border-t nextra-border">
                    <a
                        href="https://github.com/shuding/nextra/issues/new?title=Feedback%20for%20%E2%80%9C%3CHead%3E%20Component%E2%80%9D&amp;labels=feedback"
                        target="_blank"
                        rel="noreferrer"
                        className="focus-visible:nextra-focus text-xs font-medium transition text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 contrast-more:text-gray-700 contrast-more:dark:text-gray-100"
                    >
                        Question? Give us feedback
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            viewBox="0 0 24 24"
                            height="1em"
                            className="inline align-baseline shrink-0"
                        >
                            <path d="M7 17L17 7"></path>
                            <path d="M7 7h10v10"></path>
                        </svg>
                    </a>
                    <a
                        href="https://github.com/shuding/nextra/tree/main/docs/app/docs/built-ins/head/page.mdx"
                        target="_blank"
                        rel="noreferrer"
                        className="focus-visible:nextra-focus text-xs font-medium transition text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 contrast-more:text-gray-700 contrast-more:dark:text-gray-100"
                    >
                        Edit this page on GitHub
                        <svg
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                            viewBox="0 0 24 24"
                            height="1em"
                            className="inline align-baseline shrink-0"
                        >
                            <path d="M7 17L17 7"></path>
                            <path d="M7 7h10v10"></path>
                        </svg>
                    </a>
                    <button
                        className="transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap opacity-0 text-xs font-medium transition text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 contrast-more:text-gray-700 contrast-more:dark:text-gray-100"
                        aria-hidden="true"
                        type="button"
                        disabled=""
                        data-headlessui-state="disabled"
                        data-disabled=""
                    >
                        Scroll to top
                        <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" height="1.1em" className="-rotate-90 border rounded-full border-current">
                            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
        </nav>
    )
}
