import { Process } from "../models";
import car from "./images/car1.png";
import car2 from "./images/car2.png";
import car3 from "./images/car3.png";

export const carImages = [car, car2, car3];

export function renderSwitch(process: Process | undefined) {
  switch (process) {
    case "exiting":
      return "Choose the exiting Car";
    case "parking":
      return "Choose a free spot to park your Car";
    case undefined:
      return "Welcome to our Parking Lot";
  }
}

export function borderColor(process: Process | undefined) {
  switch (process) {
    case "exiting":
      return "red";
    case "parking":
      return "green";
    case undefined:
      return "white";
  }
}

export function calculatePrice(time: number) {
  switch (time) {
    case 0:
      return "5 Euros";
    case 1 - 2:
      return "10 Euros";
    default:
      return "20 Euros";
  }
}

export function priceToLabel(time: number) {
  switch (time) {
    case 0:
      return "Up to 1 Hour";
    case 1 - 2:
      return "1 - 3 Hours";
    default:
      return "More than 3 Hours";
  }
}

export function labelToIndex(label: string) {
  switch (label) {
    case "Up to 1 Hour":
      return 0;
    case "1 - 3 Hours":
      return 1;
    case "More than 3 Hours":
      return 2;
    default:
      return 0;
  }
}
