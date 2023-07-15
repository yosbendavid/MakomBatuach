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

    const [labels, setLabels] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [labelsWeek, setLabelsWeek] = useState([]);
    const [chartDataWeek, setChartDataWeek] = useState([]);

    useEffect(() => {
        handleresult();
        handleresultWeek();
    }, []);

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
                    setLabels(Object.keys(result));
                    setChartData(Object.values(result).map((therData) => therData.length));
                    console.log("labels", labels);
                    console.log("chartData", chartData);
                },
                (error) => {
                    console.log("err post=", error);
                }
            );
    };

    const handleresultWeek = () => {
        // Dummy data for demo purposes
        const resultWeek = {
            Sunday: 7,
            Monday: 5,
            Tuesday: 8,
            Wednesday: 3,
            Thursday: 6,
            Friday: 2,
        };

        setLabelsWeek(Object.keys(resultWeek));
        setChartDataWeek(Object.values(resultWeek));
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Patient Count',
                data: chartData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const dataWeek = {
        labels: labelsWeek,
        datasets: [
            {
                label: 'Treatment Count',
                data: chartDataWeek,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            }
        ],
    };

    return (
        <div>
            <Bar options={options} data={data} />
            <Bar options={options} data={dataWeek} />
        </div>
    );
}

export default AdDa;
