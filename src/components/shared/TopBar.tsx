"use client";

import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";

export function TopBar() {
  const [mounted, setMounted] = useState(false);
  const now = new Date();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 bg-[#111827]" />;

  return (
    <div className="bg-[#111827] text-white py-2 text-xs font-medium">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formatDate(now.toISOString())}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <span>London, 12°C</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 border-r border-gray-700 pr-4">
              <a href="#" className="hover:text-red-500 transition-colors">
                Digital Edition
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Newsletters
              </a>
            </div>
            <div className="flex items-center gap-3">
              {["fb", "tw", "ig", "yt"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-5 h-5 flex items-center justify-center hover:text-red-500 transition-colors uppercase text-[10px] border border-gray-700 rounded-sm"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
