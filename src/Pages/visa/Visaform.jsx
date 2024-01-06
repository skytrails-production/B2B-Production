import React, { useState, useEffect, useRef } from "react";
import { Typography, Button, Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { createVisaAction } from "../../Redux/visaRequest/actionVisaRequest";
import "./visaform.css";
import color from "../../color/color.js"
import axios from "axios";
import { motion } from "framer-motion";
import { apiURL } from "../../Constants/constant.js";


const variants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};


const Visaform = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: null,
    query: "",
    destination: "",
    visaType: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); 
  const [countries, setCountries] = useState([]);
  const [whichVisaType, setWhichVisaType] = useState([]);
  
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const queryRef = useRef(null);
  const destinationInputRef = useRef(null);
  const visaTypeInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
      [e.target.email]: "",
      [e.target.mobile]: "",
      [e.target.destination]: "",
      [e.target.query]: "",
      [e.target.visaType]: "",
    });
  };


 


  useEffect(() => {
    fetch(`${apiURL.baseURL}/skyTrails/visa/VisaCountry`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then((data) => {
        if (data && data.countries) {
          setCountries(data.countries); // Assuming data is an object with a 'countries' key
        } else {
          throw new Error('Invalid data format received');
        }
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }, []);


  // useEffect(() => {
  //   fetch('https://dev.theskytrails.com/Api/VisaCategory/?format=json', { mode: 'cors' })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setWhichVisaType(data);
  //     })
  //     .catch((error) => console.error('Error fetching country data:', error));
  // }, []);


  useEffect(() => {
    fetch(`${apiURL.baseURL}/skyTrails/visa/VisaCategory`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        if (data && data.categories) {
          setWhichVisaType(data.categories); // Assuming data is an object with a 'countries' key
        } else {
          throw new Error('Invalid data format received');
        }
      })
      .catch((error) => console.error('Error fetching country data:', error));
  }, []);


  // console.log(countries, "country data")

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.query) {
      newErrors.query = "Query is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (
      !formData.destination ||
      formData.destination === "Select Destination"
    ) {
      newErrors.destination = "Destination is required";
    }

    if (!formData.visaType || formData.visaType === "Select Visa Type") {
      newErrors.visaType = "Visa Type is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // const handleVisaRequest = (event) => {
  //   event.preventDefault();

  //   if (validateForm()) {
  //     const payload = {
  //       name: formData.name,
  //       email: formData.email,
  //       mobile: formData.mobile,
  //       query: formData.query,
  //       country_name: formData.destination,
  //       category_name: formData.visaType,
  //     };

  //     dispatch(createVisaAction(payload));


  //     setSuccessMessage("Your query was submitted successfully. We will call you shortly.");
  //     event.target.reset();
  //   } else {
  //     // Focus on the first empty field
  //     if (!formData.name.trim()) {
  //       nameInputRef.current.focus();
  //     } else if (!formData.email) {
  //       emailInputRef.current.focus();
  //     } else if (!formData.mobile) {
  //       mobileInputRef.current.focus();
  //     } else if (!formData.query) {
  //       queryRef.current.focus();
  //     } else if (!formData.destination) {
  //       destinationInputRef.current.focus();
  //     } else {
  //       visaTypeInputRef.current.focus();
  //     }
  //   }
  // };

  const handleVisaRequest = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        query: formData.query,
        country_name: formData.destination,
        category_name: formData.visaType,
      };


      const headers = {
        'Content-Type': 'application/json', // Adjust content type as needed
        // Add any other headers you may need
      };

      try {
        const response = await axios.post('https://dev.theskytrails.com/FrontWebsite/', payload, { headers });
        // dispatch(createVisaAction(payload));

        setSuccessMessage("Your query was submitted successfully. We will call you shortly.");
        event.target.reset(); // Reset the form
      } catch (error) {
        console.error('Error submitting visa request:', error);
        // Handle error, show error message, etc.
      }
    } else {
      // Focus on the first empty field
      if (!formData.name.trim()) {
        nameInputRef.current.focus();
      } else if (!formData.email) {
        emailInputRef.current.focus();
      } else if (!formData.mobile) {
        mobileInputRef.current.focus();
      } else if (!formData.query) {
        queryRef.current.focus();
      } else if (!formData.destination) {
        destinationInputRef.current.focus();
      } else {
        visaTypeInputRef.current.focus();
      }
    }
  };
  return (
    <div className="container-fluid  margin-pecentage">
      <Typography
        sx={{ fontSize: "20px", fontWeight: "bold", color: "#252525" }}
        textAlign="center"
      >
        Apply for Visa Online
      </Typography>
      <form onSubmit={handleVisaRequest}>
        <div className="container" style={{ width: "90%", margin: "auto" }}>
          <motion.div
            className="row"
            variants={variants} initial="initial"
            whileInView="animate"
            style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
          >
            {/* For all screen sizes, display one column */}
            <motion.div variants={variants} className="col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  onChange={handleChange}
                  ref={nameInputRef}
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  ref={emailInputRef}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Mobile Number</label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Enter Mobile Number"
                  onChange={handleChange}
                  ref={mobileInputRef}
                />
                {errors.mobile && <p className="error">{errors.mobile}</p>}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Select Country</label>
                <select
                  name="destination"
                  className="form_input_select"
                  value={formData.destination}
                  onChange={handleChange}
                  ref={destinationInputRef}
                >
                  <option disabled>Select Destination</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.country}>
                      {country.country}
                    </option>
                  ))}
                </select>
                {errors.destination && (
                  <p className="error">{errors.destination}</p>
                )}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-6 col-md-6 col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Your Query</label>
                <input
                  type="text"
                  name="query"
                  placeholder="Enter Your Query"
                  onChange={handleChange}
                  ref={queryRef}
                />
                {errors.query && <p className="error">{errors.query}</p>}
              </div>
            </motion.div>
            <motion.div variants={variants} className="col-lg-6 col-md-6 col-xs-12" style={{ flex: "1", minWidth: "200px" }}>
              <div className="form_input">
                <label className="form_lable">Select Visa Category</label>

                <select
                  name="visaType"
                  className="form_input_select"
                  value={formData.visaType}
                  onChange={handleChange}
                  ref={visaTypeInputRef}
                >
                  <option disabled>Select Visa Type</option>
                  {whichVisaType.map((visaType) => (
                    <option key={visaType.id} value={visaType.category}>
                      {visaType.category}
                    </option>
                  ))}
                </select>
                {errors.visaType && <p className="error">{errors.visaType}</p>}
              </div>
            </motion.div>
          </motion.div>
          {successMessage && (
            <div style={{ color: "green" }}>
              {successMessage}
            </div>
          )}
          <motion.div variants={variants} initial="initial"
            whileInView="animate" className="row">
            <motion.div variants={variants} className="col-xs-12">
              <Typography
                sx={{ fontSize: "13px", fontWeight: "bold", color: color.red1 }}
                textAlign="left"
              >
                Note : All Document Required
              </Typography>
              <div className="visaButton">
                <button>Apply Now →</button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </form>


      <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-6">
            <div className="headingVisa">
              <h2>Popular Visa destination</h2>
            </div>
            <div className="headingVisaItems">
              <ul>
                <li>Dubai Visa</li>
                <li>UK Visa</li>
                <li>USA Visa</li>
                <li>Singapore Visa</li>
                <li>Qatar Visa</li>
                <li>Thailand Visa</li>
                <li>Sri Lanka Visa</li>
                <li>Turkey Visa</li>
                <li>Malaysia Visa</li>
                <li>Hong Kong Visa</li>
                <li>Vietnam Visa</li>
                <li>Denmark Visa</li>
                <li>New Zealand Visa</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="headingVisa">
              <h2>Popular Visa Types</h2>
            </div>
            <div className="headingVisaItems">
              <ul>
                <li>96 Hours Dubai Visa </li>
                <li>14 Days Dubai Visa</li>
                <li>30 Days Dubai Visa</li>
                <li>Thailand Business Visa</li>
                <li>Thailand Tourist Visa</li>
                <li>Sri Lanka Business Visa</li>
                <li>Sri Lanka Tourist Visa</li>
                <li>Turkey Business Visa</li>
                <li>Turkey Tourist Visa</li>
                <li>Visa At Your Doorstep</li>
                <li>Uk Visa At Your Doorstep</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div className="col-lg-12">
        <div className="bottomVisaHeading">
          <p>Types of Visa</p>
          <span>Here's defining the various categories of visa depending on your purpose of visit.</span>
        </div>
        <div className="visaTexts">
          <h3>Single Entry Visa</h3>
          <h4>A single entry visa is valid for only one visit to the destination country. Whatever the purpose of your visit, you shall be eligible for just one entry through the validity of your visa. For instance your visa validity date has not expired but you have already visited the country once, you shall still not qualify for another trip to the said country.</h4>
          <h3>Multiple Entry Visa:</h3>
          <h4>This entitles you to multiple visits to the country through your visa's validity tenure. This means you can re-enter the country several times without applying for a fresh visa as long as your within the validity tenure of your visa. Multiple entry visas are largely preferred by businessmen for they can never be certain of the number of visits it might take to close a business deal.</h4>
          <h3>Tourist Visa :</h3>
          <h4>This kind of visa is allocated to tourists alone when the purpose of your visit is travelling only and not engaging in any form of commerce. When you plan on a holiday to a foreign location solo or with your family, you will be applying for a tourist visa. It is still easier to get such visas. Other than the requisite documents, you need to provide a proof of your hotel stays and return flight tickets aside from showing a certain specified amount in your bank account to ensure to the local authorities that you will be in charge of yourself during your visit to their country.</h4>
          <h3>Residence Visa :</h3>
          <h4>While a residence visa doesn't give you the permit to take up employment in a given country, it entitles you to stay for an extended period of time in a particular country. A residence permit or a residence visa is given to a foreign national to stay for an extended though definite period of time. In many cases, a person may have family residing in a foreign country and by applying for a residence visa you can stay with them for a prolonged duration, several months on end. Of course, it does not entitle you to seek any sort of employment in the foreign country in the interim.</h4>
          <h3>Work Visa :</h3>
          <h4>A work permit visa entitles you to take up residence as well as employment for a definite period in a given foreign country. You could either be hired for a specific period of time from 6 months to 1 year, depending on your contract, to perform a job in a foreign country offering you the subsequent right to take up residence in the interim. But in case your stay is prolonged, you need to apply for renewal of your work permit visa. Several Indian companies have tie-ups abroad with their counterparts, and you could be send to accomplish a task to the said foreign country for a specific period of time under a work permit visa.</h4>
          <h3>Student Visa :</h3>
          <h4>A student visa is issued to students enrolled at qualified educational institutes world wide. These are non-immigrant visa that does not require its holder to acquire citizenship. Any student with the prospect of attaining higher education in a foreign country needs to get a student visa from that country. Though most countries issue student visa to foreign students to let them attend school within their territory, students still need to primarily enroll at a post-secondary institute for higher learning. So, for instance, you need to go to the United States to study, you would require a student visa as well as a non-immigrant visa for temporary stay or an immigrant visa for permanent residence</h4>
          <h3>Transit Visa :</h3>
          <h4>For those people who wish to transit through Australia shall not qualify for a transit without a transit visa. You need a transit visa even if you fly out of the same airport in which you arrived and on the same aircraft. You need a transit visa even if you remain in the transit lounge and do not leave the airport. A transit visa in case of Australia allows you a maximum stay of 72 hours. A transit visa is very different from a 3-day visitor visa. A transit visa establishes the principal purpose of visit of the applicant before transiting to another country through theirs. The support documents needed to get a transit visa comprise an income proof, employment proof, evidence of travel outside the said country, among other related documents.</h4>

        </div>

      </div>
      <div className="col-lg-12">
        <div className="bottomVisaHeading">
          <p>FAQs on Visa Online</p>

        </div>
        <div className="visaTexts">
          <h3>Q. What is a visa and why is it important?</h3>
          <h4>A Visa is an official certificate of endorsement on your passport giving you the permission to enter, stay and leave a particular country, whether permanently or for a specific period of time. A visa is issued to you by the immigration authorities of the country you intend to travel to after verifying your credentials, the accuracy of your submitted visa form and other necessary documents. Many countries such as UK and USA among others grant you visa only after an in-person interview with the immigration officers. Of all kinds of visas, tourist visas are less hassle and always easy to gain. Where no physical interview is required a visa is even sent to you electronically. Although, the visa is a grant to entry, your actual entry into a foreign country is only subject to approval from the immigration officer at the point of entry.</h4>
          <h3>Q. Do I need a visa for travel?</h3>
          <h4>Yes, you do by all means for every international trip you make. Even if you are a passport holder, the absence of a visa to your destination country may not even qualify you to board a flight, far less get to your destination. You need to have a valid visa to travel to any foreign destination. Though some countries like Thailand, Cambodia, Indonesia among others offer visa-on-arrival. In such a case you will have to carry all the essential documents including proofs of your hotel stay, your return flight tickets and presence of a pre-stated amount in your bank account, only then will you be granted a visa-on-arrival. So, for any international travel, you cannot bypass the visa process.</h4>
          <h3>Q. Does it cost to have a visa processed?</h3>
          <h4>Yes, there is a visa processing fee charged by the government of the country you are planning to travel to. The sum varies from one country to the next. This processing fee applies to both regular and e-visas. Now, if you plan to get your visa done through an agent, the agent will charge his commission over and above the pre-fixed processing fee that applies in addition to taxes among others.</h4>
          <h3>Q. How long does it take to process a visa?</h3>
          <h4>Typically an e-visa takes 72 hours for processing, and in case more documents are required on your visa you will be intimated of the same within 48 hours and you need to comply in the next 72 hours. In case you take any longer than that, your visa application will be deemed cancelled. For a visa within Asia, you can expect it processed in 5 working days, but for a US visa you will have to wait for 3 to 5 weeks for your visa application to be processed. After processing, you can expect a positive response to your application and the consulate will deliver the document in two working days. Generally, it takes about 5 working days for you to receive your passport once your visa interview is a success. But for a US visa this could be about 10 days. A UK visa, on the other hand, is normally processed within 15 days. Though you are advised to apply about a month prior to your date of travel. You can always track your e-visa application status online.</h4>
          <h3>Q. What is a visa on arrival?</h3>
          <h4>Visa on Arrival is an authorisation document provided by the consulate or immigration department of the country you are travelling to only after you have arrived at the destination. This saves you the hassle of going through a lengthy visa application form submission process. In a visa-on-arrival too you need to keep all necessary identification documents handy along with photographs so that the immigration desk can quickly put it together and hand you over your visa-on-arrival. Without the necessary id proofs you shall not be entitled to a visa-on-arrival. Countries that offer the facility of visa-on-arrival to Indian citizens include Thailand, Cambodia, Maldives, Bhutan, Sri Lanka, Indonesia, Myanmar, Laos, Macau in Asia. Serbia in Europe, Bolivia and El Salvador in America, Jordan and Armenia in the Middle East and Kenya, Mauritius, Seychelles and Tanzania in Africa among others.</h4>
          <h3>Q. How do I get a travel visa?</h3>
          <h4>When filling up your visa application form you need to establish your purpose of visit, whether it is casually for travel or for business or studies. All travel-related visas qualify as tourist visas which is granted to an individual visiting the country with the sole intention of travelling. To enter the United States, you need to first get a visa which could either be a non-immigrant visa for temporary stay or an immigrant one for permanent residence. The tourist visas are always of the former category for those wishing to enter the United States for purposes of tourism alone, the visa category being B-2. An e-tourist visa could have a one-month validity, a one-year validity, five-year validity or for a continuous stay that does not exceed more than 90 days. For USA, UK, Canada and Japan you can stay continuously provided your stay does'nt exceed beyond 180 days.</h4>


        </div>

      </div>


    </div>
  );
};

export default Visaform;
