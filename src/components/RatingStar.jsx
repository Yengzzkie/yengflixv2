import { Rating, Typography } from "@material-tailwind/react";
 
export default function RatingStar({ rating, votes }) { 
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500 mr-2">
      {Math.round((rating * 10) / 2) / 10}
      <Rating value={Math.round(Math.round((rating * 10) / 2) / 10)} readonly />
      <Typography color="blue-gray" className="font-small text-xs text-blue-gray-500">
        Based on {votes} Reviews
      </Typography>
    </div>
  );
}