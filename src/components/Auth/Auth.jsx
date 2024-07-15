import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../../API/AuthService"
import { useInput } from "../../hooks/hooks"
import Button from "../../ui/Button/Button"
import Input from "../../ui/Input/Input"
import "./Auth.css"
import ValidationError from "./ValidateError/ValidateError"

const Auth = () => {
	//состояние определяющие регистрацию/авторизацию
	const [isRegister, setIsRegister] = useState(true)
	//Валидаторы для инпутов
	const name = useInput('', { isEmptyError: true, minLength: 3 })
	const email = useInput('', { isEmptyError: true, minLength: 3, isEmailValid: true })
	const password = useInput('', { isEmptyError: true, minLength: 3 })
	//Редирект в личный кабинет при авторизации
	const redirect = useNavigate()

	// Обработчик отправки формы при регистрация/авторизации
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (isRegister) {
			const status = await AuthService.registration(name.value, email.value, password.value)
			if (status === 200) {
				setIsRegister(false)
			}
		}
		if (!isRegister) {
			console.log('456');
			const status = await AuthService.login(email.value, password.value)
			if (status === 200) {
				console.log('123');
				redirect('/profile')
			}
		}
	}


	// переключатель регистрация/авторизация
	const switchAuth = (e) => {
		if (e.currentTarget.name === 'reg') setIsRegister(true)
		if (e.currentTarget.name === 'auth') setIsRegister(false)
	}

	return (<div>
		<div className='bnts'>
			<Button className={'button'} name='reg' onClick={switchAuth}>Регистрация</Button>
			<Button className={'button'} name='auth' onClick={switchAuth}>Авторизация</Button>
		</div>
		<form className='form' onSubmit={handleSubmit} noValidate>
			{isRegister ? <h2 className="title">Регистрация</h2> : <h2 className="title">Авторизация</h2>}
			{isRegister && (<><ValidationError isDirty={name.isDirty} error={name.isEmptyError} errorMessage={`Поле пустое`} />
				<ValidationError isDirty={name.isDirty} error={name.minLengthError} errorMessage={`минимальное число символов ${name.minLength}`} />
				<Input type='text' value={name.value} name='name' onChange={(e) => name.onChange(e)} onBlur={(e) => name.onBlur(e)} placeholder='Введите имя...' /></>)
			}
			<ValidationError isDirty={email.isDirty} error={email.isEmptyError} errorMessage={`Поле пустое`} />
			<ValidationError isDirty={email.isDirty} error={email.minLengthError} errorMessage={`минимальное число символов ${name.minLength}`} />
			<ValidationError isDirty={email.isDirty} error={email.isEmail} errorMessage={`Неккоректный email`} />
			<Input type='email' value={email.value} name='email' onChange={(e) => email.onChange(e)} onBlur={(e) => email.onBlur(e)} placeholder='Введите email...' />
			<ValidationError isDirty={password.isDirty} error={password.isEmptyError} errorMessage={`Поле пустое`} />
			<ValidationError isDirty={password.isDirty} error={password.minLengthError} errorMessage={`минимальное число символов ${name.minLength}`} />
			<Input type='password' value={password.value} name='password' onChange={(e) => password.onChange(e)} onBlur={(e) => password.onBlur(e)} placeholder='Введите пароль...' />
			<Button className='button' disabled={!name.isValidForm && isRegister || !email.isValidForm || !password.isValidForm}>
				{isRegister ? 'Регистрация' : "Авторизация"}
			</Button>
		</form > </div>)
}

export default Auth