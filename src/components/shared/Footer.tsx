'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">Geometry Tutor</span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link href="/about" className="text-sm font-medium hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:underline">
                Contact
              </Link>
              <Link href="/privacy" className="text-sm font-medium hover:underline">
                Privacy
              </Link>
            </nav>
          </div>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Geometry Tutor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 