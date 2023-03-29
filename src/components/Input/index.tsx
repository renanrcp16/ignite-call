import { HTMLProps } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string
  prefix?: string
  customClass?: string
  register?: any
  error?: string
}

export function Input({
  label,
  prefix,
  customClass,
  register,
  error,
  ...props
}: InputProps) {
  return (
    <label>
      {label ? <p className="text-sm mb-2">{label}</p> : false}
      <div className="bg-neutral-900 px-3 rounded-md focus-within:outline outline-2 outline-teal-700">
        {prefix ? <span className="text-neutral-500">{prefix}</span> : false}
        <input
          type={props.type ? props.type : 'text'}
          className={`bg-transparent py-2 outline-none placeholder:text-neutral-600 ${customClass}`}
          {...register}
          {...props}
        />
      </div>
      {error ? (
        <p className="text-red-500 text-sm mt-1 mb-2">{error}</p>
      ) : (
        false
      )}
    </label>
  )
}
