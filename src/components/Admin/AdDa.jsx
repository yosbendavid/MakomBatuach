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

    const [therName, setTherName] = useState([]);
    const [numofPatients, setNumofPatients] = useState([]);
    const [WeekDay, setWeekDay] = useState([]);
    const [WeekData, setWeekData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleresult = () => {
        const tryget = "https://proj.ruppin.ac.il/cgroup100/prod/api/DaAllTher";
        fetch(tryget,
            {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json; charset=UTF-8",
                    Accept: "application/json; charset=UTF-8",
                }),
            })
            .then((res) => {
                console.log("res.status", res.status);
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
        const tryget = "https://proj.ruppin.ac.il/cgroup100/prod/api/DaTreatmentsperDay";
        fetch(tryget, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json; charset=UTF-8",
                Accept: "application/json; charset=UTF-8",
            }),
        })
        .then((res) => {
            console.log("res.status", res.status);
            return res.json();
        })
        .then(
            (result) => {
                setWeekDay(Object.keys(result));
                setWeekData(Object.values(result).map((dayData) => dayData.length));
                setLoading(false);
            },
            (error) => {
                console.log("err post=", error);
            }
        );
    };



    useEffect(() => {
        handleresult();
        handleresultWeek();
    }, []);

    useEffect(() => {
        console.log("Thername", therName);
    }, [therName]);

    useEffect(() => {
        console.log("numofpatient", numofPatients);
    }, [numofPatients]);

    
    useEffect(() => {
        console.log("WeekDay", WeekDay);
    }, [WeekDay]);

    useEffect(() => {
        console.log("WeekData", WeekData);
    }, [WeekData]);



    const data = {
        labels:therName,
        datasets: [
            {
                label: 'Patient Count',
                data: numofPatients,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const dataWeek = {
        labels: WeekDay,
        datasets: [
            {
                label: 'Treatment Count',
                data: WeekData,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };

    return (
        <div>
            {!loading && <Bar options={options} data={data} />}    
            {!loading && <Bar options={options} data={dataWeek} />}            {/* <Bar options={options} data={dataWeek} /> */}
        </div>
    );
}

export default AdDa;
