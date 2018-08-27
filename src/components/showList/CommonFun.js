import React from 'react';
import { Icon} from 'antd';

export function timeFormat(value){
    if(value.length !== 0){
        return value[0].time.slice(0,-3)
    }
}
export function createLink(value){
    let _url;
    if(value.length !== 0){
        _url = `https://www.google.com.tw/maps/place/${value[0].location}`
        return <a href={_url} target="_blank"><Icon type="car" /> Google地圖</a>
    }
    
    return <span>無地圖連結</span>
}
export function filterList(data,type){
    let thisYearList = filterYear(0,data)
    let nextYearList = filterYear(1,data)
    let itemList:Object;
    console.log(`filterList/`,data,type)
    if(type === 'near'){
        thisYearList = sortByNear(thisYearList)
        nextYearList = sortByNear(nextYearList)
        itemList = thisYearList.concat(nextYearList)
    }else{
        thisYearList = sortByFar(thisYearList)
        nextYearList = sortByFar(nextYearList)
        itemList = nextYearList.concat(thisYearList)
    }
    
    return itemList;
}
export function filterYear(year=0,data:Object){
    const thisYear = new Date().getFullYear()
    const initData = [...data]
    const yearList = initData.filter(item=>{
        if(item.showInfo.length !== 0){
            return Number(item.showInfo[0].time.slice(0,4)) === Number(thisYear+year);
        }
    })
    return yearList
}
export function sortByNear(data:Object){
    let newData = [...data]
    newData.sort((a,b)=>{
        let monthA = a.showInfo[0].time.slice(5,7);
        let monthB = b.showInfo[0].time.slice(5,7);
        if(monthA === monthB){
            return a.showInfo[0].time.slice(8,10) - b.showInfo[0].time.slice(8,10)
        }
        return monthA - monthB            
    })

    return newData
}
export function sortByFar(data:Object){
    let newData = [...data]
    newData.sort((a,b)=>{
        let monthA = a.showInfo[0].time.slice(5,7);
        let monthB = b.showInfo[0].time.slice(5,7);
        if(monthA === monthB){
            return b.showInfo[0].time.slice(8,10) - a.showInfo[0].time.slice(8,10)
        }
        return monthB - monthA            
    })

    return newData
}