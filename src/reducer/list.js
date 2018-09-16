import {INIT_LIST,
    SORT_LIST,
    SORT_TYPE,
    FETCH_TYPE,
    LOADING_LIST,
    SORT_AREA,
    SORT_CITY,
    CITY_ARRAY
} from '../actions/ActionType'

export function List(state:Object = [],action:Object){
    switch (action.type){
        case INIT_LIST:
            return [...action.List]
        
        default:
        return state;
    }
}

export function sortList(state:Object = [],action:Object){
    switch (action.type){
        case SORT_LIST:
            return [...action.List]
        
        default:
        return state;
    }
}

export function sortByType(state='near',action:Object){
    switch (action.type){
        case SORT_TYPE:
            return action.keyWord
        
        default:
        return state;
    }
}

export function sortByArea(state='none',action:Object){
    switch (action.type){
        case SORT_AREA:
            return action.area
        
        default:
        return state;
    }
}
export function sortByCity(state='請選擇縣市',action:Object){
    switch (action.type){
        case SORT_CITY:
            return action.keyWord
        
        default:
        return state;
    }
}
export function cityArray(state=['請選擇縣市'],action:Object){
    switch (action.type){
        case CITY_ARRAY:
            return action.cityList
        
        default:
        return state;
    }
}
export function category(state='indie',action:Object){
    switch (action.type){
        case FETCH_TYPE:
            return action.category
        
        default:
        return state;
    }
}
export function isLoaded(state=true,action:Object){
    switch (action.type){
        case LOADING_LIST:
            return action.isLoaded
        
        default:
        return state;
    }
}

