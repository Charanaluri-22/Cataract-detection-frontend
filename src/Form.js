import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography, Grid, Container } from '@mui/material';
import { APP_URL } from './config';

const Form = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [predictionResult, setPredictionResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

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
            const response = await axios.post(`${APP_URL}/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setPredictionResult(response.data);
        } catch (error) {
            console.error("Error during image prediction:", error);
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
            </Box>
        </Container>
        <button onClick={()=>{console.log(URL)}}>print</button>
        </>
    );
};

export default Form;
