import React from 'react';

type TitleText = {
    titleText:string
}

function CardTitle({titleText}:TitleText) {
    return (
        <h1 className="create-habit-title">{titleText}</h1>

    );
}

export default CardTitle;