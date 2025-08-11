import React from 'react';
import { ArrowLeft, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  rightContent?: React.ReactNode;
}

export default function Header({ title, subtitle, showBackButton = true, rightContent }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-slate-900 px-4 sm:px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Globe className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              {subtitle && <p className="text-sm text-teal-300">{subtitle}</p>}
            </div>
          </div>
        </div>
        {rightContent}
      </div>
    </header>
  );
}