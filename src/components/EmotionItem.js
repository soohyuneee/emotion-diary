import React from 'react';

const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClick, isSelected}) => {
	return (
		<div className="EmotionItem" onClick={() => onClick(emotion_id)}>
			<img src={emotion_img} alt="emotionItem" />
			<span className={isSelected ? 'highlight' : null}>{emotion_descript}</span>
		</div>
	);
};

export default React.memo(EmotionItem);
