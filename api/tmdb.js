export default async function handler(req, res) {
  try {
    const { endpoint, ...queryParams } = req.query;

    if (!endpoint) {
      return res.status(400).json({
        error: "TMDB endpoint is required",
      });
    }

    const url = new URL(`https://api.themoviedb.org/3${endpoint}`);

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("TMDB proxy error:", error);

    return res.status(500).json({
      error: "Failed to fetch movie data",
    });
  }
}