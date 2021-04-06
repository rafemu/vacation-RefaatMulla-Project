import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { IVacation } from "../../../../interfaces";
import { getVacationsAction } from "../../../../store/async-actions/vacations";
import { IO_CONNECTION } from "../../../../config";

import { io } from "socket.io-client";
import { IAllState } from "../../../../App";
let socket: any;

export default function AdminPage() {
  const vacations: IVacation[] = useSelector(
    (store: IAllState) => store.mainReducer.vacations
  );

  const getLabels = vacations.map((v) => {
    return v.destination;
  });
  const getFollowers = vacations.map((v) => {
    return v.numberOfFollowers;
  });
  console.log(vacations);
  useEffect(() => {
    getVacationsAction();
  }, []);

  useEffect(() => {
    socket = io(IO_CONNECTION);
    socket.on("reloadPage", (data: any) => {
      console.log("reloadPage");
      getVacationsAction();
    });
  }, []);

  const data = {
    labels: getLabels,
    datasets: [
      {
        label: "# of Followers",
        fill: false,
        lineTension: 0.1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderWidth: 1,
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: getFollowers,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <div>
        <h2>Vacations v. Followers </h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
