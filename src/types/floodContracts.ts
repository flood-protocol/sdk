import {
  permit2Address,
  permit2NonceFinderAddress,
  floodPlainAddress,
  floodSwapZoneAddress,
} from "../constants/address.js";

export enum FloodContract {
  FloodPlain = "floodPlain",
  Permit2NonceFinder = "permit2NonceFinder",
  Permit2 = "permit2",
  DefaultZone = "defaultZone",
}

export type FloodChainContracts = {
  [key in FloodContract]: {
    address: `0x${string}`;
    blockCreated?: number;
  };
};

export const floodChainContracts: FloodChainContracts = {
  floodPlain: {
    address: floodPlainAddress,
  },
  permit2: { address: permit2Address },
  permit2NonceFinder: { address: permit2NonceFinderAddress },
  defaultZone: { address: floodSwapZoneAddress },
};
