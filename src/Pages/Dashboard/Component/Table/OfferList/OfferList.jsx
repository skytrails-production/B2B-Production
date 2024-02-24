
import { useState, useEffect } from 'react'; // Importing necessary modules from React
import axios from 'axios'; // Importing Axios for making HTTP requests
import { TextField, InputAdornment } from '@mui/material'; // Importing TextField and InputAdornment components from MUI
import SearchIcon from '@mui/icons-material/Search'; // Importing SearchIcon from MUI
import './OfferList.css'; // Importing CSS file
import { apiURL } from '../../../../../Constants/constant'; // Importing API URL from constants
import { Alert } from "@mui/material";
const AllOfferList = () => { // Functional component definition
    const [offerList, setOfferList] = useState([]); // State for storing offer list data
    const [loading, setLoading] = useState(true); // State for loading indicator
    const pageSize = 5; // Number of items per page
    const [currentPage, setCurrentPage] = useState(1); // State for current page
    const [totalPages, setTotalPages] = useState(0); // State for total pages
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const [dataAvailable, setDataAvailable] = useState(true); // State for tracking data availability

    useEffect(() => { // Effect hook for fetching data
        async function fetchAgentRequestData() { // Async function for fetching data
            setLoading(true); // Set loading state to true
            try {
                const response = await axios.get(`${apiURL.baseURL}/skyTrails/offers/getAllOffer`, { // Fetching data from API
                    params: {
                        page: currentPage, // Current page number
                        size: pageSize, // Number of items per page
                        search: searchTerm, // Search term
                    }
                });
                setTotalPages(response.data.result.totalPages); // Set total pages from response
                setOfferList(response.data.result.offerList); // Set offer list from response
                setDataAvailable(true); // Set data availability to true
            } catch (error) { // Catch any errors
                console.error('Error fetching Agent request List:', error); // Log error to console
                setDataAvailable(false); // Set data availability to false
            }
            setLoading(false); // Set loading state to false after fetching data
        }
        fetchAgentRequestData(); // Invoke function to fetch data
    }, [currentPage, searchTerm]); // Dependencies for effect hook

    const handlePageChange = (page) => { // Function to handle page change
        setCurrentPage(page); // Set current page to selected page
    };

    const handleSearch = (event) => { // Function to handle search input change
        setSearchTerm(event.target.value); // Update search term state
        setCurrentPage(1); // Reset current page to 1 when search term changes
    };

    return ( // JSX to render component
        <div className="agent-container"> {/* Container div */}
            <TextField // Search input field
                type="text"
                value={searchTerm} // Controlled component with search term state
                onChange={handleSearch} // onChange event handler
                placeholder="Search by name, ID, etc." // Placeholder text
                InputProps={{ // Input properties
                    startAdornment: ( // Start adornment for search icon
                        <InputAdornment position="start"> {/* Adornment component */}
                            <SearchIcon /> {/* Search icon */}
                        </InputAdornment>
                    ),
                }}
            />
            {loading ? ( // Conditional rendering based on loading state
                <p>Loading...</p> // Render loading indicator if loading is true
            ) : dataAvailable ? ( // Conditional rendering based on data availability
                <> {/* Fragment for multiple elements */}
                    {/* Offer list rendering */}
                    <div className="paginate"> {/* Pagination div */}
                        {Array.from({ length: totalPages }, (_, i) => ( // Array mapping for pagination buttons
                            <button className="agentButton" key={i + 1} onClick={() => handlePageChange(i + 1)}> {/* Pagination button */}
                                <h5>{i + 1}</h5> {/* Button label */}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
               // <p>Data is not available</p>
               <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
               <Alert severity="info" variant="outlined">
                 Data is not available
               </Alert>
             </div>
            )}
        </div>
    );
};

export default AllOfferList; // Exporting component
