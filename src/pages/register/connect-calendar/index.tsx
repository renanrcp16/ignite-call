import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { MultiStep } from '@/components/MultiStep'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { MouseEvent } from 'react'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar(e: MouseEvent<HTMLElement>) {
    e.preventDefault()
    await signIn('google')
  }
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
            {isSignedIn ? (
              <button
                disabled={true}
                className="text-sm flex items-center justify-center py-2 px-3 rounded-md 
					outline outline-2 outline-teal-700 
					hover:bg-teal-700 focus:outline disabled:bg-teal-700 disabled:opacity-40 h-10 w-32"
              >
                Conectado
                <Check className="ml-1" />
              </button>
            ) : (
              <button
                onClick={handleConnectCalendar}
                className="text-sm flex items-center justify-center py-2 px-3 rounded-md 
					outline outline-2 outline-teal-700 
					hover:bg-teal-700 focus:outline disabled:opacity-40 h-10 w-32"
              >
                Conectar
                <ArrowRight className="ml-1" />
              </button>
            )}
          </div>
          {hasAuthError && !isSignedIn ? (
            <p className="text-xs text-red-400">
              Falha ao se conectar com o Google. Verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </p>
          ) : (
            false
          )}
          <Button
            type="submit"
            label="Próximo passo"
            icon={<ArrowRight className="ml-1" />}
            disabled={!isSignedIn}
          />
        </Form>
      </div>
    </div>
  )
}
