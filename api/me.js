function getTokenFromCookie(header) {
  const match = (header || '').match(/(?:^|;\s*)tabaco_auth=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const token = getTokenFromCookie(req.headers.cookie);

  if (token && token === process.env.AUTH_TOKEN) {
    return res.status(200).json({ role: 'admin' });
  }

  if (token && process.env.READONLY_TOKEN && token === process.env.READONLY_TOKEN) {
    return res.status(200).json({ role: 'readonly' });
  }

  return res.status(401).json({ error: 'No autenticado' });
}
