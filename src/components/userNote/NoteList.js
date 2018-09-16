import React from 'react';
import { List,Icon,Checkbox,Button} from 'antd';
import {timeFormat,createLink,checkOnSale,checkOnPrice,linkToSource} from '../showList/CommonFun'

const NoteList = (props:{noteData:Object,handleDelItem:String,noteCategory:string}) => {
    let checkedArray=[];
    const handleDelBox = (e,id)=>{
        let oldData = [...checkedArray]
        if(e.target.checked){
            checkedArray = [id,...oldData]
        }else{
            let removeIndex = oldData.findIndex(data=> data === id)
            checkedArray.splice(removeIndex,1)
        }
    }
    const handleDelData = (noteType)=>{
        if (checkedArray.length === 0) return false
        checkedArray.map(item=> props.handleDelItem(item,noteType))
    }
    return ( 
        <div className="note-list">
            <div className="tool" style={{textAlign:'right'}}><Button type="danger" onClick={()=>handleDelData(props.noteCategory)}>刪除</Button></div>
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
                        <div style={{marginBottom:'10px',textAlign:'right',color:'#8e8e8e'}}>筆記加入日期: {item.addTime} / <Checkbox key={item.title} onChange={(e)=>handleDelBox(e,item.UID)}></Checkbox></div>
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