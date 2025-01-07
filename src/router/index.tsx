import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard from "../layout/LayoutDashboard";

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
const Caixa: React.LazyExoticComponent<any> = lazy(() => import("../pages/Caixa"));
const CaixaForm: React.LazyExoticComponent<any> = lazy(() => import("../pages/Caixa/form"));
const Operador: React.LazyExoticComponent<any> = lazy(() => import("../pages/Operador"));
const Equipamentos: React.LazyExoticComponent<any> = lazy(() => import("../pages/Equipamentos"));
const Parametro: React.LazyExoticComponent<any> = lazy(() => import("../pages/Parametro"));
const Turno: React.LazyExoticComponent<any> = lazy(() => import("../pages/Turno"));
const Transportadora: React.LazyExoticComponent<any> = lazy(() => import("../pages/Transportadora"));
const TransportadoraForm: React.LazyExoticComponent<any> = lazy(() => import("../pages/Transportadora/form"));
const Programa: React.LazyExoticComponent<any> = lazy(() => import("../pages/Programa"));

const NotFound: React.LazyExoticComponent<any> = lazy(() => import("../templates/pages/NotFound"));

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
                    path: "equipamentos",
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
                {
                    path: "operador",
                    element: <Operador />,
                    errorElement: <NotFound />
                },
                {
                    path: "parametro",
                    element: <Parametro />,
                    errorElement: <NotFound />
                },
                {
                    path: "turno",
                    element: <Turno />,
                    errorElement: <NotFound />
                },
                {
                    path: "transportadora",
                    element: <Transportadora />,
                    errorElement: <NotFound />
                },
                {
                    path: "transportadora/form/:id?",
                    element: <TransportadoraForm />,
                    errorElement: <NotFound />
                },
                {
                    path: "programa",
                    element: <Programa />,
                    errorElement: <NotFound />
                },
                {
                    path: "caixa",
                    element: <Caixa />,
                    errorElement: <NotFound />
                },
                {
                    path: "caixa/form/:id?",
                    element: <CaixaForm />,
                    errorElement: <NotFound />
                },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default Router;