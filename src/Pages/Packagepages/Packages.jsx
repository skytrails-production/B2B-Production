import React, { useState, useEffect } from "react";
import banner from "../../../src/Images/package/img1.png";
import "./Packagepages.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import errorgif from "../../../src/Images/package/giphy.gif";
import loadingimg from "../../../src/Images/package/404-page-illustration.jpg";
import { apiURL } from "../../Constants/constant";
import axios from "axios";

const useStarGenerator = (numOfStars = 5) => {
  const [selected, setselected] = useState(Array(numOfStars).fill(false));

  return Array(numOfStars)
    .fill()
    .map((item, i) => (
      <Star
        selected={selected > i}
        onselected={() => setselected(i + 1)}
        key={i}
      />
    ));
};

const Star = ({ selected, onselected }) => {
  return <FaStar color={selected ? "#FAA300" : "gray"} onClick={onselected} />;
};

function Packagepage1() {
  const [packages, setPackages] = useState([]);
  const [countryname, setcountryname] = useState("");
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState(null);
  const [Error1, setError1] = useState(null);
  const [currencyname, setcurrencyname] = useState("");
  const [packageamount, setPackageamount] = useState("");
  const [Packagetitle, setPackagetitle] = useState("");
  const [agentname, setagentname] = useState("");
  const [packagelength, setPackagelength] = useState("");
  const[sky,setSky]=useState("");
  const { first_name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/agent/${first_name}`
        );
       
        // Check if the response status is 500
        if (response.status === 500) {
          setError1("Page Not Found");
        }
        const taxi=response.data.data.userProfile.agentCompanyLogo;
        const agentvalue = response.data.data.userProfile.personal_details.first_name;
        const countrynamedata = response.data.data.userProfile.personal_details.address_details.country;
        const packagelengthvalue = response.data.data.agentPackages.length;
        const agentPackages = response.data.data.agentPackages;
        const PackageValue = response.data.data.agentPackages[0].pakage_amount.amount;
        setcountryname(countrynamedata);
        setagentname(agentvalue);
        setPackages(agentPackages);
        setPackagelength(packagelengthvalue);
        setPackageamount(PackageValue);
        setLoading(false);
        setSky(taxi);
      }
       catch (error) {
        setError("Data Not Found");
        setError1("Page not found");
        setLoading(false);
       }
    };
    fetchData();
  }, [first_name]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (Error1) {
    return (
      <div
        style={{
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img
          src={errorgif}
          alt=""
          style={{ borderRadius: "5px", height: "300px" }}
        />
        <h2
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "12px",
          }}
        >
          {Error1}
        </h2>
      </div>
    );
  }

  return (
    <>
      <div className="pakagepage-container" style={{ marginTop: "-50px" ,backgroundColor:'white'}}>
        <div className="package-content">
          <div className="package-page-background ">
            <img src={banner} alt="" />
          </div>
         
          <div className="package-content-no">
            <div className="Packages-name-content">
              Packages <span> {packagelength ? packagelength : 0}</span>
            </div>
          </div>
        </div>

        <div className="container">
          
        <div className="skylogo">
          <img src={sky} alt="THE SKYTRAILS"/>
          </div>
          <div className="row">
            <div className="col-md-3">
              {/* <div className="logo-content-circle">
          <img src={logoimg} alt="" />
        </div> */}
              <div className="deta" style={{marginTop:'50px'}}>
                <h2>{agentname}</h2>
                <h5 style={{ color: "blue" ,fontWeight:'700'}}>
                  <LocationOnIcon style={{ color: "lightblue" }} />
                  {countryname}
                </h5>
                <h5
                  style={{
                    fontSize: "18px",
                    line_height: "22px",
                    color: "blue",
                    display:'flex',
                    flexWrap:'wrap',   
                  }}
                >
                  <EditIcon style={{ color: "lightblue" }} /> The HawaiYatra is one
                  of India’s fastest growing travel websites. The team thrives
                  towards providing an inspiring and premium travel experience
                  for their clients with services driven by the vision of
                  uniting smart technology with customer satisfaction. For more
                  details call us at: 022 4164 2214
                </h5>
                {/* <div className="other-account">
                <span className='other-accunt-name'>My Other Accounts</span>
                <div>
                    <span><FaFacebookF /> </span>
                </div>
            </div> */}

                {/* <div className="followbutton-pakage">
            <button  className="follow-button-pakage-button">Follow</button>

            </div> */}

                {/* <div className="followers-package-following">
             <div className="followers-package-following-1">
                <span className='followers-package-following-value' style={{textAlign:"center"}}>3</span>
                <span className='followers-package-following-value'>Followers</span>
             </div>
             <div className="followers-package-following-1" style={{marginTop:"12px"}}>
                <span className='followers-package-following-value' style={{textAlign:"center"}}>3</span>
                <span className='followers-package-following-value'>Following</span>
             </div>

             </div> */}

                {/* <div className="rating-container-package">
               <div className="col-lg-5 rating-container-package1">
               <div className="border-right">
                <div className="border-right-content">0</div>
                <div className="review-star">
            {useStarGenerator(5)}
            </div>
               </div>

              

               </div>

                <div className="col-lg-7 col-md-7 col-sm-7 col-xs-7" style={{textAlign:"center"}}>
                  <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{textAlign:"center"}}>
                    <div className="rating-value-number">
                      0
                    </div>
                    <div className="rating-value-number-content">Reviews</div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6" style={{textAlign:"center"}}>
                    <div className="rating-value-number">
                      0
                    </div>
                    <div className="rating-value-number-content">Ratings</div>
                  </div>
       
                  </div>
                </div>
             </div> */}
              </div>
            </div>

            {/* ///////////////////////////second div//////////////////////////// */}
            <div className="col-md-9">
              {packages.length > 0 ? (
                packages.map((packageData, index) => (
                  <div key={index} className="col-md-9">
                    <div className="card mb-3"
                    style={{
                      maxWidth:'600px',
                      width:'90%',
                      margin:'0px auto',
                      padding:'5px',
                    }}
                    >
                        {packageData.package_img && packageData.package_img.length > 0 ? (
                          <img
                              style={{ height: '300px', width: '100%', objectFit:'cover',objectPosition:'center'}}
                              src={packageData.package_img[0]}
                              className="card-img-top"
                              alt="..."
                          />
                      ) : (
                          <img
                              style={{  height: '300px', width: '100%', objectFit:'cover',objectPosition:'center' }}
                              src={packageData.pakage_img}
                              className="card-img-top"
                              alt="..."
                          />
                      )}
                      
                  
                      <div className="card-body">
                        <p className="card-package-content">
                          {" "}
                          Days : {packageData.days}
                        </p>
                        <p className="card-package-content1">
                          {packageData.pakage_title}
                        </p>
                        <div className="package-location-price">
                          <div className="package-location-pricelocation col-xs-7">
                            <div className="package-price-location">
                              <LocationOnIcon
                                style={{
                                  color: "rgb(27, 82, 27)",
                                  display: "flex",
                                  gap: "4px",
                                }}
                              />{" "}
                              <span className="card-package-content">
                                {packageData.country}
                              </span>
                            </div>
                            <div className="package-left">
                              <div className="card-package-content1">
                                {packageData.pakage_amount.currency}{" "}
                                {packageData.pakage_amount.amount}{" "}
                                <p
                                  style={{ lineHeight: "22px", color: "grey" }}
                                >
                                  {" "}
                                  / Person
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="package-location-button col-xs-3">
                            <Link
                              className="package-get-button"
                              to={`https://theskytrails.com/holidayInfo/${packageData._id}`}
                            >
                              Get Quotes
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={loadingimg}
                    alt=""
                    style={{ borderRadius: "5px", height: "300px" }}
                  />
                  <h2
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "20px",
                      marginTop: "12px",
                    }}
                  >
                    Data not found
                  </h2>
                </div>
              )}
            </div>

            {/* //////////////////////////////third div//////////////////// */}
            {/* <div className="col-md-3">
          <div className="package-review">
          <div className="package-review-div2">
          <div className="package-review-box">
            <span style={{fontWeight:"bold"}}>Your Review</span>
            <div className="review-star">
            {useStarGenerator(5)}
            </div>


          </div>

          <textarea style={{ width: "100%", padding: "10px" }} type="text" id="" cols="30" rows="4" placeholder='Let the community know what you think about Musafir.com'></textarea>


          </div>

         
          <div className="followbutton-pakage">
            <button  className="follow-button-pakage-follow">Post</button>

            </div>
          </div>
        </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Packagepage1;
