import React from 'react';

const yearNow = new Date().getFullYear();
const Title = () => {
    return ( 
        <div className="header-title">
            <h1>Show Notes</h1>
            <h2>[ -{yearNow}年 獨立音樂 近期展演資訊-]</h2>
        </div>
     );
}
 
export default Title;