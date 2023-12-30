import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAction,
  userData,
} from "../../../../Redux/Auth/UserData/actionUserData";

const Table = () => {
  const reducerState = useSelector((state) => state);
  // console.log("reducerState", reducerState);
  const dispatch = useDispatch();
  const tableData = reducerState?.userTableData?.userData?.data?.data;
  // console.log(tableData);

  useEffect(() => {
    if (tableData === undefined) {
      dispatch(getUserAction());
    }
    dispatch(getUserAction());
  }, [dispatch]);

  return (
    <>
      <div
        className="table__container"
        style={{ position: "relative", left: "10%", width: "90%" }}
      >
        <div className=" flex justify-between px-5 py-3 bg-white">
          <h1 className="text-xl">Data Tables</h1>
          {/* <h3>
          Home/<span className="text-indigo-700 ">Table</span> /DataTables
        </h3> */}
        </div>
        <div
          style={{ width: "89%", zIndex: "1" }}
          className="flex-row justify-center"
        >
          <div className=" m-5 bg-white" style={{ width: "105%" }}>
            <h1 className="text-indigo-700 mb-2 pl-4 pt-3">Data Tables</h1>
            <span className="mb-2 pl-4 pt-3">
              Show{" "}
              <input
                type="number"
                className="bg-[#f5f5f5] pl-2"
                style={{ border: "1px solid black" }}
              />{" "}
              entries{" "}
            </span>

            <table class="w-75 mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-[#d8dbd6]  dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Agency Name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Agency Email
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Agency Classification
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Agency Address
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Contact Person
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Provisional GSTIN
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Mobile
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Password
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData || tableData === "undefined"
                  ? tableData.map((ele) => {
                      return (
                        <>
                          <tr>
                            <td>{ele.personal_details.first_name}</td>
                            <td>{ele.agency_details.agency_name}</td>
                            <td>{ele.agency_gst_details.email}</td>
                            <td>
                              {ele.agency_gst_details.agency_classification}
                            </td>
                            <td>{ele.agency_details.address}</td>
                            <td>{ele.agency_gst_details.agency_name}</td>
                            <td>{ele.agency_gst_details.provisional_GSTIN}</td>
                            <td>{ele.personal_details.mobile.mobile_number}</td>
                            <td>{ele.personal_details.password}</td>
                          </tr>
                        </>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
          <div
            className="flex justify-between m-5 bg-white"
            style={{ width: "70%", padding: "10px 14px" }}
          >
            <h6>Showing Result 1 to 10 of 51 entires</h6>
            <nav aria-label="Page navigation example">
              <ul class="inline-flex -space-x-px pt-1">
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    Previous
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    4
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    5
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white   hover:bg-[#6778EF] hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
