import { useState } from 'react';
import { useGetLastGoldPrices } from '../hooks/useGetLastGoldPrices';
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

export const LastGoldPrices = () => {
  const [topCount, setTopCount] = useState(3);
  const { data, isFetching, isError, refetch } = useGetLastGoldPrices(topCount);

  const handleTopCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setTopCount(value);
  };

  return (
    <Card>
      <CardHeader title="Last Gold Prices" />
      <CardActions>
        <TextField
          label="Top count"
          type="number"
          size="small"
          sx={{ width: '100px' }}
          value={topCount}
          onChange={handleTopCountChange}
          slotProps={{ htmlInput: { min: 0, max: 10 } }}
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
