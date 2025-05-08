import { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { format, subDays } from 'date-fns';
import { useGetGoldPricesByDateRange } from '../hooks/useGetGoldPricesByDateRange';

export const GoldPricesByDateRange = () => {
  const [startDate, setStartDate] = useState<string>(
    format(subDays(new Date(), 7), 'yyyy-MM-dd'),
  );
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd'),
  );
  const { data, isFetching, isError, refetch } = useGetGoldPricesByDateRange(
    startDate,
    endDate,
  );

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedDate = new Date(event.target.value);
    setStartDate(format(selectedDate, 'yyyy-MM-dd'));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(event.target.value);
    setEndDate(format(selectedDate, 'yyyy-MM-dd'));
  };

  return (
    <Card>
      <CardHeader title="Gold Prices By Date Range" />
      <CardActions>
        <TextField
          label="Start Date"
          type="date"
          size="small"
          sx={{ width: '150px' }}
          value={startDate}
          onChange={handleStartDateChange}
          disabled={isFetching}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          sx={{ width: '150px' }}
          value={endDate}
          onChange={handleEndDateChange}
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.date.toString()}</TableCell>
                  <TableCell>{item.price.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
