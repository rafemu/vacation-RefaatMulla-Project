import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IVacation } from "../../../../interfaces";
import { getVacationsAction } from "../../../../store/async-actions/vacations";
import VacationCard from "../../../ui-component/vacation-card";
import css from "./style.module.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Button,
  createStyles,
  Divider,
  makeStyles,
  Theme,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getIsAdmin } from "../../../../store/services/auth.service";
import { ModalForm } from "../../../ui-component/vacation-modal";
import { addNewVacationsService } from "../../../../store/services/vacations.service";
import { IO_CONNECTION } from "../../../../config";

import { io } from "socket.io-client";
import moment from "moment";
import { IAllState } from "../../../../App";

let socket: any;
const MySwal = withReactContent(Swal);
const showFormModal = (values: any) => {
  return new Promise((resolve, reject) => {
    MySwal.fire({
      html: (
        <ModalForm
          title={"Add new "}
          values={values}
          onSubmit={(values: any) => {
            resolve(values);
            Swal.close();
          }}
          onCancel={() => {
            reject();
            Swal.close();
          }}
        />
      ),
      willClose: () => reject(),
      showConfirmButton: false,
    });
  });
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: "5vh auto",
      color: "white",
      backgroundColor: "#f44336",
      width: "30vh",
    },
  })
);
export default function VacationsPage() {
  const classes = useStyles();
  const isAdmin = getIsAdmin();

  const vacations: IVacation[] = useSelector(
    (store: IAllState) => store.mainReducer.vacations
  );

  useEffect(() => {
    getVacationsAction();
  }, []);

  useEffect(() => {
    socket = io(IO_CONNECTION);
    socket.on("reloadPage", (data: any) => {
      setTimeout(() => {
        getVacationsAction();
      }, 500);
    });
  }, []);

  const showModal = () => {
    showFormModal({
      destination: "",
      description: "",
      startAt: moment(new Date()).format("YYYY-MM-DD"),
      endAt: moment(new Date()).format("YYYY-MM-DD"),
      price: "",
      file: undefined,
    })
      .then((values) => {
        const addVacation = addNewVacationsService(values).then((done) => {
          socket.emit("reload", {});
          Swal.fire("Added!", "Your Vacation has been added.", "success");
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {isAdmin && (
        <div className={css.btnAddVacation}>
          <h1 className={css.welcomeTitle}>Welcome Admin</h1>
          <Button
            variant="contained"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={showModal}
          >
            Add New Vacation
          </Button>
          <Divider variant="middle" />
        </div>
      )}
      <div>
        <h1 style={{ textAlign: "center" }}> Vacations </h1>
      </div>

      {vacations.length === 0 && (
        <div style={{ textAlign: "center" }}>No Vacations </div>
      )}
      <div className={css.vacationCardView}>
        {vacations.map((vacation: IVacation) => (
          <VacationCard key={vacation.id} {...vacation} socket={socket} />
        ))}
      </div>
    </div>
  );
}
