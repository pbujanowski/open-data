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
  const { data, isFetching, refetch } = useGetTodayGoldPrice();

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
