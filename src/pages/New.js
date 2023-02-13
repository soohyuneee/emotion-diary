import {useEffect} from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerHTML = `감정 일기장 - 새 일기쓰기`;
	}, []);

	return (
		<>
			<DiaryEditor />
		</>
	);
};

export default New;
