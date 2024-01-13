import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { webParams, parseBmiParams, parseExerciseParams } from './utils';


const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  const params: webParams = {
    height: height?.toString(),
    weight: weight?.toString()
  };
  const validatedParams = parseBmiParams(params);
  if (validatedParams.error) {
    res.status(400).send(validatedParams);
    return;
  }
  const bmi: string = calculateBmi(Number(validatedParams.height), Number(validatedParams.weight));
  res.send(bmi);
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as webParams;
  const params: webParams = {
    daily_exercises,
    target
  };
  const validatedParams = parseExerciseParams(params);
  if (validatedParams.error) {
    res.status(400).json(validatedParams);
    return;
  }

  const result = calculateExercises(validatedParams.daily_exercises as number [], validatedParams.target as number);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
