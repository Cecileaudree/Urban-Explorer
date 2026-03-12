export interface Place {
  id: string;
  address_name: string;
  title: string;
  lead_text: string;
  description: string;
  adresse: string;
  cover_url: string;
  lat_lon?: {
    lon: number;
    lat: number;
  };
}

export interface ApiResponse<T> {
  total_count: number;
  results: T[];
}
