import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText} from "@testing-library/react";
import axios from 'axios';
import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
it("defaults to Monday and changes the schedule when a new day is selected", async() => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i ), {
      target: {value: "Lydia Miller-Jones"}
    })
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument()
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });


  it("loads data, books an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
  const { container} = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  // 3. Click the "delete" button on a booked appointment.
  fireEvent.click(getByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  // 4. Click on the trash icon
  // 5. Click confirm
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument()
  // 7. Wait until there is an empty slot displayed
  await waitForElement(() => getByAltText(appointment,"Add" ));
  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // We want to start by finding an existing interview.
     // 1. Render the Application.
  const { container} = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    // With the existing interview we want to find the edit button.
    fireEvent.click(getByAltText(appointment, "Edit"));
    // We change the name and save the interview.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i ), {
      target: {value: "Lydia Miller-Jones"}
    })
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument()
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    // We don't want the spots to change for "Monday", since this is an edit.
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    // Read the errors because sometimes they say that await cannot be outside of an async function.
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  })

  it("shows the save error when failing to save an appointment", () => {
    axios.delete.mockRejectedValueOnce();
  })


})
