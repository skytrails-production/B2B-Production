import React from "react";
//import BusTicket from "./BusTicket";
import FlightTicket from "./FlightTicket";
import "./Queue.css";

// import MovieCard from "./MovieCard";
import SearchIcon from "../../Images/search.svg";

// const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";
const Queue = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   searchMovies("Batman");
  // }, []);

  // const searchMovies = async (title) => {
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();

  //   setMovies(data.Search);
  // };
  return (
    <>
      <div className="container-fluid margin-pecentage">
        {/* <div className="header_queue">
          <h5>Administration / Queues / Your Bookings</h5>
        </div > */}
        <div className="main-search">
          <div className="heading-new">
            <h3>Your Bookings</h3>
          </div>
          <div className="searchbar-new">
            <input
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
            />
            <img
              src={SearchIcon}
              alt="search"
            // onClick={() => searchMovies(searchTerm)}
            />
          </div>
        </div>
        <FlightTicket />
      </div>
    </>
  );
};

export default Queue;
