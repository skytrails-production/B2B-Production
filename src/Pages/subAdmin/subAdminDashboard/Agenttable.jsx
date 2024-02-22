import React, { useState, useEffect } from 'react';
import './Agenttable.css';
import { apiURL } from "../../../Constants/constant";

function Agenttable() {
  const [agentData, setAgentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set the number of items per page

  const fetchAgent = async () => {
    try {
      const response = await fetch(`${apiURL.baseURL}/skyTrails/user/getallusers`);
      const data = await response.json();
      console.log(data);
      setAgentData(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchAgent();
  }, []);
  const handleStatusChange = (value, index) => {
    // Update the `is_active` value in your data
    const updatedData = [...agentData];
    updatedData[index].is_active = value;
    setAgentData(updatedData);
  };

  // Logic for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = agentData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //previous page
  const prevPage=()=>{
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }
  //Next Page
  const nextPage=()=>{
    if(currentPage<Math.ceil(agentData.length/itemsPerPage)){
        setCurrentPage(currentPage+1);
    }
  }
  return (
    <div className='page'>
     {/* <h2 style={{"display: flex; justify-content: center;"}}>Agent Table</h2> */}

      {currentItems.length > 0 ? (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Document Image</th>
                <th>Name</th>
                <th>Agency Name</th>
                <th>Agency Email</th>
                <th>Agency Classification</th>
                <th>Agency Address</th>
                <th>Contact Person</th>
                <th>Provisional GSTIN</th>
                <th>Mobile</th>
                <th>Is Active</th>
                <th>Flight Amount</th>
                <th>Hotel Amount</th>
                <th>Bus Amount</th>
                <th>Holiday Amount</th>
                <th>Vendor Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="img-container">{item?.agency_details?.document_details?.pan_card_document && <img src={item.agency_details.document_details.pan_card_document} alt="PAN Card" />}</td>
                  <td>{item?.personal_details?.first_name}</td>
                  <td>{item?.agency_details?.agency_name}</td>
                  <td>{item?.agency_gst_details?.correspondance_mail_id}</td>
                  <td>{item?.agency_gst_details?.agency_classification}</td>
                  <td>{item?.agency_details?.address}</td>
                  <td>{item?.agency_gst_details?.agency_name}</td>
                  <td>{item?.agency_gst_details?.provisional_GSTIN}</td>
                  <td>{item?.personal_details?.mobile?.mobile_number}</td>
                  <td>
                  <select className='dropdown' value={item?.is_active} onChange={(e) => handleStatusChange(e.target.value, index)}>
                  <option value="update">Update</option>
                  <option value="active">Active</option>
                 <option value="deactive">Deactive</option>
                  </select>
                  </td>
                  <td>{item?.markup?.flight}</td>
                  <td>{item?.markup?.hotel}</td>
                  <td>{item?.markup?.bus}</td>
                  <td>{item?.markup?.holiday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No agent data available.</p>
      )}
   
    <div className="pagination-container">
  {agentData.length > itemsPerPage && (
    <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
  )}
  <ul className="pagination">
    {Array(Math.ceil(agentData.length / itemsPerPage)).fill().map((_, index) => (
      <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}></li>
    ))}
  </ul>
  {agentData.length > itemsPerPage && (
    <button onClick={nextPage} disabled={currentPage === Math.ceil(agentData.length / itemsPerPage) || currentPage === 0}>Next</button>
  )}
</div>

    </div>
  );
}

export default Agenttable;


 