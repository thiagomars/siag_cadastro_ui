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
const SetorTrabalho: React.LazyExoticComponent<any> = lazy(() => import("../pages/SetorTrabalho"));
const RegiaoTrabalho: React.LazyExoticComponent<any> = lazy(() => import("../pages/RegiaoTrabalho"));
const Endereco: React.LazyExoticComponent<any> = lazy(() => import("../pages/Endereco"));
const AgrupadorAtivo: React.LazyExoticComponent<any> = lazy(() => import("../pages/AgrupadorAtivo"));
const AreaArmazenagem: React.LazyExoticComponent<any> = lazy(() => import("../pages/AreaArmazenagem"));

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
                },
                {
                    path: "setorTrabalho",
                    element: <SetorTrabalho />,
                    errorElement: <NotFound />
                },
                {
                    path: "regiaoTrabalho",
                    element: <RegiaoTrabalho />,
                    errorElement: <NotFound />
                },
                {
                    path: "endereco",
                    element: <Endereco />,
                    errorElement: <NotFound />
                },
                {
                    path: "agrupador",
                    element: <AgrupadorAtivo />,
                    errorElement: <NotFound />
                },
                {
                    path: "areaArmazenagem",
                    element: <AreaArmazenagem />,
                    errorElement: <NotFound />
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;
