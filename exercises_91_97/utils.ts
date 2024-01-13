interface commandLineArgs {
  arg1: number;
  arg2: number | number [];
}

export interface webParams {
  height?: string;
  weight?: string;
  daily_exercises?: string | number [];
  target?: string | number;
  error?: string;
}

export const parseBmiParams = (params: webParams): webParams => {
  const ret: webParams = {
    height: 'Height is missing!',
    weight: 'Weight is missing!',
    error: params.height && params.weight ? undefined : 'parameters missing'
  };
  if (params.height) {
    if (isNaN(Number(params.height))) {
      ret.height = `Height should be a number. '${params.height}' specified.`;
      ret.error = 'malformatted parameters';
    } else {
      ret.height = params.height;
    }
  }
  if (params.weight) {
    if (isNaN(Number(params.weight))) {
      ret.weight = `Weight should be a number. '${params.weight}' specified.`;
      ret.error = 'malformatted parameters';
    } else {
      ret.weight = params.weight;
    }
  }

  return ret;
};

export const parseExerciseParams = (params: webParams): webParams => {
  const ret: webParams = {
    daily_exercises: 'Daily exercises array is missing!',
    target: 'Target is missing!',
    error: params.daily_exercises && params.target ? undefined : 'parameters missing'
  };
  if (params.daily_exercises) {
    if (!(params.daily_exercises instanceof Array)) {
      ret.daily_exercises = `daily_exercises should be an Array. '${params.daily_exercises}' specified.`;
      ret.error = 'malformatted parameters';
    } else {
      ret.daily_exercises = params.daily_exercises;
    }
  }
  if (params.target) {
    if (isNaN(Number(params.target))) {
      ret.target = `target should be a number. '${params.target}' specified.`;
      ret.error = 'malformatted parameters';
    } else {
      ret.target = params.target;
    }
  }

  return ret;
};

export const parseArgs = (args: string []): commandLineArgs => {
  if (args.length < 4) throw new Error('Not enough input. Please try again.');
  const expectedArgs: number [] = [];
  for (const num of args.slice(2)) {
    if (isNaN(Number(num))) throw new Error("Please input only numbers!");
    expectedArgs.push(Number(num));
  }
  if (expectedArgs.length === 2) {
    return {
      arg1: expectedArgs[0],
      arg2: expectedArgs[1]
    };
  } else {
    return {
      arg1: expectedArgs[0],
      arg2: expectedArgs.slice(1)
    };
  }
};
