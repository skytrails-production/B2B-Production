import React, { useState } from 'react';
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from '../../Constants/constant';
function Social({ data }) {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [instaId, setInstaId] = useState('');
    const [facebookId, setFacebookId] = useState('');
    const [googleId, setGoogleId] = useState('');
    const [linkedinId, setLinkedinId] = useState('');
    const [images, setImages] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!instaId && !facebookId && !googleId && !linkedinId && !images) {
            setErrorMessage('Please fill in at least one detail.');
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('agentId', data.agentDetails[0]._id);
        formData.append('instaId', instaId);
        formData.append('facebookId', facebookId);
        formData.append('googleId', googleId);
        formData.append('linkedinId', linkedinId);
        formData.append('images', images);
        try {
            const response = await axios.put(`${apiURL.baseURL}/skyTrails/agent/updatePersonalProfile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('Required Details Uploaded Successfully!');
        } catch (err) {
            console.error("error", err);
            setErrorMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div style={{ marginTop: '40px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '45px' }}>Upload Social Account</div>
            <div className="cardHolder"
                style={{
                    position: 'relative',
                    width: '50%',
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    marginLeft: '20%',
                    height: '80%',
                    boxShadow: '12px 9.5px 8px 10px #b9b1b1',
                    overflowX: 'auto',
                    marginTop:'1.5%',
                }}
            >
                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} style={{marginLeft:'15%',marginTop:'10%'}}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30} />
                        </div>
                    )}
                    <input type="hidden" name="userId" value={data.agentDetails[0]._id} />
                    <input type="text" name="instaId" placeholder="Enter Insta Id" onChange={(e) => setInstaId(e.target.value)} style={{ width: '70%' }} />
                    <input type="text" name="facebookId" placeholder="Enter Facebook Id" onChange={(e) => setFacebookId(e.target.value)} style={{ width: '70%' }} />
                    <input type="text" name="googleId" placeholder="Enter Google Id" onChange={(e) => setGoogleId(e.target.value)} style={{ width: '70%' }} />
                    <input type="text" name="linkedinId" placeholder="Enter Linkedin Id" onChange={(e) => setLinkedinId(e.target.value)} style={{ width: '70%' }} />
                    <input type="file" accept="jpeg,jpg,png" onChange={(e) => setImages(e.target.files[0])}  style={{width:'70%'}}/>
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
                            marginLeft: '0 auto',
                            display: 'block'
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}
export default Social;
