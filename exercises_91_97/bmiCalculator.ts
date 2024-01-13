import parseArgs from "./utils";


const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) ** 2)
  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)'
  } else if (bmi < 17.0) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)'
  } else if (bmi < 25.0) {
    return 'Normal (healthy weight)'
  } else if (bmi < 30.0) {
    return 'Overweight (Pre-obese)'
  } else if (bmi < 35.0) {
    return 'Obese (Class I)'
  } else if (bmi < 40.0) {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}

try {
  const { arg1, arg2 } = parseArgs(process.argv);
  if (!(arg2 instanceof Array)) {
    console.log(calculateBmi(arg1, arg2));
  } else {
    throw new Error('Too many inputs. Need only two!');
  }
} catch (error: unknown) {
  let errorMsg: string = 'Something went wrong. ';
  if (error instanceof Error) {
    errorMsg += error.message;
  }
  console.warn(errorMsg);
}
