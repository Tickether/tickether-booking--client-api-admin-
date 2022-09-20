import "./bookee.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";



const Bookee = () => {

    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const[slideNumber, setSlideNumber] = useState(0);

    const[open, setOpen] = useState(false)

    const[openModal, setOpenModal] = useState(false)

    const {data, loading, error, } = useFetch(`http://localhost:8000/api/bookees/find/${id}`)

    const {selectedDate} = useContext(SearchContext);

    console.log(selectedDate)

    const handleOpen = (i) =>{
        setSlideNumber(i);
        setOpen(true);
    }

    const handleMove = (direction) =>{
        let newSlideNumber;

        if(direction==="l"){
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
        } else{
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1
        }

        setSlideNumber(newSlideNumber)
    };

    const { user } = useContext(AuthContext);

    const navigate = useNavigate()

    const handleClick = () => {
        if(user) {
            setOpenModal(true)
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <Navbar />
            <Header type='list' />
            {loading ? (
                "loading"
            )   :   (
                <>
                    <div className="artistContainer">
                        {open && (
                            <div className="slider">
                                <FontAwesomeIcon 
                                    icon={faCircleXmark} 
                                    className="close" 
                                    onClick={()=>setOpen(false)} 
                                />
                                <FontAwesomeIcon 
                                    icon={faCircleArrowLeft} 
                                    className="arrow" 
                                    onClick={()=>handleMove("l")}
                                />
                                <div className="sliderWrapper">
                                    <img src={data.cover[slideNumber]} alt="" className="sliderImg" />
                                </div>
                                <FontAwesomeIcon 
                                    icon={faCircleArrowRight} 
                                    className="arrow" 
                                    onClick={()=>handleMove("r")}
                                />
                            </div>
                        )}
                        <div className="artistWrapper">
                            <button className="connectBook">Connect & Book</button>
                            <h1 className="artistName">{data.name}</h1>
                            <div className="artistLocation">
                                <FontAwesomeIcon icon={faMapLocationDot}/>
                                <span>{data.city}, {data.country}</span>
                            </div>
                            <span className="artistGenre">
                                {data.genre}
                            </span>
                            <span className="artistLabel">
                                {data.label}
                            </span>
                            <div className="artistImages">
                                {data.cover.map((photo, i)=>(
                                    <div className="artistImgWrapper">
                                        <img 
                                            onClick={()=>handleOpen(i)} 
                                            src= {photo} 
                                            alt="" 
                                            className="artistImg" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="artistBookingDetails">
                                <div className="artistBookingDetailsTexts">
                                    <h1 className="artistBookingTitle">Private Show Booking - Local</h1>
                                    <p className="artistBookingDesc">
                                        much yans

                                    </p>
                                </div>
                                <div className="artistBookingDetailsPrice">
                                    <h1>Bla bla Book me</h1>
                                    <span>
                                        sdsdsd
                                    </span>
                                    <h2>
                                        <b>$12,345</b> (per booking)
                                    </h2>
                                    <button onClick={handleClick}>Connect & Book </button>
                                </div>
                            </div>
                        </div>
                        <MailList/>
                        <Footer/>
                    </div>
                </>
            )}
            {openModal && <Reserve setOpen={setOpenModal} bookeeId={id}/>}
        </div>
    );
};

export default Bookee