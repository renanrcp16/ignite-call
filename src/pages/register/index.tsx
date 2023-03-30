import { Button } from '@/components/Button'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { MultiStep } from '@/components/MultiStep'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
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
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }

      console.log(err)
    }
  }

  return (
    <div className="max-w-[572px] mt-20 mb-4 mx-auto px-4">
      <div className="px-6 base">
        <div className="p-5">
          <strong className="text-xl">Bem-vindo(a) ao Ignite Call!</strong>
          <p className="text-neutral-400 mt-2 mb-5 text-sm">
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações mais tarde se precisar.
          </p>

          <MultiStep size={4} currentStep={1} />
        </div>

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
            autoFocus={true}
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
