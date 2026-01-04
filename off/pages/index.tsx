import { useEffect, useState } from "react";
import { catalogueStore } from "@/lib/offlineStore";
import CatalogueGrid from "@/components/CatalogueGrid";

interface CatalogueItem {
  _id: string;
  modelNumber: number;
  image?: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  sizes?: ("Adult" | "Kids")[];
  weightAdult?: number;
  weightKids?: number;
}

export default function CataloguePage() {
  const [items, setItems] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/catalogue");
        const fresh: CatalogueItem[] = await res.json();

        await catalogueStore.setItem("items", fresh);
        setItems(fresh);
      } catch {
        const cached = await catalogueStore.getItem<CatalogueItem[]>("items");
        if (cached) setItems(cached);
      }
    }

    load();
  }, []);

  return <CatalogueGrid items={items} />;
}
