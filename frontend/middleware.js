export const config = {
  matcher: ['/((?!favicon.ico).*)'],
};

export default function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = atob(encoded);
      const separatorIndex = decoded.indexOf(':');
      const user = decoded.slice(0, separatorIndex);
      const pass = decoded.slice(separatorIndex + 1);

      if (user === process.env.SITE_USERNAME && pass === process.env.SITE_PASSWORD) {
        return;
      }
    }
  }

  return new Response('Authenticatie vereist', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="ZYVENTO"' },
  });
}
