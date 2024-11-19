import { Button, Typography } from "@mui/material";
import { useState } from "react";


function ImageQuestionItem({ children, onImageChange, currentValue = null, locked = false }) {

    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState(currentValue);

    const handleChange = (event) => {
        const newImage = event.target.files[0];
    
        if (newImage) {
            const reader = new FileReader();
    
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
    
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    // Define the desired width and height for the resized image
                    const maxWidth = 800; // Adjust as needed
                    const maxHeight = 600; // Adjust as needed
    
                    let width = img.width;
                    let height = img.height;
    
                    // Calculate the new dimensions to maintain aspect ratio
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }
    
                    // Set the canvas dimensions
                    canvas.width = width;
                    canvas.height = height;
    
                    // Draw the image onto the canvas with the new dimensions
                    ctx.drawImage(img, 0, 0, width, height);
    
                    // Get the base64-encoded string from the canvas with reduced quality
                    const quality = 0.8; // Adjust the quality between 0 and 1 as needed
                    const base64String = canvas.toDataURL('image/jpeg', quality);
    
                    setImage(e.target.result);
                    setBase64Image(base64String);
                    onImageChange(children, "image", base64String);
                };
            };
    
            reader.readAsDataURL(newImage);
        }
    };
    
    
    

    return (
        <>
        <div style={{ margin: 20, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between" }}>
            <Typography component="legend">{children}</Typography>
            <Button
                variant="contained"
                component="label"
                disabled={locked}
            >
                Upload File
                <input
                    type="file"
                    hidden
                    onChange={handleChange}
                />
            </Button>
        </div>
        <div style={{ margin: 20, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "center" }}>
            {(() => {
                    if (image) {
                        return (
                            <img style={{width: "50%"}} src={image} alt="Uploaded Preview" />
                        )
                    } else if (base64Image == "") {
                        return (
                            <Typography component="legend">No Image Uploaded</Typography>
                        )
                    }
                    return (
                    <img style={{minHeight: "12rem", maxHeight: "25rem"}} src={base64Image} alt="Attachment Image" />
                    );
                })()}
        </div>
        </>
    )
}

export default ImageQuestionItem;
