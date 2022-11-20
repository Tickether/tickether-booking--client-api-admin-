
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
    {
        field: "bookName",
        headerName: "Name",
        width: 330,
    },
    {
        field: "bookingDate",
        headerName: "Date",
        width: 230,
    },
    {
        field: "city",
        headerName: "City",
        width: 140,
    },
    {
        field: "country",
        headerName: "Country",
        width: 140,
    },
    {
        field: "offBook",
        headerName: "Off-Site Booking",
        width: 140,
    },
];
  
