import convert, { type Unit } from 'convert-units';

function calculateConversion ({
  fromNumber, fromUnit, toUnit
}: {
  fromNumber: number,
  fromUnit: Unit,
  toUnit: Unit
}) {
  return convert(fromNumber).from(fromUnit).to(toUnit);
}

export default calculateConversion;