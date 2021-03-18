import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from "formik";

import { Input, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export function ModalForm(props: any) {
  const { title, values, onChange, onSubmit, onCancel } = props;

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
                  <input
                    value={values.startAt}
                    onChange={handleChange}
                    type="Date"
                    name="startAt"
                    placeholder="startAt"
                  />
                  {/* <KeyboardDatePicker
                  margin="normal"
                  fullWidth
                  label="from"
                  format="MM/dd/yyyy"
                  name="startAt"
                  type="Date"
                  value={values.startAt}
                  onChange={handleChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />

                <KeyboardDatePicker
                  id="date-picker-dialog"
                  label="Date picker dialog"
                  inputVariant="outlined"
                  format="MM/dd/yyyy"
                  value={values.startAt}
                  onChange={handleChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                /> */}
                </div>
                <div>
                  <input
                    value={values.endAt}
                    onChange={handleChange}
                    type="Date"
                    name="endAt"
                    placeholder="endAt"
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
                  {/* <Input
                    fullWidth
                    type="file"
                    name="file"
                    onChange={(event) => {
                      //setFieldValue("file", event.target.files[0]);
                    }}
                  /> */}
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
