import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import { useGetGoldPriceByDate } from '../hooks/useGetGoldPriceByDate';
import { format } from 'date-fns';

export const GoldPriceByDate = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const { data, isFetching, isError, refetch } = useGetGoldPriceByDate(date);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setDate(format(selectedDate, 'yyyy-MM-dd'));
  };

  return (
    <Card>
      <CardHeader title="Gold Price By Date" />
      <CardActions>
        <TextField
          label="Date"
          type="date"
          size="small"
          sx={{ width: '150px' }}
          value={date}
          onChange={handleDateChange}
          disabled={isFetching}
        />
        <Button size="small" onClick={() => refetch()} disabled={isFetching}>
          Reload
        </Button>
      </CardActions>
      <CardContent>
        {isFetching ? (
          <CircularProgress />
        ) : isError ? (
          <Typography variant="body1" color="error">
            Not found
          </Typography>
        ) : (
          <>
            <Typography variant="caption">Date</Typography>
            <Typography variant="body1">{data?.date.toString()}</Typography>
            <Typography variant="caption">Price</Typography>
            <Typography variant="body1">{data?.price.toString()}</Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};
