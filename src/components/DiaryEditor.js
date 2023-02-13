import {useNavigate} from 'react-router-dom';
import {useState, useRef, useContext} from 'react';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import {DiaryDispatchContext} from '../App';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const emotionList = [
	{
		emotion_id: 1,
		emotion_img: process.env.PUBLIC_URL + 'assets/emotion1.png',
		emotion_descript: '행복',
	},
	{
		emotion_id: 2,
		emotion_img: process.env.PUBLIC_URL + 'assets/emotion2.png',
		emotion_descript: '신남',
	},
	{
		emotion_id: 3,
		emotion_img: process.env.PUBLIC_URL + 'assets/emotion3.png',
		emotion_descript: '보통',
	},
	{
		emotion_id: 4,
		emotion_img: process.env.PUBLIC_URL + 'assets/emotion4.png',
		emotion_descript: '슬픔',
	},
	{
		emotion_id: 5,
		emotion_img: process.env.PUBLIC_URL + 'assets/emotion5.png',
		emotion_descript: '화남',
	},
];

const getStringDate = (date) => {
	return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
	const contentRef = useRef();
	const navigate = useNavigate();
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState();
	const [content, setContent] = useState();

	const {onCreate} = useContext(DiaryDispatchContext);

	const handleClickEmotion = (emotion) => setEmotion(emotion);
	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}
		onCreate(date, content, emotion);
		navigate('/', {replace: true});
	};

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={'새로운 일기 쓰기'}
				leftChild={<MyButton text={<FaChevronLeft />} onClick={() => navigate(-1)} />}
				rightChild={<MyButton type={'hidden'} text={<FaChevronRight />} />}
			/>
			<div>
				<section>
					<h4>오늘은 언제인가요?</h4>
					<div className="input_box">
						<input className="input_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
					</div>
				</section>
				<section>
					<h4>오늘의 감정</h4>
					<div className="input_box_emotion_list_wrapper">
						{emotionList.map((it) => (
							<EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmotion} isSelected={it.emotion_id === emotion} />
						))}
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className="input_box_text_wrapper">
						<textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} placeholder="오늘은 어땠나요?" />
					</div>
				</section>
				<section>
					<div className="control_box">
						<MyButton text={'취소하기'} type={'nagative'} onClick={() => navigate(-1)} />
						<MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
