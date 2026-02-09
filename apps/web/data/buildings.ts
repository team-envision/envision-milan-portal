export type Building = {
  id: string;
  name: string;
  url: string;
};

const BASE_URL = "https://milan-envision.s3.ap-south-1.amazonaws.com/assets";

export const CAMPUS_BUILDINGS: Building[] = [
  { id: "ub", name: "University Building (UB)", url: `${BASE_URL}/UB.JPG` },
  { id: "tp2", name: "Tech Park 2 (TP2)", url: `${BASE_URL}/TP2.JPG` },
  { id: "archgate", name: "Arch Gate", url: `${BASE_URL}/archgate.JPG` },
  { id: "auditorium", name: "Auditorium", url: `${BASE_URL}/Auditorium.JPG` },
  {
    id: "global-hospital",
    name: "Global Hospital",
    url: `${BASE_URL}/global-hospital.JPG`,
  },
  {
    id: "management",
    name: "Management Block",
    url: `${BASE_URL}/management.JPG`,
  },
  {
    id: "medical-college",
    name: "Medical College",
    url: `${BASE_URL}/medical-college.JPG`,
  },
  { id: "tp", name: "Tech Park 1 (TP)", url: `${BASE_URL}/TP.JPG` },
  {
    id: "high-tech",
    name: "High Tech Block",
    url: `${BASE_URL}/high-tech.JPG`,
  },
  {
    id: "main-campus",
    name: "Main Campus View",
    url: `${BASE_URL}/main-campus.JPG`,
  },
];
