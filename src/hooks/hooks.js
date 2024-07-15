import { useEffect, useState } from "react"

//Кастомные хуки для валидации и обработки инпутов
export const useInput = (initialValue, validations) => {
	const [value, setValue] = useState(initialValue)
	const [isDirty, setIsDirty] = useState(false)
	const validator = useValidation(value, validations)
	const onChange = (e) => {
		setValue(e.target.value)
	}
	const onBlur = () => {
		setIsDirty(true)
	}
	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...validator
	}
}

//получает введённое значение и объект валидаторов, после чего итерируется и
// проводит нужные действия, возвращает состояние по которому мы можем понять валиден ли инпут
export const useValidation = (value, validations) => {
	const [isEmptyError, setIsEmptyError] = useState(true)
	const [minLengthError, setMinLengthError] = useState(false)
	const [isEmail, setIsEmail] = useState(false)
	const [isValidForm, setIsValidForm] = useState(false)
	const minLength = validations.minLength

	useEffect(() => {
		for (let validation in validations) {
			switch (validation) {
				case 'isEmptyError':
					value ? setIsEmptyError(false) : setIsEmptyError(true)
					break;
				case 'minLength':
					value.length < minLength ? setMinLengthError(true) : setMinLengthError(false)
					break;
				case 'isEmailValid':
					const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					validEmail.test(String(value).toLowerCase()) ? setIsEmail(false) : setIsEmail(true)
			}
		}
	},
		[value])

	useEffect(() => {
		if (isEmptyError || minLengthError || isEmail) {
			setIsValidForm(false)
		} else {
			setIsValidForm(true)
		}
	}, [isEmptyError, minLengthError, isEmail])

	return {
		isEmptyError, minLengthError, minLength, isEmail, isValidForm
	}
}
