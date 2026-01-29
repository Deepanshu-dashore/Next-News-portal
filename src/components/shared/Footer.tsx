import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { footerLinks } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] mt-12 md:mt-16">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-[#111827]">NewsWeb</span>
            </Link>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Delivering quality journalism and breaking news from around the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-[#111827] mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-[#111827] mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-[#111827] mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {footerLinks.social.map((link) => (
                <a
                  key={link.icon}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center hover:border-[#4F46E5] transition-colors"
                  aria-label={link.label}
                >
                  <span className="text-[#6B7280] text-sm">{link.icon[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#E5E7EB] py-6">
          <p className="text-sm text-[#6B7280] text-center">
            © {new Date().getFullYear()} NewsWeb. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
