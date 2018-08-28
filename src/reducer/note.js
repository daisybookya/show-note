import {INIT_NOTE,ADD_NOTE,DEL_NOTE} from '../actions/ActionType'

let initState={
    'indie':[],
    'classic':[]
}
export default function Note(state:Object = initState,action:Object){
    switch (action.type){
        case INIT_NOTE:
            return {...action.Note}
        
        case ADD_NOTE:
            let newItem = [action.Note, ...state[action.category]];
            let totalItem = {...state}
            totalItem[action.category] = newItem
            localStorage.setItem('note',JSON.stringify(totalItem));
            return totalItem;

        case DEL_NOTE:
            let hadNote = state[action.category].findIndex((item)=>{
                return item.UID === action.Note[0].UID
            })
            if(hadNote > -1){
                let totalItem = {...state}
                totalItem[action.category].splice(hadNote,1)
                localStorage.setItem('note',JSON.stringify(totalItem));
                return totalItem
            }
            return {...state}

        default:
        return state;
    }
}