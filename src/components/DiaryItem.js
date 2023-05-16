const DiaryItem = (id, emotion, contnet, date) => {
    return (
        <div className="DiaryItem">
            <div className="emotion_img_wrapper">
                <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
            </div>
        </div>
    );
};

export default DiaryItem;