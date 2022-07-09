export default async function handler(req, res) {
  const previousPage = req.headers.referer;

  // SE ESTIVER LIGADO O PREVIEW: DESLIGA
  if (req.preview) {
    res.clearPreviewData();
    res.writeHead(307, { Location: previousPage });
    return res.end();
  }

  const password = "SENHASEGURA";
  if (req.query.password !== password) {
    return res.status(401).json({ message: "Invalid Password" });
  }

  // SE ESTIVER DESLIGADO O PREVIEW: LIGA
  res.setPreviewData({});
  res.writeHead(307, { Location: previousPage });
  res.end();
}
