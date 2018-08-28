import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doDelNote } from '../../actions/ActionCreator'
import { Drawer,Icon,Tabs  } from 'antd';
import NoteList from './NoteList'

const TabPane = Tabs.TabPane;
//過濾是否活動已經過期
function isExpired(data:Object,expired:boolean){
    let nowYear = new Date().getFullYear();
    let nowMonth = Number(new Date().getMonth())+1;
    let nowDay = new Date().getDate();
    if(data === undefined){
        return false
    }
    let newList = data.filter(item=>{
            let itemYear = parseFloat(item.showInfo[0].time.slice(0,4));
            let itemMonth = parseFloat(item.showInfo[0].time.slice(5,7));
            let itemDay = parseFloat(item.showInfo[0].time.slice(8,10));
            if(itemYear > nowYear){
                return expired? '': itemYear;
            }
            if( itemMonth === nowMonth){
                return expired ? itemDay < nowDay:itemDay >= nowDay;
            }
            return expired? itemMonth<nowMonth : itemMonth>nowMonth
        })
    return newList;
}
const NoteContainer = (props:{isOpen:boolean,onCloseNote:Function}) => {

    const handleCloseBtn = ()=>{
        props.onCloseNote(false)
    }
    //移除筆記
    const handleDeleteData = (id)=>{
        let category = props.category;
        let delItem = props.note[category].filter(item=>{
            return item.UID === id;
        })
        props.doDelNote(delItem,category) //刪除資料，指定類別
    }
    return ( 
        <Drawer
          title={<span><Icon style={{ fontSize: '1.3em',verticalAlign:'bottom',color: '#096dd9'}} type="schedule" /> My Show Note</span>}
          width={800}
          placement="right"
          maskClosable={false}
          onClose={handleCloseBtn}
          visible={props.isOpen}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
            backgroundImage:'url('+process.env.PUBLIC_URL+'/image/wood.png)'
          }}
        >
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="notification" />獨立音樂近期展演</span>} key="1">
                    
                    <NoteList noteData={isExpired(props.note['indie'],false)} handleDelItem={handleDeleteData}></NoteList>
                </TabPane>
                <TabPane tab={<span><Icon type="notification" />古典音樂近期展演</span>} key="2">
                    <NoteList noteData={isExpired(props.note['classic'],false)} handleDelItem={handleDeleteData}></NoteList>
                </TabPane>
                <TabPane tab={<span><Icon type="folder-open" />已過期獨立展演</span>} key="3">
                    <NoteList noteData={isExpired(props.note['indie'],true)} handleDelItem={handleDeleteData}></NoteList>
                </TabPane>
                <TabPane tab={<span><Icon type="folder-open" />已過期古典展演</span>} key="4">
                    <NoteList noteData={isExpired(props.note['classic'],true)} handleDelItem={handleDeleteData}></NoteList>
                </TabPane>
            </Tabs>
        </Drawer>
     );
}
 
const mapStateToProps = store =>{
    //console.log(store)
    return{
      note:store.note,
      category:store.category
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({doDelNote},dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)