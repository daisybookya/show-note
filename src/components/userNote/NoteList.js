import React from 'react';
import { List,Icon} from 'antd';
import {timeFormat,createLink,checkOnSale,checkOnPrice,linkToSource} from '../showList/CommonFun'

const NoteList = (props:{noteData:Object,handleDelItem:String}) => {
    
    const handleDelBtn = (id)=>{
        props.handleDelItem(id);
    }
    return ( 
        <div className="note-list">
            <List
                pagination={{
                    pageSize: 10,
                }}
                locale={{emptyText: '記事本為空'}}
                itemLayout="vertical"
                dataSource={props.noteData}
                renderItem={item => (
                <List.Item >
                    <List.Item.Meta
                    title={item.title}
                    className="note-meta"
                    description={<div style={{color: 'rgb(84, 84, 84)'}}>
                        <div className="btn-close" onClick={()=>handleDelBtn(item.UID)}><Icon style={{fontSize:'1.6em',cursor:'pointer'}} type="close-circle"  /></div>
                        <p><Icon type="clock-circle-o" /> 日期時間 > {timeFormat(item.showInfo)}</p>
                        <p><Icon type="home" /> 展演地點 > {item.showInfo[0].locationName}</p>
                        <p><Icon type="environment-o" /> 展演地址 > {item.showInfo[0].location} / {createLink(item.showInfo)}</p>
                        <p><Icon type="pay-circle" /> 門票價格(元) > {checkOnPrice(item.showInfo)} / 檢索相關資訊 > {linkToSource(item.title)}</p>
                        <p><Icon type="shopping-cart" /> 是否販售中 > {checkOnSale(item.showInfo)}</p></div> }
                    />
                </List.Item>
                )}
            />
        </div>
     );
}
 
export default NoteList;