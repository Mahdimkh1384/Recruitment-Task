import Index from "./Pages/Index/Index"
import Todos from "./Pages/Todos/Todos"
import UserPanel from "./Pages/UserPanel/UserPanel"
import Weather from "./Pages/Weather/Weather"
import Login from "./Pages/Login/Login"

const routes = [
    { path: "/", element: <Index /> },
    { path: "/todos", element: <Todos /> },
    { path: "/my-account", element: <UserPanel /> },
    { path: "/weather", element: <Weather /> },
    { path: "/login", element: <Login /> },
]

export default routes