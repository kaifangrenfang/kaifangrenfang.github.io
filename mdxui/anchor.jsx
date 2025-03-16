import { forwardRef } from "react"
import { Link } from "react-router-dom"

export const Anchor = forwardRef(({ href = "", children, newWindow, ...props }, forwardedRef) => {
    if (newWindow) {
        return (
            <a ref={forwardedRef} href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
            </a>
        )
    }

    if (!href) {
        return (
            <a ref={forwardedRef} {...props}>
                {children}
            </a>
        )
    }

    return (
        <Link ref={forwardedRef} to={href} {...props}>
            {children}
        </Link>
    )
})

Anchor.displayName = "Anchor"
