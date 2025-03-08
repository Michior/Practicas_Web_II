import { BrowserRouter, Route, Routes } from "react-router";
import { IndexPage } from "./pages/IndexPage";
import { FavoritePage } from "./pages/FavoritePage";
import Layout from "./layout/Layout";


const App = () => { 
    return ( 
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<IndexPage/>} />
                    <Route path="/favoritos" element={<FavoritePage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    ) 
} 

export default App;