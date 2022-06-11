import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


//importing components
import Navbar from "./pages/Components/Navbar/Navbar";
import Cookies from "./pages/Cookies/Cookies";
import Add from "./pages/Add/Add";
import Challenges from "./pages/Challenges/Challenges";
import "./Root.css";

// Using dotenv variable dynamically depending on the status of the app (developement or production)
export const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;


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