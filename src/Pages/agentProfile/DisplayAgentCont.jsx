import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from '../../Constants/constant';

function DisplayAgentCont() {
    const [loading, setLoading] = useState(false);
    const [cont, setCont] = useState([]);
    const [type, setType] = useState('ALL'); // Default type

    useEffect(() => {
        async function fetchContent() {
            try {
                setLoading(true);
                let endpoint = '';
                if (type === 'ALL') {
                    endpoint = '/skyTrails/agent/staticContent/getAllAgentStaticContent';
                } else {
                    endpoint = '/skyTrails/agent/staticContent/getAgentStaticContent';
                }
                const response = await axios.get(`${apiURL.baseURL}${endpoint}`, {
                    params: {
                        type: type,
                    },
                });
               // console.log(response.data.result, "========================================");
                if(type === 'ALL'){
                    setCont(response.data.result);
                }else{
                    setCont([response.data.result]);
                }
               
               // console.log(response, "++++++++++++++++++++++++++++++++++++");
            } catch (error) {
                console.error("error", error);
            } finally {
                setLoading(false);
            }
        }
        fetchContent();
    }, [type]);

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <>
            <div className='card-hold'>

               
                <div className='top' style={{ marginLeft: '5%', marginTop: '20px', fontWeight: '700', fontSize: '40px' }}>Static Details</div>
                <div className='down'>
                    <select value={type} onChange={handleTypeChange} style={{ padding: '0px', marginLeft: '30px', width: '90%' }}>
                        <option value="ALL">ALL</option>
                        <option value="FLIGHTS">Flights</option>
                        <option value="HOTELS">Hotels</option>
                        <option value="BUSES">Buses</option>
                        <option value="TRAINS">Trains</option>
                        <option value="HOLIDAYPACKAGE">Holiday Packages</option>
                        <option value="CABS">Cabs</option>
                        <option value="TRAVELINSURENCE">Travel Insurance</option>
                        <option value="FORXCARD">Forex Card</option>
                        <option value="PRODUCTOFFERING">Product Offering</option>
                        <option value="ABOUTTHESITE">About the Site</option>
                        <option value="QUICKLINKS">Quick Links</option>
                        <option value="IMPORTANTLINKS">Important Links</option>
                        <option value="CORPORATETRAVEL">Corporate Travel</option>
                        <option value="TNC">Terms and Conditions</option>
                        <option value="PRIVACYPOLICY">Privacy Policy</option>
                        <option value="ABOUTUS">About Us</option>
                        <option value="RETURNPOLICY">Return Policy</option>
                        <option value="BOOKINGPOLICY">Booking Policy</option>
                        <option value="QUESTION">Question</option>
                        <option value="CONTACTUS">Contact Us</option>
                        <option value="CancellationsPaymentPolicy">Cancellations and Payment Policy</option>
                        <option value="DISCLAIMER">Disclaimer</option>
                    </select>
                    <div className='staticData' style={{ border: '2px solid grey', maxHeight: '400px', overflow: 'auto', marginLeft: '30px', width: '90%',borderRadius:'10px' }}>

                        {loading? (
                            <RiseLoader color={'#36D7B7'} loading={loading} size={30} style={{position:'fixed',
                        top:'50%',marginLeft:'25%', marginRight:'auto',transform:'translateY(-50%)'
                        }}/>
                        ) : cont.length === 0 ? (
                            <p>No data available</p>
                        ) : (
                            <table style={{ margin: '0' }}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody style={{ backgroundColor: '#b6bbc4' }}>

                                {Array.isArray(cont) ? (
                           // If `cont` is an array
                              cont.map((item, index) => (
                                 <tr key={index}>
                     <td style={{ color: 'black' }}>{item?.title || "No Data"}</td>
                       <td style={{ color: 'black' }}>{item?.status || "No Data"}</td>
                         <td style={{ color: 'black' }}>{item?.type || "No Data"}</td>
                       <td style={{ color: 'black' }}>{item?.description || `${item?.contactNumber || 'No Data'} ${item?.email || ''}` || 'No Data'}
                      </td>
                      </tr>
                      ))
                      ) : (
                     // If `cont` is not an array
                     Object.entries(cont).map(([key, value]) => (
                        
                                  <tr key={key}>
                              <td style={{ color: 'black' }}>{key}</td>
                            <td style={{ color: 'black' }}>{value}</td>
                         </tr>
                           ))
                               )}

                                </tbody>
                            </table>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayAgentCont;
