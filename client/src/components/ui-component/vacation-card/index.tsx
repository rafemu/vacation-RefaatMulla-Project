import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import css from "./style.module.css";
import moment from "moment";
import { BASE_URL } from "../../../config";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { getIsAdmin } from "../../../store/services/auth.service";
import {
  deleteVacationByIdAction,
  editVacationAction,
  followVacationByIdAction,
} from "../../../store/async-actions/vacations";
import Swal from "sweetalert2";
import { ModalForm } from "../vacation-modal";
import withReactContent from "sweetalert2-react-content";
import { getPayload } from "../../../store/services/token.service";

import { FlightLand, FlightTakeoff } from "@material-ui/icons";
import { Badge } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
      marginTop: "20px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    follow: {
      color: "rbg(0, 0, 0, 0.54)",
      "&:hover": {
        color: red[500],
      },
    },
    isfollowed: {
      color: red[500],
    },
    square: {
      color: theme.palette.getContrastText(red[500]),
      backgroundColor: red[500],
      position: "relative",
      top: "-20px",
      left: "81%",
      padding: "2px 10px",
      borderRadius: "50%",
    },
  })
);

const MySwal = withReactContent(Swal);
const showFormModal = (values: any) => {
  return new Promise((resolve, reject) => {
    MySwal.fire({
      html: (
        <ModalForm
          title={"Edit vacation!"}
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

export default function VacationCard(props: any) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const currentUser = getPayload();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const isAdmin = getIsAdmin();
    if (!isAdmin) return;
    setIsAdmin(true);
  }, []);

  useEffect(() => {
    const followers = props.followerUsers;
    const splitFollowers = followers.split(",");
    const isFollow = splitFollowers.find((f: any) => {
      return Number(f) === currentUser.data.id;
    });
    currentUser.data.id === Number(isFollow)
      ? setIsFollowed(true)
      : setIsFollowed(false);
  }, [props]);

  // const favIcon = isFollowed ? (
  //   <FavoriteIcon className={classes.isfollowed} />
  // ) : (
  //   <FavoriteIcon className={classes.follow} />
  // );

  const handelFollowVacation = () => {
    const follow = followVacationByIdAction(props.id);
    if (follow) {
      props.socket.emit("reload", {});
    }
  };
  const handelDeleteVacation = () => {
    Swal.fire({
      title: `Are you sure you want to delete ${props.destination} - Vacation ?`,
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteVacation = deleteVacationByIdAction(Number(props.id));
        if (deleteVacation) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          props.socket.emit("reload", {});
        }
      }
    });
    //const deleteVacation = deleteVacationByIdAction(Number(props.id));
  };

  const handelEditVacation = () => {
    showFormModal({
      destination: props.destination,
      description: props.description,
      startAt: moment(props.startAt).format("YYYY-MM-DD"),
      endAt: moment(props.endAt).format("YYYY-MM-DD"),
      price: props.price,
      file: props.image,
    })
      .then((values) => {
        editVacationAction(Number(props.id), values).then((done) => {
          props.socket.emit("reload", {});
          Swal.fire("Edited!", "Your Vacation has been Edited.", "success");
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const imagePath = props.image?.split("/")[1];

  const timeAgo = (time: Date) => {
    // moment.locale('ar-eg');
    return moment(time).fromNow();
  };
  const getFirstLatterOfdes = props.destination.charAt(0).toLocaleUpperCase();

  return (
    <div className={css.vacationCardView}>
      <Card className={classes.root}>
        <CardHeader
          className={css.title}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {getFirstLatterOfdes}
            </Avatar>
          }
          action={
            <div>
              {!isAdmin && (
                <IconButton
                  aria-label="settings"
                  onClick={handelFollowVacation}
                >
                  <Badge
                    color="secondary"
                    badgeContent={props.numberOfFollowers}
                    showZero
                  >
                    {isFollowed ? (
                      <FavoriteIcon className={classes.isfollowed} />
                    ) : (
                      <FavoriteIcon className={classes.follow} />
                    )}
                  </Badge>
                </IconButton>
              )}
              {isAdmin && (
                <div>
                  <IconButton
                    aria-label="settings"
                    onClick={handelDeleteVacation}
                  >
                    <DeleteForeverIcon className={classes.follow} />
                  </IconButton>
                  <IconButton
                    aria-label="settings"
                    onClick={handelEditVacation}
                  >
                    <EditIcon className={classes.follow} />
                  </IconButton>
                </div>
              )}
            </div>
          }
          title={props.destination}
          subheader={timeAgo(props.createdAt)}
        />

        <CardMedia
          className={classes.media}
          image={BASE_URL + "/" + imagePath}
          title="Paella dish"
        />
        <Avatar variant="square" className={classes.square}>
          {props.price}$
        </Avatar>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <div className={css.flightSection}>
            <div className={css.flightDiv}>
              <FlightLand />
              <br />({moment(props.start).format("YY-MMM-DD")})
            </div>
            <div className={css.flightDiv}>
              <FlightTakeoff />
              <br />({moment(props.endAt).format("YY-MMM-DD")})
            </div>
          </div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{props.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>{" "}
    </div>
  );
}
