//COMPONENTS
import Header from "../components/common/Header";
import Home from "./sections/Home";
import Gallery from "./sections/Gallery";
import News from "./sections/News";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Login from "../components/common/Login";
//CONTAINERS

//LAYOUT
/**
 * 
 *  
 */
function Homepage() {
    return (
        <div className="container">
        <Header /> 
         <Navbar />
         <Home />
         <Gallery />
         <News />
         <Footer />
        </div>
    );
}

export default Homepage;