import { css, cx } from "@emotion/css";
import { CostTabProps } from "../../models";

function CostTab(props: CostTabProps) {
  const { setOpen, open } = props;
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={cx(costTab, { [costTabClose]: !open })}
      >
        <div>{"Parking Cost"}</div>
      </div>
      <hr color="white" className={cx(hrClass, { [hrClassClosed]: !open })} />
      <div className={cx(costTable, { [costTableClose]: !open })}>
        <table>
          <caption>{"Cost Information"}</caption>
          <thead>
            <tr>
              <th scope="col">{"Duration"}</th>
              <th scope="col">{"Cost"}</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>{"For more info, contact our customer support"}</td>
            </tr>
          </tfoot>
          <tbody>
            <tr>
              <th scope="row">{"Up to 1 Hour"}</th>
              <td>{"5 Euros"}</td>
            </tr>
            <tr>
              <th scope="row">{"1 - 3 Hours"}</th>
              <td>{"10 Euros"}</td>
            </tr>
            <tr>
              <th scope="row">{"More than 3 Hours"}</th>
              <td>{"20 Euros"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CostTab;

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
  table {
    max-width: 960px;
    margin: 10px auto;
  }

  caption {
    font-size: 1.6em;
    font-weight: 400;
    padding: 10px 0;
    color: white;
  }

  thead th {
    font-weight: 400;
    background: #8a97a0;
    color: #fff;
  }

  tr {
    background: #f4f7f8;
    border-bottom: 1px solid #fff;
    margin-bottom: 5px;
  }

  tr:nth-child(even) {
    background: #e8eeef;
  }

  th,
  td {
    text-align: left;
    padding: 20px;
    font-weight: 300;
  }

  tfoot tr {
    background: none;
  }

  tfoot td {
    padding: 10px 2px;
    font-size: 0.8em;
    font-style: italic;
    color: white;
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
