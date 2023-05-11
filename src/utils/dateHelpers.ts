const getCurrentDate = () => {
  const [date] = new Date().toISOString().split('T');
  return date;
};

const getParseDate = (date?: string) => {
  if (!date)
    return {
      year: '',
      month: '',
      day: '',
    };
  const [year, month, day] = date.split('-');
  return {
    year,
    month,
    day,
  };
};

export { getParseDate, getCurrentDate };
