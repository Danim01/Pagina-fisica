const translations = {
  length: 'longitud',
  area: 'área',
  mass: 'masa',
  volume: 'volumen',
  each: 'cantidad',
  temperature: 'temperatura',
  time: 'tiempo',
  digital: 'digital',
  partsPer: 'partes por',
  speed: 'velocidad',
  pace: 'ritmo',
  pressure: 'presión',
  current: 'corriente',
  voltage: 'voltaje',
  power: 'potencia',
  reactivePower: 'potencia reactiva',
  apparentPower: 'potencia aparente',
  energy: 'energía',
  reactiveEnergy: 'energía reactiva',
  volumeFlowRate: 'caudal volumétrico',
  illuminance: 'iluminancia',
  frequency: 'frecuencia',
  angle: 'ángulo'
};

export default function translateUnits(unit: string) {
  return translations[unit as keyof typeof translations] || 'Traducción no disponible';
}