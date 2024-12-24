import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import Form from "./Form";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Body = ()=>{

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/forgotpassword",
            element: <ForgotPassword/>
        },
        {
            path: "/form",
            element: <Form/>
        },
    ]);

    return (
        <div>
        <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;