import React from 'react';
import "components/Appointment";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error"

import './styles.scss';
import  useVisualMode  from "hooks/useVisualMode";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_DELETE = 'ERROR_DELETE';
  const ERROR_SAVE = 'ERROR_SAVE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => 
      {
        console.log("in error", error)
        transition(ERROR_SAVE,true)
      });
    
  }

  function onDelete(id) {
    // const interview = null;
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(()=> transition(EMPTY))
    .catch(error => transition(ERROR_DELETE,true));
  }
  (console.log("INTERVIEW:",props.interview))
  return (
  
   <article className='appointment' data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show 
        student={props.interview.student}
        interviewer={props.interview}
        onEdit={(id, interview) => transition(EDIT)}
        onDelete={(id) =>  transition(CONFIRM)}
        />
       
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onCancel = {() => back(EMPTY)}
        onSave = {(name,interviewer) => save(name, interviewer)}
        />
      )}
      {mode === SAVING && (
        <Status 
        message={'Saving'}
        />
      )
    }
    {
      mode === DELETING && (
        <Status 
        message={'Deleting'}
        />
      )
    }
    {
      mode === CONFIRM && (
        <Confirm 
         message={'Delete the appointment?'}
         onConfirm={() => onDelete(props.id)}
         onCancel={() => transition(SHOW)}
        />
      )
    }
    {
      mode === EDIT && (
        <Form 
        name = {props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel = {() => back(EMPTY)}
        onSave = {(name,interviewer) => save(name, interviewer)}
        />
        )
      }
      {
      mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment"
          onClose={() => back()}
        />
        )
      }
      {
      mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment"
          onClose={() => back()}
        />
        )
      }
  
   </article>
  );
}