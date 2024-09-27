import styles from './input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inverted?: boolean;
}

export default function Input({ label, inverted, ...props }: Props) {
  return (
    <label htmlFor={props.id} className={`${styles.label}`}>
      <span className={inverted ? styles.inverted : undefined}>{label}</span>
      <input {...props} />
    </label>
  );
}