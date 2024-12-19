import { Suspense } from "react";
import Router from "./router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                rtl={false}
                draggable
                pauseOnHover
                closeButton={true}
                style={{ width: "fit-content" }}
            />
            <div className='bg-gray-100 h-screen'>
                <Router />
            </div>
        </Suspense>
    )
}

export default App
