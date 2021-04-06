import React from "react";
import InputBase from "@material-ui/core/InputBase";

export default function Filter(props: any) {
  return (
    <InputBase
      placeholder="Search…"
      classes={{
        root: props.classes.inputRoot,
        input: props.classes.inputInput,
      }}
      inputProps={{ "aria-label": "search" }}
      onChange={(e) => {
        if (!e.target.value) return;
        props.onChange(e.target.value);
      }}
    />
  );
}
