import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import { useEffect } from 'react';

const Datatable = () => {
    const location = useLocation();
    const path = location.pathname.split('/')[1]
    const [list, setList] = useState([]);
    const {data, loading, error} = useFetch(`http://localhost:8000/api/${path}`)

    useEffect(()=>{
        setList(data)
    }, [data])

    console.log(data)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/${path}/${id}`)
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
                        <Link to='/books/test' style={{ textDecoration:'none' }}>
                            <div className="viewButton">View</div>
                        </Link>
                        
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
                            <button>Delete</button> 
                        </div>
                    </div>
                )
            }   
        }
    ]

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Add New Bookings
                <Link to='/users/new' className='link'>
                    Add New
                </Link>
            </div>
            <DataGrid
                rows={list}
                columns={userColumns.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                className='datagrid'
                getRowId={row=>row._id}
            />
        </div>
    );
}
  
export default Datatable;
  
