import {
  intervalToDuration,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';

export const getCurrentYear = (): number => new Date().getFullYear();

export const setTimeFromAnotherDate = (target: Date, source: Date): Date => {
  let dateToReturn = setHours(target, source.getHours());
  dateToReturn = setMinutes(dateToReturn, source.getMinutes());
  dateToReturn = setSeconds(dateToReturn, source.getSeconds());
  dateToReturn = setMilliseconds(dateToReturn, source.getMilliseconds());

  return dateToReturn;
};

export const humanizeDuration = (durationInSeconds: number): string => {
  const duration = intervalToDuration({
    start: 0,
    end: durationInSeconds * 1000,
  });
  const {years, months, weeks, days, hours, minutes, seconds} = duration;

  let displayString = '';

  if (years) {
    displayString += `${years}y `;
  }

  if (months) {
    displayString += `${months}mon `;
  }

  if (weeks) {
    displayString += `${weeks}w `;
  }

  if (days) {
    displayString += `${days}d `;
  }

  if (hours) {
    displayString += `${hours}h `;
  }

  if (minutes) {
    displayString += `${minutes}m `;
  }

  if (seconds) {
    displayString += `${seconds}s `;
  }

  return displayString.trimEnd();
};
