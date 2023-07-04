//CONTAINERS
import ContainerLayout from "./layouts/Container";
//SECTIONS
import HomeTest from "./sections/HomeTest";
import Gallery from "./sections/Gallery";
import News from "./sections/News";

function Home() {
    return (
        <ContainerLayout>
            <div className="main_container">
                <HomeTest />
                <Gallery />
                <News />
            </div>
        </ContainerLayout>
    );
}

export default Home;