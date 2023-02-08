import { css, cx } from "@emotion/css";
import { Analytics, AnalyticTabProps } from "../../models";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Some Analytics",
    },
  },
};

const labels = ["Up to 1 Hour", "1 - 3 Hours", "More than 3 Hours"];

function AnalyticTab(props: AnalyticTabProps) {
  const { setOpen, open, analytics } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: analytics.map(
          (analytic: Analytics, idx: number) => analytic.total
        ),
        backgroundColor: "green",
      },
    ],
  };

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={cx(costTab, { [costTabClose]: !open })}
      >
        <div>{"Analytics"}</div>
      </div>
      <hr color="white" className={cx(hrClass, { [hrClassClosed]: !open })} />
      <div className={cx(costTable, { [costTableClose]: !open })}>
        <div>
          <Bar options={options} data={data} />
        </div>
      </div>
    </>
  );
}

export default AnalyticTab;

const costTab = css`
  position: relative;
  background-color: gray;
  display: flex;
  transform: rotate(-90deg);
  align-items: center;
  justify-content: center;
  width: 200px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 8px 8px 0px 0px;
  font-size: 1.3rem;
  cursor: pointer;
  top: 141px;
  right: 122px;
  z-index: 999;
  border-color: white;
  border-style: solid;
  border-width: 2px 2px 0px 2px;
`;

const costTabClose = css`
  right: -80px;
`;

const costTable = css`
  position: relative;
  display: flex;
  background-color: gray;
  width: 600px;
  height: 400px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-color: white;
  border-style: solid;
  border-width: 2px 0px;
  color: black;
  div {
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 4px;
  }
`;

const costTableClose = css`
  display: none;
`;

const hrClass = css`
  position: relative;
  transform: rotate(-90deg);
  right: 300px;
  z-index: 999;
  width: 200px;
  top: 312px;
`;

const hrClassClosed = css`
  display: none;
`;
