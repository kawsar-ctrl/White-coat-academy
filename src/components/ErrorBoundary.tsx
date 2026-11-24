import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error.message || 'অপ্রত্যাশিত ত্রুটি ঘটেছে।',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  public render() {
    if (this.state.hasError) {
      let friendlyMessage = 'অ্যাপ্লিকেশন লোড করতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।';
      try {
        const parsed = JSON.parse(this.state.errorMessage);
        if (parsed?.error) {
          friendlyMessage = `ডেটা সংযোগে সমস্যা: ${parsed.error}`;
        }
      } catch {
        // non-JSON error
      }

      return (
        <div className="min-h-screen bio-canvas-bg flex items-center justify-center p-6">
          <div className="max-w-md w-full bio-card rounded-2xl p-7 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50/85 dark:bg-rose-950/75 border border-white/90 dark:border-rose-400/25 shadow-[0_8px_18px_-6px_rgba(190,18,60,0.22)] text-rose-700 dark:text-rose-300 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F2EDFF]">কিছু একটা সমস্যা হয়েছে</h2>
            <p className="text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">{friendlyMessage}</p>
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold glass-btn-primary rounded-xl"
            >
              <RotateCcw className="w-4 h-4" />
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
