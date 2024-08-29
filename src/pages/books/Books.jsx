import { useEffect } from "react";
import service from "../../config/service";
import { bookFailure, bookStart, bookSuccess } from "../../redux/slices/bookSlice";
import { useDispatch, useSelector } from "react-redux";

export const Books = () => {
    const { books, isLoading } = useSelector(state => state.book);
    const dispatch = useDispatch();

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
        getBooksFunction();
    }, []);

    return (
        <div className="container">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Kitob rasmi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nomi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Toifasi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Narxi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tavsifi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amallar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr><td colSpan={100} className="text-center p-12">Yuklanmoqda...</td></tr> :
                                books?.length > 0 ?
                                    books?.map(book => (
                                        <tr key={book?._id} className="odd:bg-white even:bg-gray-50 borde">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                <img src={book?.img} alt={book?.nomi} className="w-10 h-14 rounded object-cover" />
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {book?.nomi}
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {book?.cat?.nomi}
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                ${book?.narxi}
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {book?.description?.slice(0, 20)}...
                                            </th>
                                            <td className="px-6 py-4 flex items-center gap-8">
                                                <button className="font-medium text-blue-600 hover:underline">Tahrirlash</button>
                                                <button className="font-medium text-red-600 hover:underline">O'chirish</button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan={100} className="text-center p-12">Xaridorlar mavjud emas.</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}