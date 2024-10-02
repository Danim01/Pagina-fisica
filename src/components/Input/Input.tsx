import styles from './input.module.css';
import classNames from 'classnames';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inverted?: boolean;
  labelFull?: boolean;
  labelClassName?: string;
}

export default function Input({ label, inverted, labelFull, labelClassName, ...props }: Props) {
  const spanClasses = classNames({
    [styles.inverted]: inverted,
    [styles["label-full"]]: labelFull,
  })

  return (
    <label htmlFor={props.id} className={`${styles.label} ${labelClassName}`}>
      <span className={spanClasses}>{label}</span>
      <input {...props} />
    </label>
  );
}