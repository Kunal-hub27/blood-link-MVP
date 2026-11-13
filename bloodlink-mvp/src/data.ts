import { initialDemoDonors } from "./data/demoDonorsData";
import { initialEmergencyRequests } from "./data/supportNetworkData";
import { initialBloodBanks } from "./data/bloodBanksData";
import { allBloodGroups } from "./data/statesAndDistricts";

export type { Donor, BloodGroup, EmergencyRequest as BloodRequest, Hospital, BloodBank } from "./types";
export { initialDemoDonors as demoDonors };
export { initialEmergencyRequests as demoRequests };
export { initialBloodBanks as demoBanks };
export { allBloodGroups as bloodGroups };
