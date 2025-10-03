// Any serializable data can be passed here
export const saveDataToLocalStorage = <T extends object>(
  data: T,
  key: string,
): void => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log('Could not serialize data to JSON');
    console.error(err);
  }
};

// Retrieve and de-serializes data.
// Returns undefined on any error.
// Any serializable data can be returned from here
export const loadDataFromLocalStorage = <T extends object>(
  key: string,
): T | null => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState) as T;
  } catch (err) {
    console.log('Could not deserialize data from JSON');
    console.error(err);

    return null;
  }
};
