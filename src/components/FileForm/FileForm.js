import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendFilesAC } from "../../store/AsyncActionCreators"
import Button from "../../ui/Button/Button"
import "./FileForm.css"


const FileForm = () => {
	const dispatch = useDispatch()
	const files = useSelector((state) => state.profile.files)
	const [selectedFile, setSelectedFile] = useState(null)
	const [sizeError, setSizeError] = useState(false)
	const [maxFilesError, setMaxFilesError] = useState(false)
	const fileRef = useRef()


	//обработчик выбора файла. помещает выбранный файл в состояние, так же делает проверку на размер файла
	const fileHandler = (e) => {
		const file = e.target.files[0]
		if (file) {
			if (file.size / 1024 / 1024 < 1) {
				setSelectedFile(file);
				setSizeError(false);
			} else {
				setSelectedFile(null);
				setSizeError(true);
			}
		}
	}

	// срабатывает при изменении состояния, если загрузили новый файл, то идёт запрос за актуальным массивом
	useEffect(() => {
		if (selectedFile && files.length < 20) {
			dispatch(sendFilesAC(selectedFile))
			setSelectedFile(null)
		}
	}, [selectedFile])

	//Обработчик клика на кнопку, определяет общее кол-во загруженных файлов(если привысили, выбрасывает ошибку)
	// и вызывает клик  инпута если всё хорошо
	const fileLoader = (e) => {
		e.preventDefault()
		setMaxFilesError(false);
		if (files.length >= 20) {
			setMaxFilesError(true)
		}
		else {
			fileRef.current.click()
		}
	}

	return (
		<form className="uploadForm" >
			<Button className={'button'} onClick={fileLoader}>Выбрать файл</Button>
			<input type='file' onChange={fileHandler} ref={fileRef} id='inputFile' />
			{sizeError && <div>Максимальный размер файла 1MB</div>}
			{maxFilesError && <div>Превышено максимальное количество файлов: 2</div>}
		</form>
	)
}


export default FileForm