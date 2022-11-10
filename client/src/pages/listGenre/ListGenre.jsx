import React from "./listGenre.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItems from "../../components/searchItems/SearchItems";
import useFetch from "../../hooks/useFetch";


const ListGenre= () => {
    
    const location = useLocation();
    const _genre = location.pathname.split("/")[3];
    const [genre, setGenre] = useState(_genre);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const {data, loading, reFetch} = useFetch(`https://api.tickether.io/api/bookees?genre=${genre}&min=${min || 0}&max=${max || 10000000}`)

    console.log(data)

    const handleReSearch = () => {
        reFetch();
    }

    return (
        <div>
            <Navbar/>
            <Header type='list' />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">Search</h1>
                        <div className="lsItems">
                            <label>Genre</label>
                            <input type="text" placeholder={genre} onChange={e=>setGenre(e.target.value)} />
                        </div>
                        <div className="lsItems">
                            <label>Budget</label>
                            <div className="lsBudget">
                                <div className="lsBudgetItems">
                                    <span className="lsBudgetText">
                                        Min Price <small>per booking</small>
                                    </span>
                                    <input type="number" onChange={e=>setMin(e.target.value)} className="lsBudgetInput" />
                                </div>
                                <div className="lsBudgetItems">
                                    <span className="lsBudgetText">
                                        Max Price <small>per booking</small>
                                    </span>
                                    <input type="number" onChange={e=>setMax(e.target.value)} className="lsBudgetInput" />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleReSearch} >Search</button>
                    </div>
                    <div className="listResults">
                        {loading ? (
                            "loading"
                        )   :   (
                            <>
                                {data.map(item=>(
                                    <SearchItems item={item} key={item._id}/>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListGenre