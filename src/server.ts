import express from 'express';
import dotenv from 'dotenv';

import { shortenURL } from './utils/shorten';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/shorten', async (req, res) => {
  // req.body has structure 
  // {
  //   url: string
  // }

  if (!req.body.url) {
    return res.status(400).json({
      success: false,
      message: 'url not provided',
    });
  }

  const url = req.body.url as string;

  const shortenResponse = await shortenURL(url);

  if (!shortenResponse.success) {
    return res.status(shortenResponse.status).json({
      success: false,
      message: shortenResponse.message,
    });
  }

  return res.json({
    success: true,
    data: shortenResponse.data,
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));