import React, { useState } from 'react';
import {
    TextField,
    Button,
    Paper,
    Grid,
    Typography,
    Stack,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { apiURL } from '../../../../Constants/constant';

const AddNotification = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !message) {
            toast.error('Please fill in both Title and Message fields.');
            return;
        }

        try {
            const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageTitle: title,
                    messageBody: message,
                    notificationType: 'type'
                })
            });

            console.log('Notification sent successfully:', response.data);
            toast.success('Notification sent successfully!');
        } catch (error) {
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification. Please try again later.');
        }

        setTitle('');
        setMessage('');
    };

    const handleSpecialNotification = async () => {
        try {
            const response = await axios.post(`${apiURL.baseURL}/skyTrails/api/admin/pushNotification`, {
                messageTitle: title,
                messageBody: message,
                notificationType: 'PEFA2024'
            });

           
            toast.success('PEFA2024 Notification sent successfully!');
        } catch (error) {
            console.error('Error sending special notification:', error);
            toast.error('Failed to send special notification. Please try again later.');
        }
    };

    return (
        <div spacing={2} sx={{ justifyContent: 'center', backgroundColor: "white" }} className='form-containers'>

            <Grid item xs={12}>
                <Paper sx={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
                    <header className="sectionagent headersagent" style={{backgroundColor:"#E73C33"}}>
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
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    
                                    backgroundColor: '#E73C33',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#E73C31',
                                        color:'#fff'
                                    },
                                }}
                            >
                                Send Notification
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#E73C33', // Orange color
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#E73C31',
                                        color:'#fff' // Darker orange color
                                    },
                                }}
                                onClick={handleSpecialNotification}
                            >
                                Send Special Notification (PEFA2024)
                            </Button>
                        </Stack>
                    </form>

                    <ToastContainer />
                </Paper>
            </Grid>
        </div>
    );
};

export default AddNotification;
