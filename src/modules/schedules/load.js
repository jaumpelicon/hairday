import { hoursLoad } from "./hours_load";
import { getSchedulesByDate } from "../../services/schedule_service.js";
import { schedulesLoad } from "./schedules_load.js";

const selectedDate = document.getElementById('date');


export async function schedulesDay() {
  const hoursList = document.getElementById('hours');
  hoursList.innerHTML = '';


  const dailySchedules = await getSchedulesByDate({ date: selectedDate.value })
  hoursLoad({ date: selectedDate.value, schedules: dailySchedules });
  schedulesLoad(dailySchedules)
}

selectedDate.addEventListener('change', schedulesDay);


