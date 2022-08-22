import axios from "axios";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const DELETE_COUNTRY = "DELETE_COUNTRY";

export function postActivity(activity) {
    return async function (dispatch) {
      return await axios
        .post("/activities", activity)
        .then((response) => {
          dispatch({
            type: POST_ACTIVITY,
            payload: response.data,
          });
        });
    };
  }
  
  export function deleteCountry(idCountry) {
    return async function (dispatch) {
      return await axios
        .delete(`/activities/deleteCountry/${idCountry}`)
        .then((response) => {
          dispatch({
            type: DELETE_COUNTRY,
            payload: response.data,
          });
        });
    };
  }