import "./featuredMusicians.css";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const FeaturedMusicians = () => {

    const {data, loading} = useFetch("http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/bookees?featured=true&limit=4&min=1000&max=21000")
 
    return (
        <div className="fp">
            {loading ? (
                "loading"
            )   :   (
                <>
                    {data.map((item)=>(
                        <div className="fpItems" key={item._id} >
                            <Link to={`/bookees/${item._id}`}>
                            <img src={item.image} alt="" className="fpImg" />
                            </Link>
                            <span className="fpName">{item.name}</span>
                            
                            <span className="fpGenre">{item.genre}</span>
                            <span className="fpGenre">Starting from ${item.cheapestPrice}</span>
                            
                            {item.rating && 
                                <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            } 
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedMusicians