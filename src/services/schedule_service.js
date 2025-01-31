import { apiConfig } from "./api_config.js";
import dayjs from "dayjs";

export async function getSchedulesByDate({ date }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`)
    if (!response.ok) {
      throw new Error('Erro ao buscar agendamentos')
    }
    const data = await response.json()

    const dailySchedules = data.filter(schedule =>
      dayjs(date).isSame(schedule.date, 'day')
    )

    return dailySchedules
  } catch (error) {
    alert(error.message)
  }
}

export async function createSchedule({ id, client, date }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        client,
        date
      })
    })
    if (!response.ok) {
      throw new Error('Erro ao criar agendamento')
    }
    console.log('Agendamento criado com sucesso')
  } catch (error) {
    alert(error.message)
  }
}

export async function deleteSchedule({ id }) {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/schedules/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Erro ao deletar agendamento')
    }
    console.log('Agendamento deletado com sucesso')
  } catch (error) {
    alert(error.message)
  }
}
