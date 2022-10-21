import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {

    const {data, loading} = useFetch("http://localhost:8000/api/bookees/countByRegion")

    const images = [
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
        "https://bafybeihdcriwfoqtvbjyd5sgrqcr3aivfjfbk2adynzytoyvukgcgp6p4y.ipfs.nftstorage.link/africa.jpg",
    ]

    return (
        <div className="pList">
            {loading ? ( 
                "loading" 
            )   :   (
                <>
                    {data && images.map((img, i)=>(
                        <div className="pListItems" key={i}>
                            <Link to={`/bookees/region/${data[i]?.region}`}>
                            <img src={img} alt="" className="pListImg" />
                            <div className="pListTitles">
                                <h1>{data[i]?.region}</h1>
                                <h2>{data[i]?.count} Musicians</h2>
                            </div>
                            </Link>
                        </div>
                    ))}
                </>
            )} 
        </div>
    )
}

export default PropertyList