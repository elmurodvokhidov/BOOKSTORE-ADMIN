import { useDispatch, useSelector } from "react-redux";
import { userFailure, userStart, userSuccess } from "../../redux/slices/userSlice";
import service from "../../config/service";
import { useEffect } from "react";
import { Kutilmoqda, Yetkazildi } from "../../assets/icons/Icons";

export const Orders = () => {
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

    const renderStatus = (status) => {
        switch (status) {
            case "pending": return <p className="w-fit flex items-center gap-2 rounded px-2 font-medium whitespace-nowrap text-[#d46b08] border border-[#ffd591] bg-[#fff7e6]"><span className="size-4"><Kutilmoqda /></span><span>Kutilmoqda</span></p>
            case "delivered": return <p className="w-fit flex items-center gap-2 rounded px-2 font-medium whitespace-nowrap text-[#389e0d] border border-[#b7eb8f] bg-[#f6ffed]"><span className="size-4"><Yetkazildi /></span><span>Yetkazildi</span></p>
        }
    };

    return (
        <div className="container">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Buyurtma ID raqami
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Buyurtma holati
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Mahsulotlar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Umumiy Narx
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manzil
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Xaridor
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
                                        user?.orders.map(order => (
                                            <tr key={order?._id} className="odd:bg-white even:bg-gray-50 borde">
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    #{order?._id?.slice(10, 16)}
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {renderStatus(order?.status)}
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {order?.products?.map(product => <img key={product?._id} src={product?.img} alt={product?.nomi} className="w-8 h-12 rounded object-cover" />)}
                                                    </div>
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    ${order?.total}
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <p className="flex flex-col justify-center">
                                                        <span>{order?.address?.country?.slice(0, 3)}, {order?.address?.city}</span>
                                                        <span>{order?.address?.postal_code}</span>
                                                    </p>
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <p className="flex flex-col justify-center">
                                                        <span>{user?.fullname}</span>
                                                        <span>{user?.email}</span>
                                                    </p>
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {new Date(order?.createdAt).toLocaleString()}
                                                </th>
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex flex-col justify-center gap-1">
                                                        <button className="font-medium text-blue-600 hover:underline">Qabul qilish</button>
                                                        <button className="font-medium text-red-600 hover:underline">Rad etish</button>
                                                    </div>
                                                </th>
                                            </tr>
                                        ))
                                    ))
                                    : <tr><td colSpan={100} className="text-center p-12">Xaridorlar mavjud emas.</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}