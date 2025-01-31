import dayjs from "dayjs"
import { createSchedule } from "../../services/schedule_service.js"
import { schedulesDay } from "../schedules/load.js";



const form = document.querySelector('form');
const inputName = document.getElementById('client');
const selectedDate = document.getElementById('date');
const inputToday = dayjs(new Date()).format('YYYY-MM-DD');
selectedDate.value = inputToday
selectedDate.min = inputToday
form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    const selectedHour = document.querySelector('.hour-selected');

    if (!selectedHour) {
      throw new Error('Selecione um horário disponível')
    }
    const name = inputName.value.trim()
    const [hour] = selectedHour.innerText.split(':')
    const when = dayjs(selectedDate.value).add(hour, 'hour')

    const response = await createSchedule({
      id: new Date().getTime().toString(),
      client: name,
      date: when
    })
    inputName.value = ''
    selectedDate.value = inputToday
    const hours = document.querySelectorAll('.hour-available');
    hours.forEach((hour) =>
      hour.classList.remove('hour-selected')
    )
    schedulesDay()
  } catch (error) {
    alert(error.message)
  }
}