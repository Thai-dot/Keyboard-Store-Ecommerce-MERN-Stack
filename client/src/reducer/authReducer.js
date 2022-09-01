
const auth_reducer = (state,action) => {
    if(action.type === "SET_USERNAME"){
        return {
            ...state,
            username:action.payload
        }
    }
    if(action.type === "SET_PASSWORD"){
        return {
            ...state,
            password:action.payload
        }
    }
    if(action.type === "SET_LOGIN"){
        const {isLogged,isAdmin} = action.payload;
        return {
            ...state,
            isLogged,
            isAdmin
        }
    }


     throw new Error(`No Matching "${action.type}" - action type`);
}




export default auth_reducer;