import {AxiosError} from 'axios';
import {format, isValid, parseISO} from 'date-fns';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import trimEnd from 'lodash/trimEnd';

// if invalid input, returns "0 date"
export const getDateFromIsoString = (
  dateTimeIsoString: string | null | undefined,
): Date => {
  const nullDate = new Date(0);

  if (isEmpty(dateTimeIsoString)) {
    return nullDate;
  }

  let normalizedString = dateTimeIsoString!;
  if (!normalizedString.endsWith('Z')) {
    normalizedString += 'Z';
  }

  const dt = parseISO(normalizedString);
  if (!isValid(dt)) {
    return nullDate;
  }

  return dt;
};

export const createBackendDateTimeString = (date: Date): string =>
  trimEnd(date.toISOString(), 'Z') + format(date, 'xxx');

export const getErrorMessageFromApiError = (error: AxiosError): string => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const detail = error.response?.data?.detail;

  // Здесь не описываю detail в Typescript, просто проверяю наличие в runtime
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const errorMessage1 = detail?.msg as string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const errorMessage2 = detail as string;

  return errorMessage1 || errorMessage2 || '';
};

// Returns 0 if the passed string is invalid or null
export const parseBackendNumberString = (str: string | null): number => {
  if (isNull(str)) {
    return 0;
  }

  const parsed = Number.parseFloat(str);

  return Number.isNaN(parsed) ? 0 : parsed;
};
