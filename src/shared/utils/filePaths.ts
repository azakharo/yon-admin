export const getFileExtFromPath = (path: string): string => {
  const lastDot = path.lastIndexOf('.');

  if (lastDot < 0) {
    return '';
  }

  // eslint-disable-next-line unicorn/prefer-string-slice
  return path.substring(lastDot + 1).toLowerCase();
};

export const getFileNameWithoutExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');

  if (lastDot < 0) {
    return fileName;
  }

  // eslint-disable-next-line unicorn/prefer-string-slice
  return fileName.substring(0, lastDot);
};
