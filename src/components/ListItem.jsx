import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ListItem({ children, id }) {
  const navigateTo = useNavigate();

  const handleClick = () => {
    // Navigate to the subpage with the ID of the clicked list item
    navigateTo(`/audit/fill/${id}`);
  };

  return (
    <Card sx={{ mt: 1 }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h6" component="div">
            {children}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ListItem;
