'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';

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
      // { name: 'Roles', href: '/dashboard/users/roles', icon: 'lucide:shield' },
      // { name: 'Permissions', href: '/dashboard/users/permissions', icon: 'lucide:lock' },
    ],
  },
  {
    name: 'My Profile',
    href: '/dashboard/profile',
    icon: 'lucide:user',
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


interface SidebarItemProps {
  tab: SidebarTab;
  isActive: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  pathname: string;
}

function SidebarItem({ tab, isActive, isExpanded, onToggle, pathname }: SidebarItemProps) {
  const hasSubmenu = tab.submenu && tab.submenu.length > 0;
  const baseItemClasses = `
    w-full flex items-center justify-between px-3 py-2 rounded-md
    transition-all duration-200 ease-out group
    ${isActive
      ? 'bg-red-50 text-red-700'
      : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <div>
      {hasSubmenu ? (
        <button onClick={onToggle} className={baseItemClasses}>
          <div className="flex items-center gap-3">
            <Icon icon={tab.icon} className="w-5 h-5" />
            <span className="font-semibold text-sm">{tab.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {tab.badge && (
              <span className={`
                text-xs font-bold px-2 py-0.5 rounded-full
                ${isActive ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}
              `}>
                {tab.badge}
              </span>
            )}
            <Icon
              icon="mdi:chevron-right"
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
            />
          </div>
        </button>
      ) : (
        <Link href={tab.href} className={baseItemClasses}>
          <div className="flex items-center gap-3">
            <Icon icon={tab.icon} className="w-5 h-5" />
            <span className="font-semibold text-sm">{tab.name}</span>
          </div>
        </Link>
      )}

      {/* Submenu */}
      {hasSubmenu && (
        <div
          className={`
            overflow-hidden transition-all duration-200 ease-out
            ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="mt-2 ml-3 border-l border-gray-200 pl-3 space-y-1">
            {tab.submenu!.map((subitem) => {
              const isSubActive = pathname === subitem.href;
              return (
                <Link
                  key={subitem.href}
                  href={subitem.href}
                  className={`
                    flex items-center gap-2 px-2 py-2 rounded-md
                    transition-all duration-200 ease-out
                    ${isSubActive
                      ? 'bg-red-50 text-red-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon icon={subitem.icon} className="w-4 h-4" />
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
          <div className="w-full max-w-40">
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
