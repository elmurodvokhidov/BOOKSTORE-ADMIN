import { NavLink } from "react-router-dom";
import { AsosiyPanel, Buyurtmalar, Foydalanuvchilar, Kitoblar, Toifalar } from "../../assets/icons/Icons";

export const Sidebar = () => {
    return (
        <div className="sidebar md:static absolute z-10 left-0 h-screen pt-16 pc:pt-20 overflow-y-auto shadow-smooth transition-all bg-white">
            <NavLink
                to="/dashboard"
                className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-8 small:px-4 flex flex-col items-center outline-gray-800">
                <span className="pc:size-10 size-8"><AsosiyPanel /></span>
                <h1 className="pc:text-xl text-base">Dashboard</h1>
            </NavLink>

            <NavLink
                to="/category"
                className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-8 small:px-4 flex flex-col items-center outline-gray-800">
                <span className="pc:size-10 size-8"><Toifalar /></span>
                <h1 className="pc:text-xl text-base">Toifalar</h1>
            </NavLink>

            <NavLink
                to="/users"
                className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-gray-800">
                <span className="pc:size-10 size-8"><Foydalanuvchilar /></span>
                <h1 className="pc:text-xl text-base">Xaridorlar</h1>
            </NavLink>

            <NavLink
                to="/books"
                className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-gray-800">
                <span className="pc:size-10 size-8"><Kitoblar /></span>
                <h1 className="pc:text-xl text-base">Kitoblar</h1>
            </NavLink>

            <NavLink
                to="orders"
                className="cell relative text-gray-500 border-b-2 py-4 md:px-5 pc:px-6 small:px-4 flex flex-col items-center outline-gray-800">
                <span className="pc:size-10 size-8"><Buyurtmalar /></span>
                <h1 className="pc:text-xl text-base">Buyurtmalar</h1>
            </NavLink>
        </div>
    )
}