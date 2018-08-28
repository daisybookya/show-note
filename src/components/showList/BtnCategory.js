import React from 'react';
import { Radio } from 'antd';

const BtnCategory = (props:{dataList:Object,handleBtnValue:Function,value:String}) => {
    const items = Object.entries(props.dataList);
    //const initValue = items[props.defaultValue][0]; //預設按鈕
    const handleBtnChange =(e)=>{
        props.handleBtnValue(e.target.value);
    }
    return ( 
        <div>
            <Radio.Group buttonStyle="solid" value={props.value} onChange={handleBtnChange}>
            {
                items.map((btn,index)=>{
                    return <Radio.Button value={btn[0]} key={index*index}>{btn[1]}</Radio.Button>
                })
            }
            </Radio.Group>
        </div>
     );
}

export default BtnCategory