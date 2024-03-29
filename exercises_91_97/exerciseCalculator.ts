import { parseArgs } from "./utils";


interface exerciseResult  {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): exerciseResult => {
  const periodLength: number = hours.length;
  const average: number = parseFloat((hours.reduce((a, b) => a + b, 0) / periodLength).toFixed(2));
  const rating: number = parseFloat(((average / target) * 3).toFixed(2));
  const trainingDays: number = hours.filter(hour => hour > 0).length;

  let ratingDescription: string;
  switch (true) {
    case (rating >= 3):
      ratingDescription = 'Very good. Keep it up!';
      break;
    case (rating >= 2):
      ratingDescription = 'not too bad but could be better';
      break;
    case (rating >= 0):
      ratingDescription = 'bad';
      break;
    default:
      ratingDescription = 'error';
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv[1].includes('exerciseCalculator')) {
  try {
    const { arg1, arg2 } = parseArgs(process.argv);
    if (arg2 instanceof Array) {
      console.log(calculateExercises(arg2, arg1));
    } else {
      throw new Error('Too few inputs. Need at least three!');
    }
  } catch (error: unknown) {
    let errorMsg: string = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMsg += error.message;
    }
    console.warn(errorMsg);
  }
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
