import React, { useState } from 'react';
import axios from 'axios';
import RiseLoader from 'react-spinners/RiseLoader';
import { apiURL } from '../../../Constants/constant';
import { flexbox } from '@chakra-ui/react';
import { FaRegCircleUser } from "react-icons/fa6";
function UploadLogo({ userId }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [SelectedImage, setSelectedImage] = useState(null);


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();

            formData.append('file', file);
            formData.append('userId', userId);

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
                        setSelectedImage(selectedFile);
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
        <div style={{
            display: "flex", width: "100%",
            flexDirection: ' column'
        }}>


            <div className="cardHolder"
                style={{
                    // position: 'relative',
                    // width: '50%',

                    // backgroundColor: 'white',
                    // borderRadius: '50px',
                    // marginLeft: '20%',
                    // height: '20em',
                    // boxShadow: '12px 9.5px 8px 10px #b9b1b1',
                    // marginTop:'50px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    marginTop: "50px"
                }}

            >

                {successMessage && <div style={{ color: 'darkgreen', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{successMessage}</div>}
                {errorMessage && <div style={{ color: 'red', marginTop: '20px', textAlign: 'center', fontWeight: '700' }}>{errorMessage}</div>}
                <form onSubmit={handleSubmit} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",

                    width: '100%',
                    maxWidth: '389px',
                    backgroundColor: 'aliceblue',
                    height: '400px',
                    padding: '10px',
                    borderRadius: '8px'

                }}>
                    {loading && (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '999' }}>
                            <RiseLoader color={'blue'} loading={loading} size={30} />
                        </div>
                    )}
                    <div style={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: "#6c757d29",

                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: "100%"
                    }}>{SelectedImage ? (
                        <img style={{ width: "100%", height: "100%", borderRadius: ' 100%', }} src={URL.createObjectURL(SelectedImage)} alt="Selected Image" />) :
                        <FaRegCircleUser style={{ width: "100%" }} size={150} />
                        }
                    </div>



                    <div style={{ fontWeight: 'bold', color: 'var(--main-bg-color-secondery)', borderRadius: '8px', fontSize: '30px' }}>Upload Agent Logo</div>
                    <div style={{
                        display: "flex", alignItems: 'center', justifyContent: "center",
                        border: ".5px solid var(--main-bg-color-secondery)",
                        borderRadius: '3px',
                        padding: '4px',
                        background: '#6c757d2e'

                    }}>


                        <input type="file" accept=".jpeg,.jpg,.png" onChange={handleFileChange}
                            style={{
                                height: '100%',
                                // borderColor: 'rgb(50, 42, 52)',
                                // borderRadius: '10px',
                                // width: '50%',
                                // marginLeft: '30%',
                                // color: 'darkblue',
                                // fontWeight: '900',
                                // backdropFilter: 'saturate(2)',
                                // marginTop: '62px',
                                // padding:'25px',
                                border: "none"

                            }}
                            id="fileInput"
                        />
                        <input type="hidden" name="userId" value={userId} />
                    </div>
                    <div style={{
                        // position: 'relative', display: 'inline-block'
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center"
                    }}>
                        <button type="submit"
                            style={{
                                // width: '70px',
                                width: '130px',
                                height: '38px',
                                // padding: '6.5px',
                                // marginTop: '30px',
                                // borderRadius: '20px',
                                cursor: 'pointer',
                                backgroundColor: 'rgb(14,75,150)',
                                boxShadow: '5px 4px #dce0ec',
                                fontSize: 'larger',
                                color: 'white',
                                borderRadius: '7px'

                                // position: 'relative',
                                // marginLeft: '45%',
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

export default UploadLogo;

