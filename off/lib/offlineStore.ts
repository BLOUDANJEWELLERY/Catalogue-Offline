import localforage from "localforage";

export const catalogueStore = localforage.createInstance({
  name: "catalogue-pwa",
  storeName: "catalogue",
});