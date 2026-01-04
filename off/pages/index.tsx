import { useEffect, useState } from "react";
import { catalogueStore } from "@/lib/offlineStore";
import CatalogueGrid from "@/components/CatalogueGrid";

export default function CataloguePage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/catalogue");
        const fresh = await res.json();
        await catalogueStore.setItem("items", fresh);
        setItems(fresh);
      } catch {
        const cached = await catalogueStore.getItem("items");
        if (cached) setItems(cached);
      }
    }
    load();
  }, []);

  return <CatalogueGrid items={items} />;
}