import MyButton from './MyButton';
import {MdModeEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

const DiaryItem = ({id, emotion, content, date}) => {
	const navigate = useNavigate();

	const strDate = `${new Date(date).getMonth() + 1}월 ${new Date(date).getDate()}일`;
	const strDay = new Date(date).toLocaleDateString('KO', {weekday: 'long'});

	const goDetail = () => {
		navigate(`/diary/${id}`);
	};
	const goEdit = () => {
		navigate(`/edit/${id}`);
	};

	return (
		<div className="DiaryItem">
			<div className="info_wrapper">
				<div className="emotion_img_wrapper" onClick={goDetail}>
					<img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} alt="emotion" />
				</div>
				<div className="diary_date" onClick={goDetail}>
					<div className="date">{strDate}</div>
					<div className="day">{strDay}</div>
				</div>
				<div className="info_content" onClick={goDetail}>
					<span className="highlight">{content.length > 18 ? `${content.slice(0, 18)}...` : content}</span>
				</div>
				<div className="btn_wrapper">
					<MyButton text={<MdModeEdit />} onClick={goEdit} />
				</div>
			</div>
		</div>
	);
};

export default DiaryItem;
