import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Download, RefreshCw } from 'lucide-react';

const departmentOptions = ['All', 'Engineering', 'Design', 'Marketing', 'HR', 'Sales', 'Data Science', 'Product'];
const statusOptions = ['All', 'Pending', 'Approved', 'Rejected', 'Cancelled'];

interface AnalyticsFiltersProps {
  filters: {
    startDate: string;
    endDate: string;
    department: string;
    name: string;
    status: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onApply: () => void;
  onReset: () => void;
  onExport: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const AnalyticsFilters: React.FC<AnalyticsFiltersProps> = ({ 
  filters, 
  setFilters, 
  onApply, 
  onReset, 
  onExport, 
  onRefresh, 
  isRefreshing 
}) => {
  const activeFiltersCount = Object.values(filters).filter(value => 
    typeof value === 'string' ? value !== 'All' : value === true
  ).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <CardTitle>Analytics Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExport}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              placeholder="Enter name"
              value={filters.name} 
              onChange={e => setFilters({ ...filters, name: e.target.value })} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="start-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Start Date
            </Label>
            <Input 
              type="date" 
              id="start-date" 
              value={filters.startDate} 
              onChange={e => setFilters({ ...filters, startDate: e.target.value })} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="end-date" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              End Date
            </Label>
            <Input 
              type="date" 
              id="end-date" 
              value={filters.endDate} 
              onChange={e => setFilters({ ...filters, endDate: e.target.value })} 
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Department</Label>
            <Select value={filters.department} onValueChange={value => setFilters({ ...filters, department: value })} >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Status</Label>
            <Select value={filters.status} onValueChange={value => setFilters({ ...filters, status: value })} >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>


        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onReset}>
            Reset Filters
          </Button>
          <Button onClick={onApply} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
