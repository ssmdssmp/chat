import {useEffect, useState} from 'react';
import moment from 'moment';

const useFormattedDate = (date: string) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const currentDate = moment();
    const targetDate = moment(date);

    const isSameDay = currentDate.isSame(targetDate, 'day');
    const isSameWeek = currentDate.isSame(targetDate, 'week');

    if (isSameDay) {
      setFormattedDate(targetDate.format('HH:mm'));
    } else if (isSameWeek) {
      setFormattedDate(targetDate.format('ddd'));
    } else {
      setFormattedDate(targetDate.format('DD.MM.YYYY'));
    }
  }, [date]);

  return formattedDate;
};

export default useFormattedDate;
