import { Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card elevation={0} className="border border-gray-200">
      <CardContent>
        <Typography variant="body2" className="text-gray-500">
          {title}
        </Typography>

        <Typography variant="h4" className="mt-2 font-bold text-gray-900">
          {value}
        </Typography>

        {description && (
          <Typography variant="body2" className="mt-2 text-gray-500">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
