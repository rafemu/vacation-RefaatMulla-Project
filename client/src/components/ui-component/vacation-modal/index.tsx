import React from "react";
import { Formik, Form } from "formik";

import { Input, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { BASE_URL } from "../../../config";

export function ModalForm(props: any) {
  const { title, values, onChange, onSubmit, onCancel } = props;
  const imagePath = values.file?.split("/")[1];
  return (
    <div>
      <h3>{title}</h3>

      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        render={({ isValid, errors, values, handleChange, setFieldValue }) => {
          return (
            <Form>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                  <TextField
                    label="Destination"
                    value={values.destination}
                    fullWidth
                    required
                    type="text"
                    name="destination"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <TextField
                    label="description"
                    fullWidth
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    id="date-picker-dialog"
                    label="startAt"
                    format="MM/dd/yyyy"
                    value={values.startAt}
                    onChange={(date) => {
                      console.log(date);
                      console.log(moment(date).format("YYYY-MM-DD"));
                      setFieldValue(
                        "startAt",
                        moment(date).format("YYYY-MM-DD")
                      );
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </div>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    fullWidth
                    id="date-picker-dialog"
                    label="endAt"
                    format="MM/dd/yyyy"
                    value={values.endAt}
                    onChange={(date) =>
                      setFieldValue("endAt", moment(date).format("YYYY-MM-DD"))
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </div>
                <div>
                  <TextField
                    label="price"
                    fullWidth
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <img
                    width="100%"
                    // className={classes.media}
                    src={BASE_URL + "/" + imagePath}
                  />
                </div>
                <div>
                  <Input
                    type="file"
                    name="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("file", e.target.files![0]!);
                    }}
                  />
                </div>
                <div
                  className="swal2-actions"
                  style={{ display: "flex", fontSize: "0.9em" }}
                >
                  <button
                    disabled={!isValid}
                    type="submit"
                    className="swal2-confirm swal2-styled"
                    style={{
                      backgroundColor: "#f44336",
                    }}
                  >
                    OK
                  </button>
                  <button
                    onClick={onCancel}
                    type="button"
                    className="swal2-cancel swal2-styled"
                    style={{
                      display: "inline-block",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </MuiPickersUtilsProvider>
            </Form>
          );
        }}
      />
    </div>
  );
}
