const operations =(state=[],action)=>{
    switch (action.type){
        case 'CREATE_CLINIC':
            return action.id;
        default:
            return state;
    }
};
export default operations;