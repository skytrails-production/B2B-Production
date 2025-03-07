import * as types from "./hotelActionType";

const initState = {
  ticketData: [],
  hotelInfo: [],
  hotelRoom: [],
  hotelGallery: [],
  bookRoom: [],
  hotelDetails: [],
  isLoading: false,
  hotels: [],
  isLoadingHotelInfo: false,
  isLoadingHotelRoom: false,
  isLoadingBlockRoom: false,
  isLoadingBookRoom: false,
  isError: false,
  hasMore: true,
  showSuccessMessage: false,
};

export const hotelReducerGRN = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.HOTEL_REQUEST_GRN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case types.HOTEL_SUCCESS_GRN:
      console.log(payload, "pyload");
      // if (payload?.data?.data?.hotels) {
      //   const search_id = payload?.data?.data?.search_id;
      //   const updatedHotels = payload?.data?.data?.hotels.map((hotel) => ({
      //     ...hotel,
      //     search_id,
      //   }));
      //   let olddata = [...state?.hotels].concat(updatedHotels);
      //   console.log(olddata, "olddata");

      //   return {
      //     ...state,
      //     ticketData: payload,
      //     hotels: olddata,
      //     isLoading: false,
      //     isError: false,
      //     showSuccessMessage: true,
      //   };
      // } else if (payload?.data?.data?.errors) {
      //   return {
      //     ...state,
      //     hasMore: false,

      //     isLoading: false,
      //     isError: false,
      //     showSuccessMessage: true,
      //   };
      // } else {
      //   return { ...state };
      // }

      return {
        ...state,
        ticketData: payload,
        // onlyHotels: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
        hasMore: true,
      };

    case types.HOTEL_SINGLE_DETAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        showSuccessMessage: true,
      };
    case types.HOTEL_SINGLE_SUCCESS:
      return {
        ...state,
        hotelDetails: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    case types.HOTEL_GALLERY_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        showSuccessMessage: true,
      };
    case types.HOTEL_GALLERY_SUCCESS:
      return {
        ...state,
        hotelGallery: payload,
        isLoading: false,
        isError: false,
        showSuccessMessage: true,
      };

    case types.HOTEL_B0OKROOM_REQUESTGRN:
      return {
        ...state,
        isLoadingBookRoom: true,
        isError: false,
      };
    case types.HOTEL_ROOMSELECT_REQUEST:
      return {
        ...state,
        isLoadingHotelRoom: true,
        isError: false,
      };

    case types.HOTEL_ROOMSELECT_SUCCESS:
      return {
        ...state,
        hotelRoom: payload?.data?.data,
        isLoadingHotelRoom: false,
        isError: false,
        showSuccessMessage: true,
      };

    case types.HOTEL_B0OKROOM_SUCCESSGRN:
      return {
        ...state,
        bookRoom: payload?.data?.data,
        isLoadingBookRoom: false,
        isError: false,
        showSuccessMessage: true,
      };

    case types.CLEAR_HOTEL_BLOCK_ROOM:
      return {
        ...state,
        blockRoom: [],
      };



      case types.CLEAR_HOTEL_SELECTED_ROOM:
        return {
          ...state,
          hotelRoom: [],
        };


      case types.CLEAR_HOTEL_BLOCK_ROOMTYR:
      return  {
        ticketData: [],
        hotelInfo: [],
        hotelRoom: [],
        hotelGallery: [],
        bookRoom: [],
        hotelDetails: [],
        isLoading: false,
        hotels: [],
        isLoadingHotelInfo: false,
        isLoadingHotelRoom: false,
        isLoadingBlockRoom: false,
        isLoadingBookRoom: false,
        isError: false,
        hasMore: true,
        showSuccessMessage: false,
        try:"tryyyyyyyyyyyyyyyyyyyy"
      };

    case types.CLEAR_ONLYHOTEL_GRN:
      return {
        hotels: [],
      };

    case types.CLEAR_HOTEL_REDUCERGRN:
      return {
        ticketData: [],
        hotelInfo: [],
        hotelRoom: [],
        hotelGallery: [],
        bookRoom: [],
        hotelDetails: [],
        hotels: [],
        isLoading: false,
        isLoadingHotelInfo: false,
        isLoadingHotelRoom: false,
        isLoadingBlockRoom: false,
        isLoadingBookRoom: false,
        isError: false,
        hasMore: false,
        showSuccessMessage: false,
      };
    case types.CLEAR_HOTEL_ROOMGALLERY_GRN:
      return {
        ...state,
        hotelGallery: [],
        hotelDetails: [],
      };

    default:
      return state;
  }
};
