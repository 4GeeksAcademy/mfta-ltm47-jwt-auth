export const initialStore=()=>{
  return{
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "login":
      localStorage.setItem("token", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...store,
        user: action.payload.user,
        token: action.payload.token
      }
    case "logout":
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      return {
        ...store,
        user: null,
        token: null
      }
    default:
      throw Error('Unknown action.');
  }    
}
