import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard from "../layout/LayoutDashboard";

const NotFound: React.LazyExoticComponent<any> = lazy(() => import("../templates/pages/NotFound"));
const Uf: React.LazyExoticComponent<any> = lazy(() => import("../pages/Uf"));
const Pallet: React.LazyExoticComponent<any> = lazy(() => import("../pages/Pallet"));
const Deposito: React.LazyExoticComponent<any> = lazy(() => import("../pages/Deposito"));
const TipoEndereco: React.LazyExoticComponent<any> = lazy(() => import("../pages/TipoEndereco"));

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
                {
                    path: "tipoEndereco",
                    element: <TipoEndereco />,
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
