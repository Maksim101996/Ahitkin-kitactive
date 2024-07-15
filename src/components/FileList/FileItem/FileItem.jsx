import './FileItem.css'
import { useRef } from "react";
import Button from "../../../ui/Button/Button"

const FileItem = ({ file, handleDownload, deleteFile }) => {
	const downloadLink = useRef(null);

	return <div className='file' >
		<Button className='file__close' onClick={() => deleteFile(file.id)}>Удалить файл</Button>
		<h2>Имя файла: {file.name}</h2>
		<div className='file__info'>id файла: {file.id}</div>
		<a ref={downloadLink} onClick={() => handleDownload(file.id, file.fileName, file.mineType, downloadLink)}>
			<img src={file.url} alt={'Здесь файл(скачать)'} />
		</a>
	</div>
}


export default FileItem