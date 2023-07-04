import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Navbar from "../../components/common/Navbar";

function ContainerLayout({ children }) {
    return (
        <div className="relative">
            <Header /> 
            <Navbar />
            <div className="relative mx-auto">
                <div className="w-full">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default ContainerLayout;
