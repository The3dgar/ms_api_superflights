import { PassengerInterface } from "./passenger.interface";
import { WeatherInterface } from "./weather.interface";

export interface FlightInterface {
  _id?: string,
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: PassengerInterface[],
  weater: WeatherInterface[]
}
