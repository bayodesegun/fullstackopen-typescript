interface commandLineArgs {
  arg1: number;
  arg2: number | number [];
}

export interface webBmiParams {
  height?: string;
  weight?: string;
  error?: boolean;
}

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

export const parseWebBmiParams = (params: webBmiParams): webBmiParams => {
  const ret: webBmiParams = {
    height: 'Height is missing!',
    weight: 'Weight is missing!'
  };
  if (params.height) {
    if (isNaN(Number(params.height))) {
      ret.height = `Height should be a number. '${params.height}' specified.`;
      ret.error = true;
    } else {
      ret.height = params.height;
    }
  }
  if (params.weight) {
    if (isNaN(Number(params.weight))) {
      ret.weight = `Weight should be a number. '${params.weight}' specified.`;
      ret.error = true;
    } else {
      ret.weight = params.weight;
    }
  }

  return ret;
};
