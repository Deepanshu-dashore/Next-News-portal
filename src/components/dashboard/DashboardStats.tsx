'use client';

import { Icon } from '@iconify/react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp: boolean;
  icon: string;
  gradient: string;
}

const StatCard = ({ title, value, trend, trendUp, icon, gradient }: StatCardProps) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient} text-white shadow-md transition-transform hover:-translate-y-1`}>
    <div className="relative z-10">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
          <Icon icon={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-sm font-medium text-white/90">{title}</p>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className={`flex items-center gap-1 font-bold ${trendUp ? 'text-emerald-100' : 'text-red-100'} px-2 py-0.5 rounded-lg bg-white/10`}>
          <Icon icon={trendUp ? 'heroicons:arrow-trending-up-20-solid' : 'heroicons:arrow-trending-down-20-solid'} className="w-4 h-4" />
          {trend}
        </span>
        <span className="text-white/80 text-xs font-medium">this week</span>
      </div>
    </div>
    
    {/* Clean Wave Effect */}
    <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full text-white fill-current">
          <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
       </svg>
    </div>
     <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 translate-y-2">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full text-white fill-current">
          <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,202.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
       </svg>
    </div>
  </div>
);

export default function DashboardStats({ stats, isLoading }: { stats?: any, isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  const data = [
    {
      title: 'Total Articles',
      value: stats?.totalArticles || 0,
      trend: `+${stats?.totalArticles > 0 ? 1 : 0}`, // Mock trend logic for now
      trendUp: true,
      icon: 'heroicons:document-text-20-solid',
      gradient: 'bg-blue-500',
    },
    {
      title: 'Drafts',
      value: stats?.totalDrafts || 0,
      trend: stats?.totalDrafts > 0 ? '+2' : '0',
      trendUp: true,
      icon: 'heroicons:document-20-solid',
      gradient: 'bg-teal-500', 
    },
    {
      title: 'Views',
      value: (stats?.totalViews || 0).toLocaleString(),
      trend: '+8.2%',
      trendUp: true,
      icon: 'heroicons:eye-20-solid',
      gradient: 'bg-orange-400', 
    },
    {
      title: 'Subscribers',
      value: stats?.totalUsers || 0, // Using Total Users as Subscribers for now
      trend: '+136',
      trendUp: true,
      icon: 'heroicons:users-20-solid',
      gradient: 'bg-yellow-400', 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
