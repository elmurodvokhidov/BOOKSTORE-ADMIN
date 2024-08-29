import { useDispatch, useSelector } from "react-redux";
import service from "../../config/service";
import { userFailure, userStart, userSuccess } from "../../redux/slices/userSlice";
import { useEffect } from "react";

export const Users = () => {
    const { users, isLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

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

    useEffect(() => {
        getAllUserFunction();
    }, []);

    return (
        <div className="container">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                F.I.O
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Pochta manzili
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sana
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amallar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? <tr><td colSpan={100} className="text-center p-12">Yuklanmoqda...</td></tr> :
                                users?.length > 0 ?
                                    users?.map(user => (
                                        <tr key={user?._id} className="odd:bg-white even:bg-gray-50 borde">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {user?.fullname}
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {user?.email}
                                            </th>
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {new Date(user?.createdAt).toLocaleString()}
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