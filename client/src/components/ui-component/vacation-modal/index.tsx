import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import css from "./style.module.css";

import { TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import { BASE_URL } from "../../../config";
import * as Yup from "yup";
import CustomImageInput from "./CustomImageInput";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const VacationSchema = Yup.object().shape({
  access: Yup.number().nullable(),
  destination: Yup.string()
    .required("Destination is required")
    .min(3, "Destination Too Short!")
    .max(250, "Destination Too Long!"),
  description: Yup.string()
    .required("Description is required")
    .min(3, "Description Too Short!"),
  startAt: Yup.date(),
  endAt: Yup.date().min(
    Yup.ref("startAt"),
    "end date can't be before start date"
  ),
  price: Yup.number().required("price is required"),
  file: Yup.mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

export function ModalForm(props: any) {
  const { title, values, onSubmit, onCancel } = props;
  const imagePath = values.file?.split("/")[1];
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const validateDates = () => {
    if (start > end) return true;
    return false;
  };
  return (
    <div>
      <h3 className={css.error}>{title} Vacation</h3>

      <Formik
        initialValues={values}
        onSubmit={onSubmit}
        validationSchema={VacationSchema}
        render={({
          isValid,
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => {
          return (
            <Form>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div>
                  <Field
                    as={TextField}
                    label="Destination"
                    value={values.destination}
                    fullWidth
                    required
                    type="text"
                    name="destination"
                    onChange={handleChange}
                    helperText={
                      <ErrorMessage
                        component="div"
                        className={css.error}
                        name="destination"
                      />
                    }
                  />
                </div>
                <div>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage
                        component="div"
                        className={css.error}
                        name="description"
                      />
                    }
                    label="description"
                    fullWidth
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Field
                    as={KeyboardDatePicker}
                    inputVariant="outlined"
                    margin="normal"
                    fullWidth
                    label="startAt"
                    format="MM/dd/yyyy"
                    value={values.startAt}
                    onChange={(date: any) => {
                      setStart(moment(date).format("YYYY-MM-DD"));
                      setFieldValue(
                        "startAt",
                        moment(date).format("YYYY-MM-DD")
                      );
                    }}
                  />
                </div>
                <div>
                  <Field
                    as={KeyboardDatePicker}
                    fullWidth
                    inputVariant="outlined"
                    label="To"
                    format="MM/dd/yyyy"
                    value={values.endAt}
                    onChange={(date: Date) => {
                      setEnd(moment(date).format("YYYY-MM-DD"));
                      setFieldValue("endAt", moment(date).format("YYYY-MM-DD"));
                    }}
                    validate={validateDates}
                  />
                  {errors.endAt && touched.endAt ? (
                    <div className={css.error}>{errors.endAt}</div>
                  ) : (
                    <div className={css.error}>{errors.endAt}</div>
                  )}
                </div>
                <div>
                  <Field
                    as={TextField}
                    helperText={
                      <ErrorMessage
                        component="div"
                        className={css.error}
                        name="price"
                      />
                    }
                    label="price"
                    fullWidth
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  {title === "Edit" && (
                    <img
                      width="100%"
                      alt="current photo"
                      src={BASE_URL + "/" + imagePath}
                    />
                  )}
                </div>
                {/* <div>
                  <Input
                    type="file"
                    name="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("file", e.target.files![0]!);
                    }}
                  />
                </div> */}
                <Field
                  name="file"
                  component={CustomImageInput}
                  title="Select a file"
                  setFieldValue={setFieldValue}
                  errorMessage={errors["file"] ? errors["file"] : undefined}
                  touched={touched["file"]}
                  style={{ display: "flex" }}
                  onBlur={handleBlur}
                />

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
