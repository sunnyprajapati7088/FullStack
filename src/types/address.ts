export type AddressType = 'home' | 'office' | 'other';

export interface Address {
  id: string;
  type: AddressType;
  houseNumber: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  fullAddress: string;
}

export interface LocationState {
  permissionGranted: boolean;
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
}