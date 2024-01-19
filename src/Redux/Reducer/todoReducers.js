
const initialData = {
    todoList: JSON.parse(localStorage.getItem('todo'))|| []
}

const todoReducers = (state=initialData,action) =>{

    switch(action.type){
        case "ADD_TODO":
            const {id,data,complete} = action.payload;
            return{
                ...state,
                todoList:[
                    ...state.todoList,{
                        id:id,
                        data:data,
                        complete:complete,
                    }
                ]
            }
            case "DELETE_TODO":
               const newList =  state.todoList.filter((elem)=>elem.id!==action.id)
                return{
                    ...state,
                    todoList:newList
                }
            case "COMPLETE_TODO":
                const newCompleteStatusList  = state.todoList.map((elem)=>{
                    if(elem.id===action.id){
                        return {...elem,complete:true};
                    }
                    return elem
                });
                return{
                    ...state,todoList:newCompleteStatusList
                }
            case "UPDATE_TODO":
                const newEditList  = state.todoList.map((elem)=>{
                    if(elem.id===action.id){
                       const oldData = elem.data;
                       var newData = prompt();
                       if(newData==null){
                        newData =oldData;
                       }
                       return {...elem,data:newData}
                    }
                    return elem;
                });
                return{
                    ...state,todoList:newEditList
                }
            default : return state;
    }
}
export default todoReducers;