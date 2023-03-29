interface MultiStepProps {
  size: number
  currentStep: number
}

export function MultiStep({ size, currentStep }: MultiStepProps) {
  return (
    <div className="w-full flex items-end">
      {[...Array(size)].map((_, i) => {
        const step = i + 1

        return (
          <div key={i} className="flex-1 mr-2 last:m-0">
            <span className="text-xs text-neutral-400">
              {currentStep === i + 1 ? `Passo ${step} de ${size}` : ''}
            </span>
            <span
              className={`
			  	block border-b-4 mt-1
			  	${currentStep >= step ? 'border-neutral-100' : 'border-neutral-700'}`}
            ></span>
          </div>
        )
      })}
    </div>
  )
}
