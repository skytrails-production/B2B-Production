import React, { useState } from 'react';
import axios from 'axios';
import { apiURL } from '../../Constants/constant';
import RiseLoader from 'react-spinners/RiseLoader';

function UploadAgent({ data }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();

            formData.append('file', file);
            formData.append('userId', data.agentDetails[0]._id);

            try {
                setLoading(true); // Start loading
                const res = await axios.post(
                    `${apiURL.baseURL}/skyTrails/b2b/agentlogo`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                // console.log(res.data);
                setSuccessMessage('Image uploaded successfully!');
                setFile(null); // Reset file input after successful upload
                setTimeout(() => {
                    setSuccessMessage('');
                    clearFileInput();
                }, 3000); 
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            console.error('Error: No image selected');
            setErrorMessage('Please select an image or a valid image.');
            setTimeout(() => {
                setErrorMessage('');
                clearFileInput();
            }, 3000);

        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            if (selectedFile.type.includes('image')) {
                const img = new Image();
                img.onload = function () {
                    if (this.width <= 80 && this.height <= 80) {
                        setFile(selectedFile);
                        setErrorMessage('');
                    } else {
                        console.error('Please select an image with dimensions upto 80x80.');
                        setErrorMessage('Please select an image with dimensions upto 80x80.');
                        setFile(null);
                        clearFileInput();
                    }
                };
                img.src = URL.createObjectURL(selectedFile);
            } else {
                console.error('Please select a valid image file.');
                setErrorMessage('Please select a valid image file.');
                setFile(null);
                clearFileInput();
            }
        } else {
            // No file selected, reset file state and show "No file chosen"
            setFile(null);
            clearFileInput();
        }
    };

    const clearFileInput = () => {
        document.getElementById('fileInput').value = '';
    };

    return (
        <>
            <div style={{ marginTop: '40px', fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px', marginLeft: '45px' }}>Upload Agent</div>

            <div className="cardHolder"
                style={{
                    position: 'relative',
                    width: '50%',
                    backgroundColor: 'white',
                    borderRadius: '50px',
                    marginLeft: '20%',
                    height: '20em',
                    boxShadow: '12px 9.5px 8px 10px #b9b1b1',
                    marginTop:'50px',
                }}
            >
                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',zIndex:'999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30}  />
                        </div>
                    )}
                    <input type="file" accept=".jpeg,.jpg,.png" onChange={handleFileChange} 
                        style={{
                            height: '75px',
                            borderColor: 'rgb(50, 42, 52)',
                            borderRadius: '10px',
                            width: '50%',
                            marginLeft: '30%',
                            color: 'darkblue',
                            fontWeight: '900',
                            backdropFilter: 'saturate(2)',
                            marginTop: '62px',
                            padding:'25px',
                        }} 
                        id="fileInput" 
                    />
                    <input type="hidden" name="userId" value={data.agentDetails[0]._id} />
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
                                marginLeft:'45%',
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

export default UploadAgent;

