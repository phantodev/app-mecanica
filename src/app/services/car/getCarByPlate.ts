import axios from "axios";
import { ICar } from "../../../interfaces/car";
export default async function getCarByPlate(
  carPlate: string
): Promise<ICar[] | null> {
  try {
    const response = await axios.get(
      `http://192.168.1.4:3000/cars?plate=${carPlate}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
