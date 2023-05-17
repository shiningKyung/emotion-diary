const DiaryItem = ({id, emotion, contnet, date}) => {
    const strDate = new Date(parseInt(date)).toLocaleDateString();

    console.log(contnet);
    return (
        <div className="DiaryItem">
            <div 
                className={[
                    "emotion_img_wrapper",
                    `emotion_img_wrapper_${emotion}`,
                ].join(" ")}
            >
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
            </div>
            <div className="info_wrapper">
                <div className="diary_date">{strDate}</div>
                <div className="diary_conten_preview">{contnet}</div>
            </div>
            <div></div>
        </div>
    );
};

export default DiaryItem;