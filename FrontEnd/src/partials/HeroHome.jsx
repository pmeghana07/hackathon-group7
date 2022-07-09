import React, { useState } from "react";
import { Link } from "react-router-dom";

function HeroHome() {
    const [value, setValue] = useState("");

    const allOptions = ["Badminton", "Board games", "Indoors", "Happy Hour", "Movies","Sports", "Outdoors","Coffee","Gaming","Backyard"];
    const [options, setOptions] = useState(allOptions.slice(0, 10));

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
            {/* Illustration behind hero content */}
            <div
                className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
                aria-hidden="true"
            >
                <svg
                    width="1360"
                    height="578"
                    viewBox="0 0 1360 578"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient
                            x1="50%"
                            y1="0%"
                            x2="50%"
                            y2="100%"
                            id="illustration-01"
                        >
                            <stop stopColor="#FFF" offset="0%" />
                            <stop stopColor="#EAEAEA" offset="77.402%" />
                            <stop stopColor="#DFDFDF" offset="100%" />
                        </linearGradient>
                    </defs>
                    <g fill="url(#illustration-01)" fillRule="evenodd">
                        <circle cx="1232" cy="128" r="128" />
                        <circle cx="155" cy="443" r="64" />
                    </g>
                </svg>
            </div>

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
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
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
                                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-12 mb-2 sm:w-3 sm:mb-4"
                                        onClick={() => onSearch(value)}
                                    >
                                        Search
                                    </button>
                                    <br></br>
                                    <br></br>
                                    <div>
                                        <Link
                                            to="calendar"
                                            className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
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
