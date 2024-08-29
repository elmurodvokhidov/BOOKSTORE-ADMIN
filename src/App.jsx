import { Route, Routes, useNavigate } from "react-router-dom"
import { Login } from "./pages/admin/Login"
import { RootLayout } from "./layouts/RootLayout"
import { Users } from "./pages/users/Users"
import { Books } from "./pages/books/Books"
import { Profile } from "./pages/admin/Profile"
import { Orders } from "./pages/users/Orders"
import { Dashboard } from "./pages/admin/Dashboard"
import Category from "./pages/category/Category"
import { useEffect } from "react"
import Cookies from "js-cookie";
import service from "./config/service"
import { authSuccess } from "./redux/slices/authSlice"
import { useDispatch } from "react-redux"
import { Toaster } from "react-hot-toast"

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      async function getCurrentAuthFunction() {
        try {
          const { data } = await service.getAuth();
          dispatch(authSuccess(data));
        } catch (error) {
          console.log(error);
          navigate('/');
        }
      };
      getCurrentAuthFunction();
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <Toaster position="top-right" reverseOrder={true} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RootLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="users" element={<Users />} />
          <Route path="books" element={<Books />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App