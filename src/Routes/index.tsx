import { css } from "@emotion/css";
import * as React from "react";
import ParkingSpace from "../components/ParkingSpace";
import { set, get } from "lodash";
import Modal from "../components/Modal";
import {
  borderColor,
  calculatePrice,
  carImages,
  labelToIndex,
  priceToLabel,
  renderSwitch,
} from "../utils";
import { Analytics, ModalContent, PrknSpace, Process } from "../models";
import CostTab from "../components/CostTab";
import AnalyticTab from "../components/AnalyticTab";

const initialData = Array.from(Array(12), (_, index: number) => ({
  occupied: false,
  spaceNumber: index + 1,
}));

const analyticTitles = ["Up to 1 Hour", "1 - 3 Hours", "More than 3 Hours"];
const initialAnalytics = Array.from(Array(3), (_, index: number) => ({
  analytic: analyticTitles[index],
  total: 0,
}));

const datos = JSON.parse(
  localStorage.getItem("parkingSpaces") || "[]"
) as PrknSpace[];

const analyticDatas = JSON.parse(
  localStorage.getItem("analytics") || "[]"
) as Analytics[];

!datos && localStorage.setItem("parkingSpaces", JSON.stringify(initialData));
!analyticDatas &&
  localStorage.setItem("analytics", JSON.stringify(initialAnalytics));

function Parking() {
  const [modalOpen, setModalOpen] = React.useState<Boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [analyticsOpen, setAnalyticsOpen] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<ModalContent>();
  const parkingAnalyticData = JSON.parse(
    localStorage.getItem("analytics") || "[]"
  ) as Analytics[];
  const [parkAnalytics, setParkAnalytics] =
    React.useState<Array<Analytics>>(parkingAnalyticData);
  const parkingData = JSON.parse(
    localStorage.getItem("parkingSpaces") || "[]"
  ) as PrknSpace[];
  const [parkingSpaces, setParkingSpaces] =
    React.useState<Array<PrknSpace>>(parkingData);
  const [process, setProcess] = React.useState<Process | undefined>();
  // eslint-disable-next-line
  const col1 = [] as PrknSpace[];
  // eslint-disable-next-line
  const col2 = [] as PrknSpace[];

  React.useMemo(() => {
    parkingSpaces.map((_, i) => {
      if (i % 2 === 0) {
        return col1.push(parkingData[i]);
      } else {
        return col2.push(parkingData[i]);
      }
    });
  }, [col1, col2, parkingSpaces, parkingData]);

  const onClick = (space: PrknSpace) => {
    if (process === "parking") {
      const parkingDate = new Date();
      const newData = set(parkingData, [space.spaceNumber - 1], {
        occupied: true,
        spaceNumber: space.spaceNumber,
        parkingDate: parkingDate,
        color: carImages[(3 * Math.random()) | 0],
      });
      setModalContent({
        title: "Car Parking",
        description: `Parking Space: ${
          space.spaceNumber
        } , starting at ${parkingDate.toDateString()} ${parkingDate.getHours()}:${
          parkingDate.getMinutes() < 10
            ? `0` + parkingDate.getMinutes()
            : parkingDate.getMinutes()
        }`,
        onConfirm: () => {
          localStorage.setItem("parkingSpaces", JSON.stringify(newData));
          setParkingSpaces(newData);
          setModalOpen(false);
        },
      });
      setModalOpen(true);
    }
    if (process === "exiting") {
      const exitingDate = new Date();
      const newData = set(parkingData, [space.spaceNumber - 1], {
        occupied: false,
        spaceNumber: space.spaceNumber,
      });
      const startingDate =
        space.parkingDate && new Date(Date.parse(space.parkingDate));
      const timeSpent = startingDate
        ? (exitingDate.getTime() - startingDate.getTime()) / (1000 * 3600)
        : 0;
      const label = priceToLabel(Math.trunc(timeSpent));
      const idx = labelToIndex(label);
      const prevAnalytics = get(parkAnalytics, [idx]);
      const newAnalytics = set(parkingAnalyticData, [idx], {
        analytics: label,
        total: prevAnalytics["total"] + 1,
      });

      startingDate &&
        setModalContent({
          title: "Car Exiting",
          description: `Car exiting from space: ${
            space.spaceNumber
          } , started at ${startingDate.toDateString()}  ${startingDate.getHours()}:${
            startingDate.getMinutes() < 10
              ? `0` + startingDate.getMinutes()
              : startingDate.getMinutes()
          } and ended at ${exitingDate.toDateString()} ${exitingDate.getHours()}:${
            exitingDate.getMinutes() < 10
              ? `0` + exitingDate.getMinutes()
              : exitingDate.getMinutes()
          }. It comes at a total cost of ${calculatePrice(
            Math.trunc(timeSpent)
          )}`,
          onConfirm: () => {
            localStorage.setItem("parkingSpaces", JSON.stringify(newData));
            setParkingSpaces(newData);
            localStorage.setItem("analytics", JSON.stringify(newAnalytics));
            setParkAnalytics(newAnalytics);
            setModalOpen(false);
          },
        });
      setModalOpen(true);
    }
  };

  const parkingProcess = () => {
    setProcess("parking");
  };

  const exitingProcess = () => {
    setProcess("exiting");
  };

  const cancelProcess = () => {
    setProcess(undefined);
  };

  const resetParking = () => {
    localStorage.clear();
    localStorage.setItem("parkingSpaces", JSON.stringify(initialData));
    localStorage.setItem("analytics", JSON.stringify(initialAnalytics));
    setParkAnalytics(initialAnalytics);
    setParkingSpaces(initialData);
    setProcess(undefined);
  };

  React.useEffect(() => {
    window.localStorage.setItem("parkingSpaces", JSON.stringify(parkingSpaces));
    window.localStorage.setItem("analytics", JSON.stringify(parkAnalytics));
    parkingSpaces.map((_, i) => {
      if (i % 2 === 0) {
        return col1.push(parkingSpaces[i]);
      } else {
        return col2.push(parkingSpaces[i]);
      }
    });
  }, [parkingSpaces, col1, col2, parkAnalytics]);
  const spots = (
    JSON.parse(localStorage.getItem("parkingSpaces") || "[]") as PrknSpace[]
  ).map((space: PrknSpace) => {
    if (space.occupied) {
      return false;
    } else {
      return true;
    }
  });

  return (
    <div>
      {modalOpen && (
        <Modal
          title={modalContent?.title}
          description={modalContent?.description}
          onConfirm={modalContent?.onConfirm}
          setOpenModal={setModalOpen}
        />
      )}
      <div className={costContainer}>
        <CostTab setOpen={setOpen} open={open} />
      </div>
      <div className={analyticsContainer}>
        <AnalyticTab
          setOpen={setAnalyticsOpen}
          open={analyticsOpen}
          analytics={parkAnalytics}
        />
      </div>
      <div>
        <h1>{renderSwitch(process)}</h1>
        <div className={container(borderColor(process))}>
          <div>
            {col1.map((space: PrknSpace, idx: number) => {
              return (
                <ParkingSpace
                  src={space.color}
                  key={idx}
                  Process={process}
                  occupied={space.occupied}
                  spaceNumber={space.spaceNumber}
                  onClick={() => onClick(space)}
                />
              );
            })}
          </div>
          <div>
            <button
              disabled={!spots.includes(true)}
              style={{ backgroundColor: "green" }}
              onClick={parkingProcess}
            >
              {"Park Car"}
            </button>
            <button
              disabled={!spots.includes(false)}
              style={{ backgroundColor: "red" }}
              onClick={exitingProcess}
            >
              {"Exit Car"}
            </button>
            <button onClick={resetParking}>
              {parkingSpaces.length > 0 ? "Reset Parking" : "Initiate Parking"}
            </button>

            <button style={{ backgroundColor: "gray" }} onClick={cancelProcess}>
              {"Cancel Process"}
            </button>
          </div>

          <div>
            {col2.reverse().map((space: PrknSpace, idx: number) => {
              return (
                <ParkingSpace
                  src={space.color}
                  key={idx}
                  Process={process}
                  occupied={space.occupied}
                  spaceNumber={space.spaceNumber}
                  onClick={() => onClick(space)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parking;

const container = (color: string) => css`
  border: 2px solid ${color};
  padding: 60px;
  border-radius: 8px;
  display: flex;
  & > * {
    & :not(:last-child) {
      margin-bottom: 10px;
    }
  }
  & > div:nth-child(3) {
    transform: rotate(180deg);
  }
  & > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-item: center;
    justify-content: center;
    margin: 150px;
    button {
      height: 50px;
    }
  }
  button {
    width: 150px;
    height: 45px;
    margin: 10px;
    border: none;
    background-color: cornflowerblue;
    color: white;
    border-radius: 8px;
    font-size: 20px;
    cursor: pointer;
    :disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }
`;

const costContainer = css`
  position: absolute;
  right: 0px;

  z-index: 990;
`;

const analyticsContainer = css`
  position: absolute;
  right: 0px;
  top: 450px;
  z-index: 990;
`;
