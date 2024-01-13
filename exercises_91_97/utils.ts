export interface commandLineArgs {
  arg1: number;
  arg2: number | number [];
}

const parseArgs = (args: string []): commandLineArgs => {
  if (args.length < 4) throw new Error('Not enough input. Please try again.');
  let expectedArgs: number [] = [];
  for (let num of args.slice(2)) {
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
}

export default parseArgs
