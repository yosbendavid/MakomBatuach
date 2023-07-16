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
                ticks: { stepSize: 1 },
            }
        }
    };

    const [label, setTherName] = useState([]);
    const [NumofPatients, setNumofPatients] = useState([]);
    const [WeekDay, setWeekDay] = useState([]);
    const [WeekData, setWeekData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        handleresult()
    }, []);

    useEffect(() => {
        console.log("Thername", label);
        console.log("NumofPatient", NumofPatients);
    }, [label, NumofPatients]);


    const handleresult = () => {
        const tryget = "https://localhost:44380/api/DaAllTher";
        fetch(tryget,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
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
                    setTherName(Object.keys(result));
                    setNumofPatients(Object.values(result).map((therData) => therData.length));
                    setLoading(false); // Set loading state to false after data is fetched
                },
                (error) => {
                    console.log("err post=", error);
                }
            );
    };

    const handleresultWeek = () => {
        const tryget = "https://localhost:44380/api/DaTreatmentsperDay";
        fetch(tryget,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
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
                    setWeekDay(Object.keys(result));
                    setWeekData(Object.values(result).map((dayData) => dayData.length));
                    console.log("WeekDay", WeekDay);
                    console.log("NumofTreatment", WeekData);
                },
                (error) => {
                    console.log("err post=", error);
                }
            );
    };

    const data = {
        label,
        datasets: [
            {
                label: 'Patient Count',
                data: NumofPatients,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    // const dataWeek = {
    //     labels: WeekDay,
    //     datasets: [
    //         {
    //             label: 'Treatment Count',
    //             data: WeekData,
    //             backgroundColor: 'rgba(54, 162, 235, 0.5)',
    //         }
    //     ],
    // };

    return (
        <div>
            <Bar options={options} data={data} />
            {/* <Bar options={options} data={dataWeek} /> */}
        </div>
    );
}

export default AdDa;
