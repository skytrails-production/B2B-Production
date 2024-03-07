import Divider from "@mui/material/Divider";
import { Typography, Box, Grid, Button } from "@mui/material";
import React, { useEffect } from "react";
import Link from "@mui/material/Link";
import Flightaccordian from "./Flightaccordian";
import { useDispatch, useSelector, useReducer } from "react-redux";
import flightdir from "../../../Images/flgihtdir.png"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




const Flightbookingdetail = (props) => {

  const reducerState = useSelector((state) => state);
  const navigator=useNavigate()

  const adults = sessionStorage.getItem("adults");
  const childs = sessionStorage.getItem("childs");
  const infants = sessionStorage.getItem("infants");
  const { ticket } = props;


  Swal.fire({
    title: "Filght Booking Sucessfull",
    text: `PNR: ${ticket.PNR}`,
    icon: 'success',
    timer: 5000,
    showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
})
// }
useEffect(() => {
    // setLoader(true);
    

    setTimeout(() => {
        // setLoader(false)
        navigator("/")
    }, 5000);




}, [])

  // console.log(ticket, "ticket data")
  const ticket1 = {
    PNR: "JWSFIB",
    BookingId: 1839811,
    SSRDenied: false,
    SSRMessage: null,
    Status: 1,
    IsPriceChanged: false,
    IsTimeChanged: false,
    FlightItinerary: {
      CommentDetails: null,
      JourneyType: 1,
      TripIndicator: 1,
      BookingAllowedForRoamer: true,
      BookingId: 1839811,
      IsCouponAppilcable: true,
      IsManual: false,
      PNR: "JWSFIB",
      IsDomestic: true,
      ResultFareType: "RegularFare",
      Source: 4,
      Origin: "DEL",
      Destination: "AMD",
      AirlineCode: "UK",
      LastTicketDate: "2023-09-07T00:00:00",
      ValidatingAirlineCode: "UK",
      AirlineRemark: "test uk remarks",
      IsLCC: false,
      NonRefundable: true,
      FareType: "RP",
      CreditNoteNo: null,
      Fare: {
        Currency: "INR",
        BaseFare: 2377,
        Tax: 687,
        TaxBreakup: [
          {
            key: "K3",
            value: 128,
          },
          {
            key: "YR",
            value: 170,
          },
          {
            key: "INTax",
            value: 62,
          },
          {
            key: "OtherTaxes",
            value: 327,
          },
          {
            key: "TotalTax",
            value: 687,
          },
        ],
        YQTax: 0,
        AdditionalTxnFeeOfrd: 0,
        AdditionalTxnFeePub: 0,
        PGCharge: 0,
        OtherCharges: 0,
        ChargeBU: [
          {
            key: "TBOMARKUP",
            value: 0,
          },
          {
            key: "GLOBALPROCUREMENTCHARGE",
            value: 0,
          },
          {
            key: "OTHERCHARGE",
            value: 0,
          },
          {
            key: "CONVENIENCECHARGE",
            value: 0,
          },
        ],
        Discount: 0,
        PublishedFare: 3064,
        CommissionEarned: 40.41,
        PLBEarned: 72.87,
        IncentiveEarned: 114.96,
        OfferedFare: 2835.76,
        TdsOnCommission: 16.16,
        TdsOnPLB: 29.15,
        TdsOnIncentive: 45.98,
        ServiceFee: 0,
        TotalBaggageCharges: 0,
        TotalMealCharges: 0,
        TotalSeatCharges: 0,
        TotalSpecialServiceCharges: 0,
      },
      CreditNoteCreatedOn: null,
      Passenger: [
        {
          BarcodeDetails: null,
          DocumentDetails: null,
          GuardianDetails: null,
          PaxId: 3037639,
          Title: "Mr",
          FirstName: "kamal",
          LastName: "singh",
          PaxType: 1,
          DateOfBirth: "1996-12-10T00:00:00",
          Gender: 2,
          IsPANRequired: false,
          IsPassportRequired: false,
          PAN: "",
          PassportNo: "",
          AddressLine1: "rajapuri,uttamnagar,delhi,110059",
          Fare: {
            Currency: "INR",
            BaseFare: 2377,
            Tax: 687,
            TaxBreakup: [
              {
                key: "K3",
                value: 128,
              },
              {
                key: "YR",
                value: 170,
              },
              {
                key: "INTax",
                value: 62,
              },
              {
                key: "OtherTaxes",
                value: 327,
              },
              {
                key: "TotalTax",
                value: 687,
              },
            ],
            YQTax: 0,
            AdditionalTxnFeeOfrd: 0,
            AdditionalTxnFeePub: 0,
            PGCharge: 0,
            OtherCharges: 0,
            ChargeBU: [
              {
                key: "TBOMARKUP",
                value: 0,
              },
              {
                key: "GLOBALPROCUREMENTCHARGE",
                value: 0,
              },
              {
                key: "OTHERCHARGE",
                value: 0,
              },
              {
                key: "CONVENIENCECHARGE",
                value: 0,
              },
            ],
            Discount: 0,
            PublishedFare: 3064,
            CommissionEarned: 40.41,
            PLBEarned: 72.87,
            IncentiveEarned: 114.96,
            OfferedFare: 2835.76,
            TdsOnCommission: 16.16,
            TdsOnPLB: 29.15,
            TdsOnIncentive: 45.98,
            ServiceFee: 0,
            TotalBaggageCharges: 0,
            TotalMealCharges: 0,
            TotalSeatCharges: 0,
            TotalSpecialServiceCharges: 0,
          },
          City: "delhi",
          CountryCode: "IN",
          Nationality: "India",
          ContactNo: "+91- 08006105318",
          Email: "kamal000rawat@gmail.com",
          IsLeadPax: true,
          FFAirlineCode: null,
          FFNumber: "",
          Ssr: [],
          GSTCompanyAddress: "",
          GSTCompanyContactNumber: "",
          GSTCompanyEmail: "",
          GSTCompanyName: "",
          GSTNumber: "",
        },
      ],
      CancellationCharges: null,
      Segments: [
        {
          Baggage: "15 KG",
          CabinBaggage: null,
          CabinClass: 2,
          SupplierFareClass: null,
          TripIndicator: 1,
          SegmentIndicator: 1,
          Airline: {
            AirlineCode: "UK",
            AirlineName: "Air Vistara",
            FlightNumber: "979",
            FareClass: "V",
            OperatingCarrier: "UK",
          },
          AirlinePNR: "JWSFIB",
          Origin: {
            Airport: {
              AirportCode: "DEL",
              AirportName: "Indira Gandhi Airport",
              Terminal: "3",
              CityCode: "DEL",
              CityName: "Delhi",
              CountryCode: "IN",
              CountryName: "India",
            },
            DepTime: "2023-09-09T13:20:00",
          },
          Destination: {
            Airport: {
              AirportCode: "AMD",
              AirportName: "Ahmedabad",
              Terminal: "1",
              CityCode: "AMD",
              CityName: "Ahmedabad",
              CountryCode: "IN",
              CountryName: "India",
            },
            ArrTime: "2023-09-09T15:00:00",
          },
          AccumulatedDuration: 100,
          Duration: 100,
          GroundTime: 0,
          Mile: 0,
          StopOver: false,
          FlightInfoIndex: "",
          StopPoint: "",
          StopPointArrivalTime: "0001-01-01T00:00:00",
          StopPointDepartureTime: "0001-01-01T00:00:00",
          Craft: "320",
          Remark: null,
          IsETicketEligible: true,
          FlightStatus: "Confirmed",
          Status: "HK",
          FareClassification: null,
        },
      ],
      FareRules: [
        {
          Origin: "DEL",
          Destination: "AMD",
          Airline: "UK",
          FareBasisCode: "V0GRPRYS",
          FareRuleDetail:
            "<b>These Are Non Refundable Fares.</b></br><ul><li><b>There is no Minimum Stay requirement</b><br><li><b>There is no Maximum Stay requirement</b><br><fieldset><legend><b><b>Adult</b><br></b></legend><ul><li><b>Revalidation/Reissue</b><br>Fare Component <b>V0GRPRYS</b>&emsp; Sector <b>DEL-AMD</b> &nbsp;<ul><li>Revalidation before/after departure, including failure to show at first/subsequent flight(s) : <b>Not Allowed</b></li><li>Reissue, including failure to show at first flight : <b>Allowed with Restrictions</b></li><li>Revalidation/Reissue request, including failure to show at first flight, must be made prior to <b>07SEP24  0000</b></li><li><b>Prior to Departure of journey</b><ul><u>Reissue</u><li>Penalty fee between : <b>2500 INR/9000 INR</b></li><li>Maximum reissue penalty fee for entire ticket (per reissue) : <b>9000 INR</b></li></ul></li><li><b>Failure to show at first flight</b><ul><u>Reissue</u><li>Penalty fee : <b>9000 INR(at today exchange rates 9000 INR) </b></li><li>Maximum reissue penalty fee for entire ticket (per reissue) : <b>9000 INR</b></li></ul></li><li><b>After departure of journey</b><ul><li>Revalidation/Reissue request must be made prior to : <b>No restriction</b></li></ul></li><li><b>Failure to show at subsequent flight(s)</b><ul><li>Revalidation/Reissue request must be made prior to : <b>No restriction</b></li></ul></li></ul></li><li><b>Refund</b><br>Fare Component <b>V0GRPRYS</b>&emsp; Sector <b>DEL-AMD</b> &nbsp;<ul><li>Refund before/after departure, including failure to show at first/subsequent flight(s) : <b>Not Allowed</b></li><li><b>Prior to Departure of journey</b><ul><li>Refund request must be made prior to : <b>No restriction</b></li></ul></li><li><b>Failure to show at first flight</b><ul><li>Refund request must be made prior to : <b>No restriction</b></li></ul></li><li><b>After departure of journey</b><ul><li>Refund request must be made prior to : <b>No restriction</b></li></ul></li><li><b>Failure to show at subsequent flight(s)</b><ul><li>Refund request must be made prior to : <b>No restriction</b></li></ul></li></ul></li><br><b>* Revalidation is a modification of the original ticket without any reissue of a new ticket.</b><br><b>* For Reissue, Penalty fees are in addition to any difference in fare.</b><br><b>* For Refund, certain Taxes are non-refundable.</b></ul></fieldset></ul><br/> <br/><b>These Are Non Refundable Fares.</b><br />RateClass : V0GRPRYS<br/>FareClass : V0GRPRYS<br/>marketing Company : UK<br/>Booking Class : V<br/>Origin : DEL<br/>destination : AMD<br/>ruleSectionLocalId : 1<br/>ruleCategoryCode : (5)<br/>AP.ADVANCE RES/TKT  RESERVATIONS FOR EACH SECTOR ARE REQUIRED FOR DEPARTURE OF  EACH TRIP ON THE FARE COMPONENT.  RESERVATIONS AND TICKETING MUST BE COMPLETED AT THE SAME  TIME.  WAITLIST AND STANDBY NOT PERMITTED.         NOTE -          WAITLIST STANDBY AND OPENDATED TICKETS NOT          PERMITTED.<br/>ruleSectionLocalId : 2<br/>ruleCategoryCode : (16)<br/>PE.PENALTIESFOR V0GRPRYS TYPE FARES  CHANGES    CHARGE INR 2500 FOR REISSUE.         NOTE -          ABOVE CHARGES ARE EXCLUSIVE OF GST K3.          APPLICABLE GST RATE TO BE COLLECTED AND SHOWN          SEPARATELY UNDER TAX CODE K3.          CHARGE INR 3000 WITHIN 24 HOURS AND BEFORE 2          HOURS OF DEPARTURE OF FLIGHT.          -----------------------------------------------          THE CHANGE/REISSUE CHARGE IS NON - REFUNDABLE          --------------------------------------------------          FOR ALL CHANGES 24 HOURS BEFORE DEPARTURE OF A          FLIGHT A CHARGE OF 2500 INR MUST BE COLLECTED FOR          CHANGE OF RESERVATION. THIS APPLIES PER          SECTOR/ROUTE FOR DATE/FLIGHT CHANGE.          --------------------------------------------------          IN CASE OF CHANGE TO HIGHER RBD FOR TRAVEL ON THE          SAME DAY/SAME FLIGHT/RE-ISSUANCE FEE WILL NOT BE          APPLICABLE.ONLY DIFFERENCE IN TOTAL FARE IS TO BE          COLLECTED.          --------------------------------------------------          CHARGE APPLIES TO ADULT AND CHILD.          INFANT NOT OCCUPYING A SEAT IS EXEMPTED.          --------------------------------------------------          WHEN FARES ARE COMBINED THE MOST RESTRICTIVE          CONDITIONS APPLY FOR THE ENTIRE JOURNEY.  CANCELLATIONS    CHARGE INR 3000 FOR CANCEL/REFUND.         NOTE -          ABOVE CHARGES ARE EXCLUSIVE OF GST K3 AND APPLIES          PER FARE COMPONENT.          APPLICABLE GST RATE TO BE COLLECTED AND          ADDED TO THE PENALTY AMOUNT.          CHARGE INR 3500 WITHIN 24 HOURS AND BEFORE 2          HOURS OF DEPARTURE OF FLIGHT.          --------------------------------------------------          CANCELLATION / NO-SHOW FEE APPLICABLE ON REFUNDS          IS SUBJECT TO THE BELOW APPLICABLE CONDITION -S-          BEING SATISFIED.          A. BASE FARE OR CANCELLATION/REFUND FEES          WHICHEVER IS LOWER WILL BE DEDUCTED WHEN          PROCESSING REFUND.          B. ALL UNUTILIZED TAXES INCLUDING YR SHALL BE          REFUNDED. SERVICE TAX -K3- GOODS AND SERVICE TAX          SHALL BE REFUNDED AS RECALCULATED ON THE          REFUNDABLE BALANCE.          --------------------------------------------------          CHARGE APPLIES TO ADULT AND CHILD.          INFANT NOT OCCUPYING A SEAT IS EXEMPTED.          --------------------------------------------------          WHEN FARES ARE COMBINED THE MOST RESTRICTIVE          CONDITIONS APPLY FOR THE ENTIRE JOURNEY.          --------------------------------------------------          CANCELLATION/REFUND FEE OF PARTLY USED TICKET          DEDUCT ONEWAY FARE AND LEVIES FOR THE TRAVELLED          SECTOR PLUS CANCELLATION/REFUND FEE          --------------------------------------------------          FARES WHEN COMBINED ON A HALF ROUND TRIP BASIS          SHALL BE GOVERNED  BY THE CORRESPONDING          APPLICABLE TICKETED FARE PER SECTOR AND ITS          APPLICABLE TERMS AND CONDITIONS          --------------------------------------------------          OUT OF SEQUENCE TRAVEL NOT PERMITTED          THERE WILL BE NO REFUND FOR OUT OF SEQUENCE COUPON          EXCEPT THE STATUTARY TAXES.          --------------------------------------------------    CHARGE INR 6000 FOR NO-SHOW.         NOTE -          ABOVE CHARGES ARE EXCLUSIVE OF GST K3 AND APPLIES          PER FARE COMPONENT.          APPLICABLE GST RATE TO BE COLLECTED AND          ADDED TO THE PENALTY AMOUNT.          --------------------------------------------------          NO SHOW IS WHEN A PAX FAILS TO CHANGE/CANCEL          BOOKING ATLEAST 02 HOURS BEFORE DEPARTURE OF THE          FLIGHT BEING CHANGED/CANCELLED.          IF A NO SHOW TICKET IS PROCESSED FOR ANY          CHANGES/CANCELLATION/REFUND THEN THE PENALTIES          APPLICABLE FOR CHANGE/CANCELLATION/REFUND SHALL          BE APPLICABLE IN ADDITION TO THE NO SHOW PENALTY.          -------------------------------------------------          CANCELLING THE RESERVATION WITH NO ACTION ON THE          TICKET WILL LEAD TO NO-SHOW PENALTY FEES.          --------------------------------------------------          CHARGE APPLIES TO ADULT AND CHILD.          INFANT NOT OCCUPYING A SEAT IS EXEMPTED.          --------------------------------------------------          WHEN FARES ARE COMBINED THE MOST RESTRICTIVE          CONDITIONS APPLY FOR THE ENTIRE JOURNEY.          --------------------------------------------------          VOID IS NOT ALLOWED WHERE THE FLIGHT DEPARTURE OF          THE FIRST LEG IS LESS THAN 7 DAYS FROM THE DATE          OF FRESH ISSUE SALE.          --------------------------------------------------          RESERVATIONS BOOKED MORE THAN 7 DAYS PRIOR TO          COMMENCEMENT OF TRAVEL MAY BE REFUND OR REISSUED          WITHIN 24 HOURS OF BOOKING OF TICKET WITHOUT          PENALTY.RESERVATIONS BOOKED WITHIN 7 DAYS OF          COMMENCEMENT OF TRAVEL ARE SUBJECT TO THE          APPLICABLE CANCELLATION PENALTY.          FOR EXAMPLE A PASSENGER BOOKED A TICKET ON DEL-          BOM SECTOR ON 12/02/20 AT 1000 AM AND HIS DATE OF          DEPARTURE IS 20/02/2020 FROM DEL. NOW PASSENGER          CAN AMEND THE TICKET TILL 13/02/2020 UP TO 0959          AM. A PASSENGER BOOKED A TICKET ON DEL BOM SECTOR          12/02/2020 AND HIS DATE OF TRVEL IS WITHIN 7 DAYS          16/02/2020 FROM DEL THEN PENALTY FEE WILL BE          APPLICABLE AS PER THE RULES.          NOTE - THE MENTIONED ABOVE LOOK IN OPTION CAN NOT          BE PROCESSED THROUGH AUTOMATED CHANGES AND          CANCELLATION CAT31/CAT33 HENCE KINLDY PROCESS          MANUALLY.<br/><ul><li>APART FROM AIRLINE CHARGES,GST+RAF+ APPLICABLE CHARGES IF ANY, WILL BE CHARGED.</li><li>MENTIONED FEE ARE PER PAX AND PER SECTOR.</li><li>FOR DOMESTIC BOOKINGS, PASSENGERS ARE REQUIRED TO SUBMIT THE CANCELLATION OR REISSUE REQUEST TO TBO AT LEAST 2 HOURS BEFORE THE AIRLINES CANCELLATION AND REISSUE POLICY.</li><li>FOR INTERNATIONAL BOOKINGS, PASSENGERS ARE REQUIRED TO SUBMIT THE CANCELLATION OR REISSUE REQUEST TO TBO AT LEAST 4 HOURS BEFORE THE AIRLINES CANCELLATION AND REISSUE POLICY.</li></ul>",
          FareRestriction: "Y",
          FareFamilyCode: "ECOYS",
          FareRuleIndex: "",
        },
      ],
      MiniFareRules: [
        {
          JourneyPoints: "DEL-AMD",
          Type: "Reissue",
          From: null,
          To: null,
          Unit: null,
          Details: "INR 2500",
        },
        {
          JourneyPoints: "DEL-AMD",
          Type: "Cancellation",
          From: null,
          To: null,
          Unit: null,
          Details: "REFER TO DETAILED FARE RULES",
        },
      ],
      PenaltyCharges: {
        ReissueCharge: "INR 2500",
      },
      Status: 1,
      IsWebCheckInAllowed: false,
    },
  };
  function createMarkup(data) {
    return { __html: data };
  }
  const dateFormat = (d) => {
    let input_date = d;
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date_obj = new Date(input_date);
    let day = date_obj.getDate();
    let month = monthNames[date_obj.getMonth()];
    let year = date_obj.getFullYear();
    let hours = date_obj.getHours();
    let minutes = date_obj.getMinutes();
    // console.log(day, month, year, date_obj, `${hours} ${minutes}`);
    return { date: `${month} ${day}, ${year}`, time: `${hours}:${minutes}` };
  };


  const fareQuoteData = reducerState?.flightFare?.flightQuoteData?.Results;
  // console.log(fareQuoteData, "fare quote data");

  const img = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const airlineName = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineName;
  const airlineCode = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.AirlineCode;
  const flightNumber = fareQuoteData?.Segments?.[0]?.[0]?.Airline?.FlightNumber;
  const originCity = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.CityName;
  const DestinationCity = fareQuoteData?.Segments?.[0]?.[0]?.Destination?.Airport?.CityName;
  const flightFare = fareQuoteData?.Fare?.PublishedFare;
  const originTerminal = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.Airport?.Terminal;
  const destinationTerminal = fareQuoteData?.Segments?.[0]?.[0]?.Destination?.Airport?.Terminal;


  const dateString = fareQuoteData?.Segments?.[0]?.[0]?.Origin?.DepTime;
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  const [month, day, year, time, ampm] = formattedDate.split(" ");
  const desiredFormat = `${day}${month}-${year} ${time} ${ampm}`;

  const dateString1 = fareQuoteData?.Segments?.[0]?.[0]?.Destination?.ArrTime;
  const date1 = new Date(dateString1);
  const options1 = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate1 = date1.toLocaleString("en-US", options1);
  const [month1, day1, year1, time1, ampm1] =
    formattedDate1.split(" ");
  const desiredFormat1 = `${day1}${month1}-${year1} ${time1} ${ampm1}`;


  const Duration = `${Math.floor(fareQuoteData?.Segments?.[0]?.[0]?.Duration / 60)}hr ${fareQuoteData?.Segments?.[0]?.[0]?.Duration % 60
    }min`;



  return (
    <div className="col-lg-12">

      <div className="col-lg-12">
        <div class="headingflightPassenger">
          <p>Booking Details</p>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="confirmRect">
          <div>
            <p>THE SKYTRAILS PRIVATE LIMITED 1</p>
            <span >PNR :{" "} {ticket?.PNR}</span>
          </div>
          <div>
            <p>{ticket?.FlightItinerary?.Origin} -{" "}
              {ticket?.FlightItinerary?.Destination}</p>
            <span style={{ color: "#0048FF", fontWeight: "600" }}>Confirmed</span>
          </div>
          <div>
            <p>Contact : {' '}{ticket?.FlightItinerary?.Passenger[0]?.ContactNo}</p>
            <span>Book on: {dateFormat(ticket?.FlightItinerary?.LastTicketDate).date}</span>
          </div>
          <div>
            <p>Travel Date:{" "}
              {
                dateFormat(ticket?.FlightItinerary?.Segments[0]?.Origin?.DepTime)
                  ?.date
              }</p>
            <span> Travel Time:{" "}
              {
                dateFormat(ticket?.FlightItinerary?.Segments[0]?.Origin?.DepTime)
                  ?.time
              }{" "}
              hrs</span>
          </div>

        </div>
      </div>

      <div className="col-lg-12">
        <div class="headingflightPassenger">
          <p>Flight Details</p>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="singleFlightBox justify-content-evenly">
          <div className="singleFlightBoxOne">
            <div><img src={`https://raw.githubusercontent.com/The-SkyTrails/Images/main/FlightImages/${img}.png`} alt="flightimg"/> </div>
            <span>{airlineName}</span>
            <p>{airlineCode}{" "}{flightNumber}</p>
          </div>
          <div className="singleFlightBoxTwo">
            <span>{originCity}</span>
            {/* <p>{time1.substr(0, 5)}</p> */}
            <p>{desiredFormat.slice(0, 12)}</p>
            <p style={{ fontSize: "14px" }}>{desiredFormat.slice(13)}</p>
            <p>Terminal{' '}{originTerminal}</p>
          </div>
          <div className="singleFlightBoxThree">
            <h4>{Duration}</h4>
            <div><img src={flightdir} /></div>
            <p>Direct Flight</p>
            <span>Refundable</span>
          </div>
          <div className="singleFlightBoxFour">
            <span>{DestinationCity}</span>
            {/* <p>{time2.substr(0, 5)}</p> */}
            <p>{desiredFormat1.slice(0, 12)}</p>
            <p style={{ fontSize: "14px" }}>{desiredFormat1.slice(13)}</p>
            <p>Terminal{' '}{destinationTerminal}</p>
          </div>
          <div className="singleFlightBoxFive">
            <span>₹{flightFare}</span>
            <p>Publish</p>
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        {ticket?.FlightItinerary?.Segments?.map((flight, key) => (
          <div className="fligtConfirmDetails">
            <div>
              <span>Flight No.</span>
              <p>{flight?.Airline?.AirlineCode}-{flight?.Airline?.FlightNumber}</p>
            </div>
            <div>
              <span>Origin</span>
              <p>{flight?.Origin?.Airport?.AirportCode}</p>
            </div>
            <div>
              <span>Destination</span>
              <p>{flight?.Destination?.Airport?.AirportCode}</p>
            </div>
            <div>
              <span>Departure Date Time</span>
              <p>{dateFormat(flight?.Origin?.DepTime)?.date},
                {dateFormat(flight?.Origin?.DepTime)?.time} hrs</p>
            </div>
            <div>
              <span>Arrival Date Time</span>
              <p>{dateFormat(flight?.Destination?.ArrTime)?.date},
                {dateFormat(flight?.Destination?.ArrTime)?.time} hrs</p>
            </div>
            <div>
              <span>Class</span>
              <p>{flight?.Airline?.FareClass}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="col-lg-12">
        <div class="headingflightPassenger">
          <p>Passenger Details</p>
          <span>Total Adult(s) :{' '} {adults} Child:{' '} {childs} Infants: {' '} {infants}</span>
        </div>
      </div>


      <div className="col-lg-12">
        {ticket?.FlightItinerary?.Passenger.map((passenger, key) => (

          <>
            <div class="headingflightPassengerConfirm">
              <span>
                Passenger {key + 1} (
                {passenger?.PaxType === 1
                  ? "Adult"
                  : passenger?.PaxType === 2
                    ? "Child"
                    : "Infant"}
                )
              </span>
            </div>
            <div className="passengerData">
              <div>
                <span>Name:</span>
                <p>{passenger.Title} {passenger.FirstName} {passenger.LastName}</p>
              </div>
              <div>
                <span>DOB:</span>
                <p>{passenger.DateOfBirth.slice(0, 10)}</p>
              </div>
            </div>
          </>
        ))}
      </div>



      <div className="col-lg-12 mt-4">
        <div class="headingflightPassenger">
          <p>Fare Rule</p>
        </div>
      </div>

      <Box className="Top_header" p={5}>
        {ticket.FlightItinerary.FareRules.map((rule) => (
          <Box>
            <div
              className="fs-6 mt-3"
              dangerouslySetInnerHTML={createMarkup(rule.FareRuleDetail)}
            />
          </Box>
        ))}
      </Box>
      <Box mt={2}>
        <Flightaccordian />
      </Box>
      <Box textAlign="center">
        <form action="" className="formFlightSearch" textAlign="center">
          {/* <Box width="171px" margin="auto">
            <Button
              my={1}
              colorScheme="teal"
              className="btn_booknow"
              variant="contained"
              type="submit"
            >
              {" "}
              View invoice{" "}
            </Button>
          </Box> */}
          <div className="flightDetButton">
            <button
              type="submit"
            >
              View Invoice
            </button>
          </div>
        </form>
        <Typography color="#21325d" textAlign="center" fontWeight="bold" fontSize="18px" mt={5} mb={2}>
          Copyright © 2022 THE SKY TRAILS All Rights Reserved
        </Typography>
      </Box>
    </div>
  );
};

export default Flightbookingdetail;
