import { takeLatest, call, put } from "redux-saga/effects";
import userApi from "../API/api";
import {
    // HotelDetails,
    // fetchBlockRoomHotel,
    fetchBookRoomHotelGRN,
    fetchHotel,
    singleHotelSuccess,
    // fetchRoomHotel,
    HotelRoomSelectSuccessGRN,
    hotelGallerySuccess,
    // fetchSearchInfoHotel,
} from "../HotelGrn/hotel";
import { HOTEL_REQUEST_GRN, HOTEL_ROOMSELECT_REQUEST,HOTEL_SINGLE_DETAIL_REQUEST, HOTEL_GALLERY_REQUEST,HOTEL_B0OKROOM_REQUESTGRN } from "../HotelGrn/hotelActionType";
function* hotelRequest(action) {
    try {
        const data = yield call(userApi.hotelSearchGRN, action.payload);
        yield put(fetchHotel(data));
    } catch (error) {
        console.log(error);
    }
}
function* hotelSingleDetails(action) {
    try {
        const data = yield call(userApi.hotelBookRoomGRN, action.payload);
        yield put(singleHotelSuccess(data));
    } catch (error) {
        console.log(error);
    }
}
function* hotelSelectRoom(action) {
    try {
        const data = yield call(userApi.hotelsingleDataGRN, action.payload);
        yield put(HotelRoomSelectSuccessGRN(data));
    } catch (error) {
        console.log(error);
    }
}
function* hotelGallery(action) {
    try {
        const data = yield call(userApi.hotelGalleryGRN, action.payload);
        yield put(hotelGallerySuccess(data));
    } catch (error) {
        console.log(error);
    }
}


function* hotelBookRoomRequest(action) {
    try {
        const data = yield call(userApi.hotelBookingGRN, action.payload);
        yield put(fetchBookRoomHotelGRN(data));
    } catch (error) {
        console.log(error);
    }
}




export function* hotelSearchWatcherGRN() {
    yield takeLatest(HOTEL_REQUEST_GRN, hotelRequest);
    yield takeLatest(HOTEL_SINGLE_DETAIL_REQUEST, hotelSingleDetails);
    yield takeLatest(HOTEL_GALLERY_REQUEST, hotelGallery);
    yield takeLatest(HOTEL_ROOMSELECT_REQUEST, hotelSelectRoom);
    yield takeLatest(HOTEL_B0OKROOM_REQUESTGRN, hotelBookRoomRequest);

}
