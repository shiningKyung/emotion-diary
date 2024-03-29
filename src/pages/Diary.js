import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const Diary = () => {
    const { id } = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(()=>{
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id) === parseInt(id)
            );
            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("존재하지 않는 페이지입니다")
                navigate('/', {replace:true})
            }
        }
    },[id,diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중..</div>
    } else {
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        console.log(curEmotionData);

        return (
            <div className="DiaryPage">
                <MyHeader 
                    headText={`${getStringDate(new Date(data.date))}의 기록`}
                    leftChild={
                        <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
                    }
                    rightChild={
                        <MyButton 
                            text={"수정"}
                            onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    } 
                />
                <article>
                    <section>
                        <h4>감정</h4>
                        <div className="diary_img_wrapper">
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
};

export default Diary;