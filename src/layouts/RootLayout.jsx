import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../pages/admin/Sidebar"

export const RootLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="w-full flex">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}