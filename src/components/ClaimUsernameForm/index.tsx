import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form } from '../Form'
import { Input } from '../Input'
import { useRouter } from 'next/router'
import { Button } from '../Button'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data
    await router.push(`register?username=${username}`)
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit(handleClaimUsername)}
        classname="flex-col md:flex-row"
      >
        <input
          autoComplete="false"
          name="hidden"
          className="hidden"
          type="text"
        />

        <Input
          prefix="ignite.com/"
          classname="w-40"
          placeholder="seu-usuario"
          register={register('username')}
          autoFocus={true}
        />

        <Button
          type="submit"
          label="Reservar"
          icon={<ArrowRight className="mx-2" />}
          disabled={isSubmitting}
          classname={'flex-1'}
        />
      </Form>
      <div className="mt-2 text-neutral-400 text-sm fixed">
        <p>{errors.username?.message}</p>
      </div>
    </>
  )
}
