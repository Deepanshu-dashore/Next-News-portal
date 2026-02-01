'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface SubTab {
  name: string;
  href: string;
  icon: string;
}

interface SidebarTab {
  name: string;
  href: string;
  icon: string;
  badge?: number | string;
  submenu?: SubTab[];
}

const sidebarTabs: SidebarTab[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'lucide:layout-dashboard',
  },
  {
    name: 'Articles',
    href: '/dashboard/articles',
    icon: 'lucide:file-text',
    submenu: [
      { name: 'All Articles', href: '/dashboard/articles', icon: 'lucide:list' },
      { name: 'Add Article', href: '/dashboard/articles/new', icon: 'lucide:plus' },
      // { name: 'Published', href: '/dashboard/articles/published', icon: 'lucide:check-circle' },
      // { name: 'Drafts', href: '/dashboard/articles/drafts', icon: 'lucide:edit' },
      // { name: 'Analytics', href: '/dashboard/articles/analytics', icon: 'lucide:bar-chart' },
    ],
  },
  {
    name: 'Videos',
    href: '/dashboard/videos',
    icon: 'lucide:play-circle',
    submenu: [
      { name: 'All Videos', href: '/dashboard/videos', icon: 'lucide:list' },
      { name: 'Upload New', href: '/dashboard/videos/upload', icon: 'lucide:upload' },
      // { name: 'Published', href: '/dashboard/videos/published', icon: 'lucide:check-circle' },
      // { name: 'Processing', href: '/dashboard/videos/processing', icon: 'lucide:loader' },
    ],
  },
  {
    name: 'Categories',
    href: '/dashboard/categories',
    icon: 'lucide:folder-open',
    submenu: [
      { name: 'All Categories', href: '/dashboard/categories', icon: 'lucide:list' },
      { name: 'Create New', href: '/dashboard/categories/new', icon: 'lucide:plus' },
      // { name: 'Manage', href: '/dashboard/categories/manage', icon: 'lucide:settings' },
    ],
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: 'lucide:users',
    submenu: [
      { name: 'All Users', href: '/dashboard/users', icon: 'lucide:list' },
      { name: 'Roles', href: '/dashboard/users/roles', icon: 'lucide:shield' },
      { name: 'Permissions', href: '/dashboard/users/permissions', icon: 'lucide:lock' },
    ],
  },
//   {
//     name: 'Settings',
//     href: '/dashboard/settings',
//     icon: 'lucide:settings',
//     submenu: [
//       { name: 'General', href: '/dashboard/settings', icon: 'lucide:sliders' },
//       { name: 'SEO', href: '/dashboard/settings/seo', icon: 'lucide:search' },
//       { name: 'Email', href: '/dashboard/settings/email', icon: 'lucide:mail' },
//       { name: 'Security', href: '/dashboard/settings/security', icon: 'lucide:lock' },
//     ],
//   },
];

interface IconProps {
  icon: string;
  className?: string;
}

// Simple icon component using iconify CDN
function Icon({ icon, className = 'w-5 h-5' }: IconProps) {
  return (
    <i
      className={`${icon} ${className}`}
      style={{
        display: 'inline-block',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}

// Custom SVG Icon for better compatibility
function HeroIcon({ name, className = 'w-5 h-5' }: { name: string; className?: string }) {
  const iconMap: { [key: string]: React.ReactNode } = {
    'lucide:layout-dashboard': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
      </svg>
    ),
    'lucide:file-text': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    'lucide:play-circle': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'lucide:folder-open': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    'lucide:image': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    'lucide:message-square': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    'lucide:users': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 8.048M7 16H5a2 2 0 00-2 2v4h4m10-16a4 4 0 110 8.048m-7 8h14a2 2 0 002-2v-4h-6" />
      </svg>
    ),
    'lucide:settings': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    'lucide:list': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    'lucide:plus': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    'lucide:check-circle': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'lucide:edit': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    'lucide:bar-chart': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    'lucide:upload': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    'lucide:loader': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    'lucide:folder': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    'lucide:cloud-upload': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3-3m0 0l3 3m-3-3v12" />
      </svg>
    ),
    'lucide:shield': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'lucide:lock': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    'lucide:sliders': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6-8v-2m0 2a2 2 0 100 4m0-4a2 2 0 110 4" />
      </svg>
    ),
    'lucide:search': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    'lucide:mail': (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <span className={className}>
      {iconMap[name] || iconMap['lucide:file-text']}
    </span>
  );
}

interface SidebarItemProps {
  tab: SidebarTab;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
}

function SidebarItem({ tab, isActive, isExpanded, onToggle, pathname }: SidebarItemProps) {
  const hasSubmenu = tab.submenu && tab.submenu.length > 0;

  return (
    <div>
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
          transition-all duration-300 ease-out group
          ${isActive
            ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-md'
            : 'text-gray-700 hover:bg-gray-100'
          }
        `}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
            <HeroIcon name={tab.icon} className="w-5 h-5" />
          </span>
          <span className="font-semibold text-sm">{tab.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {tab.badge && (
            <span className={`
              text-xs font-bold px-2 py-1 rounded-full
              ${isActive ? 'bg-white/20' : 'bg-red-100 text-red-700'}
            `}>
              {tab.badge}
            </span>
          )}
          {hasSubmenu && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 48 48"
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-90' : 'rotate-0'
              }`}
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="m19 12l12 12l-12 12"
              />
            </svg>
          )}
        </div>
      </button>

      {/* Submenu */}
      {hasSubmenu && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="mt-2 ml-2 border-l-2 border-gray-200 pl-0 space-y-1.5">
            {tab.submenu!.map((subitem) => {
              const isSubActive = pathname === subitem.href;
              return (
                <Link
                  key={subitem.href}
                  href={subitem.href}
                  className={`
                    flex items-center px-4 py-2 rounded-lg mx-2
                    transition-all duration-300 ease-out
                    ${isSubActive
                      ? 'bg-red-50 text-red-600 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="text-xs font-medium">{subitem.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function EditorSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string>();

  const toggleExpand = (name: string) => {
    setExpandedItems(name===expandedItems ? undefined : name);
  };

  const getActiveSubmenu = () => {
    for (const tab of sidebarTabs) {
      if (tab.submenu) {
        const hasActive = tab.submenu.some((sub) => pathname === sub.href);
        if (hasActive) return tab.name;
      }
    }
    return null;
  };

  // Auto-expand parent if a sub-item is active
  const activeParent = getActiveSubmenu();
  const shouldAutoExpand = activeParent && expandedItems !== activeParent;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 bg-linear-to-br from-red-50 to-orange-50">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[160px]">
            <Image
              src="/logo.png"
              alt="News Portal"
              width={160}
              height={48}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto SideBarHide">
        {sidebarTabs.map((tab) => {
          const isActive = pathname === tab.href || 
                          (tab.href !== '/dashboard' && pathname.startsWith(tab.href));
          const isExpanded = Boolean(expandedItems === tab.name || 
                            (shouldAutoExpand && activeParent === tab.name));

          return (
            <SidebarItem
              key={tab.name}
              tab={tab}
              isActive={isActive}
              isExpanded={isExpanded}
              onToggle={() => toggleExpand(tab.name)}
              pathname={pathname}
            />
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <p className="text-xs font-semibold text-blue-900 mb-2">Need Help?</p>
          <button className="w-full px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
            Documentation
          </button>
        </div>
      </div>
    </aside>
  );
}

export default EditorSidebar;
