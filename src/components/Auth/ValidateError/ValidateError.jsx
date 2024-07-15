import "./ValidateError.css"

//Компонент для вывода ошибок при валидации формы
const ValidationError = ({ isDirty, error, errorMessage }) => {
	return (
		<>
			{isDirty && error && <div className="errorMessage" >{errorMessage}</div>}
		</>
	);
};

export default ValidationError;
