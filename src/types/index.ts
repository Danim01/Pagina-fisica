export interface ConfigObject {
  [key: string]: CalculatorForm[]; // This allows any string as a key, mapping to an array of CaidaLibre objects
}

export interface CalculatorForm {
  formulario: string;
  equation?: string;
  campos:     Campo[];
}

export interface Campo {
  label:  string;
  id?:    string;
  units?: string;
  input:  Input;
}

export interface Input {
  name:        string;
  id:          string;
  type:        Type;
  placeholder: string;
  defaultValue:       number;
}

export enum Type {
  Number = "number",
}