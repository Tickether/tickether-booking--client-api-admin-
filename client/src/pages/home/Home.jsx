import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/features/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedMusicians from "../../components/featuredMusicians/FeaturedMusicians";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";


const Home = () => {
    return (
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
                <h1 className="homeTitle">Browse by Location</h1>
                <PropertyList/>
                <h1 className="homeTitle">Featured Artists</h1>
                <FeaturedMusicians/>
                <MailList/>
                <Footer/>
            </div>
        </div>
    )
}

export default Home