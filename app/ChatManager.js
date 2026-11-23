import {ref,set,push} from 'firebase/database'
import { database } from "./firebaseConfig";
 //Create Profile Screen -> Chat Screen -> Message
//Create a User Profile
export async function createUserProfile(username,email){
    const userData = {
        "username":username,
        "email": email
    }
    //1. define the reference for the Database
    const profileRef = push(ref(database,"chat-profiles"))
    try{
        const profile = await set(profileRef,userData)
        localStorage.setItem("username", userData.username);
        return true
    }catch(e){ 
        console.error("Error creating user profile:", e);
        return false
    }
}
// Add a message

export async function chatMessage(message){
    const chatRef = push(ref(database,"chat-messages"));
    try{
        const username = localStorage.getItem("username");
        const result = await set(chatRef,{
            message:message,
            user:username
        });
        return true;
    }catch(e){
        return false;
    }
}

// Load messages