import moment from 'moment';

export const generateTimeSlots = (forNextDay: boolean) => {
  if (forNextDay) {
    const startTime = moment().add(1, 'day').startOf('day');
    const endTime = moment(startTime).add(1, 'day');
    const timeSlots = [];
    while (startTime.isBefore(endTime)) {
      const formattedSlot = `${startTime.format('h:mmA')} - ${startTime
        .add(1, 'hour')
        .format('h:mmA')}`;
      timeSlots.push(formattedSlot);
    }
    return timeSlots;
  } else {
    const nextHourStart = moment().add(1, 'hour').startOf('hour');
    const endTime = moment().set({
      hour: 24,
      minute: 0,
      second: 0,
      millisecond: 0,
    });
    const timeSlots = [];

    while (nextHourStart.isBefore(endTime)) {
      const startTime = nextHourStart.clone();
      const endTime = nextHourStart.add(1, 'hour');
      const formattedSlot = `${startTime.format('h:mmA')} - ${endTime.format(
        'h:mmA',
      )}`;
      timeSlots.push(formattedSlot);
    }

    return timeSlots;
  }
};

export const timeDifference = (createdAt: any) => {
  const commentDate = new Date(createdAt);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - commentDate.getTime()) / 1000,
  );

  if (differenceInSeconds <= 0) {
    return `Just now`;
  } else if (differenceInSeconds < 60) {
    return `${differenceInSeconds} seconds ago`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
};

export const getRandomNumber = () => {
  const timestamp = new Date().getTime(); // Get the current timestamp in milliseconds
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string

  return `${timestamp}_${randomString}`;
};

export const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const getCurrentMonth = () => {
  const currentMonthIndex = new Date().getMonth();
  return months[currentMonthIndex];
};

export const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const getTimeAndDate = (date: any) => {
  const parsedDate = new Date(date as any);

  parsedDate.setUTCHours(parsedDate.getUTCHours() + 5); // Adjust for Pakistan Standard Time

  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");
  const year = parsedDate.getUTCFullYear();
  const hours = String(parsedDate.getUTCHours() % 12 || 12).padStart(2, "0"); // Ensure 12-hour format
  const minutes = String(parsedDate.getUTCMinutes()).padStart(2, "0");
  const period = parsedDate.getUTCHours() >= 12 ? "PM" : "AM";

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes} ${period}`;
  return { formattedDate, formattedTime };
};
