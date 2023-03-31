import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { MultiStep } from '@/components/MultiStep'
import { api } from '@/lib/axios'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'
import { getWeekDays } from '@/utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message: 'O intervalo de horários deve ser de no mínimo 1 hora.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const intervals = watch('intervals')

  async function handleSetTimeIntervals(data: any) {
    const { intervals } = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', {
      intervals,
    })
  }

  return (
    <div className="w-[572px] mt-20 mb-4 mx-auto px-4">
      <div className="px-6 base">
        <div className="p-5">
          <strong className="text-xl">Quase lá</strong>
          <p className="text-neutral-400 mt-2 mb-5 text-sm">
            Defina o intervalo de horários que você está disponível em cada dia
            da semana.
          </p>
          <MultiStep size={4} currentStep={3} />
        </div>

        <Form
          classname="flex-col"
          onSubmit={handleSubmit(handleSetTimeIntervals)}
        >
          <div className="border border-neutral-700 rounded-lg select-none py-2">
            {fields.map((line, index) => {
              return (
                <div
                  key={line.id}
                  className="flex items-center justify-between"
                >
                  <div className="py-3 px-4 border-t-neutral-700 first:border-t-0 gap-3 items-center">
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            label={weekDays[line.weekDay]}
                            checked={field.value}
                          />
                        )
                      }}
                    ></Controller>
                  </div>
                  <div className="px-4 border-t-neutral-700 first:border-t-0 gap-2 items-center flex">
                    <Input
                      classname="w-[4.25] text-sm text-gray-100"
                      type="time"
                      step={60}
                      register={register(`intervals.${index}.startTime`)}
                      disabled={!intervals[index].enabled}
                    />
                    <Input
                      classname="w-[4.25] text-sm text-gray-100"
                      type="time"
                      step={60}
                      register={register(`intervals.${index}.endTime`)}
                      disabled={!intervals[index].enabled}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="my-2 text-red-400 text-sm">
            <p>{errors.intervals?.message}</p>
          </div>

          <Button
            type="submit"
            label="Próximo passo"
            icon={<ArrowRight className="ml-1" />}
            disabled={isSubmitting}
          />
        </Form>
      </div>
    </div>
  )
}
