import './booksdatatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { bookColumns } from '../../datatablesource';

const BooksDatatable = () => {
    // get booker/UID from local storage 
    const booker = JSON.parse(localStorage.getItem('user'))

    // filter bookee from UID(aka booker)
    const bookeeid = booker.bookee[0]

    const [list, setList] = useState([]);
    const {data, loading, error} = useFetch(`http://localhost:8000/api/bookees/books/${bookeeid}`)

    useEffect(()=>{
        setList(data)
    }, [data])
  
    console.log(data)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/books/${id}`)
            setList(list.filter((item)=>item._id !== id ))
        } catch (err) {}
        
    }

    const actionColumn =[
        { 
            field:'action', 
            headerName: 'Action', 
            width:200, 
            renderCell:(params)=>{
                return (
                    <div className="cellAction">
                        <Link to={`/books/test`} style={{ textDecoration:'none' }}>
                            <div className="viewButton">View</div>
                        </Link>
                        
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
                            <button>Delete</button> 
                        </div>
                    </div>
                );
            },   
        },
    ];

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Books
                <Link to={`/books/new`} className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                rows={list}
                columns={bookColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                className='datagrid'
                getRowId={(row)=>row._id}
            />
        </div>
    );
}
  
export default BooksDatatable;
  
