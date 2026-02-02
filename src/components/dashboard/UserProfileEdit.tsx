'use client';

import { useState } from 'react';
import { UserProfile, UpdateProfileData } from '@/src/hooks/useUserProfile';
import { Icon } from '@iconify/react';
import SubmitButton from './SubmitButton';

interface UserProfileEditProps {
  profile: UserProfile;
  onSave: (data: UpdateProfileData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function UserProfileEdit({ profile, onSave, onCancel, isLoading = false }: UserProfileEditProps) {
  const [formData, setFormData] = useState<UpdateProfileData>({
    name: profile.name,
    bio: profile.bio || '',
    avatarUrl: profile.avatarUrl || '',
    socialLinks: profile.socialLinks || {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value || undefined,
      },
    }));
  };

  return (
    <div className="animate-fade-in mx-auto pb-10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
          
          {/* Main Info Section */}
          <div className="space-y-6">
             <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
               <Icon icon="heroicons:user-circle-20-solid" className="w-5 h-5 text-gray-400" />
               Basic Info
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                 <div className="relative">
                   <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 pl-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:border-gray-900 transition-all ${
                      errors.name ? 'focus:ring-red-500 text-red-900 border-red-200' : 'focus:ring-gray-900 text-gray-900'
                    }`}
                    placeholder="Your Name"
                    disabled={isLoading}
                   />
                   <Icon icon="heroicons:user-20-solid" className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                 </div>
                 {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
               </div>
               
               {/* Read-only Role */}
               <div className="space-y-2 opacity-70">
                 <label className="text-sm font-medium text-gray-700 ml-1">Role</label>
                 <div className="relative">
                   <input
                    type="text"
                    value={profile.role}
                    disabled
                    className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 uppercase font-bold tracking-wider cursor-not-allowed"
                   />
                   <Icon icon="heroicons:shield-check-20-solid" className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                 </div>
               </div>
             </div>

             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 resize-none transition-all focus:border-gray-900"
                  placeholder="Share a short bio..."
                  disabled={isLoading}
                />
                <div className="flex justify-end pr-1">
                   <span className="text-xs text-gray-400">{(formData.bio || '').length}/500</span>
                </div>
             </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-400 font-medium">Contact & Social</span>
            </div>
          </div>

          {/* Social Links Section */}
          <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
               {[
                 { id: 'twitter', label: 'X (Twitter)', icon: 'ri:twitter-x-fill', placeholder: 'https://x.com/username' },
                 { id: 'facebook', label: 'Facebook', icon: 'ri:facebook-fill', placeholder: 'https://facebook.com/username' },
                 { id: 'instagram', label: 'Instagram', icon: 'ri:instagram-fill', placeholder: 'https://instagram.com/username' },
                 { id: 'linkedin', label: 'LinkedIn', icon: 'ri:linkedin-fill', placeholder: 'https://linkedin.com/in/username' },
                 { id: 'website', label: 'Website', icon: 'ri:global-line', placeholder: 'https://yoursite.com' },
               ].map((social) => (
                 <div key={social.id} className="space-y-2">
                   <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{social.label}</label>
                   <div className="relative group">
                     <div className="absolute left-3 top-3 w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 group-focus-within:bg-gray-900 group-focus-within:text-white transition-colors">
                        <Icon icon={social.icon} className="w-3.5 h-3.5" />
                     </div>
                     <input
                      type="url"
                      value={formData.socialLinks?.[social.id as keyof typeof formData.socialLinks] || ''}
                      onChange={(e) => handleSocialLinkChange(social.id, e.target.value)}
                      className="w-full px-4 py-3 pl-12 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                      placeholder={social.placeholder}
                      disabled={isLoading}
                     />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Floating Action Bar */}
        <div className="flex items-center justify-end gap-4 pt-2">
           <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-8 py-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
           >
             Cancel
           </button>
           <SubmitButton isLoading={isLoading} label="Save Changes" loadingLabel="Saving..." />
        </div>
      </form>
    </div>
  );
}
