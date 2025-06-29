import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Grid, Container } from '@mui/material';

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setPredictionResult(null); // Reset prediction result
        // Preview the image
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post(`http://localhost:5000/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPredictionResult(response.data);
            setErrorMessage(null); // Clear any previous error
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error); // Set backend error message
            } else {
                setErrorMessage("Something went wrong during prediction."); // Generic error
                console.error("Error during image prediction:", error);
            }
        }

    };

    return (
        <>
            <Container component="main" maxWidth="sm" className="box">
                <Typography variant="h4" align="center">Cataract Detection</Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Typography variant="h6">Upload Image</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="file"
                                onChange={handleFileChange}
                                inputProps={{ accept: "image/*" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Predict
                            </Button>
                        </Grid>
                    </Grid>
                    {imagePreview && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
                        </Box>
                    )}
                    {predictionResult && (
                        <Box sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                Prediction Result
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 1 }}>
                                Class: <span style={{ fontWeight: 'bold', color: '#4caf50' }}>{predictionResult.class}</span>
                            </Typography>
                            <Typography variant="subtitle1">
                                Confidence: <span style={{ fontWeight: 'bold', color: '#f44336' }}>{(predictionResult.confidence_score * 100).toFixed(2)}%</span>
                            </Typography>
                        </Box>
                    )}~
                    {errorMessage && (
                        <Box sx={{ mt: 2, p: 2, border: '1px solid #ffcccc', borderRadius: '4px', backgroundColor: '#ffe6e6' }}>
                            <Typography variant="subtitle1" sx={{ color: '#d32f2f', fontWeight: 'bold' }}>
                                Error: {errorMessage}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Container>

        </>
    );
};

export default Form;
