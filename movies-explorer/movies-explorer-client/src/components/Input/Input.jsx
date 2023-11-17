import styles from './Input.module.css'

export function Input({
  label,
  minLength,
  maxLength,
  inputType,
  inputName,
  placeholder,
  onChange,
  value,
  errorName,
  isValid,
  pattern,
}) {
  const inputClassName = isValid[inputName]
    ? styles.input
    : [styles.input, styles['input_invalid']].join(' ')

  return (
    <>
      <fieldset className={styles['input-container']}>
        <span className={styles.placeholder}>{label}</span>
        <input
          required
          minLength={minLength}
          maxLength={maxLength}
          autoComplete="off"
          className={inputClassName}
          type={inputType}
          name={inputName}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          pattern={pattern}
        />
        <span className={styles.error}>{errorName}</span>
      </fieldset>
    </>
  )
}
