import nerdamer from "nerdamer";
import "nerdamer/Solve"
import "nerdamer/Algebra"
import "nerdamer/Calculus"

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

  const result =
    nerdamer(equation, initialValuesWithConstants)
    .solveFor(solveFor)

  return [result].flat();
}

export default calculate;