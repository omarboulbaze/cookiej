import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//importing components
import Navbar from "./pages/Components/Navbar/Navbar";
import Cookies from "./pages/Cookies/Cookies";
import Add from "./pages/Add/Add";
import Challenges from "./pages/Challenges/Challenges";
import "./Root.css";

function Root() {


    return(

<>

<Router>
    <Routes>
        <Route  path="/" element={<Cookies/>}/>
        <Route exact path="/add" element={<Add/>}/>
        <Route exact path="/challenges" element={<Challenges/>}/>
    </Routes>
    <Navbar/>
</Router>


</>

)
}

export default Root;