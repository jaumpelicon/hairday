import dayjs from "dayjs";
import { deleteSchedule } from "../../services/schedule_service.js";
import { schedulesDay } from "../schedules/load.js";


const morningSection = document.getElementById('period-morning')
const afternoonSection = document.getElementById('period-afternoon')
const nightSection = document.getElementById('period-night')


const morningHours = ['09:00', '10:00', '11:00', '12:00']
const afternoonHours = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const nightHours = ['19:00', '20:00', '21:00']


export function schedulesLoad(schedules) {
  morningSection.replaceChildren();
  afternoonSection.replaceChildren();
  nightSection.replaceChildren();

  schedules.forEach(schedule => {
    const scheduleItem = document.createElement('li');

    scheduleItem.append(createHour(schedule.date))
    scheduleItem.append(createName(schedule.client))
    scheduleItem.append(createCancelImage(schedule.id))
    handleScheduleItemByHour(scheduleItem, getHourFormat(schedule.date))
  });
  populateEmptySections()

}

function createName(clientName) {
  const nameSpan = document.createElement('span')
  nameSpan.textContent = clientName
  return nameSpan
}
function createHour(date) {
  const strongHour = document.createElement('strong')
  strongHour.textContent = getHourFormat(date)
  return strongHour
}
function createCancelImage(scheduleId) {
  const image = document.createElement('img')
  image.src = './src/assets/cancel.svg'
  image.alt = 'Cancelar'
  image.classList.add('cancel-icon')
  image.onclick = async () => {
    await deleteSchedule({ id: scheduleId })
    schedulesDay()
  }
  return image
}

function getHourFormat(date) {
  const hour = dayjs(date).hour();
  return `${hour}:00`
}

function handleScheduleItemByHour(scheduleItem, hour) {
  if (morningHours.includes(hour)) {
    morningSection.append(scheduleItem)
  } else if (afternoonHours.includes(hour)) {
    afternoonSection.append(scheduleItem)
  } else if (nightHours.includes(hour)) {
    nightSection.append(scheduleItem)
  }
}

function populateEmptySections() {

  if (!morningSection.hasChildNodes()) {
    const emptySection = document.createElement('strong')
    emptySection.textContent = 'Sem agendamentos nesse periodo!'
    morningSection.append(emptySection)
  }
  if (!afternoonSection.hasChildNodes()) {
    const emptySection = document.createElement('strong')
    emptySection.textContent = 'Sem agendamentos nesse periodo!'
    afternoonSection.append(emptySection)
  }
  if (!nightSection.hasChildNodes()) {
    const emptySection = document.createElement('strong')
    emptySection.textContent = 'Sem agendamentos nesse periodo!'
    nightSection.append(emptySection)
  }
}

