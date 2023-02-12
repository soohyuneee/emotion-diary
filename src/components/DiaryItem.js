import MyButton from './MyButton';
import {MdModeEdit} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

const DiaryItem = ({id, emotion, content, date}) => {
	const navigate = useNavigate();

	const strDate = `${new Date().getMonth() + 1}월 ${new Date().getDate()}일`;
	const strDay = new Date().toLocaleDateString('KO', {weekday: 'long'});

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
					<img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt="emotion" />
				</div>
				<div className="diary_date" onClick={goDetail}>
					<div className="date">{strDate}</div>
					<div className="day">{strDay}</div>
				</div>
				<div className="info_content" onClick={goDetail}>
					{content.slice(0, 18)}
				</div>
				<div className="btn_wrapper">
					<MyButton text={<MdModeEdit color="#86B4E7" />} onClick={goEdit} />
				</div>
			</div>
		</div>
	);
};

export default DiaryItem;
