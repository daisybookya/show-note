import {ADD_NOTE,
        DEL_NOTE,
        INIT_NOTE,
        FETCH_LIST,
        INIT_LIST,
        SORT_LIST,
        SORT_TYPE,
    } from './ActionType'
//handle show list
export const doFetchList = ()=>{
    //middlewares執行fetch data
    return{
        type:FETCH_LIST,
        callback:(data:Object,dispatch:Function)=> {
            dispatch(doInitList(data));
            dispatch(doSortList(data));
        }

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

//handle user Note
export const doInitNote = (Note:Object)=>{
    //初始筆記資料
    return{
        type:INIT_NOTE,
        Note
    }
}
export const doAddNote = (Note:Object)=>{
    //新增筆記
    return{
        type:ADD_NOTE,
        Note
    }
}
export const doDelNote = (Note:Object)=>{
    //刪除筆記
    return{
        type:DEL_NOTE,
        Note
    }
}



