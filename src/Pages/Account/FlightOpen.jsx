import axios from 'axios';
import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../../Constants/constant';

const FlightOpen = () =>{
    const [data, setData] = useState([]);


  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.get(`${apiURL.baseURL}/skyTrails/flightBooking/getoneFlightsBookingById/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching flight booking:", error);
      } 
    };

    fetchData();
  }, [id]);

  console.log(data, "data");
   

    return (
        <div >hello
        </div>
    )

}


export default FlightOpen;