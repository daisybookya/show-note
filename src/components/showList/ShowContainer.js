import React from 'react';
import {typeArea,typeDate,typeMusic,typeBk} from '../definition/TypeDefinition'
import BtnCategory from './BtnCategory'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doInitList,doSortByType,doSortList,doAddNote,doFetchType,doLoadList,doFetchList,doSortByArea,doSortByCity,doAddCityArray } from '../../actions/ActionCreator'
import { ModalWarn,ModalSuccess} from './ModalMsg'
import { filterList,getDateStr } from './CommonFun'
import Title from './Title'
import CardList from './CardList'
import { Layout,Select } from 'antd';

const { Header, Content } = Layout;
const Option = Select.Option;
let nowCategory = 'indie';
let newList;
const ShowList = (props:{list:Object}) => {
    
    //處理類別
    const handleCategory= (category:String) => {
        props.doFetchType(category)
        props.doSortByArea('none')
        props.doFetchList() //載入列表
        props.doLoadList(true)
        nowCategory = category;
        props.doAddCityArray(['請選擇縣市'])
        props.doSortByCity('請選擇縣市')
    }
    //處理地區排列
    const handleSortByArea = (area:string) => {
        newList = [...props.list] //從總資料獲取
        newList = sortByArea(newList,area) //依照地區過濾的新列表
        newList = sortByDate(newList,props.sortType) //依照日期遠近排列
        props.doSortByArea(area)
        props.doSortList(newList) //儲存進state
        if(area === 'none'){
            props.doAddCityArray(['請選擇縣市'])
        }else{
            let cityAry = filterCityOption(newList)
            props.doAddCityArray(cityAry)
        }
        props.doSortByCity('請選擇縣市')
    }
    //過濾地區中城市顯示在option上
    const filterCityOption = (data:object)=>{
        let result = [];
        data.map((item)=>{
            let newItem = item.showInfo[0].location.replace(/[.*{}()|[\]\\]|\d|\s/g,'')
            newItem = newItem.replace(/臺/g,'台').slice(0,2)
            if(!result.includes(newItem)){
                result.push(newItem)
            }
        })
        return result
    }
    //處理日期排列
    const handleSortByDate = (value:string) => {
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
                        return item.showInfo[0].location.search(/台北|臺北|新北|基隆|桃園|宜蘭|新竹/g) > -1
                    }
                })
            break;
            case 'middle':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/台中|臺中|南投|彰化|雲林|苗栗/g) > -1
                    }
                })
            break;
            case 'south':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/台南|臺南|嘉義|高雄|屏東/g) > -1
                    }
                })
            break;
            case 'east':
                newList = newList.filter((item)=>{
                    if(item.showInfo.length !== 0){
                        return item.showInfo[0].location.search(/花蓮|台東|臺東|金門|澎湖|馬祖/g) > -1
                    }
                })
            break;
            default:
                return newList = newList;
            break;
        }
        return newList;

    }
    const handleCityChange = (city:string) =>{
        props.doSortByCity(city)
    }
    //過濾選中的縣市
    const handleFilterCity = (city:string,data:object)=>{
        if(city === '請選擇縣市') return data
        return data.filter(item=>{
            if(item.showInfo.length !== 0){
                return item.showInfo[0].location.search(city) > -1
            }
            return item
        })
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
        let nowCategory = props.category;
        let isAdded = props.note[nowCategory].filter((data)=>{
            return data.UID === id
        })
        if(isAdded.length > 0){
            ModalWarn() //提醒使用者已加過
        }else{
            //從列表中抓取要新增的資料
            let newItem = props.sortList.find((item)=>{
                return item.UID === id
            })
            let newData = Object.assign({},newItem,{addTime:getDateStr()})
            props.doAddNote(newData,nowCategory) //新增資料，指定類別
            ModalSuccess() //提醒使用者加入成功
        };
    }
    
    return ( 
        <div className="content">
            <Layout>
                <Header style={{'height':'136px',padding:'0 5%',backgroundImage:'url('+process.env.PUBLIC_URL+'/image/'+typeBk[nowCategory][0]+')',borderBottom:`7px solid ${typeBk[nowCategory][1]}`}}>
                    <Title></Title>
                </Header>
                <Content>
                    <div className="sort-item">
                        <span className="txt-type">類別 : </span><BtnCategory handleBtnValue={handleCategory} dataList={typeMusic} value={props.category}></BtnCategory>
                        <span className="txt-type">地區 : </span><BtnCategory handleBtnValue={handleSortByArea} dataList={typeArea} value={props.sortArea}></BtnCategory>
                        <Select defaultValue={props.cityArray[0]} value={props.sortCity} notFoundContent="請選擇縣市" style={{ width: 120,marginLeft:'15px' }} onChange={handleCityChange}>
                        {
                            props.cityArray.map(item=><Option value={item} key={item}>{item}</Option>)
                        }
                        </Select>
                        <span className="txt-type">日期排序 : </span><BtnCategory handleBtnValue={handleSortByDate} dataList={typeDate} value={props.sortType}></BtnCategory>
                    </div>
                    <CardList color={typeBk[nowCategory][1]} dataList={handleFilterCity(props.sortCity,props.sortList)} addShowNote={handleDataToNote} loaded={props.isLoaded}></CardList>
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
      category:store.category,
      note:store.note,
      sortArea:store.sortByArea,
      isLoaded:store.isLoaded,
      cityArray:store.cityArray,
      sortCity:store.sortByCity
    }
}
const mapDispatchToProps = (dispatch)=>{
    return bindActionCreators({
        doInitList,
        doSortByType,
        doSortList,
        doLoadList,
        doFetchList,
        doAddNote,
        doSortByArea,
        doFetchType,
        doSortByCity,
        doAddCityArray
    },dispatch)
  }
export default connect(mapStateToProps, mapDispatchToProps)(ShowList)