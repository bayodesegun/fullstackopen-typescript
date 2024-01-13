import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { webBmiParams, parseWebBmiParams } from './utils';


const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const params: webBmiParams = {
    height: height?.toString(),
    weight: weight?.toString()
  };
  const validatedParams = parseWebBmiParams(params);
  if (validatedParams.error) {
    res.status(400).send(validatedParams);
    return;
  }
  const bmi: string = calculateBmi(Number(validatedParams.height), Number(validatedParams.weight));
  res.send(bmi);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
