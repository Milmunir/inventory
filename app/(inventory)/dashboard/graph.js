"use client"
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";

export default function Graph(props) {
    const data = {
        labels: props.data.map((data) => data[props.x]),
        datasets: [
            {
                label: `${props.datatype}: `,
                data: props.data.map((data) => data[props.datatype])
            }
        ]
    }
    return (
        <>
            <div className="w-full aspect-square">
                <h3 className='text-center'>{props.title}</h3>
                <div className='w-full h-full'>
                    <Bar
                        width={"100%"}
                        height={"100%"}
                        data={data}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            }
                        }}
                    />
                </div>
            </div >
        </>
    )
}