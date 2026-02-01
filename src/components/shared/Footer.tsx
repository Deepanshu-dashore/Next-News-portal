'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { footerLinks } from '@/lib/constants';
import { useActiveCategories } from '@/src/hooks/useCategories';

const latestNewsHeadlines = [
  "Love Horoscope Today, January 29, 2026",
  "A$AP Rocky's Son Once Snitched Him to Rihanna",
  'FIR Against Actor Ranveer Singh for Mimicking Daiva Act',
  "Aashakal Aayiram Hides a Paapapa Surprise Moment",
  'Who Is Beth Galetti? Amazon HR Leader Behind Layoffs',
  'Daily Shani Predictions, January 29, 2026',
  'Former Bigg Boss Kannada Fame Booked for Drunk Driving',
  'Patrick Mahomes Injury Update Signals Comeback',
  'CISCE Class 10th Admit Card 2026 Released',
  "Don 3 Focus Turns to Jee Le Zaraa After Ranveer's Exit",
  "Novak Djokovic Fires Back at Journalist's Question",
  'India-EU FTA: Will Turkish Goods Enter India?',
  'LeBron James Sets Record Likely Untouched for Years',
  "Ted Lasso Season 4 Announced for Summer 2026",
  'Baramati Plane Crash: What Might Have Avoided It',
  'Kike Hernandez Shares Birthday Moment with Arizona',
  'Horoscope Tomorrow, January 30, 2026',
  'Mourinho Sends Real Madrid into Champions League Playoffs',
  'Chimpanzee vs Bonobo: Wonder Man Debate',
  'World Longest Road Tunnel Breakthrough',
];

export default function Footer() {
  const { data: categoriesData, isLoading } = useActiveCategories();
  const activeCategories = categoriesData?.data || [];

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo-4by4.png"
                alt="NewsWeb Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col leading-none">
                <span className="font-black text-2xl tracking-tighter uppercase text-gray-900">NewsWeb</span>
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mt-1">Global Portal</span>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Leading the way in digital journalism with 24/7 coverage of global events, breaking news, and in-depth analysis.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-(--accent-primary) hover:border-(--accent-primary) transition-all"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  {/* Simple generic icon for demo, normally would use specific SVGs */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-(--accent-primary) rounded-full"></span>
              Sections
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-(--accent-primary) transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-(--accent-primary) rounded-full"></span>
              Corporate
            </h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-(--accent-primary) transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                 <Link href="#" className="text-sm text-gray-600 hover:text-(--accent-primary) transition-colors">Careers</Link>
              </li>
              <li>
                 <Link href="#" className="text-sm text-gray-600 hover:text-(--accent-primary) transition-colors">Accessibility</Link>
              </li>
            </ul>
          </div>

          {/* Acknowledgement */}
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-gray-900">
              <span className="w-2 h-2 bg-(--accent-primary) rounded-full"></span>
              Crafted With Care
            </h3>
            <p className="leading-relaxed">
              This portal is envisioned and built by <span className="font-semibold text-gray-900">Deepanshu Dashore</span> as a capstone news experience project. Every layout, interaction, and pixel is tuned to deliver thoughtful journalism for the modern reader.
            </p>
            <ul className="space-y-2">
              {[
              //   {
              //   label: 'Portfolio',
              //   href: 'https://deepanshu-dashore.netlify.app/',
              //   icon: (
              //     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h10M3 12h7m-7 5h13M21 7l-6 6 6 6" />
              //     </svg>
              //   ),
              // },
               {
                label: 'GitHub',
                href: 'https://github.com/Deepanshu-dashore',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.11.8-.25.8-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.28-1.73-1.28-1.73-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.5 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.84 1.18 3.1 0 4.41-2.68 5.38-5.24 5.67.41.35.78 1.04.78 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                ),
              }, {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/deepanshu-dashore',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 8.98h3.96V21H3zm7.03 0h3.8v1.63h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21H18.4v-5.06c0-1.2-.02-2.74-1.67-2.74-1.67 0-1.93 1.3-1.93 2.65V21h-3.77z" />
                  </svg>
                ),
              }].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 text-sm text-gray-600 hover:text-(--accent-primary) transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-gray-400">
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                    <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-12">
          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">Popular Categories</h3>
              <span className="text-sm font-medium text-gray-500">Stay on top of the beats you love</span>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-3 gap-x-8 text-sm text-gray-600">
              {isLoading ? (
                <div className="col-span-full flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                </div>
              ) : activeCategories.length > 0 ? (
                activeCategories.map((category) => (
                  <Link 
                    key={category._id} 
                    href={`/category/${category.slug}`} 
                    className="hover:text-(--accent-primary) transition-colors"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">No categories available</p>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-gray-50 p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">Latest News Top 20</h3>
              <span className="text-sm font-medium text-gray-500">Fresh headlines curated every hour</span>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-10 text-sm text-gray-600">
              {latestNewsHeadlines.map((headline) => (
                <a key={headline} href="#" className="hover:text-(--accent-primary) transition-colors">
                  {headline}
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-8 flex flex-col md:flex-row items-center justify-between gap-4 mt-12">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} NewsWeb International. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
             <Link href="#" className="text-xs text-gray-500 hover:text-(--accent-primary) transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-xs text-gray-500 hover:text-(--accent-primary) transition-colors">Terms of Service</Link>
             <Link href="#" className="text-xs text-gray-500 hover:text-(--accent-primary) transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
