import { CircularProgress } from "@mui/material";

export default function LoadingState() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <CircularProgress />
    </div>
  );
}
