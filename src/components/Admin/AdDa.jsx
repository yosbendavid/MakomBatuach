import React, { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

function AdDa() {

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Ugly Chart',
            },
        },
        scales: {
            y: {
                ticks: {stepSize:1},
            }
        }
    };



    const [labels, setLables] = useState([]);
    const [chartdata, setchartData] = useState([]);

    const handleresult = () => {
        const tryget = "https://localhost:44380/api/DaAllTher";
        fetch(tryget,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Toype": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
            })
            .then((res) => {
                console.log("res=", res);
                console.log("res.status", res.status);
                console.log("res.ok", res.ok);
                return res.json();
            })
            .then(
                (result) => {
                    console.log(result);
                    setLables(Object.keys(result));
                    // setchartData(Object.entries(result).map((thername,PatientLit)=>PatientLit.length));
                    setchartData(labels.map((thername)=>result[thername].length))
                    console.log("label", labels);
                    console.log("chart", chartdata);
                },
                (error) => {
                    console.log("err post=", error);
                }
            );
    };

    handleresult();

    const data = {
        labels,
        datasets: [
            {
                label: 'Patient Count',
                data: chartdata,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    }




    return <Bar options={options} data={data} />
}

export default AdDa;
