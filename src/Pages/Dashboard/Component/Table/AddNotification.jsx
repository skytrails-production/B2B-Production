import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Grid,
    Typography,
    Stack,
    CircularProgress
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiURL } from '../../../../Constants/constant';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
//import { useHistory } from 'react-router-dom';

// const AddNotification = () => {
//     const [title, setTitle] = useState('');
//     const [message, setMessage] = useState('');
//     const [imageUrl, setImageUrl] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!title || !message) {
//             toast.error('Please fill in both Title and Message fields.');
//             return;
//         }

//         try {
//             const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     messageTitle: title,
//                     messageBody: message,
//                     imageUrl: imageUrl,
//                     notificationType: 'type'
//                 })
//             });

//             console.log('Notification sent successfully:', response.data);
//             toast.success('Notification sent successfully!');
//         } catch (error) {
//             console.error('Error sending notification:', error);
//             toast.error('Failed to send notification. Please try again later.');
//         }

//         setTitle('');
//         setMessage('');
//         setImageUrl('');
//         history.push('/'); 
//     };

//     const handleSpecialNotification = async () => {
//         try {
//             const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
                
//                 messageTitle: title,
//                 messageBody: message,
//                 imageUrl: imageUrl,
//                 notificationType: 'PEFA2024'
//             });

           
//             toast.success('PEFA2024 Notification sent successfully!');
//         } catch (error) {
//             console.error('Error sending special notification:', error);
//             toast.error('Failed to send special notification. Please try again later.');
//         }
//     };

//     return (
//         <div spacing={2} sx={{ justifyContent: 'center', backgroundColor: "white" }} className='form-containers'>

//             <Grid item xs={12}>
//                 <Paper sx={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
//                     <header className="sectionagent headersagent">
//                         <div className="headead">
//                             <h2>Notification</h2>
//                         </div>
//                     </header>
//                     <form onSubmit={handleSubmit}>
//                         <Stack spacing={2}>
//                             <TextField
//                                 label="Title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 fullWidth
//                                 required
//                                 InputProps={{
//                                     sx: {

//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <TextField
//                                 label="Message"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 fullWidth
//                                 multiline
//                                 minRows={3}
//                                 required
//                                 InputProps={{
//                                     sx: {

//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                              <TextField
//                                  label="Image Url"
//                                  value={imageUrl}
//                                 onChange={(e) => setImageUrl(e.target.value)}
//                                 fullWidth
//                                 // multiline
//                                 // minRows={3}
                                
//                                 InputProps={{
//                                     sx: {

//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 sx={{
//                                     mt: 2,
//                                     backgroundColor: '#21325D',
//                                     color: '#fff',
//                                     '&:hover': {
//                                         backgroundColor: '#405269',
//                                         color:'#fff'
//                                     },
//                                 }}
//                             >
//                                 Send Notification
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 sx={{
//                                     mt: 2,
//                                     backgroundColor: '#21325D', // Orange color
//                                     color: '#fff',
//                                     '&:hover': {
//                                         backgroundColor: '#21325F',
//                                         color:'#fff' // Darker orange color
//                                     },
//                                 }}
//                                 onClick={handleSpecialNotification}
//                             >
//                                 Send Special Notification (PEFA2024)
//                             </Button>
//                         </Stack>
//                     </form>

//                     <ToastContainer />
//                 </Paper>
//             </Grid>
//         </div>
//     );
// };

// export default AddNotification;
// const AddNotification = () => {
//     const [title, setTitle] = useState('');
//     const [message, setMessage] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     //const history = useHistory(); // Get history object
//     const navigate = useNavigate(); 
//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!title || !message) {
//             toast.error('Please fill in both Title and Message fields.');
//             return;
//         }

//         try {
//             const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     messageTitle: title,
//                     messageBody: message,
//                     imageUrl: imageUrl,
//                     notificationType: 'type'
//                 })
//             });

//             console.log('Notification sent successfully:', response.data);
//             toast.success('Notification sent successfully!');
//             setTitle('');
//             setMessage('');
//             setImageUrl('');
//             navigate('/admin/dashboard'); // Redirect to home page after successful notification
//         } catch (error) {
//             console.error('Error sending notification:', error);
//             toast.error('Failed to send notification. Please try again later.');
//         }
//     };

//     const handleSpecialNotification = async () => {
//         try {
//             const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
//                 messageTitle: title,
//                 messageBody: message,
//                 imageUrl: imageUrl,
//                 notificationType: 'PEFA2024'
//             });

//             toast.success('PEFA2024 Notification sent successfully!');
//             setTitle('');
//             setMessage('');
//             setImageUrl('');
//             navigate('/admin/dashboard'); // Redirect to home page after successful notification
//         } catch (error) {
//             console.error('Error sending special notification:', error);
//             toast.error('Failed to send special notification. Please try again later.');
//         }
//     };

//     return (
//         <div spacing={2} sx={{ justifyContent: 'center', backgroundColor: "white" }} className='form-containers'>
//             <Grid item xs={12}>
//                 <Paper sx={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
//                     <header className="sectionagent headersagent">
//                         <div className="headead">
//                             <h2>Notification</h2>
//                         </div>
//                     </header>
//                     <form onSubmit={handleSubmit}>
//                         <Stack spacing={2}>
//                             <TextField
//                                 label="Title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 fullWidth
//                                 required
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <TextField
//                                 label="Message"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 fullWidth
//                                 multiline
//                                 minRows={3}
//                                 required
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <TextField
//                                 label="Image Url"
//                                 value={imageUrl}
//                                 onChange={(e) => setImageUrl(e.target.value)}
//                                 fullWidth
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 sx={{
//                                     mt: 2,
//                                     backgroundColor: '#21325D',
//                                     color: '#fff',
//                                     '&:hover': {
//                                         backgroundColor: '#405269',
//                                         color: '#fff'
//                                     },
//                                 }}
//                             >
//                                 Send Notification
//                             </Button>
//                             <Button
//                                 variant="contained"
//                                 sx={{
//                                     mt: 2,
//                                     backgroundColor: '#21325D',
//                                     color: '#fff',
//                                     '&:hover': {
//                                         backgroundColor: '#21325F',
//                                         color: '#fff'
//                                     },
//                                 }}
//                                 onClick={handleSpecialNotification}
//                             >
//                                 Send Special Notification (PEFA2024)
//                             </Button>
//                         </Stack>
//                     </form>
//                     <ToastContainer />
//                 </Paper>
//             </Grid>
//         </div>
//     );
// };

// export default AddNotification;
// import React, { useState } from 'react';
// import {
//     TextField,
//     Button,
//     Paper,
//     Grid,
//     Typography,
//     Stack,
// } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';
// import { apiURL } from '../../../../Constants/constant';
// import { useNavigate } from 'react-router-dom';

// const AddNotification = () => {
//     const [title, setTitle] = useState('');
//     const [message, setMessage] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [notificationSent, setNotificationSent] = useState(false); // State to track if notification is sent
//     const [notload,setNotload]=useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!title || !message) {
//             toast.error('Please fill in both Title and Message fields.');
//             return;
//         }

//         try {
//             const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     messageTitle: title,
//                     messageBody: message,
//                     imageUrl: imageUrl,
//                     notificationType: 'type'
//                 })
//             });

//             console.log('Notification sent successfully:', response.data);
//             toast.success('Notification sent successfully!');
//             setTitle('');
//             setMessage('');
//             setImageUrl('');
//             setNotificationSent(true); // Set notificationSent to true
//             setTimeout(() => {
//                 navigate('/admin/dashboard'); // Redirect to home page after 5 seconds
//             }, 5000);
//         } catch (error) {
//             console.error('Error sending notification:', error);
//             toast.error('Failed to send notification. Please try again later.');
//         }
//     };
//     const handleSpecialNotification = async () => {
//         try {
//             const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
//                 messageTitle: title,
//                 messageBody: message,
//                 imageUrl: imageUrl,
//                 notificationType: 'PEFA2024'
//             });
    
//             toast.success('PEFA2024 Notification sent successfully!');
//             setTitle('');
//             setMessage('');
//             setImageUrl('');
//             setNotificationSent(true); // Set notificationSent to true
//             setTimeout(() => {
//                 navigate('/admin/dashboard'); // Redirect to home page after 5 seconds
//             }, 5000);
//         } catch (error) {
//             console.error('Error sending special notification:', error);
//             toast.error('Failed to send special notification. Please try again later.');
//         }
//     };

//     return (
//         <div spacing={2} sx={{ justifyContent: 'center', backgroundColor: "white" }} className='form-containers'>
//             <Grid item xs={12}>
//                 <Paper sx={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
//                     <header className="sectionagent headersagent">
//                         <div className="headead">
//                             <h2>Notification</h2>
//                         </div>
//                     </header>
//                     <form onSubmit={handleSubmit}>
//                         <Stack spacing={2}>
//                             <TextField
//                                 label="Title"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                                 fullWidth
//                                 required
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <TextField
//                                 label="Message"
//                                 value={message}
//                                 onChange={(e) => setMessage(e.target.value)}
//                                 fullWidth
//                                 multiline
//                                 minRows={3}
//                                 required
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <TextField
//                                 label="Image Url"
//                                 value={imageUrl}
//                                 onChange={(e) => setImageUrl(e.target.value)}
//                                 fullWidth
//                                 InputProps={{
//                                     sx: {
//                                         backgroundColor: '#f9f9f9',
//                                     },
//                                 }}
//                                 InputLabelProps={{
//                                     shrink: true,
//                                     sx: {
//                                         color: '#4B587B',
//                                     },
//                                 }}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 sx={{
//                                     mt: 2,
//                                     backgroundColor: '#21325D',
//                                     color: '#fff',
//                                     '&:hover': {
//                                         backgroundColor: '#405269',
//                                         color: '#fff'
//                                     },
//                                 }}
//                             >
//                                 Send Notification
//                             </Button>
//                             <Button
//                                  variant="contained"
//                                  sx={{
//                                      mt: 2,
//                                      backgroundColor: '#21325D',
//                                      color: '#fff',
//                                      '&:hover': {
//                                          backgroundColor: '#21325F',
//                                          color: '#fff'
//                                      },
//                                  }}
//                                  onClick={handleSpecialNotification}
//                              >
//                                Send Special Notification (PEFA2024)
//                              </Button>
//                         </Stack>
//                     </form>
//                     <ToastContainer />
//                     {notificationSent && (
//                         <Typography sx={{ mt: 2, color: 'green' }}></Typography>
//                     )}
//                 </Paper>
//             </Grid>
//         </div>
//     );
// };

// export default AddNotification;
// import React, { useState } from 'react';
// import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AddNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [notificationSent, setNotificationSent] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading state
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !message) {
            toast.error('Please fill in both Title and Message fields.');
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
                messageTitle: title,
                messageBody: message,
                imageUrl: imageUrl,
                notificationType: 'type'
            });

            toast.success('Notification sent successfully!');
            setTitle('');
            setMessage('');
            setImageUrl('');
            setNotificationSent(true);
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 5000);
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleSpecialNotification = async () => {
        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
                messageTitle: title,
                messageBody: message,
                imageUrl: imageUrl,
                notificationType: 'PEFA2024'
            });

            toast.success('PEFA2024 Notification sent successfully!');
            setTitle('');
            setMessage('');
            setImageUrl('');
            setNotificationSent(true);
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 5000);
        } catch (error) {
            console.error('Error sending special notification:', error);
            toast.error('Failed to send special notification. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='form-containers' style={{ position: 'relative' }}>
            {loading && (
                <div className="loader-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(255, 255, 255, 0.5))', zIndex: 9999 }}>
                     <CircularProgress color="primary" size={50} thickness={3} style={{ position: 'absolute', top: '50%', left: '49.8%', transform: 'translate(-50%, -50%)' }} />
                </div>
            )}
            <Grid item xs={12}>
                <Paper style={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
                    <header className="sectionagent headersagent">
                        <div className="headead">
                            <h2>Notification</h2>
                        </div>
                    </header>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                fullWidth
                                required
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#f9f9f9',
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        color: '#4B587B',
                                    },
                                }}
                            />
                            <TextField
                                label="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                fullWidth
                                multiline
                                minRows={3}
                                required
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#f9f9f9',
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        color: '#4B587B',
                                    },
                                }}
                            />
                            <TextField
                                label="Image Url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                fullWidth
                                InputProps={{
                                    sx: {
                                        backgroundColor: '#f9f9f9',
                                    },
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                    sx: {
                                        color: '#4B587B',
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading} // Disable button while loading
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#21325D',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#405269',
                                        color: '#fff'
                                    },
                                }}
                            >
                                Send Notification
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#21325D',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#21325F',
                                        color: '#fff'
                                    },
                                }}
                                onClick={handleSpecialNotification}
                            >
                                Send Special Notification (PEFA2024)
                            </Button>
                        </Stack>
                    </form>
                    <ToastContainer />
                    {notificationSent && (
                        <Typography sx={{ mt: 2, color: 'green' }}></Typography>
                    )}
                </Paper>
            </Grid>
        </div>
    );
};

export default AddNotification;

