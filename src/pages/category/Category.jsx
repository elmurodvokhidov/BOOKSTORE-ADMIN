import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { categoryFailure, categoryStart, categorySuccess } from "../../redux/slices/categorySlice";
import service from "../../config/service";

export default function Category() {
    const { categories, isLoading } = useSelector(state => state.category);
    const dispatch = useDispatch();

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

    useEffect(() => {
        getAllCategoriesFunction();
    }, []);

    return (
        <div className="container">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Toifa nomi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amallar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr><td colSpan={100} className="text-center p-12">Yuklanmoqda...</td></tr> :
                                categories?.length > 0 ?
                                    categories?.map(category => (
                                        <tr key={category?._id} className="odd:bg-white even:bg-gray-50 borde">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {category?.nomi}
                                            </th>
                                            <td className="px-6 py-4 flex items-center gap-8">
                                                <button className="font-medium text-blue-600 hover:underline">Tahrirlash</button>
                                                <button className="font-medium text-red-600 hover:underline">O'chirish</button>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr><td colSpan={100} className="text-center p-12">Toifalar mavjud emas.</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}