import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import RatingItem from '../components/RatingItem';
import { UserContext } from "../context/userContext";
import { Box, Button, Card, CardContent, Divider, Link, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FreeformQuestionItem from '../components/FreeformQuestionItem';
import ImageQuestionItem from '../components/ImageQuestionItem';
import audits from '../audits.json'

const auditTypes = Object.keys(audits)

function AuditPage() {
    

    /* const audits = {continousAudit, securityAudit} */
    const [auditQuestions, setAuditQuestions] = useState(audits[auditTypes[0]]);
    const {user} = useContext(UserContext);
    const [selectedValues, setSelectedValues] = useState([]);
    const [audit, setAudit] = useState();
    const [submitDone, setSubmitDone] = useState(false);
    const { roomId, auditId } = useParams();
    const navigateTo = useNavigate();

    useEffect(() => {

      const fetchData = async () => {

        let auditData;

        // Filling an audit
        if (roomId) {
          const result = await axios.get(
            `/room/${roomId}`,
          );
          const modifiedData = {
            "questions": auditQuestions,
            "room": result.data
          }
          auditData = modifiedData;
        }

        // Loading an audit for review
        if (auditId) {
          const result = await axios.get(
            `/audit/${auditId}`,
          );
          auditData = result.data;
          setSubmitDone(true)
        }

        // Sort by rating type and each question in alphabetical order
        auditData.questions.sort((a, b) => {
          // First, sort by type in ascending order
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;

          return 0;
        });

        // Set the audit state with the sorted data
        setAudit(auditData);

      }

      fetchData();
      
      return () => {

      };
  }, [auditQuestions]);

  const handleInputChange = (question, type, value) => {
    // Check if the question is already answered
    const isQuestionAnswered = selectedValues.some(item => item.question === question);
  
    if (!isQuestionAnswered) {
      // Add the question and its value to selectedValues array
      setSelectedValues(prevValues => [
        ...prevValues,
        {
          question,
          type,
          value
        }
      ]);
    } else {
      // If the question is already answered, update its value in the selectedValues array
      setSelectedValues(prevValues => {
        return prevValues.map(item => {
          if (item.question === question) {
            return {
              ...item,
              type,
              value
            };
          }
          return item;
        });
      });
    }
  };
  
  // ...
  
  const handleChange = (e) => {
    
    setAuditQuestions(audits[e.target.value])
  }

  const handleSendButtonClick = async () => {
    // Ensure selectedValues are in the order of auditQuestions
    const orderedSelectedValues = auditQuestions.map(question => {
      const selectedQuestion = selectedValues.find(item => item.question === question.question);
      
      // Check if the question is answered, if not, use default values
      if (!selectedQuestion) {
        return { question: question.question, type: question.type, value: question.value };
      }
  
      return selectedQuestion;
    });
  
    const auditToPost = {
      "questions": orderedSelectedValues,
      "room": roomId,
      "user": user.account.id
    };
  
    // Post the selected values for all questions in the order of auditQuestions
    console.log(auditToPost);
  
    try {
      const response = await axios.post(`/audit`, auditToPost);
      console.log(response);
      setSubmitDone(true);
      navigateTo("/");
      
    } catch (error) {
      console.log(error);
    }
  };  

  if (audit) {
    return (
      <div style={{padding: 10}}>
      <Card>
        <CardContent>
          <Typography variant="h4">
              {audit.room.name}
          </Typography>
          {audit.room.last_audit &&
          <Typography variant="body2" sx={{ color: 'text.secondary'}}>
              Last audit sent on {new Date(audit.room.last_audit).toLocaleDateString("fi-FI")}
          </Typography>}
          {audit.date && <Typography variant="body2" sx={{ color: 'text.secondary'}}>
              Audit created on {new Date(audit.date).toLocaleDateString("fi-FI")}
          </Typography>}
            <Box sx={{marginBottom: 2 }}>
              {audit.room.info && audit.room.info.map((item, index) => {
                      return (
                        <div key={index}>
                        {item.type === "plaintext" && <Typography component="legend">{item.text}</Typography>}
                        {item.type === "url" && <Link href={item.text} variant="legend">{item.text}</Link>}
                      </div>
                      )
                    })}
            </Box>  
          <select onChange={handleChange}>
            <option value={"continousAudit"}>
              Continous Audit
            </option>
            <option value={"securityAudit"}>
              Security Audit
            </option>
            <option value={"semesterAudit"}>
              Semester audit
            </option>
            <option value={"operatingAndManagementAudit"}>
              Management Audit
            </option>
          </select>
          <Divider light />
          {audit.questions.map((item, index) => {
            return (
              <div key={index}>
              {item.type === "rating" && <RatingItem onRatingChange={handleInputChange} currentValue={audit.questions? audit.questions[index].value : 0} locked={submitDone}>{item.question}</RatingItem>}
              {item.type === "freeform" && <FreeformQuestionItem onTextChange={handleInputChange} currentValue={audit.questions? audit.questions[index].value : ""} locked={submitDone}>{item.question}</FreeformQuestionItem>}
              {item.type === "image" && <ImageQuestionItem onImageChange={handleInputChange} currentValue={audit.questions? audit.questions[index].value : ""} locked={submitDone}>{item.question}</ImageQuestionItem>}
              <Divider light />
            </div>
            )
          })}
          <div style={{display: 'flex', justifyContent: 'center'}}>
          {submitDone? <Button disabled disableElevation variant="contained" sx={{marginTop: 3}}>Sent</Button> : <Button disableElevation variant="contained" sx={{marginTop: 3}} onClick={handleSendButtonClick}>Send</Button>}
          </div>
        </CardContent>
      </Card>
      </div>
    )
  }
  else {
    return <></>
  }
}

export default AuditPage;
