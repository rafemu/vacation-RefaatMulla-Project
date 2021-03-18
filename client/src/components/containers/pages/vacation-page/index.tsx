import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IVacation } from "../../../../interfaces";
import getVacationsAction from "../../../../store/async-actions/vacations";
import { IState } from "../../../../store/reducers/mainReducers";
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
const MySwal = withReactContent(Swal);
const showFormModal = (values: any) => {
  return new Promise((resolve, reject) => {
    MySwal.fire({
      html: (
        <ModalForm
          title={"Add new vacation!"}
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
    (store: IState) => store.vacations
  );
  useEffect(() => {
    getVacationsAction();
  }, []);

  const showModal = () => {
    showFormModal({
      destination: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      price: "",
      file: "",
    })
      .then((values) => {
        console.log(values);
        const addVacation = addNewVacationsService(values);
      })
      .catch((e) => {
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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
        <h1> Vacations </h1>
      </div>

      <div className={css.vacationCardView}>
        {vacations.map((vacation: IVacation) => (
          <VacationCard key={vacation.id} {...vacation} />
        ))}
      </div>
    </div>
  );
}
