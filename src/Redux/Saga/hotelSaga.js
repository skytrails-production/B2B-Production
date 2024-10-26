import { takeEvery, takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import {
  fetchBlockRoomHotel,
  fetchBookRoomHotel,
  fetchHotel,
  fetchRoomHotel,
  fetchSearchInfoHotel,
  HotelDetails,
} from "../Hotel/hotel";
import {
  HOTEL_B0OKROOM_REQUEST,
  HOTEL_BLOCKROOM_REQUEST,
  HOTEL_REQUEST,
  HOTEL_ROOM_REQUEST,
  HOTEL_SEARCH_INFO_REQUEST,
  HOTEL_DETAILS_REQUEST,
} from "../Hotel/hotelActionType";

function* hotelRequest(action) {
  try {
    const data = yield call(userApi.hotelSearch, action.payload);
    yield put(fetchHotel(data));
  } catch (error) {
    console.log(error);
  }
}

function* hotelSearchInfo(action) {
  try {
    const data = yield call(userApi.hotelSearchInfo, action.payload);
    yield put(fetchSearchInfoHotel(data));
  } catch (error) {
    console.log(error);
  }
}

function* hotelRoomRequest(action) {
  try {
    const data = yield call(userApi.hotelRoomInfo, action.payload);
    yield put(fetchRoomHotel(data));
  } catch (error) {
    console.log(error);
  }
}

function* hotelBlockRoomRequest(action) {
  try {
    const data = yield call(userApi.hotelBlockRoom, action.payload);
    yield put(fetchBlockRoomHotel(data));
  } catch (error) {
    console.log(error);
  }
}

// function* hotelBookRoomRequest(action) {
//   try {
//     const data = yield call(userApi.hotelBookRoom, action.payload);
//     // const getDetails = yield call(userApi.hotelBookingDetails,action?.payload[1] ); // Use hotelDetailsPayload

//     // console.error("check book response", data);
//     // console.error("getDetails", getDetails);

//     // yield put(fetchBookRoomHotel(data));

//     // if (data?.status === 200) {
//     //   alert("Reached");
//     //   yield put(HotelDetails(getDetails));
//     // }
//     yield put(fetchBookRoomHotel(data));
//   } catch (error) {
//     console.log(error);
//   }
// }

function* hotelBookRoomRequest(action) {
  try {
    // console.log("action:👍", action?.payload[1]);
    const data = yield call(userApi.hotelBookRoom, action?.payload[0]);

    // console.error("check book response", data);

    yield put(fetchBookRoomHotel(data));

    if (data?.status === 200) {
      const BookingId = data?.data?.data?.BookResult?.BookingId;
      const getDetails = yield call(userApi.hotelBookingDetails, {
        BookingId: BookingId,
        EndUserIp: action?.payload[1]?.EndUserIp,
        TokenId: action?.payload[1]?.TokenId,
      });
      // console.error("getDetails", getDetails);

      // console.error("BookingId", BookingId);

      const updatedGetDetails = {
        ...getDetails,
        data: {
          ...getDetails.data,
          data: {
            ...getDetails.data.data,
            GetBookingDetailResult: {
              ...getDetails.data.data.GetBookingDetailResult,
              BookingId: BookingId,
            },
          },
        },
      };

      // console.log("updatedGetDetails", updatedGetDetails);

      yield put(HotelDetails(updatedGetDetails));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* hotelSearchWatcher() {
  yield takeLatest(HOTEL_REQUEST, hotelRequest);
  yield takeLatest(HOTEL_SEARCH_INFO_REQUEST, hotelSearchInfo);
  yield takeLatest(HOTEL_ROOM_REQUEST, hotelRoomRequest);
  yield takeLatest(HOTEL_BLOCKROOM_REQUEST, hotelBlockRoomRequest);
  yield takeLatest(HOTEL_B0OKROOM_REQUEST, hotelBookRoomRequest);
}
