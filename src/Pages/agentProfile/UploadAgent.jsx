import React, { useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import RiseLoader from 'react-spinners/RiseLoader';
function UploadAgent({ data }) {
    console.log(data?.agentDetails[0]?._id);
    const [file, setFile] = useState(null); 
    const [loading, setLoading] = useState(false); 
    const handleSubmit = async (event) => {
        event.preventDefault(); 
       
        if (file) { 
            const formData = new FormData();
            formData.append('file', file);
            console.log("userId:", data.agentDetails[0]._id);

            formData.append('userId', data.agentDetails[0]._id);

            try {
                const res = await axios.post(
                    `${apiURL.baseURL}/skyTrails/b2b/agentlogo`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                console.log(res.data);
            } catch (error) {
                console.error('Error:', error);
            }
          
        } else {
            console.error('Error: No image selected');
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    return (
        <>
            <div style={{ marginTop: '50px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '10px' }}>Upload Agent</div>
            <div className="cardHolder">
           
                <form onSubmit={handleSubmit}>
               
                    <input type="file" accept=".jpeg,.jpg,.png" onChange={handleFileChange}
                    style={{
                        height:'75px',
                        borderColor:'rgb(50, 42, 52)',
                        borderRadius:'10px',
                        width:'50%',
                        marginLeft:'30%',
                        color:'darkblue',
                        fontWeight:'900',
                        backdropFilter:'saturate(2)',


                    }} />
                    <input type="hidden" name="userId" value={data.agentDetails[0]._id} />
                 
                    <button type="submit"
                    style={{
                        width:'20%',
                        marginLeft:'46%',
                        padding:'6.5px',
                        marginTop:'30px',
                        borderRadius:'20px',
                        cursor:'pointer',
                        backgroundColor:'rgb(14,75,150)',
                    }}
                    >Submit</button>
                </form>
            </div>
        </>
    );
}

export default UploadAgent;



