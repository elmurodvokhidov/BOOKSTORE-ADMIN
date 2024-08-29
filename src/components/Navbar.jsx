import { Link, useNavigate } from "react-router-dom";
import { Foydalanuvchi, Logo } from "../assets/icons/Icons";
import { useState } from "react";
import { authLogout, authStart } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const Navbar = () => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        dispatch(authStart());
        dispatch(authLogout());
        navigate('/');
    };

    return (
        <div className="w-full fixed z-20 top-0 flex items-center justify-between px-10 py-3 pc:py-4 shadow-dim bg-white">
            <Link to="dashboard" className="flex items-center gap-1 text-2xl text-gray-800">
                <span className="mr-1 size-10 pc:size-12"><Logo /></span>
                <span>Book</span>
                <span className="text-gray-500">Store</span>
            </Link>

            <div className="right flex relative items-center gap-4 text-gray-500">
                <button
                    onClick={() => setModal(!modal)}
                    className="flex items-center gap-2 outline-gray-800">
                    <span className="inline-block text-base pc:text-xl text-black">elmurod</span>
                    <span className="size-8 pc:size-10 text-gray-500"><Foydalanuvchi /></span>
                </button>
                {
                    modal &&
                    <div
                        onClick={() => setModal(false)}
                        className="fixed top-0 left-0 bottom-0 right-0">
                        <div className="w-40 pc:w-52 flex flex-col items-start justify-start absolute z-10 sm:top-16 small:top-12 pc:top-20 right-10 text-black text-sm pc:text-base rounded border border-gray-300 bg-white">
                            <Link
                                to="profile"
                                className="w-full p-4 border-b border-gray-300 hover:bg-gray-100 outline-gray-800"
                            >
                                Hisob qaydnomasi
                            </Link>
                            <button
                                onClick={logoutHandler}
                                className="w-full p-4 text-left hover:bg-gray-100 outline-gray-800"
                            >
                                Chiqish
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}