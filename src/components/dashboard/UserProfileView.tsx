'use client';

import { UserProfile } from '@/src/hooks/useUserProfile';
import { Icon } from '@iconify/react';

interface UserProfileViewProps {
  profile: UserProfile;
  onEdit: () => void;
}

function UserProfileView({ profile, onEdit }: UserProfileViewProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const StatItem = ({ label, value, icon }: { label: string; value: number | string; icon: string }) => (
    <div className="flex items-center border-b-2 gap-3 p-3 px-1 border-gray-200/60 hover:bg-gray-50 transition-colors cursor-default">
      <div className="w-11 h-11 rounded-lg bg-linear-to-t from-gray-200/70 via-gray-100 to-gray-200/60 flex items-center justify-center text-gray-500">
        <Icon icon={icon} className="w-6 h-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-gray-900 leading-none">{value}</span>
        <span className="text-xs text-gray-500 font-medium mt-0.5">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Section - Reference Style */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
        {/* Banner with modern abstract design */}
        <div 
          className="h-56 bg-cover bg-center relative"
          style={{ backgroundImage: "url('/profile-banner-reference.png')" }}
        >
          {/* Gradient Overlay for text visibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-all duration-500" />
          
          {/* Content Positioned Over Banner */}
          <div className="absolute bottom-0 left-0 w-full px-8 pb-6 flex items-end gap-6">
              {/* Avatar */}
              <div className="relative shrink-0 -mb-4">
                <div className="w-32 h-32 rounded-full p-1 bg-white/20 backdrop-blur-sm shadow-2xl ring-1 ring-white/30">
                   <div className="w-full h-full rounded-full bg-white border-2 border-white flex items-center justify-center overflow-hidden">
                      {profile.avatarUrl ? (
                        <img src={profile.avatarUrl} alt={profile.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-bold text-gray-300">{getInitials(profile.name)}</span>
                      )}
                   </div>
                </div>
                 {/* Active Status Indicator */}
                 {profile.isActive && (
                   <div className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full shadow-md z-10" title="Active" />
                 )}
              </div>

              {/* Name & Role & Email - On Banner */}
              <div className="flex-1 pb-2 text-white shadow-black/50 drop-shadow-md">
                 <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-bold text-white leading-tight tracking-tight">{profile.name}</h1>
                    {/* Role Badge */}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                      {profile.role}
                    </span>
                 </div>
                 <p className="text-gray-200 text-sm font-medium opacity-90">{profile.email}</p>
              </div>

               {/* Action Buttons */}
               <div className="flex gap-3 pb-2">
                 <button
                  onClick={onEdit}
                  className="px-5 py-2 cursor-pointer bg-white text-gray-900 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
                 >
                   <Icon icon="heroicons:pencil-square-solid" className="w-4 h-4" />
                   Edit
                 </button>
               </div>
          </div>
        </div>

        <div className="px-8 py-2.5 relative flex justify-end">
           {/* Stats Row */}
           <div className="flex flex-wrap gap-10 border-t border-gray-100">
              <StatItem 
                label="Total Articles" 
                value={profile.totalArticles || 0}
                icon="ph:newspaper-clipping-duotone"
              />
              <StatItem 
                label="Published" 
                value={profile.totalPublishedArticles || 0}
                icon="solar:file-check-bold-duotone"
              />
              <StatItem 
                label="Key Drafts" 
                value={profile.totalDraftArticles || 0}
                icon="ic:twotone-pending-actions"
              />
              <StatItem 
                label="Videos" 
                value={profile.totalVideos || 0}
                icon="si:video-duotone"
              />
               <StatItem 
                label="Draft Videos" 
                value={profile.totalDraftVideos || 0}
                icon="solar:video-frame-2-bold-duotone"
              />
              <StatItem 
                label="Joined Date" 
                value={profile.createdAt ? new Date(profile.createdAt).getFullYear() : '2024'}
                icon="lets-icons:date-today-duotone"
              />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Social Links (Vertical List) */}
        <div className="space-y-6">
           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                Social
              </h3>
              <div className="space-y-4">
                 {/* render links one by one */}
                 {profile.socialLinks?.twitter && (
                   <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-bold text-gray-900">X (Twitter)</p>
                         <p className="text-xs text-gray-400 truncate group-hover:text-gray-600 transition-colors">{profile.socialLinks.twitter}</p>
                      </div>
                   </a>
                 )}
                 {profile.socialLinks?.facebook && (
                   <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z"/></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-bold text-gray-900">Facebook</p>
                         <p className="text-xs text-gray-400 truncate group-hover:text-gray-600 transition-colors">{profile.socialLinks.facebook}</p>
                      </div>
                   </a>
                 )}
                 {profile.socialLinks?.instagram && (
                   <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-bold text-gray-900">Instagram</p>
                         <p className="text-xs text-gray-400 truncate group-hover:text-gray-600 transition-colors">{profile.socialLinks.instagram}</p>
                      </div>
                   </a>
                 )}
                 {profile.socialLinks?.linkedin && (
                   <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-bold text-gray-900">LinkedIn</p>
                         <p className="text-xs text-gray-400 truncate group-hover:text-gray-600 transition-colors">{profile.socialLinks.linkedin}</p>
                      </div>
                   </a>
                 )}
                 {profile.socialLinks?.website && (
                   <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                      </div>
                      <div className="flex-1 overflow-hidden">
                         <p className="text-sm font-bold text-gray-900">Website</p>
                         <p className="text-xs text-gray-400 truncate group-hover:text-gray-600 transition-colors">{profile.socialLinks.website}</p>
                      </div>
                   </a>
                 )}
              </div>
              {Object.keys(profile.socialLinks || {}).length === 0 && (
                <p className="text-gray-400 text-sm italic">No social links connected.</p>
              )}
           </div>
        </div>

        {/* Right Column: About/Bio */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[360px]">
               <h3 className="text-lg font-bold text-gray-900 mb-4">About / Bio</h3>
               {profile.bio ? (
                 <div className="prose prose-slate max-w-none">
                   <p className="text-gray-600 leading-relaxed text-base">{profile.bio}</p>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-40 text-center">
                   <p className="text-gray-400 mb-2">No bio added yet.</p>
                   <button onClick={onEdit} className="text-sm font-medium text-blue-600 hover:underline">Add a bio</button>
                 </div>
               )}
            </div>

         </div>
      </div>
    </div>
  );
}

export default UserProfileView;
