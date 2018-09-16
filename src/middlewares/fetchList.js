import {FETCH_LIST} from '../actions/ActionType'
import {filterList} from '../components/showList/CommonFun'
const fetchList = store => next => action =>{
    //console.log(`fetchlist`,store.getState())
    if(action.type !== FETCH_LIST) return next(action)

    const _JSONUrl = {
        indie:'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5',
        classic:'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=1',
        dance:'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=3'
    }
    const fetchUrl = _JSONUrl[store.getState().category]
    const sortDateType = store.getState().sortByType
    //本機為process.env.PUBLIC_URL+'/showlist.json'
    //'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=5'
    fetch(fetchUrl,{
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
        const itemList = filterList(initList,sortDateType)
        return action.callback(itemList,store.dispatch);
    })
    .catch((error)=> {throw new Error(error.message)})
}

export default fetchList;