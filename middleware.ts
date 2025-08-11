import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const protectedRoutes = ['/userprofile', '/plan-trip', '/admin'];
        const isProtectedRoute = protectedRoutes.some(route => 
          req.nextUrl.pathname.startsWith(route)
        );

        // If it's a protected route, check if user is authenticated
        if (isProtectedRoute) {
          return !!token;
        }

        // Allow access to non-protected routes
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};