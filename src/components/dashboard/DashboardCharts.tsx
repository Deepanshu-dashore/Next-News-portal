'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

export default function DashboardCharts({ chartsData, isLoading }: { chartsData?: any, isLoading?: boolean }) {
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [areaData, setAreaData] = useState<any[]>([]);
  const [totalUploads, setTotalUploads] = useState(0);
  const [todayUploads, setTodayUploads] = useState(0);

  // Transform backend data for Pie Chart
  // Expected format: [{ name: 'Tech', value: 35 }]
  const pieData = chartsData?.articlesByCategory?.length > 0
    ? chartsData.articlesByCategory
    : [{ name: 'No Data', value: 1 }];

  // Process content performance data (article uploads)
  useEffect(() => {
    if (chartsData?.contentPerformance && chartsData.contentPerformance.length > 0) {
      const data = chartsData.contentPerformance;
      setAreaData(data);
      
      // Calculate total uploads
      const total = data.reduce((sum: number, day: any) => sum + (day.uploads || day.views || 0), 0);
      setTotalUploads(total);
      
      // Get today's uploads (last item in the array)
      const today = data[data.length - 1];
      setTodayUploads(today?.uploads || today?.views || 0);
    }
  }, [chartsData]);

  if (isLoading) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[350px] bg-gray-100 rounded-2xl animate-pulse" />
            <div className="h-[350px] bg-gray-100 rounded-2xl animate-pulse" />
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {/* Analytics Overview - Area Chart */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="flex items-end justify-between mb-8">
           <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Analytics Overview</h3>
              <p className="text-sm text-gray-500">Article Upload Flow (Last 7 Days)</p>
           </div>
           <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-emerald-600 font-bold mb-1">
                 <Icon icon="heroicons:arrow-trending-up-20-solid" className="w-5 h-5" />
                 {totalUploads.toLocaleString()}
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                 <span className="text-emerald-600">+{todayUploads}</span> Today
              </p>
           </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#3B82F6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Articles by Category - Pie Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Articles by Category</h3>
        
        <div className="flex-1 relative min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip /> 
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-center">
                <p className="text-3xl font-black text-gray-900">
                    {chartsData?.articlesByCategory?.length || 0}
                </p>
                <p className="text-xs font-bold text-gray-400 uppercase">Categories</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {pieData.slice(0, 4).map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2.5 h-2.5 rounded-full shrink-0" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }} 
              />
              <span className="text-xs text-gray-600 font-bold truncate">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
