import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { MultiStep } from '@/components/MultiStep'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),

  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    console.log(data)
  }

  return (
    <div className="max-w-[572px] mt-20 mb-4 mx-auto px-4">
      <div className="px-6 base">
        <div className="p-5">
          <strong className="text-xl">Bem-vindo(a) ao Ignite Call!</strong>
          <p className="text-neutral-400 mt-2 mb-6">
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações mais tarde se precisar.
          </p>
        </div>

        <MultiStep size={4} currentStep={1} />

        <Form classname="flex-col" onSubmit={handleSubmit(handleRegister)}>
          <Input
            label="Nome de usuário"
            prefix="ignite.com/"
            register={register('username')}
            error={errors.username?.message}
          />
          <Input
            label="Nome completo"
            register={register('name')}
            error={errors.name?.message}
          />

          <Button
            type="submit"
            label="Próximo passo"
            icon={<ArrowRight className="mx-2" />}
            disabled={isSubmitting}
            classname="mt-2"
          />
        </Form>
      </div>
    </div>
  )
}
