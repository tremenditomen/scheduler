import React, {useReducer, useEffect} from "react";
import "components/Application.scss";
import 'components/Appointment';
import axios from 'axios';
import updateSpots from 'helpers/updateSpot';
import reducer, { SET_APPLICATION_DATA, SET_DAY, SET_INTERVIEW} from '../reducers/application';

export default function useApplicationData() {
  
  
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.delete(
      `/api/appointments/${appointment.id}`
      
    )
    .then(() => {
      dispatch({ type: SET_INTERVIEW, value: {appointments, days: updateSpots(state.day,state.days, 1)}})
      
    }
    
    )
    
  }
  
  function bookInterview(id, interview) {
    console.log("BOOK:",interview)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(
      `/api/appointments/${appointment.id}`,
       {
        interview
      }
      // method: "put"
    )
  
    .then(() => {
      dispatch({ type: SET_INTERVIEW, value: {appointments, days: updateSpots(state.day,state.days, -1)}})
       
      }
    )
}
  
const initialState = {
  
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
  
}


const setDay = (day) => {
  dispatch({ type: SET_DAY, value: {day} }) 
}

 

  const [state,dispatch] = useReducer(reducer,initialState);

  
  useEffect(() => {
    let daysURL = "/api/days";
    let apptsURL = "/api/appointments";
    let intervURL = "/api/interviewers";
    
    const promiseDays = axios.get(daysURL);
    const promiseAppts = axios.get(apptsURL);
    const promiseInterviewers = axios.get(intervURL);
    Promise.all([
      Promise.resolve(promiseDays), 
      Promise.resolve(promiseAppts),
      Promise.resolve(promiseInterviewers)
    ])
    .then(([{data: days}, {data: appointments}, {data: interviewers}]) => {
      dispatch({ type: SET_APPLICATION_DATA, value: {days, appointments, interviewers} }) 

    })
  },[]);


  return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }

  }