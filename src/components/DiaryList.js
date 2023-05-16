import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Mybutton from './MyButton';
import DiaryItem from "./DiaryItem";

const ControlMenu = ({ value, onChange, optionList }) => {
    return (
        <select 
            className="ControlMenu"
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        >
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
};

const sortOptionList = [ 
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
]

const filterOptionList = [
    { value: "all", name: "전체 일기" },
    { value: "good", name: "좋은감정 일기" },
    { value: "bad", name: "안좋은감정 일기" },
]

const DiaryList = ({ diaryList }) => {
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");
    const navigate = useNavigate();

    const getProcessedDiaryList = () => {

        const filterCallback = (item) => {
            if (filter === 'good') {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if (sortType === "latest") {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filterdList = filter === 'all' ? copyList : copyList.filter((it)=>filterCallback(it));
        
        const sortedList = filterdList.sort(compare);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value={sortType} 
                        onChange={setSortType}
                        optionList = {sortOptionList}
                    />
                    <ControlMenu 
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <Mybutton 
                        type={'positive'} 
                        text={'일기작성'} 
                        onClick={()=>navigate('/new')} 
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;