import "./Input.css"

const Input = ({ type, value, name, onChange, placeholder, ref, id, onBlur }) => {
	return <input className='input' name={name} onBlur={onBlur} type={type} id={id} value={value} ref={ref} onChange={onChange} placeholder={placeholder} autoComplete='off' />

}

export default Input