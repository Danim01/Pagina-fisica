import React from "react"
import type { CalculatorForm } from "@types"
import Input from "./Input/Input"
import convert, { type Measure, type Unit } from "convert-units"
import translateUnits from "@lib/translateUnits"
import { useEffect, useState, useRef } from "react"
import calculateConversion from "@lib/calculateConversion"

interface Props {
  calculatorForm: CalculatorForm
}

const defaultMeasure = 'length';
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

    if (newMeasureGroup !== measureGroup) {
      setInitialInputValue(0)
      setFinalInputValue(0)
    };

    setMeasureGroup(newMeasureGroup)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (formRef.current) {
      const form = formRef.current
      const formData = Object.fromEntries(new FormData(form))

      let fromNumber;
      let fromUnit;
      let toUnit;

      if (event.target.name.startsWith('unidad-inicial')) {
        fromNumber = Number(formData["unidad-inicial"])
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
        fromNumber = Number(formData["unidad-final"])
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

  useEffect(() => {
    const newUnits = convert().possibilities(measureGroup)
    setUnits(newUnits)
  }, [measureGroup])

  return (
    <div>
      <form ref={formRef} id="convert-units-form">
        <select name="measure" id="" defaultValue={"length"} onChange={handleMeasureChange}>
          {
            measures.map((measure, i) => (
              <option
                key={`measure-calculatoruc-${i}`}
                value={measure}
              >
                {translateUnits(measure)}
              </option>
            ))
          }
        </select>
        {
          calculatorForm.campos.map((campo, i) => (
            <div key={`measure-unit-calculatoruc${i}`}>
              <Input
                label={campo.label}
                required
                {...campo.input}
                onChange={handleInputChange}
                value={
                  campo.input.name === 'unidad-inicial'
                    ? initialInputValue
                    : finalInputValue
                }
              />
              <select
                name={`${campo.input.name}-unit`}
                onChange={handleInputChange}
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
        <button form="convert-units-form" type="reset">Reiniciar</button>
      </form>
    </div>
  )
}
