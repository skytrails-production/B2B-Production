import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const SoldProductData = () => {
  return (
    <>
      <div className="flex">
        <div
          className="bg-white p-5 m-5 mt-0"
          style={{ height: "23rem", width: "25%" }}
        >
          <div className="flex justify-between align-middle">
            <h1 className="text-blue-500 mt-2 text-2xl">Product Sold</h1>
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Months</span>
            </button>
          </div>
          <div className="mt-5 ">
            <div className="flex justify-between ">
              <span className="text-base font-medium text-blue-700 dark:text-gray-800">
                Headphone
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-gray-800">
                600 of 880
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between ">
              <span className="text-base font-medium text-blue-700 dark:text-gray-800">
                Laptop
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-gray-800">
                600 of 880
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: "55%" }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between ">
              <span className="text-base font-medium text-blue-700 dark:text-gray-800">
                Shirts
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-gray-800">
                600 of 880
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between ">
              <span className="text-base font-medium text-blue-700 dark:text-gray-800">
                Television
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-gray-800">
                600 of 880
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-yellow-600 h-2.5 rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between ">
              <span className="text-base font-medium text-blue-700 dark:text-gray-800">
                Mobiles
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-gray-800">
                600 of 880
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
              <div
                className="bg-pink-500 h-2.5 rounded-full"
                style={{ width: "48%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Product table */}
        <div style={{ width: "71%" }} className="bg-white p-5">
          {/* Button */}
          <div className="flex justify-between">
            <h1 className="text-indigo-500 text-xl">Invoice</h1>
            <button className="bg-red-500 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <span>View More</span>
              <IoIosArrowForward />
            </button>
          </div>

          {/* Table */}
          <div className="flex-row justify-center">
            <div className=" m-5 bg-white" style={{ width: "97%" }}>
              <table class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-[#d8dbd6]  dark:text-gray-400">
                  <tr>
                    <th scope="col" class="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Position
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Office
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" class="py-3 px-6">
                      Salary
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Arjun
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">
                      <p className="bg-yellow-300 w-min rounded-md p-1 ">
                        Pending
                      </p>
                    </td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Mayank
                    </th>
                    <td class="py-4 px-6">White</td>
                    <td class="py-4 px-6">Laptop PC</td>
                    <td class="py-4 px-6">
                      <p className="bg-red-900 w-min rounded-md p-1 text-white">
                        Cancled
                      </p>
                    </td>
                    <td class="py-4 px-6">$1999</td>
                  </tr>

                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Kajal
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">
                      <p className="bg-green-600 w-min rounded-md p-1 text-white">
                        Delivered
                      </p>
                    </td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Swaroop
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">
                      <p className="bg-blue-600 w-min rounded-md p-1 text-white">
                        Procesing
                      </p>
                    </td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Ajay
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">
                      <p className="bg-orange-600 w-min rounded-md p-1 text-white">
                        Shipped
                      </p>
                    </td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b  dark:border-gray-700">
                    <th
                      scope="row"
                      class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      Raj
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">
                      <p className="bg-green-600 w-min p-1  rounded-md text-white">
                        Delivered
                      </p>
                    </td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoldProductData;
