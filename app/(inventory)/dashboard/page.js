import Piecard from "../components/piecard";

export default function Dashboard() {
    let piedata = [
        {
            "type": "TRAFFIC",
            "count": 350897,
            "difference": -3.48
        },
        {
            "type": "NEW USERS",
            "count": 2356,
            "difference": -3.48
        },
        {
            "type": "SALES",
            "count": 924,
            "difference": -1.1
        },
        {
            "type": "PERFORMANCE",
            "count": 49.65,
            "difference": 12
        }
    ]
    return (
        <>
            <div>
                <div>
                    <div className="flex flex-wrap">
                        <Piecard data={piedata[0]} icon={'far fa-chart-bar'} />
                        <Piecard data={piedata[1]} icon={'fas fa-chart-pie'} />
                        <Piecard data={piedata[2]} icon={'fas fa-users'} />
                        <Piecard data={piedata[3]} icon={'fas fa-percent'} />
                    </div>
                </div>
            </div>
        </>
    )
}