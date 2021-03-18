import React, { useState } from "react";

import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export function ModalForm(props: any): any {
  const vacationFeild: any = {
    destination: "",
    description: "",
    startAt: "",
    endAt: "",
    price: "",
    file: "",
  };
  const [vacationDetails, setVacationDetails] = useState(vacationFeild);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  function onChangeVacation(key: string, value: any) {
    setVacationDetails({ ...vacationDetails, [key]: value });
  }

  return (
    <div>
      <div>{props.title}</div>
      <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <TextField
            label="Destination"
            fullWidth
            // required
            type="text"
            name="destination"
            onChange={(event) => {
              onChangeVacation(event?.target.name, event?.target.value);
            }}
          />
          <TextField
            label="description"
            fullWidth
            type="text"
            name="description"
            onChange={(event) => {
              onChangeVacation(event?.target.name, event?.target.value);
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            fullWidth
            label="from"
            format="MM/dd/yyyy"
            value={selectedDate}
            name="startAt"
            onChange={(date: Date | null, event) => {
              onChangeVacation("from", event);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />{" "}
          <KeyboardDatePicker
            margin="normal"
            fullWidth
            label="to"
            format="MM/dd/yyyy"
            value={selectedDate}
            name="endAt"
            onChange={(date: Date | null, event) => {
              onChangeVacation("endAt", event);
            }}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <TextField
            label="price"
            fullWidth
            type="number"
            name="price"
            onChange={(event) => {
              onChangeVacation(event?.target.name, event?.target.value);
            }}
          />
          {/* <TextField
            label="photo"
            fullWidth
            required
            type="file"
            name="image"
            onChange={(event) => {
              onChangeVacation(event?.target.name, event?.target.value);
            }}
          /> */}
        </MuiPickersUtilsProvider>
        <button type="submit" className="swal2-confirm swal2-styled">
          OK
        </button>
        <button onClick={props.onCancel} className="swal2-cancel swal2-styled">
          Cancel
        </button>
      </form>
    </div>
  );
}
