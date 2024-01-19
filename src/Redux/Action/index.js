export const addTodo = (data) =>{
    return{
        type:'ADD_TODO',
        payload:{
            id: new Date().getTime().toString(),
            data:data,
            complete:false,
        }
    }
}

export const deleteTodo = (id) =>{
    return{
        type:'DELETE_TODO',
        id
    }
}

export const removeTodo = () =>{
    return{
        type:'REMOVE_TODO',
    }
}

export const completedTodo = (id) =>{
    return{
        type:'COMPLETE_TODO',
        id
    }
}
export const updateTodo = (id) =>{
    return{
        type:'UPDATE_TODO',
        id
    }
}