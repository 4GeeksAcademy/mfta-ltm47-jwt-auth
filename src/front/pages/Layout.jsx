import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <div className="d-flex flex-column align-items-start w-100 min-vh-100">
                <Navbar />
                <div className="d-flex w-100 h-100 flex-grow-1">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </ScrollToTop>
    )
}