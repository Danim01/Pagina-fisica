import nerdamer from "nerdamer";
import "nerdamer/Solve"
import "nerdamer/Algebra"
import "nerdamer/Calculus"

// Nerdamer es una librera que maneja todo lo relacionado con matemáticas como despejar variables o resolver ecuaciones
// para que nerdamer funcione se debe importar los módulos necesarios para resolver el problemas

interface Params {
  equation: string
  initialValues: Record<string, string | number>
  solveFor: string
}

function calculate ({ equation, initialValues, solveFor }: Params) {
  const initialValuesWithConstants = {
    g: "9.8",
    ...initialValues
  }

  // Para que entregue el resultado se le pasara a la función de nerdamer la
  // ecuación y los valores que se necesitan para solver la ecuación y después se llama a la función 
  // solveFor que recibe la variable que se quiere resolver
  const result =
    nerdamer(equation, initialValuesWithConstants)
    .solveFor(solveFor)

  return [result].flat();
}

export default calculate;