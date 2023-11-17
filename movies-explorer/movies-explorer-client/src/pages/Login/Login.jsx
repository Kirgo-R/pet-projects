import { FormWrapper } from '../../components/FormWrapper/FormWrapper'
import { Input } from '../../components/Input/Input'
import { emailRegex } from '../../utils/constants'
import { useCheckValidity } from '../../hooks/useCheckValidity'

export function Login({ onLogin }) {
  const { values, errors, isInputValid, handleChange, isValid } =
    useCheckValidity()

  function handleLogin(evt) {
    evt.preventDefault()
    onLogin(values.email, values.password)
  }

  return (
    <>
      <FormWrapper
        formTitle={'Рады видеть!'}
        formCaption={'Ещё не зарегистрированы?'}
        linkText={'Регистрация'}
        path={'/signup'}
        submitName={'Войти'}
        onSubmit={handleLogin}
        isValid={isValid}
        formName={'login'}
      >
        <Input
          value={values.email ? values.email : ''}
          inputName={'email'}
          inputType={'text'}
          errorName={errors.email}
          minLength={'2'}
          maxLength={'40'}
          placeholder={'E-mail'}
          label={'E-mail'}
          onChange={handleChange}
          isValid={isInputValid}
          pattern={emailRegex}
        />
        <Input
          value={values.password ? values.password : ''}
          inputName={'password'}
          inputType={'password'}
          errorName={errors.password}
          minLength={'3'}
          placeholder={'Пароль'}
          label={'Пароль'}
          onChange={handleChange}
          isValid={isInputValid}
        />
      </FormWrapper>
    </>
  )
}
