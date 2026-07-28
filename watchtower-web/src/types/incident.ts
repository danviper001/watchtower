export interface Incident {
  _id: string;

  title: string;
  description: string;

  category: string;
  severity: string;

  status:
    | "Pending"
    | "Verified"
    | "Responder Assigned"
    | "Accepted"
    | "On The Way"
    | "Arrived"
    | "Resolved"
    | "Rejected";

  createdAt: string;
  updatedAt?: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
  };

  images: {
    url: string;
    publicId: string;
  }[];

  reportedBy: {
    _id?: string;
    fullName: string;
    email: string;
  };

  assignedResponder?: {
    _id?: string;
    fullName: string;
    email: string;
  };

  verifiedBy?: {
    _id?: string;
    fullName: string;
    email: string;
  };

  resolvedAt?: string;

  timeline?: {
  status: string;
  updatedAt: string;
}[];
}