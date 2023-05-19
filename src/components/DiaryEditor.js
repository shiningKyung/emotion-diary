import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/assests/emotion1.png`,
        emotion_descript: "매우좋음"
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/assests/emotion2.png`,
        emotion_descript: "좋음"
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/assests/emotion3.png`,
        emotion_descript: "보통"
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/assests/emotion4.png`,
        emotion_descript: "나쁨"
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/assests/emotion5.png`,
        emotion_descript: "매우나쁨"
    }
]

const DiaryEditor = () => {
    const navigate = useNavigate;
    const [date, setDate] = useState(getStringDate(new Date()));

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
                            <div key={it.emotion_id}>{it.emotion_descript}</div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;