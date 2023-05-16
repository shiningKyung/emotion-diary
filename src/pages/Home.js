import { useEffect, useState, useContext } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import Mybutton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
    const [data, setData] = useState([]);

    const diaryList = useContext(DiaryStateContext)

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime();

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0
        ).getTime();

        setData(diaryList.filter((it)=> firstDay <= it.date && it.date <= lastDay))
    }, [diaryList, curDate]);

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() -1, curDate.getDate())
        );
    };

    return (
        <div>
            <MyHeader 
                headText={headText}
                leftChild={<Mybutton text={"<"} onClick={decreaseMonth} />}
                rightChild={<Mybutton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;