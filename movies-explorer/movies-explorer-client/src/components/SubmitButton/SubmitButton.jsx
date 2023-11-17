import styles from './SubmitButton.module.css'

export function SubmitButton({ onSubmit, submitName, onDisable }) {
  const buttonClass = onDisable
    ? styles['submit-button']
    : [styles['submit-button'], styles['submit-button_disable']].join(' ')

  return (
    <>
      <input
        className={buttonClass}
        onClick={onSubmit}
        type="submit"
        value={submitName}
        disabled={!onDisable}
      />
    </>
  )
}
