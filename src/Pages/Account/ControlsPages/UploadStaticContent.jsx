import React, { useEffect, useState } from "react";
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from "../../../Constants/constant";
import "./controlsPages.css"

function UploadStaticContent({ userId }) {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [OperationalAddress, setOperationalAddress] = useState('');
    const [RegisteredAddress, setRegisteredAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    // agentId,title,description,type,contactNumber,email,OperationalAddress,RegisteredAddress,latitude,longitude,

    const handleSubmit = async (e) => {

        // Input validation
        if (!type) {
            setErrorMessage('All fields are required');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Invalid email format');
            return;
        }
        setLoading(true);
        const payload = {
            agentId: userId,
            title: title,
            description: description,
            type: type,
            contactNumber: contactNumber,
            email: email,
            OperationalAddress: OperationalAddress,
            RegisteredAddress: RegisteredAddress,
            latitude: latitude,
            longitude: longitude
        };

        try {
            e.preventDefault();
            const response = await axios.post(`${apiURL.baseURL}/skyTrails/agent/staticContent/updateStaticContent`,
                payload,
            );
            setSuccessMessage('Required Details Uploaded Successfully!');

        } catch (err) {
            console.error("error", err);
            setErrorMessage("Something get Wrong!");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="contolsMainDiv">
            {/* <div style={{ marginTop: '40px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '45px' }}>Upload Static Content</div> */}

            {/* {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>} */}
            <div className="cardHolder"
                style={{
                    // position: 'relative',
                    // width: '50%',
                    // backgroundColor: 'white',
                    // borderRadius: '50px',
                    // marginLeft: '20%',
                    // height: '80%',
                    // boxShadow: '12px 9.5px 8px 10px #b9b1b1',
                    // overflowX: 'auto',
                    // marginTop:'1.5%',
                }}
            >
                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} className="contolsFrom" style={{ display: 'grid' }}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30} />
                        </div>
                    )}
                    <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px' }}>Upload Static Content</div>
                    <input type="hidden" name="userId" value={userId} />
                    <input type="text" name="title" placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }} 
                    />
                    <input type="text" name="description" placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }}
                     />
                    {/* <input type="text" name="type" placeholder="Enter type like flight,bus,etc"  onChange={(e) => setType(e.target.value)} style={{ width:"50%"}}/> */}
                    <select name="type" onChange={(e) => setType(e.target.value)} 
                    // style={{ width: "70%", padding: '0px', marginLeft: '40px' }}
                    >
                        <option value="">Select Type</option>
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
                    <input type="number" name="contactNumber" placeholder="Enter ContactNumber" onChange={(e) => setContactNumber(e.target.value)}
                    //  style={{ width: "70%", marginLeft: '40px' }} 
                     />
                    <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }} 
                    />
                    <input type="text" name="OperationalAddress" placeholder="Enter Operational Address" onChange={(e) => setOperationalAddress(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }} 
                    />
                    <input type="text" name="RegisteredAddress" placeholder="Enter Registered Address" onChange={(e) => setRegisteredAddress(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }} 
                    />
                    <input type="text" name="latitude" placeholder="Enter Latitude" onChange={(e) => setLatitude(e.target.value)}
                    //  style={{ width: "70%", marginLeft: '40px' }} 
                     />
                    <input type="text" name="longitude" placeholder="Enter Longitude" onChange={(e) => setLongitude(e.target.value)} 
                    // style={{ width: "70%", marginLeft: '40px' }}
                     />
                    <button type="submit"
                        style={{
                            width: '70%',
                            padding: '6.5px',

                            borderRadius: '20px',
                            cursor: 'pointer',
                            backgroundColor: 'rgb(14,75,150)',
                            boxShadow: '5px 4px #dce0ec',
                            fontSize: 'larger',
                            color: 'white',

                            marginLeft: '40px',
                            display: 'block'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>

        </div>
    )
}
export default UploadStaticContent;