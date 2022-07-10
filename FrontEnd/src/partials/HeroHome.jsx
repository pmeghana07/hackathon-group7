import React, { useState } from "react";
import { Link } from "react-router-dom";

function HeroHome() {
    const [value, setValue] = useState("");

    const allOptions = ["Badminton", "Board games", "Indoors", "Happy Hour", "Movies","Sports", "Outdoors","Coffee","Gaming","Backyard"];
    const [options, setOptions] = useState([]);
    
    const onChange = (event) => {
        setValue(event.target.value);
        filterOptions();
    };
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        console.log("search ", searchTerm);
    };

    // call this function whenever a new
    const filterOptions = () => {
        let filteredOptions = allOptions
            .filter((item) => {
                const searchTerm = value.toLowerCase();
                const fullName = item.toLowerCase();

                return (
                    searchTerm &&
                    fullName.startsWith(searchTerm) &&
                    fullName !== searchTerm
                );
            })
            .slice(0, 10);
        setOptions(filteredOptions);
    };

    return (
        <section className="relative">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                {/* Hero content */}
                <div className="pt-32 pb-12 md:pt-40 md:pb-20">
                    {/* Section header */}
                    <div className="text-center pb-12 md:pb-16">
                        <h1
                            className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
                            data-aos="zoom-y-out"
                        >
                            Let's{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
                                Meet
                            </span>
                        </h1>
                        <div className="max-w-3xl mx-auto">
                            <p
                                className="text-xl text-gray-600 mb-8"
                                data-aos="zoom-y-out"
                                data-aos-delay="150"
                            >
                                Let's Meet is a platform for you to meet new
                                people and do activities together! Simply create
                                a new event or join events organised by your
                                fellow colleagues!
                            </p>
                            <div
                                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                                data-aos="zoom-y-out"
                                data-aos-delay="300"
                            >
                                <div className="search-inner">
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={onChange}
                                    />
                                    <button
                                        className="btn text-white hover:bg-blue-700 w-12 h-11 mb-2 sm:w-3 sm:mb-4 ml-3 register-button"
                                        onClick={() => onSearch(value)}
                                    >
                                        Search
                                    </button>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <Link
                                            to="calendar"
                                            className="btn text-white hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 register-button"
                                        >
                                            Explore events
                                        </Link>
                                    </div>
                                    <div className="dropdown">
                                        {options.map((item) => (
                                            <div
                                                onClick={() => onSearch(item)}
                                                className="dropdown-row"
                                                key={item}
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroHome;
