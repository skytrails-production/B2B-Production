import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { passportReqired } from "../../../../../utility/flightUtility/BookwarperUtility";
const ReviewTravellerFlight = ({
  passengerData,
  isModal,
  closeModal,
  closeModalWithYes,
}) => {
  const [openMapModal, setOpenMapModal] = useState(true);
  return (
    <Modal show={isModal} onClose={() => closeModal()}>
      <Modal.Header className="px-4 py-2 font-bold text-md">
        Review Traveller Details
      </Modal.Header>
      <Modal.Body>
        <div className="relative space-y-6">
          <p className="text-gray-700">Please review the traveller details</p>
          <div className=" flex flex-col gap-2 max-h-[350px] overflow-x-hidden overflow-y-scroll ">
            {passengerData.map((item, index) => {
              // console.log(item, "passenger");
              const adult = Number(sessionStorage.getItem("adults"));
              const child = Number(sessionStorage.getItem("childs"));
              const infant = Number(sessionStorage.getItem("infants"));
              let paxType = "";
              if (item.PaxType === 1) {
                paxType = `Adult ${index + 1}`;
              } else if (item.PaxType === 2) {
                paxType = `Child ${index - adult + 1}`;
              } else if (item.PaxType === 3) {
                paxType = `Infant ${index - adult - child + 1}`;
              }
              let Gender;
              if (item?.gender == 1) {
                Gender = "Male";
              } else if (item?.gender == 2) {
                Gender = "Female";
              }
              const isPassportRequired = passportReqired();
              const passport = item?.passportNo;

              return (
                <div
                  className="px-4 py-2 bg-gray-200 shadow-sm rounded-2xl"
                  key={`${index}-traveller`}
                >
                  <p className="text-lg font-semibold text-gray-900">
                    {paxType}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className=" flex justify-between items-center border-b-[1px] py-2  border-white ">
                      <p className="text-gray-700 text-md">First Name </p>
                      <p className="font-semibold text-gray-900 text-md">
                        {item?.firstName} {item?.lastName}
                      </p>
                    </div>
                    {/* <div className=" flex justify-between items-center border-b-[1px] py-2  border-white">
                      <p className="text-gray-700 text-md">Last Name </p>
                      <p className="font-semibold text-gray-900 text-md">
                        {item?.lastName}
                      </p>
                    </div> */}
                    <div className=" flex justify-between items-center  border-b-[1px] py-2  border-white  ">
                      <p className="text-gray-700 text-md">Gender </p>
                      <p className="font-semibold text-gray-900 text-md">
                        {Gender}
                      </p>
                    </div>
                    {isPassportRequired && (
                      <div className="flex items-center justify-between ">
                        <p className="text-gray-700 text-md">Passport No </p>
                        <p className="font-semibold text-gray-900 text-md">
                          {passport}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={closeModal}
              className="flex items-center justify-center w-full bg-white text-primary-600 border-[1px]  hover:bg-primary-50 rounded-md py-2  border-primary-6000 font-semibold shadow-sm transition-all text-primary-6000"
            >
              <FaEdit className="mr-2 text-primary-6000" />
              No, Edit
            </button>
            <button
              onClick={closeModalWithYes}
              className="flex items-center justify-center w-full py-2 font-semibold text-white transition-all rounded-md shadow-sm bg-primary-6000 "
            >
              <FaCheckCircle className="mr-2 " />
              Ok, Proceed
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ReviewTravellerFlight;
// import React from "react";
// import { Modal } from "flowbite-react";
// import { FaEdit, FaCheckCircle } from "react-icons/fa";

// const ReviewTravellerFlight = ({ passengerData, isModal, closeModal }) => {
//   const getPaxType = (index, PaxType, adult, child) => {
//     if (PaxType === 1) return `Adult ${index + 1}`;
//     if (PaxType === 2) return `Child ${index - adult + 1}`;
//     if (PaxType === 3) return `Infant ${index - adult - child + 1}`;
//     return "Unknown";
//   };

//   const adult = Number(sessionStorage.getItem("adults")) || 0;
//   const child = Number(sessionStorage.getItem("childs")) || 0;

//   return (
//     <Modal show={isModal} onClose={closeModal}>
//       <Modal.Header className="px-4 py-3 text-lg font-bold bg-gray-100 text-primary-800">
//         Review Traveller Details
//       </Modal.Header>
//       <Modal.Body className="space-y-4 bg-gray-50">
//         <p className="font-medium text-center text-gray-700">
//           Please review the traveller details carefully before proceeding.
//         </p>

//         {/* Traveller List */}
//         <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
//           {passengerData.map((item, index) => {
//             const paxType = getPaxType(index, item.PaxType, adult, child);
//             const Gender =
//               item?.gender === 1
//                 ? "Male"
//                 : item?.gender === 2
//                 ? "Female"
//                 : "Other";

//             return (
//               <div
//                 key={`${index}-traveller`}
//                 className="p-4 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
//               >
//                 <p className="text-lg font-semibold text-primary-700">
//                   {paxType}
//                 </p>
//                 <div className="flex flex-col gap-2 mt-2">
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">First Name:</span>
//                     <span className="font-medium text-gray-900">
//                       {item?.firstName}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Last Name:</span>
//                     <span className="font-medium text-gray-900">
//                       {item?.lastName}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <span className="text-gray-600">Gender:</span>
//                     <span className="font-medium text-gray-900">{Gender}</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center gap-4 mt-4">
//           <button
//             onClick={closeModal}
//             className="flex items-center justify-center w-full py-2 font-semibold transition-all bg-white border rounded-md shadow-sm text-primary-600 border-primary-600 hover:bg-primary-50"
//           >
//             <FaEdit className="mr-2" />
//             No, Edit
//           </button>
//           <button
//             onClick={() => alert("Proceeding...")}
//             className="flex items-center justify-center w-full py-2 font-semibold text-white transition-all rounded-md shadow-sm bg-primary-600 hover:bg-primary-700"
//           >
//             <FaCheckCircle className="mr-2" />
//             Ok, Proceed
//           </button>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ReviewTravellerFlight;
