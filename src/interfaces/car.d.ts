export interface ICar {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  plate: string;
}

export interface IVehicleBrands {
  id: number;
  brand: string;
  iconUrl: string;
}

export interface IVehicleModels {
  id: number;
  brand: string;
  model: string;
  iconUrl: string;
}
