import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - NewsWeb',
  description: 'Learn how NewsWeb collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'January 30, 2026';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-gray-900 via-gray-800 to-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          style={{ backgroundImage: `url('/design.svg')` }} 
          className="absolute inset-0 opacity-5 bg-repeat"
          aria-hidden="true"
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-(--accent-primary) rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-4 h-4 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider text-white">Legal Document</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last Updated: {lastUpdated}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Container>
        <div className="max-w-4xl mx-auto py-16">
          {/* Introduction */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-(--accent-primary)/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to NewsWeb. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This privacy policy applies to information we collect about you when you use our website, mobile applications, or interact with us through other channels.
                </p>
              </div>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-12 bg-gray-50 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Information We Collect</h2>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Information</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Account Information:</strong> Name, email address, username, and password when you create an account.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Profile Information:</strong> Additional details you provide in your profile, such as bio, location, and preferences.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Communication Data:</strong> Your feedback, survey responses, and correspondence with us.</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Automatically Collected Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent, and interactions.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers, and mobile network information.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700"><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience and analyze usage patterns.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Service Provision</h4>
                    <p className="text-sm text-gray-600">To provide, maintain, and improve our services and content delivery.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Personalization</h4>
                    <p className="text-sm text-gray-600">To personalize your experience and provide relevant content recommendations.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Communication</h4>
                    <p className="text-sm text-gray-600">To send you updates, newsletters, and promotional materials (with your consent).</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Analytics</h4>
                    <p className="text-sm text-gray-600">To analyze usage patterns and improve our platform's performance and features.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Security</h4>
                    <p className="text-sm text-gray-600">To protect against fraud, unauthorized access, and other security issues.</p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-(--accent-primary) transition-colors">
                    <h4 className="font-bold text-gray-900 mb-2">Legal Compliance</h4>
                    <p className="text-sm text-gray-600">To comply with legal obligations and enforce our terms of service.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12 bg-amber-50 rounded-2xl p-8 border-2 border-amber-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Data Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-gray-900">Service Providers:</strong>
                      <span className="text-gray-700"> With third-party vendors who help us operate our platform (hosting, analytics, customer support).</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-gray-900">Legal Requirements:</strong>
                      <span className="text-gray-700"> When required by law, court order, or government request.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-gray-900">Business Transfers:</strong>
                      <span className="text-gray-700"> In connection with a merger, acquisition, or sale of assets.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                    <div>
                      <strong className="text-gray-900">With Your Consent:</strong>
                      <span className="text-gray-700"> When you explicitly agree to share information with third parties.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your Privacy Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <div className="space-y-3 bg-white rounded-xl p-6 border-2 border-gray-200">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 text-(--accent-primary) shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Access:</strong> Request access to your personal data</span>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 text-(--accent-primary) shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Correction:</strong> Request correction of inaccurate data</span>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 text-(--accent-primary) shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Deletion:</strong> Request deletion of your personal data</span>
                  </div>
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                    <svg className="w-5 h-5 text-(--accent-primary) shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Portability:</strong> Receive your data in a portable format</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-(--accent-primary) shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700"><strong>Opt-out:</strong> Unsubscribe from marketing communications</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12 bg-gray-900 text-white rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Data Security</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-300">Encryption of data in transit and at rest</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-300">Regular security assessments and audits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-300">Access controls and authentication mechanisms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-300">Employee training on data protection practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-linear-to-r from-(--accent-primary) to-red-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Questions About Privacy?</h2>
                <p className="text-white/90 mb-4">
                  If you have any questions or concerns about this privacy policy or our data practices, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:privacy@newsweb.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    privacy@newsweb.com
                  </a>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/20 transition-colors border-2 border-white/30">
                    Contact Support
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
