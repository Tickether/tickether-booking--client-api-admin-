import "./bookings.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { DataGrid } from '@mui/x-data-grid';
import { bookingColumns } from "../../datatablesource";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";


const Bookings = () => {

    // get booker/UID from local storage 
    const user = JSON.parse(localStorage.getItem('user'))

    const [list, setList] = useState([]);
    const {data} = useFetch(`http://tickether-env.eba-38hrijp2.ap-northeast-1.elasticbeanstalk.com/api/bookers/bookings/${user._id}`)

    console.log(data)

    useEffect(()=>{
        setList(data)
    }, [data])


    return (
        <div className="bookings">
            <Navbar/>
            <Header type='list' />
            <div className="bookingsContainer">
                <div className="datatable">
                    <div className="datatableTitle">
                        Bookings
                    </div>
                    <DataGrid
                        rows={list}
                        columns={bookingColumns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        className='datagrid'
                        getRowId={(row)=>row._id}
                    />
                </div>
            </div>
        </div>
    )
}

export default Bookings