import { useState, useEffect } from 'react';
import { type CalculatorForm } from "@types"
import Input from "./Input/Input"
import styles from './calculator.module.css'
import calculate from '@lib/calculate';

interface Props {
  calculatorForm: CalculatorForm
}

export default function Calculator({ calculatorForm }: Props){
  const [fieldName, setFieldName] = useState<string | null>(null)
  const [inputName, setInputName] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFieldName = event.target.value;

    const relatedField = calculatorForm.campos.find(campo => campo.id === newFieldName);
    const newInputName = relatedField?.input.name;

    setFieldName(newFieldName)
    setInputName(newInputName || null)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = Object.fromEntries(new FormData(form)) as Record<string, string>

    if (calculatorForm.equation) {
      const newResult = calculate({
        equation: calculatorForm.equation,
        initialValues: formData,
        solveFor: inputName || ''
      })

      setResult(newResult)
    }
  }

  const filteredFields = calculatorForm.campos.filter((campo) => {
    return campo.id !== fieldName
  })

  return (
    <div className={styles.calculator}>
      <h2>{calculatorForm.formulario}</h2>
      <div>
        {calculatorForm.campos.map((campo) => (
          <Input
            key={campo.id}
            label={campo.label}
            type="radio"
            value={campo.id}
            inverted
            name={`${calculatorForm.formulario}-radio`}
            onChange={handleChange}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {
          fieldName && (
            <>
              {filteredFields.map((campo) => (
                <Input
                  key={campo.input.id}
                  label={campo.label}
                  required
                  {...campo.input}
                />
              ))}
              <button type='submit'>Calcular</button>
            </>
          )
        }
      </form>
      <p>{result}</p>
    </div>
  )
}