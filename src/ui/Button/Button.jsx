import "./Button.css"
const Button = ({ name, children, onClick, disabled, className }) => {
	return <button name={name} onClick={onClick} disabled={disabled} className={className}>{children}</button>
}

export default Button