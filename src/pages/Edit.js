import {useNavigate, useParams} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {DiaryStateContext} from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const diaryList = useContext(DiaryStateContext);
	const [originData, setOriginData] = useState();

	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.textContent = `감정 일기장 - 수정하기`;
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
			if (targetDiary) {
				setOriginData(targetDiary);
			} else {
				navigate('/', {replace: true});
			}
		}
		// eslint-disable-next-line
	}, [id, diaryList]);

	return <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
};

export default Edit;
