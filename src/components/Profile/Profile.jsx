import './Profile.css'
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector, } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AuthService } from "../../API/AuthService"
import { getFileAC, getFilesAC, deleteFileAC } from "../../store/AsyncActionCreators"
import Button from "../../ui/Button/Button"
import FileForm from "../FileForm/FileForm"
import Loader from '../../ui/Loader/Loader'
import { createUrl } from '../../utils/createUrl'
import FileList from '../FileList/FileList'


const Profile = () => {
	const redirect = useNavigate()
	const dispatch = useDispatch()
	const { files, isLoading, error } = useSelector((state) => state.profile)

	// получаем файлы при первичной отрисовке
	useEffect(() => {
		dispatch(getFilesAC())
	}, [])

	//функция выхода из профиля
	const logoutProfile = async () => {
		const status = await AuthService.logout()
		if (status === 200) redirect('/auth')
	}

	// функция создающая ссылку на скачивание файла 
	const handleDownload = async (id, fileName, mimeType, downloadLink) => {
		const url = createUrl(id, mimeType, dispatch)
		downloadLink.current.href = url
		downloadLink.current.download = fileName
		window.URL.revokeObjectURL(url)
	}

	//функция удаления файла
	const deleteFile = (id) => {
		dispatch(deleteFileAC(id))
	}

	return <div className='profile'>
		<div className='profile__header'>	<FileForm />
			<div className='logout'>Выйти из профиля:<Button className={'button'} onClick={logoutProfile}>
				Выйти
			</Button>
			</div>
		</div>
		<div className='profile__files-info'>Всего загружено файлов: {files.length} из 20</div>
		<div className='profile__files-section'>
			{isLoading && <Loader />}
			{error && <p>Ошибка: {error}</p>}
			<FileList files={files} handleDownload={handleDownload} deleteFile={deleteFile} isLoading={isLoading} />
		</div>
	</div>
}

export default Profile