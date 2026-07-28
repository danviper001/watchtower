import { z } from "zod";

export const incidentSchema = z.object({
  title: z.string().min(5),

  description: z.string().min(10),

  category: z.enum([
    "Crime",
    "Fire",
    "Medical",
    "Road Accident",
    "Flood",
    "Electricity",
    "Building Collapse",
    "Missing Person",
    "Other",
  ]),

  severity: z.enum([
    "Low",
    "Medium",
    "High",
    "Critical",
  ]),

  latitude: z.coerce.number(),
longitude: z.coerce.number(),

  address: z.string(),
});