export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { user, password } = req.body || {};
  const maxAge = 60 * 60 * 24 * 365;
  const cookieOpts = `Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;

  const adminUser = process.env.AUTH_USER;
  const adminPass = process.env.AUTH_PASSWORD;
  const adminToken = process.env.AUTH_TOKEN;

  if (!adminUser || !adminPass || !adminToken) {
    return res.status(500).json({ error: 'Auth no configurada en el servidor' });
  }

  if (user === adminUser && password === adminPass) {
    res.setHeader('Set-Cookie', `tabaco_auth=${encodeURIComponent(adminToken)}; ${cookieOpts}`);
    return res.status(200).json({ ok: true, role: 'admin' });
  }

  const roUser = process.env.READONLY_USER;
  const roPass = process.env.READONLY_PASSWORD;
  const roToken = process.env.READONLY_TOKEN;

  if (roUser && roPass && roToken && user === roUser && password === roPass) {
    res.setHeader('Set-Cookie', `tabaco_auth=${encodeURIComponent(roToken)}; ${cookieOpts}`);
    return res.status(200).json({ ok: true, role: 'readonly' });
  }

  return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
}
