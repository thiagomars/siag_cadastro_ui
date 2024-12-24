import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard from "../layout/LayoutDashboard";

const NotFound: React.LazyExoticComponent<any> = lazy(() => import("../templates/pages/NotFound"));
const Uf: React.LazyExoticComponent<any> = lazy(() => import("../pages/Uf"));
const Pallet: React.LazyExoticComponent<any> = lazy(() => import("../pages/Pallet"));
const Deposito: React.LazyExoticComponent<any> = lazy(() => import("../pages/Deposito"));

function Router(): JSX.Element {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutDashboard />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "uf",
                    element: <Uf/>,
                    errorElement: <NotFound />
                },
                {
                    path: "pallet",
                    element: <Pallet/>,
                    errorElement: <NotFound />
                },
                {
                    path: "deposito",
                    element: <Deposito />,
                    errorElement: <NotFound />
                },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;
