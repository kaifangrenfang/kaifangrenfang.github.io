import { Outlet, Link } from "react-router-dom"

import { Header } from "@/components/layout/header"
import { Body } from "@/components/layout/body"
import { Footer } from "@/components/layout/footer"
import MdxProviderWrapper from "@/components/MdxProviderWrapper"

export default function RootLayout() {
    return (
        <div dir="ltr">
            <Header />
            <Body>
                <MdxProviderWrapper>
                    <Outlet />
                </MdxProviderWrapper>
            </Body>
            <Footer />
        </div>
    )
}
