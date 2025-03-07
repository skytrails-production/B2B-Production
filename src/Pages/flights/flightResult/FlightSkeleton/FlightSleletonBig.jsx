import React from 'react'
import "./holidayresultskeleton.scss";
const FlightSleletonBig = () => {
    const skItemLeftFilterBig = () => {
        return (
            <div className="skeletonItemResultFilter">
                <div className="posterBlock skeleton"></div>
                {/* <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div> */}
            </div>
        );
    };
    return (
        <div className="carouselResultFilter">
            <div className="loadingSkeletonResultFilter">
                {skItemLeftFilterBig()}
            </div>
        </div>
    )
}

export default FlightSleletonBig
