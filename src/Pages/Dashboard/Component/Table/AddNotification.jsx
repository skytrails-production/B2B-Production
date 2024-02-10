
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
                    'Content-Type': 'application/json' // Specify the content type of the request body
                },
                body: JSON.stringify({
                    messageTitle: title,
                    messageBody: message,
                    notificationType: 'type' // Provide the appropriate notification type here
                })
            });

            // Handle success response
            console.log('Notification sent successfully:', response.data);
            toast.success('Notification sent successfully!');
        } catch (error) {
            // Handle error
            console.error('Error sending notification:', error);
            toast.error('Failed to send notification. Please try again later.');
        }

        setTitle('');
        setMessage('');
    };

    return (
        <div spacing={2} sx={{ justifyContent: 'center', backgroundColor: "white" }} className='form-containers'>

            <Grid item xs={12}>
                <Paper sx={{ padding: 2, borderRadius: 8, boxShadow: 3, backgroundColor: '#fff' }}>
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
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#4B587B',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#405269',
                                    },
                                }}
                            >
                                Send Notification
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
