import axios from "axios";
import { IVehicleBrands } from "../../../interfaces/car";
export default async function getVehicleBrandsService(
  vehicleType: string
): Promise<IVehicleBrands[] | null> {
  try {
    const response = await axios.get(
      `http://192.168.1.4:3000/brands?type=${vehicleType}`
    );
    return response.data;
  } catch (error) {
    return null;
  }
}
