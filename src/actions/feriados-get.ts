'use server'

import { FERIADOS_GET, FERIADO_GET } from '@/functions/api/api'
import { useCurrentTokenUser } from '@/hooks/use-current-user-token'
import { Holiday, HolidayList } from '@/models'
import { auth } from '../../auth';



export default async function feriadosGet() {
  const session = await auth();


  const { url } = FERIADOS_GET()

  let error = false

  let feriadoList: HolidayList

  let arrayFeriadoList: Holiday[] = []

   // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
  
    const response = await fetch(url, {
      headers: {
      Authorization: 'Bearer ' + session?.accessToken,
      },
      next: {
      revalidate: 5,
      },
    })
    console.log(response)
    if (!response.ok) throw new Error("Erro na requisição.")
    feriadoList = await response.json()
    feriadoList.holidays.map((feriado) => {
      arrayFeriadoList.push({
        id: feriado.id,
        description: feriado.description,
        dayMonth: feriado.dayMonth,
        year: feriado.year,
        active: feriado.active,
        creationDate: '', 
        diaCompleto: `${feriado.dayMonth}/${feriado.year}`
      })
    })

    console.log(arrayFeriadoList)

    return arrayFeriadoList

  } catch (error: unknown) {
    error = true
  }

  return []
}
