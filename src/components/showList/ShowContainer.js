import React from 'react';
import {typeArea,typeDate} from '../definition/TypeDefinition'
import BtnCategory from './BtnCategory'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doInitList,doSortByType,doSortList,doAddNote } from '../../actions/ActionCreator'
import { ModalWarn,ModalSuccess} from './ModalMsg'
import { filterList } from './CommonFun'
import Title from './Title'
import CardList from './CardList'
import { Layout } from 'antd';

const { Header, Content } = Layout;
let newList;
const ShowList = (props:{list:Object}) => {
    
    //處理地區排列
    const handleSortByArea = (area) => {
        newList = [...props.list]; //從總資料獲取
        newList = sortByArea(newList,area) //依照地區過濾的新列表
        newList = sortByDate(newList,props.sortType) //依照日期遠近排列
        props.doSortList(newList) //儲存進state
    }
    //處理日期排列
    const handleSortByDate = (value) => {
        props.doSortByType(value) //儲存type值進state
        let newitem = sortByDate(props.sortList,value)
        props.doSortList(newitem)        
    }
    //列表依照地區過濾
    const sortByArea = (data,area) => {
        let newList = [...data];
        switch (area){
            case 'north':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/台北|臺北|新北|基隆|桃園/g) > -1
                    }
                })
            break;
            case 'middle':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/台中|臺中|南投/g) > -1
                    }
                })
            break;
            case 'south':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/台南|臺南|嘉義|高雄/g) > -1
                    }
                })
            break;
            default:
                return newList = newList;
            break;
        }
        return newList;

    }
    //列表依照日期排列
    const sortByDate = (data,value)=>{
        let newList = [...data];
        switch(value){
            case 'far':
                newList = filterList(newList,'far')
            break;
            case 'near':
                newList = filterList(newList,'near')
            break;
        }
        return newList;
    }
    //新增展演到筆記
    const handleDataToNote = (id)=>{
        //檢查是否已加過
        let isAdded = props.note.filter((data)=>{
            return data.UID === id
        });
        if(isAdded.length > 0){
            ModalWarn() //提醒使用者已加過
        }else{
            //從列表中抓取要新增的資料
            let newItem = props.sortList.find((item)=>{
                return item.UID === id
            })
            props.doAddNote(newItem)
            ModalSuccess() //提醒使用者加入成功
        };
    }

    
    return ( 
        <div className="content">
            <Layout>
                <Header style={{'height':'136px',padding:'0 5%'}}>
                    <Title></Title>
                </Header>
                <Content>
                    <div className="sort-item">
                        <span className="txt-type">類別 : 獨立音樂</span>
                        <span className="txt-type">地區 : </span><BtnCategory handleBtnValue={handleSortByArea} dataList={typeArea} defaultValue='3'></BtnCategory>
                        <span className="txt-type">日期排序 : </span><BtnCategory handleBtnValue={handleSortByDate} dataList={typeDate} defaultValue='0'></BtnCategory>
                    </div>
                    <CardList dataList={props.sortList} addShowNote={handleDataToNote}></CardList>
                </Content>
            </Layout>
        </div>
     );
}
const mapStateToProps = store =>{
    return{
      list:store.List,
      sortList:store.sortList,
      sortType:store.sortByType,
      note:store.note
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({doInitList,doSortByType,doSortList,doAddNote},dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(ShowList)