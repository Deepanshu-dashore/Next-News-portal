export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Access Denied</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="px-6 py-3 bg-(--accent-primary) text-white font-bold rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wide"
          >
            Go Home
          </a>
          <a
            href="/author-login"
            className="px-6 py-3 bg-gray-200 text-gray-900 font-bold rounded-lg hover:bg-gray-300 transition-colors uppercase tracking-wide"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
