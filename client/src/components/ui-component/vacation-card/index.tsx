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
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import css from "./style.module.css";
import { IVacation } from "../../../interfaces";
import moment from "moment";
import { BASE_URL } from "../../../config";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { getIsAdmin } from "../../../store/services/auth.service";
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
  })
);

export default function VacationCard(props: IVacation) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const isAdmin = getIsAdmin();
    if (!isAdmin) return;
    setIsAdmin(true);
  }, []);

  const imagePath = props.image?.split("/")[1];

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
              {isAdmin && (
                <div>
                  <IconButton aria-label="settings">
                    <DeleteForeverIcon />
                  </IconButton>
                  <IconButton aria-label="settings">
                    <EditIcon />
                  </IconButton>
                </div>
              )}
            </div>
          }
          title={props.destination}
          subheader={moment(props.createdAt).format("YYYY-MMM-DD")}
        />

        <CardMedia
          className={classes.media}
          image={BASE_URL + "/" + imagePath}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
