import "./searchItems.css";
import { Link } from "react-router-dom";

const SearchItems = ({item}) => {
    return (
        <div className="searchItems">
            <img 
                src={item.image} 
                alt="" 
                className="siImg" 
            />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siGenre">{item.genre}</span>
                <span className="siRegion">{item.city}, {item.country}</span>
                <span className="siLabel">{item.label}</span>
                <span className="siTerms">Read booking info carefully</span>
                <span className="siTermsDesc">Terms and Conditions apply to bookings</span>
            </div>
            <div className="siDetails">
                {item.rating && 
                    <div className="siRating">
                        <span>Execellent</span>
                        <button>{item.rating}</button>
                    </div>
                }
                <div className="siDetailsTexts">
                    <span className="siPrice">${item.cheapestPrice}</span>
                    <span className="siTax">excluding gas fees</span>
                    <Link to={`/bookees/${item._id}`}>
                        <button className="siCheckAvail">See Availabilty</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItems