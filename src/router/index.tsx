import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LayoutDashboard from "../layout/LayoutDashboard";
// import routesImpressoes from "./impressoes";

const NotFound: React.LazyExoticComponent<any> = lazy(() => import("../templates/pages/NotFound"));
const Uf: React.LazyExoticComponent<any> = lazy(() => import("../pages/Uf"));

function Router(): JSX.Element {
    const router = createBrowserRouter([
        // {
        //     path: "/login",
        //     element: <></>,
        //     errorElement: <NotFound />,
        //     children: [
        //         {
        //             path: "",
        //             element: <p>login</p>,
        //             errorElement: <NotFound />
        //         }
        //     ]
        // },
        {
            path: "/",
            element: <LayoutDashboard />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "uf",
                    element: <Uf/>,
                    errorElement: <NotFound />
                }
            ]
        },
        // routesPaginas,
        // routesImpressoes,
        // routesCadastro
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;
