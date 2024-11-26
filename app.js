import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './App.css';

function App() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('./services.json')
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);

    useEffect(() => {
        $('.fade-in').hide().fadeIn(1000);
    }, []);

    return (
        <div className="font-sans text-dark bg-light">
            <header className="fixed top-0 w-full bg-white shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center px-6 py-4">
                    <a href="#hero" className="text-3xl font-bold text-gradient bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
                        Arise Scaling
                    </a>
                </div>
            </header>
            <section id="hero" className="relative bg-gradient-to-br from-blue-500 to-green-500 h-screen text-white flex flex-col justify-center items-center text-center fade-in">
                <h1 className="text-5xl font-bold">
                    Scale Your Business <br /> <span className="text-yellow-400">Unlock Your Potential</span>
                </h1>
                <p className="mt-6 text-lg">Innovative solutions for exponential growth.</p>
            </section>
            <section id="services" className="py-16 bg-light">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white p-6 shadow-lg rounded-lg hover:scale-105 transition">
                                <h3 className="text-xl font-semibold text-blue-500">{service.title}</h3>
                                <p className="text-gray-600 mt-2">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default App;
