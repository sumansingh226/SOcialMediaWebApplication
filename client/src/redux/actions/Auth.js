import * as api from "../../api/index";
import { AUTH} from "../constants/actionsType";
// action creators

export const signin = (formData,navigate)=> async (dispatch)=>
{
    try {
        //sign in the user
        const { data } = await api.signIn(formData);
        dispatch({type : AUTH, data})
        navigate('/')
    } catch (error) {
        console.log(error); 
    }
}

export const signup =   (formData,navigate)=> async (dispatch)=>
{
     console.log("formData in signUp action creator" , formData);
   try {
    //    sign up the user 
    const { data } = await api.signUp(formData);
    dispatch({type : AUTH, data})
    navigate('/')   
   } catch (error) {
    console.log(error);   
   }
}