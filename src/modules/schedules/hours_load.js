import dayjs from 'dayjs';
import { openingHours } from '../../utils/opening-hours';
import { hoursClick } from './hours_click';

const hours = document.getElementById('hours')


export function hoursLoad({ date, schedules }) {
  const opening = openingHours.map((hour) => {
    const [scheduleHour] = hour.split(':');
    const isHourPast = dayjs(date).add(scheduleHour, 'hour').isAfter(dayjs());
    const hoursReserved = schedules.map((schedule) => {
      return dayjs(schedule.date).format("HH:mm")
    })
    const isHourReserved = !hoursReserved.includes(hour)
    const isHourAvailable = isHourReserved && isHourPast
    return {
      hour,
      avaible: isHourAvailable,
    }
  })
  opening.forEach(({ hour, avaible }) => {
    const optionHour = document.createElement('li');
    optionHour.classList.add('hour')
    optionHour.classList.add(avaible ? 'hour-available' : 'hour-unavailable')


    optionHour.textContent = hour;
    handleHeaderByHour(hour);

    hours.append(optionHour);
  })
  hoursClick();
}

function handleHeaderByHour(hour) {
  if (hour === '09:00') {
    hoursHeaderAdd('Manhã')
  } else if (hour === '13:00') {
    hoursHeaderAdd('Tarde')
  } else if (hour === '18:00') {
    hoursHeaderAdd('Noite')
  }
}

function hoursHeaderAdd(title) {
  const header = document.createElement('li');
  header.classList.add('hour-period')
  header.textContent = title;
  hours.append(header);
}