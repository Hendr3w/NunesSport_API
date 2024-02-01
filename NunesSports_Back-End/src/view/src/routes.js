import Produto from "./pages/Produto";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Produto />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;