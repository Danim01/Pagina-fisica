import React from "react"
import type { CalculatorForm } from "@types"
import Input from "./Input/Input"
import convert, { type Measure, type Unit } from "convert-units"
import translateUnits from "@lib/translateUnits"
import { useEffect, useState, useRef } from "react"
import calculateConversion from "@lib/calculateConversion"
import style from './calculatorUC.module.css';

interface Props {
  calculatorForm: CalculatorForm
}

// Esta variable sirve para definir la medida por defecto
const defaultMeasure = 'length';

// Con la función convert estamos llamando al método principal de la librería
// y el método measures retorna un arreglo de las medidas que soporta la librería
// Estas medidas llegan en ingles
const measures = convert().measures()

export default function CalculatorUC({ calculatorForm }: Props) {
  const [measureGroup, setMeasureGroup] = useState<Measure>(defaultMeasure)
  const [units, setUnits] = useState<string[]>(
    convert().possibilities(defaultMeasure)
  )
  const [initialInputValue, setInitialInputValue] = useState<number>(0)
  const [finalInputValue, setFinalInputValue] = useState<number>(0)
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleMeasureChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { target } = event

    const newMeasureGroup = target.value as Measure

    // Cuando la unidad de medida en el select cambia se reinician los valores de los inputs
    if (newMeasureGroup !== measureGroup) {
      setInitialInputValue(0)
      setFinalInputValue(0)
      // Estamos actualizando el valor de MeasureGroup
      setMeasureGroup(newMeasureGroup)
    };

  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    // formRef.current lo que hace es extraer todo el formulario
    if (formRef.current) {
      const form = formRef.current
      const formData = Object.fromEntries(new FormData(form))

      let fromNumber;
      let fromUnit;
      let toUnit;

      // startsWith es un método de string que retorna verdadero si el string inicia
      // con la cadena que se le pasa como parámetro y falso si no
      // Esta condición sirve para estar pendiente que cual de los inputs o selects de unidad
      // cambiaron para así volver a calcular la conversión
      if (event.target.name.startsWith('unidad-inicial')) {
        fromNumber = parseInt(String(formData["unidad-inicial"]), 10)
        fromUnit = formData["unidad-inicial-unit"] as Unit
        toUnit = formData["unidad-final-unit"] as Unit

        const result = calculateConversion({
          fromNumber,
          fromUnit,
          toUnit
        })

        setFinalInputValue(result)
        setInitialInputValue(fromNumber)
      } else {
        fromNumber = parseInt(String(formData["unidad-final"]), 10)
        fromUnit = formData["unidad-final-unit"] as Unit
        toUnit = formData["unidad-inicial-unit"] as Unit

        const result = calculateConversion({
          fromNumber,
          fromUnit,
          toUnit
        })

        setInitialInputValue(result)
        setFinalInputValue(fromNumber)
      }
    }
  }

  const handleReset = () => {
    setInitialInputValue(0)
    setFinalInputValue(0)
  }

  useEffect(() => {
    // possibilities es una función que nos retorna un arreglo con
    // las unidades relacionadas a ese grupo de medidas
    const newUnits = convert().possibilities(measureGroup)
    setUnits(newUnits)
  }, [measureGroup])

  return (
    <div>
      <h2>Calculadora de conversiones</h2>
      <form ref={formRef} id="convert-units-form">
        <label className={style.measureLabel}>
          <span>Seleccione la medida</span>
          <select
            name="measure"
            defaultValue={"length"}
            onChange={handleMeasureChange}
            className={`${style.select} ${style.measureSelect} ${style.capitalize}`}
          >
            {
              measures.map((measure, i) => (
                <option
                  key={`measure-calculatoruc-${i}`}
                  value={measure}
                  className={style.capitalize}
                >
                  {translateUnits(measure)}
                </option>
              ))
            }
          </select>
        </label>
        <div className={style.fieldsContainer}>
          {
            calculatorForm.campos.map((campo, i) => (
              <div key={`measure-unit-calculatoruc${i}`} className={style.conversionContainer}>
                <Input
                  label={campo.label}
                  required
                  labelClassName={style.conversionLabel}
                  {...campo.input}
                  onChange={handleInputChange}
                  className={style.conversionInput}
                  value={
                    campo.input.name === 'unidad-inicial'
                      ? initialInputValue
                      : finalInputValue
                  }
                />
                <select
                  name={`${campo.input.name}-unit`}
                  onChange={handleInputChange}
                  className={`${style.select} ${style.unitSelect}`}
                >
                  {
                    units.map((unit, i) => (
                      <option
                        key={`unit-calculatoruc-${i}`}
                        value={unit}
                      >
                        {unit}
                      </option>
                    ))
                  }
                </select>
              </div>
            ))
          }
        </div>
        <button form="convert-units-form" type="button" onClick={handleReset}>Reiniciar</button>
      </form>
    </div>
  )
}
