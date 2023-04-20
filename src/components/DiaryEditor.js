import {useNavigate} from 'react-router-dom';
import {useState, useRef, useContext, useEffect, useCallback} from 'react';
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';
import {DiaryDispatchContext} from '../App';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';
import {emotionList} from '../util/emotion';

const getStringDate = (date) => {
	return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({isEdit, originData}) => {
	const contentRef = useRef();
	const navigate = useNavigate();
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState();
	const [content, setContent] = useState();

	const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);

	const handleClickEmotion = useCallback((emotion) => setEmotion(emotion), []);
	const handleSubmit = () => {
		if (!emotion) {
			alert('감정을 선택해주세요.');
			return;
		}

		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}

		if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')) {
			if (!isEdit) {
				onCreate(date, content, emotion);
			} else {
				onEdit(originData.id, date, content, emotion);
			}
		}
		navigate('/', {replace: true});
	};

	const handleRemove = () => {
		if (window.confirm('정말 삭제하시겠습니까?')) {
			onRemove(originData.id);
			navigate('/', {replace: true});
		}
	};

	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [isEdit, originData]);

	return (
		<div className="DiaryEditor">
			<MyHeader
				headText={isEdit ? '일기 수정하기' : '새로운 일기 쓰기'}
				leftChild={<MyButton text={<FaChevronLeft />} onClick={() => navigate(-1)} />}
				rightChild={
					isEdit ? <MyButton text={'삭제'} type={'delete'} onClick={handleRemove} /> : <MyButton type={'hidden'} text={<FaChevronRight />} />
				}
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
						<MyButton text={isEdit ? '수정완료' : '작성완료'} type={'positive'} onClick={handleSubmit} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
