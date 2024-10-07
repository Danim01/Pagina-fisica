import { useState, useEffect } from 'react';
import { type CalculatorForm } from "@types"
import Input from "./Input/Input"
import styles from './calculator.module.css'
import calculate from '@lib/calculate';
import type { Expression } from 'nerdamer';
import Katex from './Katex';

interface Props {
  calculatorForm: CalculatorForm
}

export default function Calculator({ calculatorForm }: Props){
  // field = campo
  const [fieldId, setFieldId] = useState<string | null>(null)
  const [inputName, setInputName] = useState<string | null>(null)
  const [results, setResults] = useState<Expression[] | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFieldId = event.target.value;

    // Se esta guardando en esta variable todo el campo del input que fue seleccionado
    const relatedField = calculatorForm.campos.find(campo => campo.id === newFieldId);
    // Se guarda el name del input del campo que fue seleccionado
    const newInputName = relatedField?.input.name;

    setFieldId(newFieldId)
    setInputName(newInputName || null)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    // Estamos extrayendo el name de cada input
    const formData = Object.fromEntries(new FormData(form)) as Record<string, string>
    

    // Si en el calculatorForm le llega una equation del json ejecutamos lo siguiente 
    if (calculatorForm.equation) {
      const newResults = calculate({
        equation: calculatorForm.equation,
        initialValues: formData,
        solveFor: inputName || ''
      })

      setResults(newResults)
    }
  }

  // filter crea un arreglo nuevo con todos lo que cumplan con la condición que le entreguemos
  // El objetivo de este filtrado es excluir el input de lo que la persona quiere calcular
  const filteredFields = calculatorForm.campos.filter((campo) => {
    // El id del campo debe ser diferente al id del campo que se selecciono
    return campo.id !== fieldId
  })

  return (
    <div className={styles.calculator}>
      <h2>{calculatorForm.formulario}</h2>
      <div className={styles["radio-container"]}>
        {calculatorForm.campos.map((campo) => (
          <Input
            key={campo.id}
            label={campo.label}
            type="radio"
            value={campo.id}
            inverted
            labelFull
            name={`${calculatorForm.formulario}-radio`}
            onChange={handleChange}
          />
        ))}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {
          // Cuando existe el fieldId renderizo todos los campos que cumpla con lo que se necesita
          fieldId && (
            <>
              <h4 style={{ textAlign: "center", marginBottom: "0" }}>Ingrese los datos necesarios</h4>
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
      {
        results && (
          <div className={styles.results}>
            <h4>Resultado{results?.length > 1 ? "s" : undefined}</h4>
            <ol className={styles["results-list"]} inlist="true">
              {
                results?.map((result, i) => (
                  <li key={`calculator-result-${i}`}>
                    {/* Katex es un componente que sirve para renderizar código 
                    LaTeX = es un lenguaje para renderizar y escribir matemáticas */}
                    <Katex tex={result.toTeX()} className={styles["result-tex"]} />
                  </li>
                ))
              }
            </ol>
          </div>
        )
      }
    </div>
  )
}