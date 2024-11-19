import { TextField, Typography } from "@mui/material";
import { useState } from "react";

function FreeformQuestionItem({ children, onTextChange, currentValue = "", locked = false }) {

    const [text, setText] = useState(String(currentValue));

    const handleChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        onTextChange(children, "freeform", newText); // Call the callback function with question and rating value
    };

    return (
        <div style={{margin: 20, display: 'flex', flexDirection: 'column', flexWrap: 'wrap', justifyContent: "space-between"}}>
            <Typography component="legend">{children}</Typography>
            <TextField sx={{marginTop: 2}}
            id="outlined-multiline-flexible"
            label=""
            multiline
            minRows={4}
            onChange={handleChange}
            defaultValue={text}
            inputProps={{
                readOnly: locked,
              }}
            />
        </div>
    )
}

export default FreeformQuestionItem;