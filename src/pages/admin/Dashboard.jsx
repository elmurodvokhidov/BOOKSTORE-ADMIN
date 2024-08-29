import { useEffect } from "react";
import { Buyurtmalar, Daromad, Kitoblar, Toifalar, Xaridor } from "../../assets/icons/Icons"
// import PieChart from "../../utils/PieChart"
import SplineChart from "../../utils/SplineChart"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bookFailure, bookStart, bookSuccess } from "../../redux/slices/bookSlice";
import service from "../../config/service";
import { categoryFailure, categoryStart, categorySuccess } from "../../redux/slices/categorySlice";
import { userFailure, userStart, userSuccess } from "../../redux/slices/userSlice.js";

export const Dashboard = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.user);
    const { books } = useSelector(state => state.book);
    const { categories } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAllUserFunction = async () => {
        try {
            dispatch(userStart());
            const { data } = await service.getAllUser();
            dispatch(userSuccess({ data, type: "b" }));
        } catch (error) {
            console.log(error.message);
            dispatch(userFailure(error.message));
        }
    };

    const getAllCategoriesFunction = async () => {
        try {
            dispatch(categoryStart());
            const { data } = await service.getAllCategory();
            dispatch(categorySuccess(data));
        } catch (error) {
            console.log(error.message);
            dispatch(categoryFailure(error.message));
        }
    };

    const getBooksFunction = async () => {
        try {
            dispatch(bookStart());
            const { data } = await service.getAllBooks("", "");
            dispatch(bookSuccess({ type: "b", data }));
        } catch (error) {
            console.log(error);
            dispatch(bookFailure(error.message));
        }
    };

    useEffect(() => {
        getAllUserFunction();
        getAllCategoriesFunction();
        getBooksFunction();
    }, []);

    let total = 0;
    users.forEach(user => {
        if (!user.orders.length) return;
        user.orders.forEach(order => {
            if (!order.total) return;
            total += order.total;
        })
    });

    useEffect(() => {
        if (!isLoggedIn) navigate('/');
    }, [isLoggedIn, navigate]);

    return (
        <div className="container">
            <section className="w-full flex flex-wrap items-center justify-start gap-14 mt-2">
                <div className="size-36 flex flex-col items-center justify-center border shadow-smooth">
                    <span className="size-10 text-gray-700"><Xaridor /></span>
                    <h1 className="text-sm text-gray-500 mt-1">Xaridorlar</h1>
                    <h1 className="text-2xl mt-3">{users ? users.length : 0}</h1>
                </div>

                <div className="size-36 flex flex-col items-center justify-center border shadow-smooth">
                    <span className="size-10 text-gray-700"><Toifalar /></span>
                    <h1 className="text-sm text-gray-500 mt-1">Toifalar</h1>
                    <h1 className="text-2xl mt-3">{categories ? categories.length : 0}</h1>
                </div>

                <div className="size-36 flex flex-col items-center justify-center border shadow-smooth">
                    <span className="size-10 text-gray-700"><Kitoblar /></span>
                    <h1 className="text-sm text-gray-500 mt-1">Kitoblar</h1>
                    <h1 className="text-2xl mt-3">{books ? books.length : 0}</h1>
                </div>

                <div className="size-36 flex flex-col items-center justify-center border shadow-smooth">
                    <span className="size-10 text-gray-700"><Buyurtmalar /></span>
                    <h1 className="text-sm text-gray-500 mt-1">Buyurtmalar</h1>
                    <h1 className="text-2xl mt-3">{users.reduce((prev, user) => prev + user.orders.length, 0)}</h1>
                </div>

                <div className="size-36 flex flex-col items-center justify-center border shadow-smooth">
                    <span className="size-10 text-gray-700"><Daromad /></span>
                    <h1 className="text-sm text-gray-500 mt-1">Daromad</h1>
                    <h1 className="text-2xl mt-3">${total}</h1>
                </div>
            </section>

            <div className="w-full flex items-center justify-between gap-20 mt-14">
                {users.length > 0 && <SplineChart data={users} />}
                {/* <PieChart/> */}
            </div>
        </div>
    )
}