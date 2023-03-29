import Image from 'next/image'
import previewImage from '../assets/app-preview.png'
import { ClaimUsernameForm } from '../components/ClaimUsernameForm'

export default function Home() {
  return (
    <div className="flex items-center gap-20 ml-auto w-[1400px] max-w-[calc(100vw - (100vw - 1160px) / 2)] h-screen">
      {/* hero */}
      <div className="max-w-[480px] pl-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Agendamento descomplicado
        </h1>
        <p className="text-2xl mt-2 text-gray-200">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </p>

        <ClaimUsernameForm />
      </div>

      {/* preview */}
      <div className="pr-40 overflow-hidden hidden md:block">
        <Image
          src={previewImage}
          height={400}
          quality={100}
          alt="Calendário simbolizando aplicação em funcionamento"
          priority
        />
      </div>
    </div>
  )
}
