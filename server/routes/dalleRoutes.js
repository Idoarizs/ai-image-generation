import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()
const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

router.use(express.json());

router.route('/').get((req, res) => {
  res.send('This is from DALL-E route page')
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body

    const response = await openai.createImage(
      {
        prompt: prompt,
        n: 1,
        size: '1024x1024',
      },
    );

    const imageUrl = response.data.data[0].url
    res.json({ photo: imageUrl })
  } catch (error) {
    // res.send(err)
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

export default router;
