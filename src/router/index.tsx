import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard from "../layout/LayoutDashboard";
import { Equipamentos } from "../pages/Equipamentos";
// import routesImpressoes from "./impressoes";

const NotFound: React.LazyExoticComponent<any> = lazy(
    () => import("../templates/pages/NotFound")
);
const Uf: React.LazyExoticComponent<any> = lazy(() => import("../pages/Uf"));
const Pallet: React.LazyExoticComponent<any> = lazy(() => import("../pages/Pallet"));
const Deposito: React.LazyExoticComponent<any> = lazy(() => import("../pages/Deposito"));
const TipoEndereco: React.LazyExoticComponent<any> = lazy(() => import("../pages/TipoEndereco"));
const TipoArea: React.LazyExoticComponent<any> = lazy(() => import("../pages/TipoArea"));

function Router(): JSX.Element {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutDashboard />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "uf",
                    element: <Uf />,
                    errorElement: <NotFound />
                },
                {
                    path: "pallet",
                    element: <Pallet />,
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
                {
                    path: "tipoArea",
                    element: <TipoArea />,
                    errorElement: <NotFound />
                },
                {
                    path: "equipamento",
                    element: <Equipamentos />,
                    errorElement: <NotFound />
                }
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
