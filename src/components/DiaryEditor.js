import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: "매우좋음"
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: "좋음"
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: "보통"
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: "나쁨"
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: "매우나쁨"
    }
]

const DiaryEditor = () => {
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState(" ");
    const contentRef = useRef();
    
    const handleClickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const {onCreate} = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }
        onCreate(date, content, emotion);
        navigate("/", { replace: true });
    }

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={"새 일기쓰기"} 
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}/>}
            />
            <div>
                <section>
                    <h4>일기 날짜</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                </section>
                <section>
                    <h4>감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) =>(
                            <EmotionItem 
                                key={it.emotion_id} 
                                {...it} 
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>일기본문</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소"} onClick={() => navigate(-1)} />
                        <MyButton text={"등록"} type={"positive"} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;