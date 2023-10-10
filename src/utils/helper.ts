import moment from "moment";

export const generateTimeSlots = (forNextDay:boolean) => {
    console.log(forNextDay,"fornextdayy")
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
