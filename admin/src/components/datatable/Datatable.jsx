import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from "../../datatablesource";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

const Datatable = () => {

    const {data, loading, error} = useFetch('http://localhost:8000/api/books')

    const [list, setList] = useState();
    

    console.log(data)
    const handleDelete = (id) => {
        //setData(data.filter(item=>item.id !== id ))
    }

    const actionColumn =[
        { 
            field:'action', 
            headerName: 'Action', 
            width:200, 
            renderCell:(params)=>{
                return (
                    <div className="cellAction">
                        <Link to='/users/test' style={{ textDecoration:'none' }}>
                            <div className="viewButton">View</div>
                        </Link>
                        
                        <div className="deleteButton" onClick={()=>handleDelete(params.row._id)}>Delete</div>
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
                rows={data}
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
  
