import React from "react";
import { Navbar } from "../../../components/Navbar";
import { Header } from "../../../components/Header";

function Dashboard() {
    return (
        <div className="overflow-hidden ml-20">
            <div className="tracking-wider">
                <Navbar />

                <div className="flex flex-col w-.95 h-screen">
                    <Header />
                    Dashboard Page
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
