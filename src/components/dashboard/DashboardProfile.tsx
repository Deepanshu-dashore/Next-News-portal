'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardProfile({ stats }: { stats?: any }) {
  const { user } = useAuth();
  
  const userStats = [
    { label: 'Total Articles', value: stats?.totalArticles || 0 },
    { label: 'Total Videos', value: stats?.totalVideos || 0 },
    { label: 'Views', value: (stats?.totalViews || 0).toLocaleString() }, // Or keep it simple
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
      {/* Banner */}
      <div className="relative h-32 bg-gray-900">
         {/* Using the same abstract background pattern */}
         <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-blue-900/40 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20" 
             style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} 
          />
      </div>
      
      <div className="relative px-6 pb-6 text-center -mt-12">
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-white mx-auto">
             {user?.avatarUrl ? (
                <img 
                  src={user.avatarUrl} 
                  alt={user?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
             ) : (
                <img 
                  src={"/avatar-placeholder.png"} 
                  alt={user?.name || "Profile"} 
                  className="w-full h-full object-cover"
                />
             )}
          </div>
          {/* Active Badge */}
          <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white" title="Active">
             <div className="w-3 h-3 rounded-full bg-white mx-auto" />
          </div>
        </div>

        <h2 className="mt-3 text-xl font-bold text-gray-900">{user?.name}</h2>
        <div className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 bg-gray-200 text-gray-700 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wide">
          <div className="w-1.5 h-1.5 rounded-sm bg-gray-200 animate-pulse" />
          {user?.role}
        </div>

        {/* User Stats */}
        <div className="mt-6 grid grid-cols-3 divide-x divide-gray-100 border-t border-b border-gray-100 py-4">
          {userStats.map((stat, i) => (
            <div key={i} className="flex flex-col px-1">
              <span className="text-lg font-bold text-gray-900">{stat.value}</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-tight mt-0.5">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="mt-6 text-left space-y-4">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-sm uppercase tracking-wide">
             <Icon icon="heroicons:user-20-solid" className="w-4 h-4" />
             About
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
             {user?.bio || "No bio added yet."}
          </p>

          <div className="space-y-3 pt-2">
             <div className="flex items-center gap-3 text-sm text-gray-600 group hover:text-red-600 transition-colors cursor-pointer truncate">
               <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors shrink-0">
                  <Icon icon="heroicons:envelope-20-solid" className="w-4 h-4" />
               </div>
               <span className="font-medium truncate">{user?.email}</span>
            </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <div className="p-2 bg-gray-50 rounded-lg shrink-0">
                  <Icon icon="heroicons:calendar-20-solid" className="w-4 h-4" />
               </div>
               {/* Mock join date or use real if available */}
               <span className="font-medium">Joined Apr 29, 2024</span> 
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-8">
          <Link 
            href="/dashboard/profile"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <Icon icon="heroicons:pencil-square-20-solid" className="w-4 h-4" />
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
