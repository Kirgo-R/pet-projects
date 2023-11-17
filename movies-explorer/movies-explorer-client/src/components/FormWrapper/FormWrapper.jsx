import styles from './FormWrapper.module.css'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import { SubmitButton } from '../SubmitButton/SubmitButton'

export function FormWrapper({
  formTitle,
  children,
  submitName,
  formCaption,
  path,
  linkText,
  formName,
  isValid,
  onSubmit,
}) {
  return (
    <div className={styles.wrapper}>
      <Logo />
      <h2 className={styles.title}>{formTitle}</h2>
      <form noValidate className={styles.form} name={formName}>
        <div className={styles.inputs}>{children}</div>
        <fieldset className={styles.submit}>
          <SubmitButton
            submitName={submitName}
            formName={formName}
            onSubmit={onSubmit}
            onDisable={isValid}
          />
          <span className={styles.caption}>
            {formCaption}{' '}
            <Link className={styles.link} to={path}>
              {linkText}
            </Link>
          </span>
        </fieldset>
      </form>
    </div>
  )
}
