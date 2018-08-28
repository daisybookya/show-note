import React from 'react';
import { Icon,List, Card } from 'antd';
import {timeFormat,createLink,checkOnSale,checkOnPrice,linkToSource} from './CommonFun'


const CardList = (props:{dataList:Object,addShowNote:Function,loaded:boolean}) => {
    const handleAddItem = (id) =>{
        props.addShowNote(id);
    }
    return ( 
        <div className="card-container">
             <List
                locale={{emptyText: '無展演資訊'}}
                grid={{ gutter: 24, column: 3 }}
                loading={props.loaded}
                dataSource={props.dataList}
                pagination={{
                    pageSize: 12,
                  }}
                renderItem={item => (
                <List.Item>
                    <Card className="card-txt" bordered={false}  title={item.title} actions={[<span onClick={()=>handleAddItem(item.UID)}><Icon type="plus-circle-o"/> 加入記事本</span>,
                    createLink(item.showInfo),linkToSource(item.title)]}>
                    <p>日期時間 > <span style={{fontWeight:'bold',fontSize:'1.2em'}}>{timeFormat(item.showInfo)}</span></p>
                    <p>展演地點 > {item.showInfo[0].locationName}</p>
                    <p>展演地址 > {item.showInfo[0].location}</p>
                    <p>門票價格(元) > {checkOnPrice(item.showInfo)}</p>
                    <p>是否販售中 > {checkOnSale(item.showInfo)}</p>
                    </Card>
                </List.Item>
                )}
            />
        </div>
     );
}

export default CardList;