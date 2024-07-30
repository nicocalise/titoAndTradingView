module.exports = (req, res) => {
    if (req.method === 'GET') {
      res.json({
        API_KEY: process.env.BINGX_API_KEY,
        API_SECRET: process.env.BINGX_SECRET_KEY,
      });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };