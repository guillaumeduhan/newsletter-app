export const isValidEmail = (email: string | undefined | null): boolean => {
  if (!email) return false
  const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regex.test(email)
};

export const limitString = (str: string, limit = 22) => {
  if (!str) return;
  if (str.length <= limit) return str;
  return str.slice(0, limit) + '...'
}
