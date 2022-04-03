import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//importing components
import Cookies from "./pages/Cookies/Cookies";

function Root() {
return(

<>

<Router>

    <Routes>
        <Route exact path="/" element={<Cookies/>}/>
    </Routes>

</Router>

</>

)
}

export default Root;