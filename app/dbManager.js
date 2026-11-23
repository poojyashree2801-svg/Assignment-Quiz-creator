// 

import { database } from "./firebaseConfig";
import { ref, set } from "firebase/database";

export async function createPlayerProfile(playerName, age, jerseyNumber, cityName, teamName) {

    const profile = {
        "playerName": playerName,
        "age": age,
        "jerseyNumber": jerseyNumber,
        "cityName": cityName,
        "teamName": teamName
    };

    try {
        const profileRef = ref(database, "players");
        const result = await set(profileRef, profile);
        alert("Player saved successfully!");

    } catch (error) {
        alert(JSON.stringify(error));
    }
}
export async function getProfiles() {
    try{
        const profilesRef = ref(database, "players",limitToLast(2));
        const allProfileQuery = query(profilesRef);
        const userSnapshot = await get(allProfileQuery);

        alert(JSON.stringify(userSnapshot.toJSON()))
    }catch(error){}
}    
