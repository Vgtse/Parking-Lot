import { css, cx } from "@emotion/css";
import { ParkingSpaceProps } from "../../models";
import "./style.css";

function ParkingSpace(props: ParkingSpaceProps) {
  const { occupied, spaceNumber, Process, onClick, src } = props;
  const occupiedColor = occupied ? "red" : "green";
  const proccessClass = css`
    border-color: ${occupiedColor};
    cursor: pointer;
    &:hover {
      border-width: 2px 0px 2px 2px;
    }
    pointer-events: auto;
  `;

  return (
    <div
      onClick={onClick}
      className={cx(parkingBox, {
        [proccessClass]:
          (Process === "parking" && !occupied) ||
          (Process === "exiting" && occupied),
      })}
    >
      {occupied && <img className="animation" alt={"car"} src={src} />}
      <div>{spaceNumber}</div>
    </div>
  );
}

export default ParkingSpace;

const parkingBox = css`
  box-shadow: 10px 1px 25px 8px rgba(0, 0, 0, 0.75) inset;
  -webkit-box-shadow: 10px 1px 25px 8px rgba(0, 0, 0, 0.75) inset;
  -moz-box-shadow: 10px 1px 25px 8px rgba(0, 0, 0, 0.75) inset;
  width: 200px;
  height: 100px;
  background-color: #9897a9;
  border: 1px solid white;
  border-width: 1px 0px 1px 1px;
  border-radius: 8px 0px 0px 8px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 20px;
  & > div {
    transform: rotate(-90deg);
  }
  & > img {
    width: 165px;
    margin-right: 10px;
    z-index: 990;
  }
  pointer-events: none;
`;
