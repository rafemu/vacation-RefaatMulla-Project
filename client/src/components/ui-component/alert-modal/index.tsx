import React from "react";
import Swal from "sweetalert2";

export default function alert(props: string) {
  const alert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will have Admin Privileges",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    });
  };
  return <div></div>;
}
