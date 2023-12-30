import React from "react";
import { NavLink } from "react-router-dom";

const PackageDropdown = ({ closeDropdown }) => {
    return (
        <div className="dropdown">
            <NavLink to="/search" onClick={closeDropdown}>
                Search
            </NavLink>
            <NavLink to="/CreateHolidayPackage" onClick={closeDropdown}>
                Create Package
            </NavLink>
        </div>
    );
};

export default PackageDropdown;
