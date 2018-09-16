import {ADD_NOTE,
        DEL_NOTE,
        INIT_NOTE,
        FETCH_LIST,
        FETCH_TYPE,
        LOADING_LIST,
        INIT_LIST,
        SORT_LIST,
        SORT_TYPE,
        SORT_AREA,
        SORT_CITY,
        CITY_ARRAY
    } from './ActionType'
//handle show list
export const doFetchList = ()=>{
    //middlewares執行fetch data
    return{
        type:FETCH_LIST,
        callback:(data:Object,dispatch:Function)=> {
            dispatch(doInitList(data));
            dispatch(doSortList(data));
            dispatch(doLoadList(false));
        }

    }
}
export const doFetchType = (category:String)=>{
    //初始列表
    return{
        type:FETCH_TYPE,
        category
    }
}
export const doLoadList = (isLoaded:Boolean)=>{
    //初始列表
    return{
        type:LOADING_LIST,
        isLoaded
    }
}
export const doInitList = (List:Object)=>{
    //初始列表
    return{
        type:INIT_LIST,
        List
    }
}
export const doSortList = (List:Object)=>{
    //過濾資料
    return{
        type:SORT_LIST,
        List
    }
}
export const doSortByType = (keyWord:string)=>{
    //排列類型
    return{
        type:SORT_TYPE,
        keyWord
    }
}
export const doSortByCity = (keyWord:string)=>{
    //排列類型
    return{
        type:SORT_CITY,
        keyWord
    }
}
export const doAddCityArray = (cityList:Array)=>{
    //排列類型
    return{
        type:CITY_ARRAY,
        cityList
    }
}
export const doSortByArea = (area:string)=>{
    //排列類型
    return{
        type:SORT_AREA,
        area
    }
}

//handle user Note
export const doInitNote = (Note:Object)=>{
    //初始筆記資料
    return{
        type:INIT_NOTE,
        Note
    }
}
export const doAddNote = (Note:Object,category:string)=>{
    //新增筆記
    return{
        type:ADD_NOTE,
        Note,category
    }
}
export const doDelNote = (Note:Object,category:string)=>{
    //刪除筆記
    return{
        type:DEL_NOTE,
        Note,category
    }
}



