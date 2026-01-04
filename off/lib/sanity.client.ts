import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "lfss7ezq",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});