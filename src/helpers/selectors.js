export function getAppointmentsForDay(state, day) {
  console.log("STATE , DAY:",state,day);
    const filteredDays = state.days.filter( dayObj => dayObj.name === day);
    const matchingArray = [];

    for(const key in state.appointments) {
      for(const key2 of filteredDays) {
        for(let i = 0; i < key2.appointments.length; i++) {
          
          if(Number(key) === key2.appointments[i]) {
            matchingArray.push(state.appointments[key]);
          }
        }
      }
    }
    console.log("matching arr:",matchingArray);
    return matchingArray;
}

export function getInterview(state, interview) {
  if(!interview) {
    return null;
  }
  const interviewObject = {};
  for(const key in state.interviewers) {
    if(Number(key) === interview.interviewer) {
      interviewObject['student']= interview.student
      interviewObject['interviewer'] = state.interviewers[key];
      }

    }

    
      return interviewObject;

}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter( dayObj => dayObj.name === day);
  const matchingArray = [];

  for(const key in state.interviewers) {
    for(const key2 of filteredDays) {
      for(let i = 0; i < key2.interviewers.length; i++) {
        
        if(Number(key) === key2.interviewers[i]) {
          matchingArray.push(state.interviewers[key]);
        }
      }
    }
  }
  return matchingArray;
}