import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card.tsx";
import {ArrowDownRight, ArrowUpRight} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend: 'up' | 'down';
  trendValue: string;
};

export const StatCard = ({ title, value, description, icon: Icon, trend, trendValue }: StatCardProps) => {
  const isPositive = trend === 'up';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1 text-xs">
          {isPositive ? (
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {trendValue}
          </span>
          <span className="text-gray-500 ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
};