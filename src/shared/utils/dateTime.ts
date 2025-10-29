import {setHours, setMilliseconds, setMinutes, setSeconds} from 'date-fns';

export const getCurrentYear = (): number => new Date().getFullYear();

export const setTimeFromAnotherDate = (target: Date, source: Date): Date => {
  let dateToReturn = setHours(target, source.getHours());
  dateToReturn = setMinutes(dateToReturn, source.getMinutes());
  dateToReturn = setSeconds(dateToReturn, source.getSeconds());
  dateToReturn = setMilliseconds(dateToReturn, source.getMilliseconds());

  return dateToReturn;
};
