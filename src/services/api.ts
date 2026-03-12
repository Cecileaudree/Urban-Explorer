import axios from "axios";

const API_URL =
  "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records";

export type Place = {
  id: string;
  title: string;
  address: string;
  lat: number;
  lon: number;
  image: string;
  description: string;
};

export async function fetchPlaces(offset = 0): Promise<Place[]> {
  const response = await axios.get(API_URL, {
    params: {
      limit: 30,
      offset,
    },
  });
  const results = response.data.results ?? [];

  return results
    .filter(
      (item: any) =>
        item.lat_lon && item.lat_lon.lat !== 0 && item.lat_lon.lon !== 0,
    )
    .map((item: any) => ({
      id: item.id ?? String(Math.random()),
      title: item.title ?? "Lieu inconnu",
      address: item.address_street ?? "Adresse non disponible",
      lat: item.lat_lon.lat,
      lon: item.lat_lon.lon,
      image:
        item.cover_url ||
        `https://picsum.photos/seed/${encodeURIComponent(item.title ?? "default")}/400/300`,
      description: item.lead_text ?? "",
    }));
}
