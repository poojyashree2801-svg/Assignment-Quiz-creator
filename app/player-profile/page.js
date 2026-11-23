
"use client";

import { useState } from "react";
import { createPlayerProfile } from "../dbManager";

export default function PlayerProfile() {

    const [playerName, setPlayerName] = useState("");
    const [age, setAge] = useState("");
    const [jerseyNumber, setJerseyNumber] = useState("");
    const [cityName, setCityName] = useState("");
    const [teamName, setTeamName] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await createPlayerProfile(
            playerName,
            Number(age),
            Number(jerseyNumber),
            cityName,
            teamName
        );
    }

    return (
        <div>
            <h1>Player Profile</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Player Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    placeholder="Jersey Number"
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="City Name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    required
                />

                <br /><br />

                <button onClick={handleSubmit} type="submit">Save Player</button>

            </form>
        </div>
    );
}
