import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { MultiStep } from '@/components/MultiStep'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

export default function ConnectCalendar() {
  //   async function handleRegister(data: any) {}

  return (
    <div className="max-w-[572px] mt-20 mb-4 mx-auto px-4">
      <div className="px-6 base">
        <div className="p-5">
          <strong className="text-xl">Conecte sua agenda!</strong>
          <p className="text-neutral-400 mt-2 mb-5 text-sm">
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </p>
          <MultiStep size={4} currentStep={2} />
        </div>

        <Form classname="flex-col">
          <div className="p-5 flex justify-between items-center border border-neutral-700 rounded-lg">
            <span>Google Calendar</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                signIn('google')
              }}
              className="text-sm flex items-center justify-center py-2 px-3 rounded-md 
					outline outline-2 outline-teal-700 
					hover:bg-teal-700 focus:outline disabled:opacity-50 h-10 w-32"
            >
              Conectar
              <ArrowRight className="mx-2" />
            </button>
          </div>
          <Button
            type="submit"
            label="Próximo passo"
            icon={<ArrowRight className="mx-2" />}
            // disabled={isSubmitting}
            classname="mt-1"
          />
        </Form>
      </div>
    </div>
  )
}
