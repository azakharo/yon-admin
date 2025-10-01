export const getPhoneWithoutCountryCode = (
  formattedPhoneString: string,
): string => {
  const phoneParts = formattedPhoneString.split(' ');
  return phoneParts.slice(1).join('');
};

export const getCountryCode = (formattedPhoneString: string): string => {
  const phoneParts = formattedPhoneString.split(' ');

  if (phoneParts.length === 0) {
    return '';
  }

  if (!phoneParts[0]!.includes('+')) {
    return '';
  }

  return phoneParts[0]!;
};
