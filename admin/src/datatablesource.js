export const bookColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "bookName",
        headerName: "Name",
        width: 230,
    },
    {
        field: "bookType",
        headerName: "Type",
        width: 230,
        
    },
    {
        field: "overBooked",
        headerName: "Status",
        width: 160,
        renderCell: (params) => {
            return (
                <div className={`cellWithStatus ${params.row.status}`}>
                    {params.row.overBooked}
                </div>
            );
        },
    },
  ];
   
export const bookingColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
        field: "booker",
        headerName: "Name",
        width: 230,
    },
    {
        field: "book",
        headerName: "Type",
        width: 230,
    },
    {
        field: "bookingDate",
        headerName: "Fee",
        width: 100,
    },
    {
        field: "city",
        headerName: "Address",
        width: 160,
    },
    {
        field: "country",
        headerName: "Status",
        width: 160,
    },
];
  
