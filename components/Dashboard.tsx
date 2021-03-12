import React, { useState, FormEvent } from "react";


const Dashboard: React.FC = () => {
    const [input, setInput] = useState("");

    const handleSubmit = (e: FormEvent) => {

    };

    /**
     * Function: handleChange
     * Goal:    set Input state to user input
     */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <div className="displays">
            <div className="displaySpacer">
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        className="inputBox"
                        name="robotCommands"
                        type="text"
                        value={input}
                        placeholder="Input robot commands!"
                    />
                    <button className="goButton">Go</button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;