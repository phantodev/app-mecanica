import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ICheckinPayload {
  vehiclePlate: string;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleYear: number;
  ownerId: string;
  vehicleDetails: string;
  photos: string[];
}

interface Store {
  customerName: string;
  setCustometName: () => void;
  checkinPayload: ICheckinPayload;
  setCheckinPayload: (payload: ICheckinPayload) => void;
}

export const useStore = create<Store>()((set) => ({
  customerName: "Eduardo Burko",
  setCustometName: () => set((state) => ({ customerName: state.customerName })),
  checkinPayload: {
    vehiclePlate: "",
    vehicleType: "",
    vehicleBrand: "",
    vehicleModel: "",
    vehicleColor: "",
    vehicleYear: 0,
    ownerId: "",
    vehicleDetails: "",
    photos: [],
  },
  setCheckinPayload: (payload) => set(() => ({ checkinPayload: payload })),
}));
