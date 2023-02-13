import {useParams, useNavigate} from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import {DiaryStateContext} from '../App';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';
import {FaChevronLeft} from 'react-icons/fa';
import {MdModeEdit} from 'react-icons/md';
import {emotionList} from '../util/emotion';

const Diary = () => {
	const {id} = useParams();
	const diaryList = useContext(DiaryStateContext);
	const navigate = useNavigate();
	const [data, setData] = useState();

	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerHTML = `감정 일기장 - 상세보기`;
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id));
			if (targetDiary) {
				setData(targetDiary);
			} else {
				alert('없는 일기입니다.');
				navigate('/', {replace: true});
			}
		}
	}, [id, diaryList]);

	if (!data) {
		return <div className="DiaryPage">로딩중입니다...</div>;
	} else {
		const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));
		return (
			<div className="DiaryPage">
				<MyHeader
					headText={`${new Date(data.date).getFullYear()}년 ${new Date(data.date).getMonth() + 1}월 ${new Date(data.date).getDate()}일`}
					leftChild={<MyButton text={<FaChevronLeft />} onClick={() => navigate(-1)} />}
					rightChild={<MyButton text={<MdModeEdit />} onClick={() => navigate(`/edit/${data.id}`)} />}
				/>
				<article>
					<section>
						<div className="diary_img_wrapper">
							<img src={curEmotionData.emotion_img} alt="emotion" />
						</div>
						<div className="emotion_descript">
							<span className="highlight">{curEmotionData.emotion_descript}</span>
						</div>
					</section>
					<section className="diary_content_wrapper">
						<p>{data.content}</p>
					</section>
				</article>
			</div>
		);
	}
};

export default Diary;
