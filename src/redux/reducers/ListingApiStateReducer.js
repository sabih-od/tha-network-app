import apiAction from '../../api/apiAction';
import { AboutAPI, AddPostToHistoryAPI, AddToFavouriteListAPI, ContactAPI, CreatePostAPI, GetAnnouncementAPI, GetBooksAPI, GetCategoriesAPI, GetDailiesListAPI, GetEventsAPI, GetFavouriteIdsAPI, GetFavouriteListAPI, GetFeaturedListAPI, GetHistoryListAPI, GetHomeBannerAPI, GetMenuAPI, GetNotificationsAPI, GetOurSpeakerAPI, GetOurStaffAPI, GetPostByCategoryIdAPI, GetPostByCategoryIdScreenWiseAPI, GetPostsAPI, GetQuestionsAPI, GetRequestedPrayerAPI, GetSermonsAPI, GetUpcomingEventsAPI, GetWeeklyGoalsAPI, RequestPrayerAPI, SendAskAQuestionAPI, } from '../../api/routes';
import { ABOUT_API_SUCCESS, CREATE_POST_SUCCESS, ADD_TO_FAVOURITE_LIST_SUCCESS, CLEAR_POST_LIST_SUCCESS, CONTACT_API_ERROR, CONTACT_API_SUCCESS, GET_ANNOUNCEMENT_API_SUCCESS, GET_WEEKLY_GOALS, GET_BOOKS_API_SUCCESS, GET_CDS_API_SUCCESS, GET_DAILIES_LIST_SUCCESS, GET_EVENTS_API_SUCCESS, GET_FAVOURITE_IDS_SUCCESS, GET_FAVOURITE_LIST_SUCCESS, GET_FEATURED_LIST_SUCCESS, GET_HISTORY_LIST_SUCCESS, GET_HOME_NEWS_LIST_SUCCESS, GET_NOTIFICATIONS_API_SUCCESS, GET_OUR_SPEAKER_API_SUCCESS, GET_OUR_STAFF_API_SUCCESS, GET_POSTS_API_SUCCESS, GET_POST_BY_CATEGORY_ID_SUCCESS, GET_HOME_BIBLICAL_DATA_SUCCESS, GET_REQUESTED_PRAYER_API_SUCCESS, GET_SEARCH_POST_API_SUCCESS, GET_SERMONS_API_SUCCESS, GET_UPCOMING_EVENTS_API_SUCCESS, HOME_BANNER_API_SUCCESS, LOGOUT_USER, REQUEST_PRAYER_API_SUCCESS, SEND_ASK_A_QUESTION, SET_DRAWER_MENU, SET_ERROR, GET_HOME_SPIRITUAL_DATA_SUCCESS, GET_HOME_AUDIO_DATA_SUCCESS, GET_HOME_AUDIO_NO_DATA_SUCCESS, } from '../actiontypes';

const initialState = {
  getWeeklyGoalsResponse: {},
  sendAskAQuestionsResponse: {},
  getPostsListResponse: {},
  // getEventsListResponse: {},
  // getUpcomingEventsListResponse: {},
  // getOurStaffListResponse: {},
  // getOurSpeakersListResponse: {},
  // getRequestedPrayersListResponse: {},
  getNotificationsListResponse: {},
  // getAnnouncementResponse: {},
  // getBooksListResponse: {},
  // requestPrayerResponse: {},
  contactResponse: {},
  contactErrorResponse: {},
  aboutResponse: {},
  getPostByCategoryIdResponse: {},
  addToFavouriteListResponse: {},
  getToFavouriteListResponse: {},
  getToFavouriteIdsResponse: [],
  getToFeaturedListResponse: {},
  createPostResponse: {},
  getHistoryListResponse: {},
  getSearchPostResponse: {},

  getHomeNewsListResponse: {},
  getDailiesListResponse: {},
  getHomeBiblicalDataResponse: {},
  getHomeAudioDataResponse: {},
  getHomeSpiritualDataResponse: {},
  getHomeAudioNoDataResponse: {},

  errorResponse: {},
  drawerMenu: []
};


export function GetPostsList() {
  // console.log('params => ', params);
  console.log('GetPostsList => ', GetPostsAPI); // + '?page=' + params.page + '&limit=' + params.limit + '&category_id=' + params.category_id)
  return apiAction({
    url: GetPostsAPI, //+ '?page=' + params.page + '&limit=' + params.limit + '&category_id=' + params.category_id,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_POSTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}


// export function GetCDsList(params) {
//   console.log('params => ', params);
//   console.log('GetCDsList => ', GetPostsAPI + '?page=' + params.page + '&limit=' + params.limit + '&category_id=' + params.category_id)
//   return apiAction({
//     url: GetPostsAPI + '?page=' + params.page + '&limit=' + params.limit + '&category_id=' + params.category_id,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_CDS_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

export function ClearPostList() {
  return { type: CLEAR_POST_LIST_SUCCESS, payload: {} };
}

// export function GetAnnouncementList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetAnnouncementAPI + '?page=' + params.page + '&limit=' + params.limit,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_ANNOUNCEMENT_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetEventsList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetEventsAPI + '?page=' + params.page + '&limit=' + params.limit + '&is_upcoming_event=false',
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_EVENTS_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetUpcomingEventsList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetUpcomingEventsAPI + '?page=' + params.page + '&limit=' + params.limit + '&is_upcoming_event=true',
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_UPCOMING_EVENTS_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetOurStaffList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetOurStaffAPI + '?page=' + params.page + '&limit=' + params.limit,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_OUR_STAFF_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetOurSpeakerList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetOurSpeakerAPI + '?page=' + params.page + '&limit=' + params.limit,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_OUR_SPEAKER_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetBooksList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetBooksAPI + '?page=' + params.page + '&limit=' + params.limit,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_BOOKS_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetRequestedPrayersList(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetRequestedPrayerAPI + '?page=' + params.page + '&limit=' + params.limit,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_REQUESTED_PRAYER_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

export function GetNotificationsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url:
      GetNotificationsAPI + '?page=' + params.page + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_NOTIFICATIONS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

// export function RequestPrayerApiCall(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: RequestPrayerAPI,
//     method: 'POST',
//     data: params,
//     onSuccess: response => {
//       return { type: REQUEST_PRAYER_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

export function ContactApiCall(params) {
  // console.log('params => ', params);
  return apiAction({
    url: ContactAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: CONTACT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: CONTACT_API_ERROR, payload: response };
    },
  });
}

export function AboutApiCall() {
  // console.log('params => ', params);
  return apiAction({
    url: AboutAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: ABOUT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

// export function GetHomeBanner() {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetHomeBannerAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: HOME_BANNER_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

export function GetWeeklyGoals() {
  // console.log('params => ', params);
  return apiAction({
    url: GetWeeklyGoalsAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_WEEKLY_GOALS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

// export function GetDrawerMenu() {
//   return apiAction({
//     url: GetMenuAPI,
//     method: 'GET',
//     onSuccess: response => {
//       return { type: SET_DRAWER_MENU, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function SendAskAQuestion(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: SendAskAQuestionAPI,
//     method: 'POST',
//     data: params,
//     onSuccess: response => {
//       return { type: SEND_ASK_A_QUESTION, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetPostByCategoryId(params) {
//   return apiAction({
//     url: GetPostByCategoryIdAPI + '/' + params.id,
//     method: 'GET',
//     data: params,
//     onSuccess: response => {
//       return { type: GET_POST_BY_CATEGORY_ID_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetPostByCategoryScreenWiseId(params) {
//   return apiAction({
//     url: GetPostByCategoryIdScreenWiseAPI + '?category_id=' + params.id,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_POST_BY_CATEGORY_ID_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }


// export function GetPostWithOutTypeByCategoryId(params) {
//   return apiAction({
//     url: GetPostByCategoryIdAPI + '/' + params.id,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HOME_BIBLICAL_DATA_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetHomeBiblicalData() {
//   return apiAction({
//     url: GetPostByCategoryIdAPI + '/9',
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HOME_BIBLICAL_DATA_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetHomeSpiritualData() {
//   return apiAction({
//     url: GetPostByCategoryIdAPI + '/8',
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HOME_SPIRITUAL_DATA_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }
// export function GetHomeAudioData() {
//   return apiAction({
//     // url: GetPostByCategoryIdAPI + '/8',
//     url: GetPostsAPI + '?page=' + 1 + '&limit=' + 5 + '&category_id=' + 10,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HOME_AUDIO_NO_DATA_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }


// export function GetFavouriteList() {
//   return apiAction({
//     url: GetFavouriteListAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_FAVOURITE_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetFavouriteIds(params) {
//   return apiAction({
//     url: GetFavouriteIdsAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_FAVOURITE_IDS_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function AddToFavouriteList(params) {
//   return apiAction({
//     url: AddToFavouriteListAPI + '/' + params.id,
//     method: 'POST',
//     // data: params,
//     onSuccess: response => {
//       return { type: ADD_TO_FAVOURITE_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetFeaturedList(params) {
//   return apiAction({
//     url: GetFeaturedListAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_FEATURED_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

export function CreatePostHit(data) {
  return apiAction({
    url: CreatePostAPI,
    method: 'POST',
    data: data,
    onSuccess: response => {
      return { type: CREATE_POST_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

// export function GetHistoryList(params) {
//   return apiAction({
//     url: GetHistoryListAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HISTORY_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetDailiesList(params) {
//   return apiAction({
//     url: GetDailiesListAPI,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_DAILIES_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetHomeNewsList(params) {
//   return apiAction({
//     url: GetPostsAPI + '?page=1&limit=10&category_id=11',
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_HOME_NEWS_LIST_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

// export function GetSearchPost(params) {
//   // console.log('params => ', params);
//   return apiAction({
//     url: GetPostsAPI + '?page=' + params.page + '&limit=' + params.limit + '&title=' + params.title,
//     method: 'GET',
//     // data: params,
//     onSuccess: response => {
//       return { type: GET_SEARCH_POST_API_SUCCESS, payload: response };
//     },
//     onFailure: response => {
//       return { type: SET_ERROR, payload: response };
//     },
//   });
// }

const ListingApiStateReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_WEEKLY_GOALS:
      return Object.assign({}, state, {
        getWeeklyGoalsResponse: action.payload,
      });
    case SEND_ASK_A_QUESTION:
      return Object.assign({}, state, {
        sendAskAQuestionsResponse: action.payload,
      });
    case GET_POSTS_API_SUCCESS:
      return Object.assign({}, state, {
        getPostsListResponse: action.payload,
      });
    case GET_CDS_API_SUCCESS:
      return Object.assign({}, state, {
        getCDsListResponse: action.payload,
      });
    case CLEAR_POST_LIST_SUCCESS:
      return Object.assign({}, state, {
        getPostsListResponse: action.payload,
      });
    case GET_NOTIFICATIONS_API_SUCCESS:
      return Object.assign({}, state, {
        getNotificationsListResponse: action.payload,
      });
    case CONTACT_API_SUCCESS:
      return Object.assign({}, state, {
        contactResponse: action.payload,
      });
    case CONTACT_API_ERROR:
      return Object.assign({}, state, {
        contactErrorResponse: action.payload,
      });
    case GET_POST_BY_CATEGORY_ID_SUCCESS:
      return Object.assign({}, state, {
        getPostByCategoryIdResponse: action.payload,
      });
    case GET_HOME_BIBLICAL_DATA_SUCCESS:
      return Object.assign({}, state, {
        getHomeBiblicalDataResponse: action.payload,
      });
    case GET_HOME_SPIRITUAL_DATA_SUCCESS:
      return Object.assign({}, state, {
        getHomeSpiritualDataResponse: action.payload,
      });
    case GET_HOME_AUDIO_NO_DATA_SUCCESS:
      return Object.assign({}, state, {
        getHomeAudioNoDataResponse: action.payload,
      });
    case ADD_TO_FAVOURITE_LIST_SUCCESS:
      return Object.assign({}, state, {
        addToFavouriteListResponse: action.payload,
      });
    case GET_FAVOURITE_LIST_SUCCESS:
      return Object.assign({}, state, {
        getToFavouriteListResponse: action.payload,
      });
    case GET_FAVOURITE_IDS_SUCCESS:
      return Object.assign({}, state, {
        getToFavouriteIdsResponse: action.payload,
      });
    case GET_FEATURED_LIST_SUCCESS:
      return Object.assign({}, state, {
        getToFeaturedListResponse: action.payload,
      });
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, {
        createPostResponse: action.payload,
      });
    case GET_HISTORY_LIST_SUCCESS:
      return Object.assign({}, state, {
        getHistoryListResponse: action.payload,
      });
    case GET_DAILIES_LIST_SUCCESS:
      return Object.assign({}, state, {
        getDailiesListResponse: action.payload,
      });
    case GET_SEARCH_POST_API_SUCCESS:
      return Object.assign({}, state, {
        getSearchPostResponse: action.payload,
      });
    case GET_HOME_NEWS_LIST_SUCCESS:
      return Object.assign({}, state, {
        getHomeNewsListResponse: action.payload,
      });
    case SET_DRAWER_MENU:
      return Object.assign({}, state, {
        drawerMenu: action.payload,
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        errorResponse: action.payload,
      });
    case LOGOUT_USER:
      return initialState
    default:
      return state;
  }
};

export default ListingApiStateReducer;