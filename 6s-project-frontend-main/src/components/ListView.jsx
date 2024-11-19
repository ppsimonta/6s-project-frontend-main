import axios from 'axios';
import ListItem from './ListItem';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

function ListView({ searchString, location }) {

    const [data, setData] = useState();
    
    useEffect(() => {

        const fetchData = async () => {
            const result = await axios.get(
              `/room?location=${location}`,
            );

        // Shifting to uppercase ensures a case-insensitive sort
        const newData = result.data.sort(function(a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
            setData(newData);
        }

        fetchData();
        
        return () => {

        };
    }, [location]);

    return (
        <>
            {data? (
                data.map(room => {
                    if (!searchString || room.name.toUpperCase().includes(searchString.toUpperCase().trim())) {
                        return (
                            <ListItem key={room.id} id={room.id}>
                                {room.name}
                            </ListItem>
                        )
                    }
                    return null; // Return null if the condition is not met
                })
            ) : (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Typography variant="body1" component="div">
                No data available
                </Typography>
                </div>
            )}
        </>
    );
    
}

export default ListView;