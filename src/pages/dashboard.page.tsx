import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {SidebarBreadcrumb} from "@/components/sidebar/sidebar-breadcrumb.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {StatCard} from "@/components/stat-card.tsx";
import {MessageSquare, MousePointerClick, UserPlus, Users} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";

// Mock data for charts
const activityData = [
  { name: 'Jan', value: 420 },
  { name: 'Feb', value: 350 },
  { name: 'Mar', value: 470 },
  { name: 'Apr', value: 540 },
  { name: 'May', value: 580 },
  { name: 'Jun', value: 690 },
  { name: 'Jul', value: 650 }
];

const breadcrumbItems = [
  { title: "Dashboard", isCurrentPage: true }
];

export function DashboardPage() {
  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger/>
              <Separator orientation="vertical" className="mr-2 h-4"/>
              <SidebarBreadcrumb items={breadcrumbItems}/>
            </div>
          </header>
          <Tabs defaultValue="day">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
              title="Total Users"
              value="2,543"
              description="from last month"
              icon={Users}
              trend="up"
              trendValue="12.5%"
          />
          <StatCard
              title="Active Conversations"
              value="1,236"
              description="from last week"
              icon={MessageSquare}
              trend="up"
              trendValue="8.2%"
          />
          <StatCard
              title="New Users"
              value="89"
              description="from yesterday"
              icon={UserPlus}
              trend="down"
              trendValue="3.1%"
          />
          <StatCard
              title="Interaction Rate"
              value="65.2%"
              description="from last week"
              icon={MousePointerClick}
              trend="up"
              trendValue="4.3%"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Bot Activity</CardTitle>
              <CardDescription>Daily interactions over time</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activityData} margin={{top: 5, right: 20, left: 0, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{strokeWidth: 2}}
                        activeDot={{r: 8}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest bot interactions</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item}
                         className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0 last:pb-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/api/placeholder/${40 + item}/${40 + item}`} alt="User"/>
                        <AvatarFallback>U{item}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-medium">User{item} sent a message</p>
                        <p className="text-sm text-gray-500">{item * 5} minutes ago</p>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}