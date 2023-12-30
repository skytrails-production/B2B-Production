import React, { useEffect,useState } from "react";
import Table from "react-bootstrap/Table";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getVisaAction } from "../../../../../Redux/getVisa/actionVisaData";
import { apiURL } from "../../../../../Constants/constant";



const VisaData = () => {
  const dispatch = useDispatch();
  const reducerState = useSelector((state) => state);
  const [visaData, setVisaData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getVisaAction());
        const newData = reducerState?.getVisaData?.visaData?.data?.data || [];
        setVisaData(newData);
      } catch (error) {
        // Handle any errors here
        console.error('Error fetching visa data:', error);
      }
    };

    fetchData();
  }, [dispatch]);


  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 110,
      editable: true,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 150,
      editable: true,
    },
    {
      field: "visaType",
      headerName: "visaType",
      width: 110,
      editable: true,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 110,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row.deleteId)} 
        style={{ backgroundColor: 'red' }}>Delete</button>
      ),
    },
  ];
  

  

  const handleDelete = async  (id) => {
    try {
      // Make an HTTP DELETE request to your backend API to delete the data by _id
      await fetch(`${apiURL.baseURL}/skyTrails/deleteVisa/${id}`, {
        method: "DELETE",
      });

      setVisaData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Delete Successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);


    } catch (error) {
      // Handle any errors here
      console.error(`Error deleting row with ID ${id}:`, error);
    }
  };
  // console.log("visaData", visaData);

  const transformData = (visaData) => {
    return visaData?.map((item, index) => ({
      id: index + 1,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      visaType: item.visaType,
      deleteId:item._id
    }));
  };

  
  return (
    <>
      <Box height={100} />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={transformData(visaData)}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
};

export default VisaData;
