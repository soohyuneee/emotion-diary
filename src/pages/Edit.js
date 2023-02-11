import {useNavigate, useSearchParams} from 'react-router-dom';

const Edit = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const id = searchParams.get('id');
	console.log('id :', id);

	const mode = searchParams.get('mode');
	console.log('mode: ', mode);

	return (
		<>
			<h1>EDIT</h1>
			<button onClick={() => setSearchParams({who: 'soo'})}>QS 바꾸기</button>
			<button onClick={() => navigate('/home')}>홈으로</button>
			<button onClick={() => navigate(-1)}>뒤로</button>
			<br />
		</>
	);
};

export default Edit;
