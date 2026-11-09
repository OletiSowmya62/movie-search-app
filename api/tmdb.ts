interface ApiRequest {
  query: {
    endpoint?: string | string[];
    [key: string]: string | string[] | undefined;
  };
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
}

const firstQueryValue = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  try {
    const endpoint = firstQueryValue(req.query.endpoint);
    if (!endpoint) {
      res.status(400).json({ error: "TMDB endpoint is required" });
      return;
    }

    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
    Object.entries(req.query).forEach(([key, value]) => {
      if (key === "endpoint") return;
      const queryValue = firstQueryValue(value);
      if (queryValue !== undefined && queryValue !== "") url.searchParams.set(key, queryValue);
    });

    const accessToken = process.env.TMDB_ACCESS_TOKEN;
    if (!accessToken) {
      res.status(500).json({ error: "TMDB access token is not configured" });
      return;
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, accept: "application/json" },
    });
    const data: unknown = await response.json();
    res.status(response.status).json(data);
  } catch (error: unknown) {
    console.error("TMDB proxy error:", error);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
}