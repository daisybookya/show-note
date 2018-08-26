import {FETCH_LIST} from '../actions/ActionType'
import {filterList} from '../components/showList/CommonFun'
const fetchList = store => next => action =>{
    if(action.type !== FETCH_LIST) return next(action)

    //console.log(`middlewares-1/`,store,action);
    //本機為process.env.PUBLIC_URL+'/showlist.json'
    //'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5'
    fetch('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5',{
        method:'GET',
    })
    .then((resp)=>{
        if(!resp.ok) throw new Error(resp.statusText)
        return resp.json()
    })
    .then((list)=>{
        const initList = list.map((item)=>{
            return Object.assign({},item)
        });
        const itemList = filterList(initList,'near')

        return action.callback(itemList,store.dispatch);
    })
    .catch((error)=> {throw new Error(error.message)})
}

export default fetchList;