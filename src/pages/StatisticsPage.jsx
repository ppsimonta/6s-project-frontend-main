import axios from "axios";
import Bar from "../components/Bar";
import { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MyChart from "../components/BarChart";

const components = [
  ["Bar", MyChart],
];


function StatisticsPage() {

  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState([]);
  const [location, setLocation] = useState("Location");
  const [selectedRoom, setSelectedRoom] = useState("Room");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());



  useEffect(() => {
    const fetchData = async () => {
 
        // Get all aduits (these have no questions or answer values)
        const audits = await axios.get(
          `/audit`,
        );

        // Get all rooms
        let roomArray = []; 
        const allRooms = await axios.get(
          `/room?location=${location}`,
        );
        for (const room of allRooms.data) {
          roomArray.push(room.id)
        }
        console.log(roomArray);

        const auditsByRoom = audits.data.reduce((acc,cur)=>{

          if(!roomArray.includes(cur.room.id)) return acc
          if(!cur.approved) return acc
          const auditIndex = acc.findIndex((item)=> item.room.id === cur.room.id)
          if(auditIndex !== -1){

            acc[auditIndex].auditIds.push(cur.id)

          } else {
            cur.auditIds = [cur.id]
            acc.push(cur)
          }

          return acc
        },[])

   
        setRooms(auditsByRoom);


        
    }

    fetchData();
    
    return () => {

    };
  }, [location]);

  const createChartForRoom = async (ids) => {
    const auditPromises = ids.map((id) =>
      axios
        .get(`/audit/${id}`)
        .then(({ data }) => data)
    );

    const audits = await Promise.all(auditPromises);

    // Filter audits based on the date range
    const filteredAudits = audits.filter((audit) => {
      const auditDate = new Date(audit.date);
      return auditDate >= startDate && auditDate <= endDate;
    });

    const chartData = await Promise.all(
      filteredAudits.map((audit) => getAverage(audit))
    );

    return chartData;
  };

  useEffect(() => {
    const room = rooms.find((r) => r.id === selectedRoom);
    if (room) {
      createChartForRoom(room.auditIds).then((data) => {
        console.log(data);
        setData(data);
      });
    }
  }, [selectedRoom, startDate, endDate]);

  const getAverage = (data) => {
    const { date, questions } = data;
  
    // Filter questions with type "rating"
    const ratingQuestions = questions.filter(question => question.type === 'rating');
  
    // Calculate average for rating questions
    const average = ratingQuestions.reduce((sum, question) => sum + question.value, 0) / ratingQuestions.length;
  
    return {
      label: new Date(date).toLocaleString('fi'),
      data: [
        { primary: new Date(date).toLocaleString('fi').split(" ")[0], secondary: average },
      ]
    };
  };
  
  
  const handleRoomChange = (event) => {
    setSelectedRoom(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  const onDateChange = (date, isStartDate) => {
    const newDate = new Date(date);
    if (isNaN(newDate.getTime())) {
      alert("Invalid date");
    } else {
      if (isStartDate) {
        setStartDate(newDate);
      } else {
        setEndDate(newDate);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-shrink gap-4 border border-t-transparent shadow-md rounded-md p-3 border-gray-200 items-center mt-1 mb-5">
        <Box sx={{ minWidth: 120 }}>
          <Select
            labelId="location-select"
            id="location-select"
            value={location}
            label="Location"
            onChange={handleLocationChange} 
            size='small'
            sx={{ minWidth: 120, height: 40}}
          >
            <MenuItem disabled value="Location">Location</MenuItem>
            <MenuItem value="Kemi">Kemi</MenuItem>
            <MenuItem value="Rovaniemi">Rovaniemi</MenuItem>
            <MenuItem value="Tornio">Tornio</MenuItem>
          </Select>
        </Box>
        <Box sx={{ minWidth: 120}}>
            <Select
              labelId="room-select"
              id="room-select"
              value={selectedRoom}
              label="Room"
              onChange={handleRoomChange}
              sx={{ minWidth: 120, height: 40}}
            >
              <MenuItem disabled value="Room">
                Room
              </MenuItem>
              {rooms.map((item, index) => {
                return (
                  <MenuItem value={item.id} key={index}>{item.room.name}</MenuItem>
                )
              })}
            </Select>
            
        </Box>
        <div className="flex gap-1 ml-4 items-center">
          <label>From:</label>
          <input
            /* disabled={disabled} */
            type="date"
            contentEditable={false}
            value={startDate.toISOString().split("T")[0]}
            onChange={(e) => onDateChange(e.target.value, true)}
            className="bg-white rounded text-slate-600 p-1.5 outline-none border border-gray-300 hover:border-black focus:border-cyan-600"
          ></input> 
        </div>
        <div className="flex gap-1 items-center">
          <label>To:</label>
          <input
            /* disabled={disabled} */
            type="date"
            contentEditable={false}
            value={endDate.toISOString().split("T")[0]}
            onChange={(e) => onDateChange(e.target.value, false)}
            className="bg-white rounded text-slate-600 p-1.5 outline-none border border-gray-300 hover:border-cyan-700 focus:border-cyan-600"
          ></input>
        </div>
        </div>
    
        {data.length > 0 &&
            <div>
              {/* <h1>Test</h1> */}
              <div>
                {data && <MyChart elementType="bar" data={data}/>}
              </div>
            </div>}
    </div>
  );
}

export default StatisticsPage
