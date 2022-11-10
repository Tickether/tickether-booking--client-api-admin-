import React from "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import SearchItems from "../../components/searchItems/SearchItems";
import useFetch from "../../hooks/useFetch";


const List = () => {
    
    const location = useLocation()
    const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
    const [genre, setGenre] = useState(location.state.genre);
    const [region, setRegion] = useState(location.state.region);
    const [min, setMin] = useState(undefined);
    const [max, setMax] = useState(undefined);

    const {data, loading, reFetch} = useFetch(`http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/bookees?region=${region}&genre=${genre}&min=${min || 0}&max=${max || 10000000}`)

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
                            <label>Region</label>
                            <input type="text" placeholder={region} onChange={e=>setRegion(e.target.value)}/>
                        </div>
                        <div className="lsItems">
                            <label>Genre</label>
                            <input type="text" placeholder={genre} onChange={e=>setGenre(e.target.value)}/>
                        </div>
                        <div className="lsItems">
                            <label>Available</label>
                            <span>
                                <DatePicker 
                                    className='date'
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)} 
                                    minDate= {new Date()}      
                                />
                            </span>
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

export default List