import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useGetTodayGoldPrice } from '../hooks/useGetTodayGoldPrice';

export const TodayGoldPrice = () => {
  const { data, isFetching, isError, refetch } = useGetTodayGoldPrice();

  return (
    <Card>
      <CardHeader title="Today's Gold Price" />
      <CardActions>
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
