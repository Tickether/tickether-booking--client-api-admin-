import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./featured.css";


const Featured = () => {

    const {data, loading} = useFetch("https://api.tickether.io/api/bookees/countByGenre?genres=Afrobeats,Pop,HipHop")

    //console.log(data)

    return (
        <div className="featured">
            {loading ? (
                "loading please wait" 
            )   :   (
                <>
                    <div className="featuredItems">
                        <Link to={`/bookees/genre/Afrobeats`}>
                        <img src="https://bafybeihcsrqz33yvp46tjm2zvp2jdsiacgwc26monpu2xf46nvm5su5wjq.ipfs.nftstorage.link/afro.jpg" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Afrobeats</h1>
                            <h2>{data[0]} musicians</h2>
                        </div>
                        </Link>
                    </div>
                    <div className="featuredItems">
                        <Link to={`/bookees/genre/Pop`}>
                        <img src="https://bafybeiayu6gutj263jaksxr46qbeytne7lgt55rgzuvweepi2imv2k2xoq.ipfs.nftstorage.link/pop.jpeg" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Pop</h1>
                            <h2>{data[1]} musicians</h2>
                        </div>
                        </Link>
                    </div>
                    <div className="featuredItems">
                        <img src="https://bafybeib37mcuwqhdjs6r6jf2stprufgqb7ffcdwy5usk2rtmocv5crzou4.ipfs.nftstorage.link/hiphop.jpg" alt="" className="featuredImg" />
                        <div className="featuredTitles">
                            <h1>Hip Hop</h1>
                            <h2>{data[2]} musicians</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Featured;