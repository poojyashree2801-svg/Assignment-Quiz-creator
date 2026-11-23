
import { database } from "../firebaseConfig";
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


