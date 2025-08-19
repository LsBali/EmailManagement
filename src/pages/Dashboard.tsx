import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, AlertTriangle, CheckCircle2, Users, CalendarDays, Calendar as CalendarIcon, Download, RefreshCw, TrendingUp, Activity } from "lucide-react";
import Footer from "@/components/footer";
import { AnalyticsFilters } from '@/components/analytics-filters';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

// Mock data
const pendingRequests = [
  { id: "REQ-1024", employee: "Aarav Shah", type: "Casual Leave", days: 2, submitted: "2025-08-16", priority: "High" },
  { id: "REQ-1025", employee: "Neha Verma", type: "Sick Leave", days: 1, submitted: "2025-08-17", priority: "Medium" },
  { id: "REQ-1026", employee: "Rahul Kumar", type: "Work From Home", days: 1, submitted: "2025-08-18", priority: "Low" },
];

const onLeaveToday = [
  { name: "Priya Singh", team: "Design", type: "CL" },
  { name: "Vikram Patel", team: "Backend", type: "SL" },
];

const approvalTrend = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 82 },
  { month: "Mar", rate: 80 },
  { month: "Apr", rate: 86 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 90 },
  { month: "Jul", rate: 89 },
  { month: "Aug", rate: 92 },
];

// Charts: Requests over time (line)
const requestsOverTime = [
  { week: "W1", pending: 8, approved: 22, rejected: 3 },
  { week: "W2", pending: 6, approved: 25, rejected: 2 },
  { week: "W3", pending: 10, approved: 19, rejected: 4 },
  { week: "W4", pending: 5, approved: 27, rejected: 1 },
];

// Charts: Leave type distribution (pie)
const leaveTypeDist = [
  { name: "Casual", value: 35, color: "hsl(var(--primary))" },
  { name: "Sick", value: 22, color: "#F97316" },
  { name: "Earned", value: 18, color: "#10B981" },
  { name: "WFH", value: 25, color: "#6366F1" },
];

// Charts: Team availability (area)
const teamAvailability = [
  { day: "Mon", available: 92, productivity: 88 },
  { day: "Tue", available: 90, productivity: 92 },
  { day: "Wed", available: 88, productivity: 85 },
  { day: "Thu", available: 91, productivity: 89 },
  { day: "Fri", available: 87, productivity: 83 },
  { day: "Sat", available: 85, productivity: 80 },
];

// Enhanced Analytics Data
const departmentMetrics = [
  { department: "Engineering", employees: 45, avgLeave: 8.2, satisfaction: 4.3, productivity: 92 },
  { department: "Design", employees: 12, avgLeave: 6.8, satisfaction: 4.5, productivity: 88 },
  { department: "Marketing", employees: 18, avgLeave: 7.5, satisfaction: 4.1, productivity: 85 },
  { department: "HR", employees: 8, avgLeave: 5.2, satisfaction: 4.4, productivity: 90 },
  { department: "Sales", employees: 22, avgLeave: 9.1, satisfaction: 3.9, productivity: 87 },
];

const monthlyTrends = [
  { month: "Jan", requests: 45, approvals: 38, rejections: 7, avgProcessTime: 2.1 },
  { month: "Feb", requests: 52, approvals: 44, rejections: 8, avgProcessTime: 1.8 },
  { month: "Mar", requests: 48, approvals: 41, rejections: 7, avgProcessTime: 2.3 },
  { month: "Apr", requests: 61, approvals: 55, rejections: 6, avgProcessTime: 1.9 },
  { month: "May", requests: 58, approvals: 52, rejections: 6, avgProcessTime: 2.0 },
  { month: "Jun", requests: 67, approvals: 62, rejections: 5, avgProcessTime: 1.7 },
  { month: "Jul", requests: 72, approvals: 66, rejections: 6, avgProcessTime: 1.6 },
  { month: "Aug", requests: 69, approvals: 64, rejections: 5, avgProcessTime: 1.5 },
];

const leavePatterns = [
  { pattern: "Monday Blues", frequency: 28, impact: "High" },
  { pattern: "Friday Extensions", frequency: 35, impact: "Medium" },
  { pattern: "Post-Holiday", frequency: 15, impact: "Low" },
  { pattern: "Seasonal Peaks", frequency: 42, impact: "High" },
];

const employeeEngagement = [
  { metric: "Response Time", current: 1.2, target: 1.5, trend: "improving" },
  { metric: "Satisfaction Score", current: 4.2, target: 4.0, trend: "stable" },
  { metric: "Policy Compliance", current: 94, target: 95, trend: "improving" },
  { metric: "Self-Service Usage", current: 78, target: 80, trend: "declining" },
];

const violations = [
  { id: "PV-210", employee: "Jaya Rao", policy: "Unplanned Leave > 3", date: "2025-08-12", severity: "Medium" },
  { id: "PV-212", employee: "Karan Gill", policy: "Overlapping Leaves", date: "2025-08-15", severity: "High" },
];

const priorityQueue = [
  { id: "REQ-1027", employee: "Ananya Gupta", reason: "Medical", ageHrs: 5, priority: "Critical" },
  { id: "REQ-1024", employee: "Aarav Shah", reason: "Travel", ageHrs: 22, priority: "High" },
  { id: "REQ-1025", employee: "Neha Verma", reason: "Fever", ageHrs: 15, priority: "Medium" },
];

const upcomingLeaves = [
  { name: "Rohan Mehta", date: "2025-08-20", team: "Frontend" },
  { name: "Sneha Iyer", date: "2025-08-21", team: "HR" },
  { name: "Pooja Das", date: "2025-08-23", team: "Data" },
];

const allHolidays = [
  { name: "Independence Day", date: "2025-08-15", type: "National Holiday" },
  { name: "Ganesh Chaturthi", date: "2025-08-29", type: "Festival" },
  { name: "Labor Day", date: "2025-09-01", type: "Public Holiday" },
  { name: "Gandhi Jayanti", date: "2025-10-02", type: "National Holiday" },
  { name: "Diwali", date: "2025-10-31", type: "Festival" },
  { name: "Christmas", date: "2025-12-25", type: "National Holiday" },
  { name: "New Year's Day", date: "2026-01-01", type: "National Holiday" },
  { name: "Republic Day", date: "2026-01-26", type: "National Holiday" },
  { name: "Holi", date: "2026-03-13", type: "Festival" },
  { name: "Good Friday", date: "2026-04-03", type: "National Holiday" },
];

const severityColor = (sev: string) =>
  sev === "High" ? "destructive" : sev === "Medium" ? "secondary" : "default";

const priorityBadge = (p: string) =>
  p === "Critical" ? "destructive" : p === "High" ? "default" : "secondary";

const Dashboard: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [filters, setFilters] = React.useState({
    startDate: '',
    endDate: '',
    department: 'All',
    name: 'All',
    leaveType: 'All',
    priority: 'All',
    status: 'All',
    showTrends: true,
    showViolations: true,
    showEngagement: true,
  });

  const [filteredData, setFilteredData] = React.useState({
    monthlyTrends,
    departmentMetrics,
    leavePatterns,
    teamAvailability,
    leaveTypeDist,
  });

  const applyFilters = () => {
    // A real app would likely refetch data or use a more robust client-side filtering library.
    // This is a simplified example for demonstration purposes.
    const newDepartmentMetrics = filters.department === 'All' 
      ? departmentMetrics 
      : departmentMetrics.filter(d => d.department === filters.department);

    const newLeaveTypeDist = filters.leaveType === 'All'
      ? leaveTypeDist
      : leaveTypeDist.filter(l => l.name === filters.leaveType);

    // Date filtering is not implemented for this mock data.
    console.log('Applying filters:', filters);

    setFilteredData({
      monthlyTrends,
      teamAvailability,
      leavePatterns,
      departmentMetrics: newDepartmentMetrics,
      leaveTypeDist: newLeaveTypeDist,
    });
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      department: 'All',
      name: 'All',
      leaveType: 'All',
      priority: 'All',
      status: 'All',
      showTrends: true,
      showViolations: true,
      showEngagement: true,
    });
    setFilteredData({
      monthlyTrends,
      departmentMetrics,
      leavePatterns,
      teamAvailability,
      leaveTypeDist,
    });
  };

  const userFirstName = localStorage.getItem('userFirstName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'User';
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  // Real-time data refresh
  const refreshAnalytics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Auto-refresh every 5 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshAnalytics();
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Export analytics data
  const exportAnalytics = () => {
    const analyticsData = {
      timestamp: new Date().toISOString(),
      departmentMetrics,
      monthlyTrends,
      leavePatterns,
      employeeEngagement,
      teamAvailability,
      leaveTypeDist
    };
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Generate months for calendar view (2 previous + current + 3 next = 6 months)
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = -2; i <= 3; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push({
        date: monthDate,
        name: monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isCurrentMonth: i === 0
      });
    }
    return months;
  };

  const months = generateMonths();

  // Filter holidays to show only upcoming ones from current date
  const getUpcomingHolidays = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    return allHolidays
      .filter(holiday => new Date(holiday.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6); // Show next 6 upcoming holidays
  };

  const upcomingHolidays = getUpcomingHolidays();

  // Calculate average weekly team availability
  const calculateAverageAvailability = () => {
    const total = teamAvailability.reduce((sum, day) => sum + day.available, 0);
    return Math.round(total / teamAvailability.length);
  };

  const averageAvailability = calculateAverageAvailability();

  // Function to check if a date is a holiday
  const isHoliday = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return allHolidays.some(holiday => holiday.date === dateString);
  };

  // Function to check if a date is a Sunday
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  // Function to get holiday info for a date
  const getHolidayInfo = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return allHolidays.find(holiday => holiday.date === dateString);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-form-background to-background p-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">

            {/* Main Content with Tabs */}
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="requests">Requests</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                          <Clock className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{pendingRequests.length}</div>
                          <p className="text-xs text-muted-foreground">+2 from last week</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                          <CheckCircle2 className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">92%</div>
                          <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Policy Violations</CardTitle>
                          <AlertTriangle className="h-4 w-4 text-violet-500" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{violations.length}</div>
                          <p className="text-xs text-muted-foreground">No change</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                      <Card className="lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                          <div>
                            <CardTitle>Team Availability</CardTitle>
                            <CardDescription>Weekly team availability percentage.</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold" style={{ color: '#8B5CF6' }}>{averageAvailability}%</div>
                            <div className="text-xs text-muted-foreground">Weekly Average</div>
                          </div>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <ChartContainer config={{ available: { label: "Available", color: "#8B5CF6" } }} className="h-full w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={teamAvailability} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                                <defs>
                                  <linearGradient id="avail" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35}/>
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                <YAxis domain={[80, 100]} unit="%" tick={{ fontSize: 12 }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="available" stroke="#8B5CF6" fillOpacity={1} fill="url(#avail)" />
                              </AreaChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Priority Queue</CardTitle>
                          <CardDescription>Urgent requests needing attention.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {priorityQueue.map((q) => (
                              <div key={q.id} className="flex items-start justify-between">
                                <div>
                                  <div className="font-medium">{q.employee}</div>
                                  <div className="text-sm text-muted-foreground">{q.reason} • waiting {q.ageHrs}h</div>
                                </div>
                                <Badge variant={priorityBadge(q.priority) as any}>{q.priority}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Analytics Tab */}
                  <TabsContent value="analytics" className="space-y-6">
                    <AnalyticsFilters 
                      filters={filters} 
                      setFilters={setFilters} 
                      onApply={applyFilters}
                      onReset={resetFilters}
                      onExport={exportAnalytics}
                      onRefresh={refreshAnalytics}
                      isRefreshing={isRefreshing}
                    />
                    {/* Analytics Header with Controls */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {lastUpdated.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={refreshAnalytics}
                          disabled={isRefreshing}
                          className="flex items-center gap-2"
                        >
                          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                          {isRefreshing ? 'Refreshing...' : 'Refresh'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={exportAnalytics}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Export Data
                        </Button>
                      </div>
                    </div>

                    {/* Analytics Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-blue-600">
                            {monthlyTrends.reduce((sum, month) => sum + month.requests, 0)}
                          </div>
                          <p className="text-xs text-muted-foreground">This year</p>
                        </CardContent>
                      </Card>
                      <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                          <Users className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">
                            {departmentMetrics.reduce((sum, dept) => sum + dept.employees, 0)}
                          </div>
                          <p className="text-xs text-muted-foreground">Across all departments</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Enhanced Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Monthly Request Analytics</CardTitle>
                          <CardDescription>Comprehensive monthly trends with processing metrics.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ChartContainer config={{ 
                            requests: { label: "Total Requests", color: "#8B5CF6" }, 
                            approvals: { label: "Approvals", color: "#22C55E" }, 
                            rejections: { label: "Rejections", color: "#EF4444" },
                            avgProcessTime: { label: "Avg Process Time (days)", color: "#F59E0B" }
                          }} className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={filteredData.monthlyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis yAxisId="left" />
                                <YAxis yAxisId="right" orientation="right" />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar yAxisId="left" dataKey="requests" fill="#8B5CF6" radius={[2,2,0,0]} />
                                <Bar yAxisId="left" dataKey="approvals" fill="#22C55E" radius={[2,2,0,0]} />
                                <Bar yAxisId="left" dataKey="rejections" fill="#EF4444" radius={[2,2,0,0]} />
                                <Line yAxisId="right" type="monotone" dataKey="avgProcessTime" stroke="#F59E0B" strokeWidth={3} />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Leave Type Distribution</CardTitle>
                          <CardDescription>Breakdown of leave types across all requests.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ChartContainer config={{}} className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Pie data={filteredData.leaveTypeDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                  {filteredData.leaveTypeDist.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Department Metrics</CardTitle>
                          <CardDescription>Key metrics across different departments.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Department</TableHead>
                                <TableHead>Avg Leave</TableHead>
                                <TableHead>Satisfaction</TableHead>
                                <TableHead>Productivity</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredData.departmentMetrics.map((dept) => (
                                <TableRow key={dept.department}>
                                  <TableCell>{dept.department}</TableCell>
                                  <TableCell>{dept.avgLeave} days</TableCell>
                                  <TableCell>{dept.satisfaction}/5</TableCell>
                                  <TableCell>{dept.productivity}%</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Leave Patterns</CardTitle>
                          <CardDescription>Identified leave request patterns.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {leavePatterns.map((pattern) => (
                              <div key={pattern.pattern} className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-sm">{pattern.pattern}</div>
                                  <div className="text-xs text-muted-foreground">{pattern.frequency}% frequency</div>
                                </div>
                                <Badge variant={severityColor(pattern.impact)}>{pattern.impact}</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Requests Tab */}
                  <TabsContent value="requests" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Pending Requests</CardTitle>
                            <CardDescription>All leave requests awaiting approval.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Employee</TableHead>
                                  <TableHead>Type</TableHead>
                                  <TableHead>Days</TableHead>
                                  <TableHead>Submitted</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {pendingRequests.map((req) => (
                                  <TableRow key={req.id}>
                                    <TableCell>{req.employee}</TableCell>
                                    <TableCell>{req.type}</TableCell>
                                    <TableCell>{req.days}</TableCell>
                                    <TableCell>{req.submitted}</TableCell>
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Approve</Button>
                                        <Button variant="destructive" size="sm">Reject</Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Policy Violations</CardTitle>
                            <CardDescription>Requests that violate company policy.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Violation ID</TableHead>
                                  <TableHead>Employee</TableHead>
                                  <TableHead>Policy</TableHead>
                                  <TableHead>Date</TableHead>
                                  <TableHead>Severity</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {violations.map((v) => (
                                  <TableRow key={v.id}>
                                    <TableCell>{v.id}</TableCell>
                                    <TableCell>{v.employee}</TableCell>
                                    <TableCell>{v.policy}</TableCell>
                                    <TableCell>{v.date}</TableCell>
                                    <TableCell><Badge variant={severityColor(v.severity)}>{v.severity}</Badge></TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Upcoming Holidays</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {upcomingHolidays.map((holiday) => (
                                <div key={holiday.name} className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{holiday.name}</div>
                                    <div className="text-sm text-muted-foreground">{holiday.date}</div>
                                  </div>
                                  <Badge variant="outline">{holiday.type}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Calendar Tab */}
                  <TabsContent value="calendar" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Company Calendar</CardTitle>
                          <CardDescription>View holidays and leaves.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="w-full"
                          />
                        </CardContent>
                      </Card>
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>On Leave Today</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {onLeaveToday.map((leave) => (
                                <div key={leave.name} className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{leave.name}</div>
                                    <div className="text-sm text-muted-foreground">{leave.team}</div>
                                  </div>
                                  <Badge variant="secondary">{leave.type}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Upcoming Leaves</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {upcomingLeaves.map((leave) => (
                                <div key={leave.name} className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium">{leave.name}</div>
                                    <div className="text-sm text-muted-foreground">{leave.date}</div>
                                  </div>
                                  <Badge variant="outline">{leave.team}</Badge>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
