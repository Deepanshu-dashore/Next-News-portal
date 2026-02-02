'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { Container } from '@/components/ui/Container';
import AdminHeader from '@/src/components/dashboard/AdminHeader';
import DashboardStats from '@/src/components/dashboard/DashboardStats';
import DashboardCharts from '@/src/components/dashboard/DashboardCharts';
import DashboardProfile from '@/src/components/dashboard/DashboardProfile';
import RecentArticles from '@/src/components/dashboard/RecentArticles';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const result = await response.json();
        if (result.success && isMounted) {
          setStatsData(result.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (!query) return;

    // 3 word max limit validation
    const wordCount = query.split(/\s+/).length;
    if (wordCount > 3) {
      toast.error('Search allows a maximum of 3 words');
      return;
    }

    router.push(`/dashboard/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-full pb-12">
      {/* Content */}
      <Container className="py-8 max-w-[1600px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
           <AdminHeader
             title="Dashboard"
             description={`Welcome back, ${user?.name}`}
           />
           <div className="relative flex items-center gap-2">
             <div className="relative">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Search (max 3 words)..." 
                 className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-72 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
               />
               {/* Moved icon to right as a button or just keep it clean? User asked for button with magnifying glass icon. */}
             </div>
             <button
                onClick={handleSearch}
                className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                title="Search"
             >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </button>
           </div>
        </div>

        <div className="grid grid-cols-12 gap-8 w-full">
          {/* Main Content Area */}
          <div className="col-span-12 xl:col-span-9 space-y-8">
            {/* Stats Cards */}
            <DashboardStats stats={statsData?.stats} isLoading={isLoading} />

            {/* Analytics Section */}
            <DashboardCharts chartsData={statsData?.charts} isLoading={isLoading} />

            {/* Recent Articles Section */}
            <RecentArticles articles={statsData?.recentArticles} isLoading={isLoading} />
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 xl:col-span-3 space-y-8">
            <DashboardProfile stats={statsData?.stats} />

            {/* Quick Actions / Mini Widgets */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                   <Link href="/dashboard/articles/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                      </div>
                      <div>
                         <p className="font-bold text-gray-900 text-sm">Create New Article</p>
                         <p className="text-xs text-gray-500">Write and publish content</p>
                      </div>
                   </Link>
                   
                   <Link href="/dashboard/videos/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                      </div>
                      <div>
                         <p className="font-bold text-gray-900 text-sm">Upload Video</p>
                         <p className="text-xs text-gray-500">Share video content</p>
                      </div>
                   </Link>

                   <Link href="/dashboard/users/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                      </div>
                      <div>
                         <p className="font-bold text-gray-900 text-sm">Add New User</p>
                         <p className="text-xs text-gray-500">Invite team members</p>
                      </div>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
