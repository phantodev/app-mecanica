import axios from "axios";
import { IVehicleModels } from "../../../interfaces/car";
export default async function getVehicleBrandsService(
  vehicleType: string,
  vehicleBrand: string
): Promise<IVehicleModels[] | null> {
  try {
    const response = await axios.get(
      `http://192.168.1.4:3000/models?type=${vehicleType}&brand=${vehicleBrand}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
