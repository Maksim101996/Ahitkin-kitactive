import FileItem from "./FileItem/FileItem";
import './FileList.css'
const FileList = ({ files, handleDownload, deleteFile, isLoading }) => {
	return <div className='files'>
		{!files.length > 0 && !isLoading ? <div>Файлов нет</div> : files.map((file) => {
			return <FileItem key={file.id} file={file} handleDownload={handleDownload} deleteFile={deleteFile} />
		})}</div>
}

export default FileList