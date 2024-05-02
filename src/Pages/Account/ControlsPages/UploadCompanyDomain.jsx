import React, { useState } from 'react';
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from '../../../Constants/constant';
import "./controlsPages.css"

function UploadCompanyDomain({ userId }) {
    const [companyDomain, setCompanyDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleDomainChange = (e) => {
        setErrorMessage(''); // Corrected the typo here
        setCompanyDomain(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (companyDomain) {
            const payload = {
                agentId: userId,
                companyDomain: companyDomain
            };
            try {
                setLoading(true); // Start loading
                const res = await axios.put(
                    `${apiURL.baseURL}/skyTrails/agent/updatedomain`,
                    payload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setSuccessMessage(res.data.message);
                setCompanyDomain(''); // Reset input after successful update
            } catch (error) {
                console.error('Error:', error.response.data.message);
                setErrorMessage(error.response.data.message);
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            setErrorMessage('Please Enter Domain Name.');
        }
        setCompanyDomain('');
    };

    return (
        <div className="contolsMainDiv">
            {/* <div 
            style={{ marginTop: '40px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '45px' }}>Update Domain</div> */}

            <div className="cardHolder"
            // style={{
            //     position: 'relative',
            //     width: '50%',
            //     backgroundColor: 'white',
            //     borderRadius: '50px',
            //     marginLeft: '20%',
            //     height: '20em',
            //     boxShadow: '12px 9.5px 8px 10px #b9b1b1',
            //     marginTop: '50px',
            // }}
            >
                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form className="contolsFrom" onSubmit={handleSubmit}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30} />
                        </div>
                    )}
                    <div style={{ marginTop: '20px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px' }}>Update Domain</div>
                    <input
                        type="text"
                        value={companyDomain}
                        placeholder='Please Enter Domain'
                        // style={{
                        //     borderColor: 'rgb(50, 42, 52)',
                        //     borderRadius: '10px',
                        //     width: '50%',
                        //     marginLeft: '30%',
                        //     color: 'darkblue',
                        //     fontWeight: '500',
                        //     backdropFilter: 'saturate(2)',
                        //     marginTop: '62px',
                        //     padding: '25px',
                        // }}
                        id="fileInput"
                        onChange={handleDomainChange}
                    />
                    <input type="hidden" name="userId" value={userId} />
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <button type="submit"
                            style={{
                                width: '70%',
                                padding: '6.5px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                backgroundColor: ' rgb(14, 75, 150)',
                                boxShadow: 'rgb(220, 224, 236) 5px 4px',
                                fontSize: 'larger',
                                color: 'white',
                                // margin-left: 40px;
                                // display: block;
                            }}
                            disabled={loading}
                        >
                            {loading && (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <RiseLoader color={'#ffffff'} loading={loading} size={15} />
                                </div>
                            )}
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadCompanyDomain;
