import * as types from "./hotelActionType";

export const fetchHotel = (data) => {
  return {
    type: types.HOTEL_SUCCESS_GRN,
    payload: data,
  };
};

export const hotelActionGrn = (data) => {
  if (data) {
    return {
      type: types.HOTEL_REQUEST_GRN,
      payload: data,
    };
  }
};


export const singleHotelSuccess = (data) => {
  return {
    type: types.HOTEL_SINGLE_SUCCESS,
    payload: data,
  }

};
export const singleHotelGRN = (data) => {
  if (data) {
    return {
      type: types.HOTEL_SINGLE_DETAIL_REQUEST,
      payload: data,
    };
  }
};



// gallery 
export const HotelRoomSelectSuccessGRN = (data) => {
  return {
    type: types.HOTEL_ROOMSELECT_SUCCESS,
    payload: data,
  }

};
export const HotelRoomSelectReqGRN = (data) => {
  if (data) {
    return {
      type: types.HOTEL_ROOMSELECT_REQUEST,
      payload: data,
    };
  }
};

export const hotelGallerySuccess = (data) => {
  if (data) {
    return {
      type: types.HOTEL_GALLERY_SUCCESS,
      payload: data,
    };
  }
};


export const hotelGalleryRequest = (data) => {
  return {
    type: types.HOTEL_GALLERY_REQUEST,
    payload: data,
  }

};
// gallery 



export const fetchBookRoomHotelGRN = (data) => {
  return {
    type: types.HOTEL_B0OKROOM_SUCCESSGRN,
    payload: data,
  };
};

export const hotelBookRoomActionGRN = (data) => {
  if (data) {
    return {
      type: types.HOTEL_B0OKROOM_REQUESTGRN,
      payload: data,
    };
  }
};

// Hotel bookin


export const clearHotelReducer = () => {
  return {
    type: types.CLEAR_HOTEL_REDUCERGRN,
  };
}
export const clearHotelBlockRoom = () => {
  return {
    type: types.CLEAR_HOTEL_BLOCK_ROOM,
  };
};

