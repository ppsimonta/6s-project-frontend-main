import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { useState } from 'react';

function RatingItem({ children, onRatingChange, currentValue = 0, locked = false }) {
    const [value, setValue] = useState(parseInt(currentValue, 10)); // Parse as base 10

    const iconAdditionalStyle = {
      width: 36,
      height: 36
    }

    const customIcons = {
        1: {
          icon: <SentimentVeryDissatisfiedIcon sx={iconAdditionalStyle} color="error" />,
          label: 'Very Dissatisfied',
        },
        2: {
          icon: <SentimentDissatisfiedIcon sx={iconAdditionalStyle} color="error" />,
          label: 'Dissatisfied',
        },
        3: {
          icon: <SentimentNeutralIcon sx={iconAdditionalStyle} color="warning" />,
          label: 'Neutral',
        },
        4: {
          icon: <SentimentSatisfiedAltIcon sx={iconAdditionalStyle} color="success" />,
          label: 'Satisfied',
        },
        5: {
          icon: <SentimentVerySatisfiedIcon sx={iconAdditionalStyle} color="success" />,
          label: 'Very Satisfied',
        },
    };

    const handleChange = (event) => {
      const ratingValue = parseInt(event.target.value, 10);
      setValue(ratingValue);
      onRatingChange(children, "rating", ratingValue); // Call the callback function with question and rating value
  };

    const StyledRating = styled(Rating)(({ theme }) => ({
        '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
            color: theme.palette.action.disabled,
        },
    }));

    function IconContainer(props) {
        const { value, ...other } = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return (
        <div style={{margin: 20, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: "space-between"}}>
            <Typography component="legend">{children}</Typography>
            <StyledRating
                IconContainerComponent={IconContainer}
                getLabelText={(value) => customIcons[value].label}
                highlightSelectedOnly
                value={value} // Pass the value state to the StyledRating component
                onChange={handleChange} // Call handleChange when the rating changes
                readOnly={locked}
            />
        </div>
    );
}

export default RatingItem;
