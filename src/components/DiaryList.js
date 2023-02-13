import React, {useState} from 'react';
import MyButton from './MyButton';
import {useNavigate} from 'react-router-dom';
import DiaryItem from './DiaryItem';

const sortOptionList = [
	{value: 'latest', name: '최신순'},
	{value: 'oldest', name: '오래된 순'},
];

const filterOptionList = [
	{value: 'all', name: '전부다'},
	{value: 'good', name: '좋은 날만'},
	{value: 'bad', name: '안좋은 날만'},
];

const ControlMenu = React.memo(({value, onChange, optionList}) => {
	return (
		<select
			className="ControlMenu"
			value={value}
			onChange={(e) => {
				onChange(e.target.value);
			}}
		>
			{optionList.map((it, idx) => (
				<option key={idx} value={it.value}>
					{it.name}
				</option>
			))}
		</select>
	);
});

const DiaryList = ({diaryList}) => {
	const navigate = useNavigate();
	const [sortType, setSortType] = useState('latest');
	const [filter, setFilter] = useState('all');

	const getProcessedDiaryList = () => {
		const comapare = (a, b) => {
			if (sortType === 'latest') {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};

		const filterCallBack = (item) => {
			if (filter === 'good') {
				return parseInt(item.emotion) <= 3;
			} else {
				return parseInt(item.emotion) > 3;
			}
		};

		const copyList = JSON.parse(JSON.stringify(diaryList)); // 깊은 복사
		const filteredList = filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
		const sortedList = filteredList.sort(comapare);

		return sortedList;
	};

	const renderList = getProcessedDiaryList().map((it) => <DiaryItem key={it.id} {...it} />);
	return (
		<div className="DiaryList">
			<div className="menu_wrapper">
				<div className="left_col">
					<ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
					<ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
				</div>
				<div className="right_col">
					<MyButton type={'positive'} text={'새 일기쓰기'} onClick={() => navigate('/new')} />
				</div>
			</div>
			{renderList.length >= 1 ? renderList : <p>오늘의 감정을 기록해주세요.</p>}
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [],
};

export default DiaryList;
