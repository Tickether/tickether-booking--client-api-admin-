import React from "./listRegion.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItems from "../../components/searchItems/SearchItems";
import useFetch from "../../hooks/useFetch";


const ListRegion = () => {
    
    const location = useLocation();
    const _region = location.pathname.split("/")[3];
    const [region, setRegion] = useState(_region);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const {data, loading, reFetch} = useFetch(`http://localhost:8000/api/bookees?region=${region}&min=${min || 0}&max=${max || 10000000}`)

    console.log(_region)
    console.log(data)
    console.log(region)
    

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
                            <label>Region</label>
                            <input type="text" placeholder={region} onChange={e=>setRegion(e.target.value)} />
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

export default ListRegion