import React from "react";
import PropTypes from "prop-types";

import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const listArr = props.interviewers.map((inter) => {
    return (
      <InterviewerListItem
        key={inter.id}
        name={inter.name}
        avatar={inter.avatar}
        selected={inter.id === props.value}
        setInterviewer={(event) => props.onChange(inter.id)}
      />
    );
  });
  return (
    <section>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listArr}</ul>
    </section>
  );
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;