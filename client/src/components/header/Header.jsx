import './header.css';
import "react-datepicker/dist/react-datepicker.css";
import { faGlobe, faMusic, faPersonWalkingArrowLoopLeft, faMasksTheater, faUsersRays, faWandMagicSparkles, faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';


const Header = ({type}) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [genre, setGenre] = useState("");
    const [region, setRegion] = useState("");
    
    const navigate = useNavigate()

    const {dispatch} = useContext(SearchContext);
    
    const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload: { genre, region, selectedDate } })
        navigate("/bookees", {state: { genre, region, selectedDate } })
    }
    
    return (
        <div className="header">
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItems active">
                        <FontAwesomeIcon icon={faMusic}/>
                        <span>Musicians</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faMasksTheater}/>
                        <span>Comedians</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faPersonWalkingArrowLoopLeft}/>
                        <span>Dancers</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faWandMagicSparkles}/>
                        <span>Magicians</span>
                    </div>
                    <div className="headerListItems">
                        <FontAwesomeIcon icon={faUsersRays}/>
                        <span>Models</span>
                    </div>
                </div>
                { type !== "list" &&
                    <>
                        <h1 className="headerTitle">Book your favs rite away</h1>
                        <p className="headerDesc">
                            long tin ong tinong tinong tinong tinong tinong
                            tinong tinong tin
                        </p>
                        <div className="headerSearch">
                            <div className="headerSearchItems">
                                <FontAwesomeIcon icon={faMusic} className='headerIcon'/>
                                <input 
                                    type="text" 
                                    placeholder='What genre do you want?' 
                                    className='headerSearchInput'
                                    onChange={e=>setGenre(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItems">
                                <FontAwesomeIcon icon={faGlobe} className='headerIcon'/>
                                <input 
                                    type="text" 
                                    placeholder='Where is the artist from?' 
                                    className='headerSearchInput'
                                    onChange={e=>setRegion(e.target.value)}
                                />
                            </div>
                            <div className="headerSearchItems">
                                <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                                <span className='headerSearchText'>
                                    <DatePicker 
                                        className='date'
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)} 
                                        minDate= {new Date()}
                                        showTimeSelect
                                        timeIntervals={360}
                                        timeFormat="p"
                                        dateFormat="Pp"    
                                        placeholderText="Select date & time"

                                    />
                                </span>
                            </div>
                            <div className="headerSearchItems">
                                <button className="headerBtn" onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Header
