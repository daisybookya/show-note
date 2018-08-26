import {INIT_NOTE,ADD_NOTE,DEL_NOTE} from '../actions/ActionType'

export default function Note(state:Object = [],action:Object){
    switch (action.type){
        case INIT_NOTE:
            return [...action.Note]
        
        case ADD_NOTE:
            let newItem = [action.Note, ...state];
            localStorage.setItem('note',JSON.stringify(newItem));
            return newItem;

        case DEL_NOTE:
            let hadNote = state.findIndex((item)=>{
                return item.UID === action.Note[0].UID
            })
            if(hadNote > -1){
                let newNote = [...state]
                newNote.splice(hadNote,1)
                localStorage.setItem('note',JSON.stringify(newNote));
                return [...newNote]
            }
            return [...state]

        default:
        return state;
    }
}