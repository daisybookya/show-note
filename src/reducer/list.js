import {INIT_LIST,SORT_LIST,SORT_TYPE} from '../actions/ActionType'

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

