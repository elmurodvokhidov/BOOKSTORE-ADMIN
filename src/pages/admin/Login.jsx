import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import service from "../../config/service";
import { authFailure, authStart, authSuccess } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

export const Login = () => {
    const { isLoading, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });

    const getAuthCred = (e) => {
        setAuth({
            ...auth,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(authStart());
            const { data } = await service.loginAuth(auth);
            dispatch(authSuccess(data));
        } catch (error) {
            dispatch(authFailure());
            toast.error(error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="h-screen w-full absolute z-10 bg-gray-100">
            <h1 className="text-center text-3xl mt-20">Hisobga kirish</h1>

            <form onSubmit={handleLogin} className="max-w-sm mx-auto my-10">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Elektron pochta
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900"
                    >
                        Parolingiz
                    </label>
                    <input
                        onChange={getAuthCred}
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    {isLoading ? "Yuklanmoqda..." : "Hisobga kirish"}
                </button>
            </form>
        </div>
    )
}