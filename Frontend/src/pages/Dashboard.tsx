import React from "react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DayProps, Day as DefaultDay } from 'react-day-picker';
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
import { Clock, AlertTriangle, CheckCircle2, Users, CalendarDays, Calendar as CalendarIcon, Download, RefreshCw, TrendingUp, Activity, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/footer";
import { AnalyticsFilters } from '@/components/analytics-filters';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';

// Types for admin leave requests and stats
interface AdminLeaveItem {
  _id: string;
  employeeName: string;
  employeePhone: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
  receivedAt: string;
}

interface AdminStats {
  pending: number;
  approved: number;
  rejected: number;
}

// New interfaces for calendar data
interface EmployeeOnLeave {
  name: string;
  type: string;
  startDate: string;
  endDate: string;
}

interface UpcomingLeave {
  name: string;
  date: string;
  type: string;
  startDate: string;
  endDate: string;
}

interface CalendarData {
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  type: string;
}

// Static data removed - now using dynamic API data

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

// Static upcoming leaves data removed - now using dynamic API data

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
  const [activeTab, setActiveTab] = React.useState('overview');
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  // Calendar data state
  const [employeesOnLeaveToday, setEmployeesOnLeaveToday] = React.useState<EmployeeOnLeave[]>([]);
  const [upcomingLeavesData, setUpcomingLeavesData] = React.useState<UpcomingLeave[]>([]);
  const [calendarData, setCalendarData] = React.useState<CalendarData[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = React.useState(false);

  // API functions for calendar data
  const fetchEmployeesOnLeaveToday = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/calendar/employees-on-leave-today`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeesOnLeaveToday(data.employees);
      }
    } catch (error) {
      console.error('Error fetching employees on leave today:', error);
    }
  };

  const fetchUpcomingLeaves = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/calendar/upcoming-leaves`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUpcomingLeavesData(data.leaves);
      }
    } catch (error) {
      console.error('Error fetching upcoming leaves:', error);
    }
  };

  const fetchCalendarData = async (year: number, month: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/calendar/data?year=${year}&month=${month}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCalendarData(data.calendarData);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  // Load calendar data on component mount
  React.useEffect(() => {
    const loadCalendarData = async () => {
      setIsLoadingCalendar(true);
      await Promise.all([
        fetchEmployeesOnLeaveToday(),
        fetchUpcomingLeaves(),
        fetchCalendarData(new Date().getFullYear(), new Date().getMonth() + 1)
      ]);
      setIsLoadingCalendar(false);
    };
    loadCalendarData();
  }, []);

  // Refresh calendar data function
  const refreshCalendarData = async () => {
    setIsLoadingCalendar(true);
    await Promise.all([
      fetchEmployeesOnLeaveToday(),
      fetchUpcomingLeaves(),
      fetchCalendarData(new Date().getFullYear(), new Date().getMonth() + 1)
    ]);
    setIsLoadingCalendar(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Animate water-like stripe when tab changes
  const animateWaterStripe = (tabValue: string) => {
    setActiveTab(tabValue);
    if (indicatorRef.current) {
      const positions = {
        overview: '0%',
        analytics: '25%',
        requests: '50%',
        calendar: '75%'
      };
      
      const targetPosition = positions[tabValue as keyof typeof positions];
      indicatorRef.current.style.transform = `translateX(${targetPosition})`;
      
      // Add water ripple effect
      indicatorRef.current.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
      setTimeout(() => {
        if (indicatorRef.current) {
          indicatorRef.current.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.3)';
        }
      }, 300);
    }
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

  const [pendingRequests, setPendingRequests] = useState<AdminLeaveItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('employeeName');

  const filteredPendingRequests = pendingRequests.filter((request) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const valueToSearch = request[searchType as keyof AdminLeaveItem]?.toString().toLowerCase();
    return valueToSearch ? valueToSearch.includes(term) : false;
  });

  const [adminStats, setAdminStats] = useState<AdminStats>({ pending: 0, approved: 0, rejected: 0 });
  const [loadingList, setLoadingList] = useState(false);
  const [errorList, setErrorList] = useState('');

  const loadAdminData = async () => {
    try {
      setLoadingList(true);
      setErrorList('');
      const [listRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/leave-requests?status=Pending`, { credentials: 'include' }),
        fetch(`${API_BASE_URL}/admin/stats`, { credentials: 'include' }),
      ]);
      const listJson = await listRes.json().catch(() => ({}));
      const statsJson = await statsRes.json().catch(() => ({}));
      if (listRes.ok) {
        const items = (listJson as any).emails as any[];
        const mapped: AdminLeaveItem[] = (items || []).map((it) => ({
          _id: it._id,
          employeeName: it.employeeName || 'Unknown',
          employeePhone: it.employeePhone || 'N/A',
          leaveType: it.leaveType || 'Other',
          startDate: it.startDate,
          endDate: it.endDate,
          status: it.status,
          receivedAt: it.receivedAt,
        }));
        setPendingRequests(mapped);
      } else {
        setErrorList((listJson as any).message || 'Failed to load requests');
      }
      if (statsRes.ok) {
        setAdminStats(statsJson as AdminStats);
      }
    } catch (err) {
      setErrorList('Failed to load data');
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

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

  // Generate months for calendar view (previous + current + 4 next = 6 months)
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = -1; i <= 4; i++) {
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

  const holidayDates = allHolidays.map(h => new Date(h.date.replace(/-/g, '/')));

  // Function to get leave info for a date
  const getLeaveInfo = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    return calendarData.filter(leave => {
      const startDate = new Date(leave.startDate);
      const endDate = new Date(leave.endDate);
      const currentDate = new Date(dateString);
      return currentDate >= startDate && currentDate <= endDate;
    });
  };

  const CustomDay = (props: DayProps) => {
    const holidayInfo = getHolidayInfo(props.date);
    const leaveInfo = getLeaveInfo(props.date);
    
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative w-full h-full flex items-center justify-center">
              <DefaultDay {...props} />
              {leaveInfo.length > 0 && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-0.5">
                    {leaveInfo.slice(0, 3).map((leave, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full ${
                          leave.type === 'SL' ? 'bg-red-500' :
                          leave.type === 'CL' ? 'bg-blue-500' :
                          leave.type === 'PL' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                    {leaveInfo.length > 3 && (
                      <div className="w-1 h-1 rounded-full bg-gray-400" />
                    )}
                  </div>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {holidayInfo && (
              <div className="mb-2">
                <p className="font-semibold text-green-700">{holidayInfo.name}</p>
                <p className="text-sm text-green-600">{holidayInfo.type}</p>
              </div>
            )}
            {leaveInfo.length > 0 && (
              <div>
                <p className="font-semibold text-blue-700 mb-1">Employees on Leave:</p>
                {leaveInfo.map((leave, index) => (
                  <div key={index} className="text-sm text-blue-600">
                    • {leave.employeeName} ({leave.type})
                  </div>
                ))}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

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
        <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-form-background to-background p-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">

            {/* Main Content with Tabs */}
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="overview" className="w-full" onValueChange={animateWaterStripe}>
                  <TabsList className="relative grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-muted/50 p-1 rounded-lg border overflow-hidden">
                    <TabsTrigger 
                      value="overview" 
                      className="relative z-10 transition-all duration-300 ease-out data-[state=active]:text-purple-800 data-[state=active]:font-medium"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="relative z-10 transition-all duration-300 ease-out data-[state=active]:text-purple-800 data-[state=active]:font-medium"
                    >
                      Analytics
                    </TabsTrigger>
                    <TabsTrigger 
                      value="requests" 
                      className="relative z-10 transition-all duration-300 ease-out data-[state=active]:text-purple-800 data-[state=active]:font-medium"
                    >
                      Requests
                    </TabsTrigger>
                    <TabsTrigger 
                      value="calendar" 
                      className="relative z-10 transition-all duration-300 ease-out data-[state=active]:text-purple-800 data-[state=active]:font-medium"
                    >
                      Calendar
                    </TabsTrigger>
                    
                    {/* Flowing Water-like Active Tab Indicator */}
                    <div 
                      ref={indicatorRef}
                      className="absolute top-1 bottom-1 bg-gradient-to-r from-white/80 via-white to-white/80 rounded-md shadow-lg transition-all duration-700 ease-out"
                      style={{
                        width: '25%',
                        left: '0%',
                        transform: 'translateX(0%)',
                      }}
                    />
                    
                    {/* Water Ripple Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse opacity-0 data-[state=active]:opacity-100 transition-opacity duration-1000" />
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent 
                    value="overview" 
                    className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                  >
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
                          <div className="text-2xl font-bold">{
                            (() => {
                              const total = adminStats.approved + adminStats.rejected;
                              if (total === 0) return '0%';
                              const rate = Math.round((adminStats.approved / total) * 100);
                              return `${rate}%`;
                            })()
                          }</div>
                          <p className="text-xs text-muted-foreground">+1.2% from last month</p>
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
                  <TabsContent 
                    value="analytics" 
                    className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                  >
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
                          {/* Calendar Legend */}
                          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                            <h4 className="text-sm font-semibold mb-2">Calendar Legend</h4>
                            <div className="flex flex-wrap gap-4 text-xs">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span>Sick Leave (SL)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span>Casual Leave (CL)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span>Paid Leave (PL)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                <span>Other Leave (OL)</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Requests Tab */}
                  <TabsContent 
                    value="requests" 
                    className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-3 space-y-6">
                        <Card>
                          <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                              <div>
                                <CardTitle>Pending Requests</CardTitle>
                                <CardDescription>All leave requests awaiting approval.</CardDescription>
                              </div>
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <div className="relative w-full sm:w-64">
                                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input
                                    type="search"
                                    placeholder="Search requests..."
                                    className="pl-8 w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                  />
                                </div>
                                <Select value={searchType} onValueChange={setSearchType}>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Search by" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="employeeName">Employee Name</SelectItem>
                                    <SelectItem value="employeePhone">Phone Number</SelectItem>
                                    <SelectItem value="leaveType">Leave Type</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Employee</TableHead>
                                  <TableHead>Phone Number</TableHead>
                                  <TableHead>Leave Type</TableHead>
                                  <TableHead>Days</TableHead>
                                  <TableHead>Submitted</TableHead>
                                  <TableHead>Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {loadingList && (
                                  <TableRow>
                                    <TableCell colSpan={6}>Loading...</TableCell>
                                  </TableRow>
                                )}
                                {!loadingList && errorList && (
                                  <TableRow>
                                    <TableCell colSpan={6} className="text-destructive">{errorList}</TableCell>
                                  </TableRow>
                                )}
                                {!loadingList && !errorList && filteredPendingRequests.map((req) => (
                                  <TableRow key={req._id}>
                                    <TableCell>{req.employeeName}</TableCell>
                                    <TableCell>{req.employeePhone}</TableCell>
                                    <TableCell>{req.leaveType}</TableCell>
                                    <TableCell>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(req.receivedAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={async () => {
                                          const res = await fetch(`${API_BASE_URL}/admin/leave-requests/${req._id}/approve`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminRemarks: '' }) });
                                          if (res.ok) loadAdminData();
                                        }}>Approve</Button>
                                        <Button variant="destructive" size="sm" onClick={async () => {
                                          const res = await fetch(`${API_BASE_URL}/admin/leave-requests/${req._id}/reject`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminRemarks: '' }) });
                                          if (res.ok) loadAdminData();
                                        }}>Reject</Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                      </div>
                      <div className="space-y-6">
                      </div>
                    </div>
                  </TabsContent>

                  {/* Calendar Tab */}
                  <TabsContent 
                    value="calendar" 
                    className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <CardTitle>Company Calendar</CardTitle>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={refreshCalendarData}
                              disabled={isLoadingCalendar}
                              className="flex items-center gap-2"
                            >
                              <RefreshCw className={`h-4 w-4 ${isLoadingCalendar ? 'animate-spin' : ''}`} />
                              Refresh
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {months.map((month) => (
                              <div key={month.name} className="relative pt-5">
                                {month.isCurrentMonth && (
                                  <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 text-sm font-semibold">
                                    Current
                                  </span>
                                )}
                                <div className="flex flex-col items-center p-2 rounded-lg border h-full">
                                  <h4 className="text-sm font-semibold mb-2 text-center">{month.name}</h4>
                                  <Calendar
                                    mode="single"
                                    month={month.date}
                                    selected={date}
                                    onSelect={setDate}
                                    className="p-0"
                                    modifiers={{ holiday: holidayDates, sunday: isSunday }}
                                    modifiersClassNames={{
                                      holiday: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 rounded-full',
                                      sunday: 'text-red-500 dark:text-red-400',
                                    }}
                                    components={{
                                      Caption: () => null, // This hides the default month/year title
                                      Day: CustomDay,
                                    }}
                                    classNames={{
                                      day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                                      day_today: 'bg-accent text-accent-foreground',
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
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
                        <Card>
                          <CardHeader>
                            <CardTitle>On Leave Today</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isLoadingCalendar ? (
                              <div className="space-y-4">
                                <div className="animate-pulse">
                                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="animate-pulse">
                                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                              </div>
                            ) : employeesOnLeaveToday.length > 0 ? (
                              <div className="space-y-4">
                                {employeesOnLeaveToday.map((leave) => (
                                  <div key={leave.name} className="flex items-center justify-between">
                                    <div>
                                      <div className="font-medium">{leave.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}
                                      </div>
                                    </div>
                                    <Badge variant="secondary">{leave.type}</Badge>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center text-muted-foreground py-4">
                                No employees on leave today
                              </div>
                            )}
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Upcoming Leaves</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isLoadingCalendar ? (
                              <div className="space-y-4">
                                <div className="animate-pulse">
                                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                                <div className="animate-pulse">
                                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ) : upcomingLeavesData.length > 0 ? (
              <div className="space-y-4">
                {upcomingLeavesData.map((leave) => (
                  <div key={leave.name} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{leave.name}</div>
                      <div className="text-sm text-muted-foreground">{leave.date}</div>
                    </div>
                    <Badge variant="outline">{leave.type}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                No upcoming leaves
              </div>
            )}
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
