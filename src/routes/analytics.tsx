import React from 'react';
import {
  Users,
  MessageSquare,
  Clock,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/analytics')({
  component: Analytics,
})

// Mock data for charts
const userGrowthData = [
  { name: 'Jan', users: 120 },
  { name: 'Feb', users: 145 },
  { name: 'Mar', users: 162 },
  { name: 'Apr', users: 190 },
  { name: 'May', users: 210 },
  { name: 'Jun', users: 250 },
  { name: 'Jul', users: 290 }
];

const messageActivityData = [
  { name: 'Mon', incoming: 120, outgoing: 98 },
  { name: 'Tue', incoming: 145, outgoing: 125 },
  { name: 'Wed', incoming: 132, outgoing: 110 },
  { name: 'Thu', incoming: 160, outgoing: 140 },
  { name: 'Fri', incoming: 180, outgoing: 160 },
  { name: 'Sat', incoming: 220, outgoing: 170 },
  { name: 'Sun', incoming: 190, outgoing: 150 }
];

const commandUsageData = [
  { name: 'start', count: 850 },
  { name: 'help', count: 620 },
  { name: 'settings', count: 410 },
  { name: 'info', count: 350 },
  { name: 'menu', count: 320 },
  { name: 'search', count: 280 },
  { name: 'profile', count: 240 }
];

const userRetentionData = [
  { name: 'Week 1', retention: 100 },
  { name: 'Week 2', retention: 82 },
  { name: 'Week 3', retention: 73 },
  { name: 'Week 4', retention: 68 },
  { name: 'Week 5', retention: 62 },
  { name: 'Week 6', retention: 58 },
  { name: 'Week 7', retention: 55 },
  { name: 'Week 8', retention: 51 }
];

const deviceDistributionData = [
  { name: 'Android', value: 65 },
  { name: 'iOS', value: 30 },
  { name: 'Desktop', value: 5 }
];

const locationData = [
  { name: 'United States', value: 40 },
  { name: 'Europe', value: 25 },
  { name: 'Asia', value: 20 },
  { name: 'South America', value: 8 },
  { name: 'Africa', value: 5 },
  { name: 'Other', value: 2 }
];

const DEVICE_COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6'];
const LOCATION_COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ec4899', '#f43f5e'];

const StatCard = ({ title, value, description, icon: Icon, trend, trendValue }) => {
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

function Analytics() {
    const [_, setTimeframe] = React.useState('week');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Analytics</h1>
                <div className="flex items-center gap-2">
                    <Select defaultValue="week" onValueChange={setTimeframe}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select timeframe"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Last 24 Hours</SelectItem>
                            <SelectItem value="week">Last 7 Days</SelectItem>
                            <SelectItem value="month">Last 30 Days</SelectItem>
                            <SelectItem value="quarter">Last 3 Months</SelectItem>
                            <SelectItem value="year">Last 12 Months</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4"/>
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4"/>
                        Export
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Users"
                    value="3,249"
                    description="from last month"
                    icon={Users}
                    trend="up"
                    trendValue="15.3%"
                />
                <StatCard
                    title="Active Users (DAU)"
                    value="1,563"
                    description="from yesterday"
                    icon={Users}
                    trend="up"
                    trendValue="4.2%"
                />
                <StatCard
                    title="Messages Sent"
                    value="8,942"
                    description="from last week"
                    icon={MessageSquare}
                    trend="up"
                    trendValue="12.7%"
                />
                <StatCard
                    title="Avg. Response Time"
                    value="1.8s"
                    description="from last week"
                    icon={Clock}
                    trend="down"
                    trendValue="0.3s"
                />
            </div>

            <Tabs defaultValue="user">
                <TabsList>
                    <TabsTrigger value="user">User Analytics</TabsTrigger>
                    <TabsTrigger value="message">Message Analytics</TabsTrigger>
                    <TabsTrigger value="command">Command Usage</TabsTrigger>
                    <TabsTrigger value="demographic">Demographics</TabsTrigger>
                </TabsList>

                <TabsContent value="user" className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>User Growth</CardTitle>
                                <CardDescription>Total number of users over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={userGrowthData}>
                                            <defs>
                                                <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Area
                                                type="monotone"
                                                dataKey="users"
                                                stroke="#3b82f6"
                                                fillOpacity={1}
                                                fill="url(#userGrowthGradient)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>User Retention</CardTitle>
                                <CardDescription>User retention rate over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={userRetentionData}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis domain={[0, 100]} unit="%"/>
                                            <Tooltip formatter={(value) => [`${value}%`, 'Retention Rate']}/>
                                            <Line
                                                type="monotone"
                                                dataKey="retention"
                                                stroke="#8b5cf6"
                                                strokeWidth={2}
                                                dot={{r: 4}}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>User Activity Metrics</CardTitle>
                            <CardDescription>Detailed user engagement statistics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Daily Active Users</span>
                                        <span className="text-sm text-green-500">+5.2%</span>
                                    </div>
                                    <div
                                        className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{width: '48%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>1,563 users</span>
                                        <span>48% of total</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Weekly Active Users</span>
                                        <span className="text-sm text-green-500">+8.7%</span>
                                    </div>
                                    <div
                                        className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{width: '65%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>2,112 users</span>
                                        <span>65% of total</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">Monthly Active Users</span>
                                        <span className="text-sm text-green-500">+12.4%</span>
                                    </div>
                                    <div
                                        className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{width: '78%'}}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>2,534 users</span>
                                        <span>78% of total</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="message" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Message Activity</CardTitle>
                            <CardDescription>Incoming vs outgoing messages</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={messageActivityData}>
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend/>
                                        <Bar dataKey="incoming" fill="#3b82f6" name="Incoming Messages"/>
                                        <Bar dataKey="outgoing" fill="#22c55e" name="Outgoing Messages"/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Message Response Time</CardTitle>
                                <CardDescription>Average time to respond to user messages</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-blue-500">1.8s</div>
                                        <p className="text-sm text-gray-500 mt-1">Average response time</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="grid grid-cols-3 text-xs text-gray-500">
                                        <div>Minimum</div>
                                        <div className="text-center">Average</div>
                                        <div className="text-right">Maximum</div>
                                    </div>
                                    <div
                                        className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute h-4 w-4 bg-blue-500 rounded-full top-1/2 transform -translate-y-1/2"
                                            style={{left: '30%'}}></div>
                                        <div className="absolute h-full w-[30%] bg-green-500 rounded-l-full"></div>
                                        <div className="absolute h-full w-[20%] bg-blue-500 left-[30%]"></div>
                                        <div
                                            className="absolute h-full w-[50%] bg-yellow-500 left-[50%] rounded-r-full"></div>
                                    </div>
                                    <div className="grid grid-cols-3 text-xs font-medium">
                                        <div>0.5s</div>
                                        <div className="text-center">1.8s</div>
                                        <div className="text-right">5.2s</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Message Volume by Hour</CardTitle>
                                <CardDescription>Activity distribution throughout the day</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={Array.from({length: 24}, (_, i) => ({
                                            hour: `${i}:00`,
                                            volume: Math.floor(Math.random() * 300) + 50 + (i > 8 && i < 22 ? 200 : 0)
                                        }))}>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="hour" interval={3}/>
                                            <YAxis/>
                                            <Tooltip/>
                                            <Line
                                                type="monotone"
                                                dataKey="volume"
                                                stroke="#f97316"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="command" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Command Usage</CardTitle>
                            <CardDescription>Most frequently used bot commands</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={commandUsageData}
                                        layout="vertical"
                                        margin={{left: 70}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis type="number"/>
                                        <YAxis dataKey="name" type="category"/>
                                        <Tooltip/>
                                        <Bar dataKey="count" fill="#8b5cf6">
                                            {commandUsageData.map((entry, index) => (
                                                <Cell key={`cell-${index}`}
                                                      fill={`hsl(${265 - index * 10}, 70%, 60%)`}/>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Command Success Rate</CardTitle>
                                <CardDescription>Success vs failure percentages</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 text-center">
                                        <div className="text-3xl font-bold text-green-500">94.3%</div>
                                        <p className="text-sm text-gray-500">Success Rate</p>
                                        <div
                                            className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full"
                                                 style={{width: '94.3%'}}></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-center">
                                        <div className="text-3xl font-bold text-red-500">5.7%</div>
                                        <p className="text-sm text-gray-500">Failure Rate</p>
                                        <div
                                            className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full"
                                                 style={{width: '5.7%'}}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4">
                                    <p className="text-sm font-medium">Top failure reasons:</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Invalid parameters</span>
                                            <span>45%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>External API errors</span>
                                            <span>28%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Permission issues</span>
                                            <span>15%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Rate limiting</span>
                                            <span>8%</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span>Other errors</span>
                                            <span>4%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Command Response Time</CardTitle>
                                <CardDescription>Average processing time by command type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                {name: 'Query', time: 0.8},
                                                {name: 'Action', time: 1.2},
                                                {name: 'Media', time: 2.5},
                                                {name: 'External', time: 3.7},
                                                {name: 'Admin', time: 1.0}
                                            ]}
                                        >
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis dataKey="name"/>
                                            <YAxis unit="s"/>
                                            <Tooltip formatter={(value) => [`${value}s`, 'Response Time']}/>
                                            <Bar dataKey="time" fill="#ec4899"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="demographic" className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Device Distribution</CardTitle>
                                <CardDescription>User platform breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={deviceDistributionData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={90}
                                                paddingAngle={5}
                                                dataKey="value"
                                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                labelLine={false}
                                            >
                                                {deviceDistributionData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`}
                                                          fill={DEVICE_COLORS[index % DEVICE_COLORS.length]}/>
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex justify-center mt-4">
                                    {deviceDistributionData.map((entry, index) => (
                                        <div key={index} className="flex items-center mx-3">
                                            <div
                                                className="w-3 h-3 rounded-full mr-1"
                                                style={{backgroundColor: DEVICE_COLORS[index % DEVICE_COLORS.length]}}
                                            ></div>
                                            <span className="text-sm">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geographic Distribution</CardTitle>
                                <CardDescription>User location breakdown</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={locationData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={90}
                                                dataKey="value"
                                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {locationData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`}
                                                          fill={LOCATION_COLORS[index % LOCATION_COLORS.length]}/>
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => [`${value}%`, 'Percentage']}/>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {locationData.map((entry, index) => (
                                        <div key={index} className="flex items-center">
                                            <div
                                                className="w-3 h-3 rounded-full mr-1"
                                                style={{backgroundColor: LOCATION_COLORS[index % LOCATION_COLORS.length]}}
                                            ></div>
                                            <span className="text-xs">{entry.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>User Activity by Time Zone</CardTitle>
                                    <CardDescription>Activity distribution across global time zones</CardDescription>
                                </div>
                                <Globe className="h-5 w-5 text-gray-500"/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={[
                                            {timezone: 'GMT-12', users: 8},
                                            {timezone: 'GMT-11', users: 12},
                                            {timezone: 'GMT-10', users: 25},
                                            {timezone: 'GMT-9', users: 45},
                                            {timezone: 'GMT-8', users: 120},
                                            {timezone: 'GMT-7', users: 155},
                                            {timezone: 'GMT-6', users: 180},
                                            {timezone: 'GMT-5', users: 210},
                                            {timezone: 'GMT-4', users: 130},
                                            {timezone: 'GMT-3', users: 95},
                                            {timezone: 'GMT-2', users: 40},
                                            {timezone: 'GMT-1', users: 65},
                                            {timezone: 'GMT', users: 190},
                                            {timezone: 'GMT+1', users: 230},
                                            {timezone: 'GMT+2', users: 240},
                                            {timezone: 'GMT+3', users: 160},
                                            {timezone: 'GMT+4', users: 95},
                                            {timezone: 'GMT+5', users: 105},
                                            {timezone: 'GMT+6', users: 120},
                                            {timezone: 'GMT+7', users: 135},
                                            {timezone: 'GMT+8', users: 260},
                                            {timezone: 'GMT+9', users: 170},
                                            {timezone: 'GMT+10', users: 90},
                                            {timezone: 'GMT+11', users: 35},
                                            {timezone: 'GMT+12', users: 20}
                                        ]}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis dataKey="timezone" interval={3}/>
                                        <YAxis/>
                                        <Tooltip formatter={(value) => [`${value}`, 'Active Users']}/>
                                        <defs>
                                            <linearGradient id="timeZoneGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                                                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="users"
                                            stroke="#f97316"
                                            fillOpacity={1}
                                            fill="url(#timeZoneGradient)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
