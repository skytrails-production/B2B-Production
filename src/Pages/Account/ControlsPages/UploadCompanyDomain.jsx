import React, { useState } from 'react';
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from '../../../Constants/constant';

function UploadCompanyDomain({ userId }) {
    const [companyDomain, setCompanyDomain] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleDomainChange =(e)=>{
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
        <>
            <div style={{ marginTop: '40px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '45px' }}>Update Domain</div>

            <div className="cardHolder"
                style={{
                    position: 'relative',
                    width: '50%',
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    marginLeft: '20%',
                    height: '20em',
                    boxShadow: '12px 9.5px 8px 10px #b9b1b1',
                    marginTop: '50px',
                }}
            >
                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30} />
                        </div>
                    )}
                    <input
                        type="text"
                        value={companyDomain}
                        placeholder='Please Enter Domain'
                        style={{
                            borderColor: 'rgb(50, 42, 52)',
                            borderRadius: '10px',
                            width: '50%',
                            marginLeft: '30%',
                            color: 'darkblue',
                            fontWeight: '500',
                            backdropFilter: 'saturate(2)',
                            marginTop: '62px',
                            padding: '25px',
                        }}
                        id="fileInput"
                        onChange={handleDomainChange}
                    />
                    <input type="hidden" name="userId" value={userId} />
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button type="submit"
                            style={{
                                width: '20%',
                                padding: '6.5px',
                                marginTop: '30px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                backgroundColor: 'rgb(14,75,150)',
                                boxShadow: '5px 4px #dce0ec',
                                fontSize: 'larger',
                                color: 'white',
                                position: 'relative',
                                marginLeft: '45%',
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
        </>
    );
}

export default UploadCompanyDomain;
