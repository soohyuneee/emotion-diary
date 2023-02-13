import React, {useReducer, useRef} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			newState = [action.data, ...state];
			break;
		}
		case 'REMOVE': {
			newState = state.filter((it) => it.id !== action.targetId);
			break;
		}
		case 'EDIT': {
			// 수정하면 데이터 전부 바뀜
			newState = state.map((it) => (it.id === action.data.id ? {...action.data} : it));
			break;
		}
		default:
			return state;
	}
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
	{
		id: 1,
		emotion: 1,
		content: '오늘의 일기 1',
		date: 1676192898765,
	},
	{
		id: 2,
		emotion: 2,
		content: '오늘의 일기 2',
		date: 1676192898766,
	},
	{
		id: 3,
		emotion: 3,
		content: '오늘의 일기 3',
		date: 1676192898767,
	},
	{
		id: 4,
		emotion: 4,
		content: '오늘의 일기 4',
		date: 1676192898768,
	},
	{
		id: 5,
		emotion: 5,
		content: '오늘의 일기 5 길게 써보기 20자 넘겠지?',
		date: 1676192898769,
	},
];

function App() {
	const [data, dispatch] = useReducer(reducer, dummyData);
	const dataId = useRef(0);

	//CREATE
	const onCreate = (date, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: {
				id: dataId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current++;
	};
	//REMOVE
	const onRemove = (targetId) => {
		dispatch({type: 'REMOVE', targetId});
	};
	//EDIT
	const onEdit = (targetId, date, content, emotion) => {
		dispatch({
			type: 'EDIT',
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={{onCreate, onEdit, onRemove}}>
				<BrowserRouter>
					<div className="App">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/new" element={<New />} />
							<Route path="/edit/:id" element={<Edit />} />
							<Route path="/diary/:id" element={<Diary />} />
						</Routes>
					</div>
				</BrowserRouter>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
