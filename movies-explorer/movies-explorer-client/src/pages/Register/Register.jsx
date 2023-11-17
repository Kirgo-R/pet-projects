import { FormWrapper } from '../../components/FormWrapper/FormWrapper'
import { useCheckValidity } from '../../hooks/useCheckValidity'
import { Input } from '../../components/Input/Input'
import { emailRegex } from '../../utils/constants'

export function Register({ onRegister }) {
  const { values, errors, isInputValid, handleChange, isValid } =
    useCheckValidity()

  function handleRegister(evt) {
    evt.preventDefault()
    onRegister(values.name, values.email, values.password)
  }

  return (
    <>
      <FormWrapper
        formTitle={'Добро пожаловать!'}
        formName={'register'}
        formCaption={'Уже зарегистрированы?'}
        linkText={'Войти'}
        path={'/signin'}
        submitName={'Зарегистрироваться'}
        isValid={isValid}
        onSubmit={handleRegister}
      >
        <Input
          value={values.name || ''}
          inputName={'name'}
          inputType={'text'}
          errorName={errors.name}
          minLength={'2'}
          maxLength={'40'}
          placeholder={'Имя'}
          label={'Имя'}
          onChange={handleChange}
          isValid={isInputValid}
        />
        <Input
          value={values.email || ''}
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
          value={values.password || ''}
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
