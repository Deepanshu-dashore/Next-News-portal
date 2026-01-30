import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions - NewsWeb',
  description: 'Read the terms and conditions governing your use of NewsWeb platform.',
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'January 30, 2026';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-blue-900 via-indigo-900 to-gray-900 py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          style={{ backgroundImage: `url('/design.svg')` }} 
          className="absolute inset-0 opacity-5 bg-repeat"
          aria-hidden="true"
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-(--accent-primary) rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <svg className="w-4 h-4 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-bold uppercase tracking-wider text-white">Legal Agreement</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Please read these terms carefully before using NewsWeb. By accessing our platform, you agree to be bound by these terms.
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
          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-(--accent-primary)/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By accessing and using NewsWeb (the "Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use the Service.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to update, change, or replace any part of these Terms and Conditions by posting updates and changes to our website. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                </p>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section className="mb-12 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">User Accounts</h2>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3">Account Registration</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To access certain features of the Service, you may be required to create an account. When you create an account, you agree to:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700">Provide accurate, current, and complete information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700">Maintain and promptly update your account information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700">Maintain the security of your password and account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700">Accept all responsibility for activities that occur under your account</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-(--accent-primary) rounded-full mt-2 shrink-0" />
                    <span className="text-gray-700">Notify us immediately of any unauthorized use of your account</span>
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-gray-900 mb-3">Account Termination</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time, without prior notice or liability, for any reason, including if you breach the Terms and Conditions.
                </p>
              </div>
            </div>
          </section>

          {/* Content Usage */}
          <section className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Content and Intellectual Property</h2>
                
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Our Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    All content on NewsWeb, including but not limited to text, graphics, logos, images, videos, audio clips, and software, is the property of NewsWeb or its content suppliers and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content without our express written permission.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">User-Generated Content</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    By submitting content to NewsWeb (comments, reviews, articles, etc.), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, publish, and distribute such content in any media.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You represent and warrant that you own or have the necessary rights to any content you submit and that such content does not violate any third-party rights.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12 bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Prohibited Activities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Violating laws or regulations</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Posting harmful or offensive content</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Impersonating others</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Distributing malware or viruses</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Engaging in spam or unauthorized advertising</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Attempting to gain unauthorized access</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Interfering with service functionality</span>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Scraping or data mining</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Disclaimer of Warranties</h2>
                <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. NEWSWEB MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span className="text-gray-700">MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span className="text-gray-700">ACCURACY, COMPLETENESS, OR RELIABILITY OF CONTENT</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span className="text-gray-700">UNINTERRUPTED OR ERROR-FREE SERVICE</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-600 font-bold shrink-0">•</span>
                      <span className="text-gray-700">SECURITY OF YOUR INFORMATION OR DATA</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12 bg-gray-900 text-white rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-(--accent-primary)" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Limitation of Liability</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEWSWEB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS BEFORE THE EVENT GIVING RISE TO LIABILITY, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.
                </p>
              </div>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">Governing Law &amp; Disputes</h2>
                <div className="space-y-4">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Jurisdiction</h3>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where NewsWeb operates, without regard to its conflict of law provisions.
                    </p>
                  </div>
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Dispute Resolution</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Any disputes arising from these Terms or your use of the Service shall first be attempted to be resolved through good-faith negotiations. If unsuccessful, disputes may be resolved through binding arbitration or in the courts of competent jurisdiction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Questions About Terms?</h2>
                <p className="text-white/90 mb-4">
                  If you have any questions about these Terms and Conditions, please don't hesitate to reach out:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:legal@newsweb.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    legal@newsweb.com
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

          {/* Agreement Notice */}
          <div className="mt-12 bg-gray-100 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-600">
              By using NewsWeb, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
