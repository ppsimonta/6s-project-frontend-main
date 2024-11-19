import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

function ReviewView() {
  
  const [audits, setAudits] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
        const result = await axios.get(
          `/audit`,
        );

        // Filter to only unapproved audits
        let pendingAudits = [];
        for (const audit of result.data) {
          if (!audit.approved){
            pendingAudits.push(audit);
            }
          }

        setAudits(pendingAudits);
        console.log(pendingAudits);
    }

    fetchData();
    
    return () => {

    };
  }, []);

  return (
    <>
                {(audits.length > 0)? (
                audits.map(audit => {
                    if (!audit.approved) {
                        return (
                          <ReviewItem
                            key={audit.id}
                            auditId={audit.id}
                            updateAudits={setAudits}
                            >
                            {`${audit.room.name}\nAudited by: ${audit.user.name}`}
                          </ReviewItem>
                        )
                    }
                    return null; // Return null if the condition is not met
                })
            ) : (
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant="h6" component="div">
                No pending audits. You're all caught up!
                </Typography>
              </div>
            )}
    </>
  )
}

function ReviewItem({ children, auditId, updateAudits }) {
    const navigateTo = useNavigate();

    const iconAdditionalStyle = {
        cursor: "pointer",
        width: 32,
        height: 32
      }
  
      const handleClick = () => {
        // Navigate to the subpage with the ID of the clicked list item
        navigateTo(`/audit/review/${auditId}`);
      };

      const handleCheck = async () => {
        // Approve audit
        try {
          const result = await axios.patch(
            `/audit/${auditId}`
          );
          console.log(result);
          // Update audits state after successful API call
          updateAudits((prevAudits) =>
            prevAudits.filter((audit) => audit.id !== auditId)
          );
        } catch (error) {
          console.error('Error approving audit:', error);
        }
      };
    
      const handleClear = async () => {
        // Discard audit
        try {
          const result = await axios.delete(
            `/audit/${auditId}`
          );
          console.log(result);
          // Update audits state after successful API call
          updateAudits((prevAudits) =>
            prevAudits.filter((audit) => audit.id !== auditId)
          );
        } catch (error) {
          console.error('Error discarding audit:', error);
        }
      };
  
    return (
      <Card sx={{ mt: 1 }}>
          <CardContent>
            <div style={{display: 'flex', flexDirection: "row", flexWrap: 'wrap', alignContent: 'center', justifyContent: "space-between"}}>
                <Typography variant="h6" component="div" style={{whiteSpace: 'pre-wrap', cursor: 'pointer'}} onClick={handleClick}>{children}</Typography>
                <div style={{display: 'flex'}}>
                    <CheckIcon style={iconAdditionalStyle} onClick={handleCheck} />
                    <ClearIcon style={iconAdditionalStyle} onClick={handleClear} />
                </div>
            </div>
          </CardContent>
      </Card>
    );
  }

export default ReviewView;
