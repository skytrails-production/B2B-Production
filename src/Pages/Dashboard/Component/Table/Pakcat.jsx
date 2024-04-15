// import React,{useState} from 'react';
// import { apiURL } from '../../../../Constants/constant';
// import {useNavigate} from "react-router-dom";
// import axios from 'axios';
// import { CircularProgress, TextField, Button,Typography,gutterBottom,Input } from "@mui/material";

// const Pakcat=()=> {
//     const [load,setLoad]=useState(false);
//     const [message,setMessage] =useState("");
//     const [images,setImages]=useState(null);
//     const [inclusion,setInclusion]=useState('');
//     const [colorCode,setColorCode]=useState('');
//     const [headingCode ,setHeadingCode]=useState('');
//   const navigate = useNavigate();
//     const handleSubmit=async (e)=>{
//       e.preventDefault();
//       setLoad(true);
//       try{
//         const formData =new FormData();
//         formData.append('images',images);
//         formData.append('inclusion',inclusion);
//         formData.append('colorCode',colorCode);
//         formData.append('headingCode',headingCode);
//         const response =await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/createPackageCategory`,formData,{
//           headers:{
//             'Content-Type':'multipart/form-data',
//           },
//         });
//         if(response.status>=200 && response.status<300){
//           setMessage('Package created successfully!');
//           setTimeout(()=>{
//             navigate('/admin/dashboard');
//           },4000);
//         } else{
//           setMessage('Failed to create package!');
//         }
//       }catch(error){
//         console.error("error while creating packages",error)
//       }finally{
//         setLoad(false);
//       }
//     }
//   return (
//     <div className="updateFeed-div" style={{ marginTop: '50px', border: '2px solid white', padding: '80px', backgroundColor: 'rgb(255,255,255,0.8)', borderRadius: '10%', boxShadow: '8px 5px 8px 5px darkgray' }}>
//     {load && (
//         <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
//             <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
//         </div>
//     )}
//       {message && (
//                 <div
//                     style={{
//                         backgroundColor: '#d4edda',
//                         color: '#155724',
//                         padding: '10px',
//                         marginBottom: '30px',
//                         borderRadius: '5px',
//                     }}
//                 >
//                     {message}
//                 </div>
//             )}
//             <h3 style={{ textAlign: 'center' }} className="addCoupon-heading">
//                 <strong>Package Category</strong>
//             </h3>
//            <form onSubmit={handleSubmit}>
//             <input
//              type="file"
//              acept=".jpeg,.jpg,.png"
//              onChange={(e)=>setImages(e.target.files[0])}
//             />
//             <TextField
//            label="inclusion"
//            variant="outlined"
//            value={inclusion}
//            onChange={(e)=>setInclusion(e.target.value)} 
//             />
//             <TextField
//             label="colorCode"
//             variant="outlined"
//             value={colorCode}
//             onChange={(e)=>setColorCode(e.target.value)}
//             />
//             <TextField
//             label="headingCode"
//             variant="outlined"
//             value={headingCode}
//             onChange={(e)=>setHeadingCode(e.target.value)}
//             />
//             <Button className="button1" type="submit" variant="contained" color="primary">Submit</Button>
//            </form>
//             {load && (
//                 <div
//                     className="loader-overlay"
//                     style={{
//                         position: 'fixed',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         height: '100%',
//                         background: 'rgba(255,255,255,0.5)',
//                         zIndex: 9999,
//                     }}
//                 >
//                     <CircularProgress
//                         color="primary"
//                         size={50}
//                         thickness={3}
//                         style={{
//                             position: 'absolute',
//                             top: '50%',
//                             left: '49.8%',
//                             transform: 'translate(-50%,-50%)',
//                         }}
//                     />
//                 </div>
//             )}
//     </div>
//   )
// }

// export default Pakcat
import React, { useState } from 'react';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress, TextField, Button } from '@mui/material';
import { ChromePicker } from 'react-color';

const Pakcat = () => {
    const [load, setLoad] = useState(false);
    const [message, setMessage] = useState('');
    const [images, setImages] = useState(null);
    const [inclusion, setInclusion] = useState('');
    const [colorCode, setColorCode] = useState('#000000'); // Initial color value
    const [headingCode, setHeadingCode] = useState('#000000'); // Initial color value
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoad(true);
        try {
            const formData = new FormData();
            formData.append('images', images);
            formData.append('inclusion', inclusion);
            formData.append('colorCode', colorCode);
            formData.append('headingCode', headingCode);
            const response = await axios.post(
                `${apiURL.baseURL}/skyTrails/api/admin/createPackageCategory`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status >= 200 && response.status < 300) {
                setMessage('Package created successfully!');
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 4000);
            } else {
                setMessage('Failed to create package!');
            }
        } catch (error) {
            console.error('error while creating packages', error);
        } finally {
            setLoad(false);
        }
    };

    return (
        <div
            className="updateFeed-div"
            style={{
                marginTop: '50px',
                border: '2px solid white',
                padding: '80px',
                backgroundColor: 'rgb(255,255,255,0.8)',
                borderRadius: '10%',
                boxShadow: '8px 5px 8px 5px darkgray',
            }}
        >
            {load && (
                <div
                    className="loader-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.5))',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress
                        color="primary"
                        size={50}
                        thickness={3}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '49.8%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </div>
            )}
            {message && (
                <div
                    style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '10px',
                        marginBottom: '30px',
                        borderRadius: '5px',
                    }}
                >
                    {message}
                </div>
            )}
            <h3 style={{ textAlign: 'center' }} className="addCoupon-heading">
                <strong>Package Category</strong>
            </h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => setImages(e.target.files[0])}
                />
                <TextField
                    label="inclusion"
                    variant="outlined"
                    value={inclusion}
                    onChange={(e) => setInclusion(e.target.value)}
                />
                <div style={{ marginBottom: '20px' }}>
                    <p>Color Code:</p>
                    <ChromePicker
                        color={colorCode}
                        onChange={(color) => setColorCode(color.hex)}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p>Heading Code:</p>
                    <ChromePicker
                        color={headingCode}
                        onChange={(color) => setHeadingCode(color.hex)}
                    />
                </div>
                <Button
                    className="button1"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form>
            {load && (
                <div
                    className="loader-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255,255,255,0.5)',
                        zIndex: 9999,
                    }}
                >
                    <CircularProgress
                        color="primary"
                        size={50}
                        thickness={3}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '49.8%',
                            transform: 'translate(-50%,-50%)',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Pakcat;
