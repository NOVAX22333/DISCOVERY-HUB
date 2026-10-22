// Vercel serverless function: /api/search?q=...&cat=...
// Keys come from Vercel Environment Variables: TMDB_KEY, RAWG_KEY, GOOGLE_BOOKS_KEY (optional)
const get = async (url, opts) => {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error("HTTP " + r.status + " from " + new URL(url).hostname);
  return r.json();
};
const enc = encodeURIComponent;
const round = (n) => (n ? Math.round(n * 10) / 10 : "–");

async function tmdb(q, cat) {
  const key = process.env.TMDB_KEY;
  if (!key) return [];
  const bearer = key.length > 40; // long token = v4 "Read Access Token"
  const url = `https://api.themoviedb.org/3/search/multi?query=${enc(q)}&include_adult=false` + (bearer ? "" : `&api_key=${key}`);
  const d = await get(url, bearer ? { headers: { Authorization: `Bearer ${key}` } } : undefined);
  return (d.results || [])
    .filter((x) => (x.media_type === "movie" && cat !== "TV Shows") || (x.media_type === "tv" && cat !== "Movies"))
    .slice(0, 8)
    .map((x) => {
      const tv = x.media_type === "tv";
      return {
        title: x.title || x.name, cat: tv ? "TV Shows" : "Movies", type: "Watch", price: "Varies",
        platform: "TMDB – see where to watch", url: `https://www.themoviedb.org/${x.media_type}/${x.id}`,
        rating: round(x.vote_average), image: x.poster_path ? `https://image.tmdb.org/t/p/w342${x.poster_path}` : "",
        desc: (x.overview || "See details for legal viewing options.").slice(0, 110),
        long: (x.overview || "No description available.") + " Open the page and look for the Where to Watch section to find legal services in your country.",
        tags: [tv ? "tv" : "movie", (x.release_date || x.first_air_date || "").slice(0, 4)].filter(Boolean)
      };
    });
}

async function rawg(q) {
  const key = process.env.RAWG_KEY;
  if (!key) return [];
  const d = await get(`https://api.rawg.io/api/games?key=${key}&search=${enc(q)}&page_size=8`);
  return (d.results || []).map((x) => {
    const genres = (x.genres || []).map((g) => g.name);
    return {
      title: x.name, cat: "Games", type: "Download", price: "Varies",
      platform: "RAWG – see official stores", url: `https://rawg.io/games/${x.slug}`,
      rating: round(x.rating), image: x.background_image || "",
      desc: [genres.slice(0, 2).join(", "), x.released && "Released " + x.released].filter(Boolean).join(" · "),
      long: `${x.name}${x.released ? " (" + x.released + ")" : ""}. Open the page to see the official stores where you can buy or download it.`,
      tags: genres.slice(0, 3)
    };
  });
}

async function openLibrary(q) {
  const d = await get(`https://openlibrary.org/search.json?q=${enc(q)}&limit=8&fields=key,title,author_name,cover_i,first_publish_year`);
  return (d.docs || []).map((x) => ({
    title: x.title, cat: "Books", type: "Read", price: "Varies", platform: "Open Library",
    url: `https://openlibrary.org${x.key}`, rating: "–",
    image: x.cover_i ? `https://covers.openlibrary.org/b/id/${x.cover_i}-M.jpg` : "",
    desc: (x.author_name || []).slice(0, 2).join(", ") + (x.first_publish_year ? " · " + x.first_publish_year : ""),
    long: "Borrow or find this book through Open Library, a nonprofit library catalog.", tags: ["book"]
  }));
}

async function googleBooks(q) {
  const key = process.env.GOOGLE_BOOKS_KEY;
  if (!key) return [];
  const d = await get(`https://www.googleapis.com/books/v1/volumes?q=${enc(q)}&maxResults=8&key=${key}`);
  return (d.items || []).map((b) => {
    const v = b.volumeInfo || {};
    return {
      title: v.title, cat: "Books", type: "Read", price: b.saleInfo && b.saleInfo.saleability === "FREE" ? "Free" : "Varies",
      platform: "Google Books", url: v.infoLink, rating: round(v.averageRating),
      image: ((v.imageLinks || {}).thumbnail || "").replace("http://", "https://"),
      desc: (v.authors || []).slice(0, 2).join(", "), long: (v.description || "See Google Books for buying or preview options.").slice(0, 400),
      tags: (v.categories || ["book"]).slice(0, 3)
    };
  });
}

async function apple(q, kind) {
  const p = kind === "music" ? "media=music&entity=song" : "media=software";
  const d = await get(`https://itunes.apple.com/search?term=${enc(q)}&${p}&limit=8`);
  return (d.results || []).map((r) => ({
    title: r.trackName || r.collectionName, cat: kind === "music" ? "Music" : "Apps", type: kind === "music" ? "Watch" : "Download",
    price: kind === "music" ? "Paid" : (r.price === 0 ? "Free" : "Paid"), platform: "Apple " + (kind === "music" ? "Music / iTunes" : "App Store"),
    url: r.trackViewUrl || r.collectionViewUrl, rating: round(r.averageUserRating),
    image: (r.artworkUrl100 || "").replace("100x100", "300x300"),
    desc: r.artistName || r.sellerName || "", long: (r.description || (r.artistName ? "By " + r.artistName + ". " : "") + "Open the official store page.").slice(0, 400),
    tags: [r.primaryGenreName].filter(Boolean)
  }));
}

module.exports = async (req, res) => {
  const q = String(req.query.q || "").trim().slice(0, 80);
  const cat = String(req.query.cat || "All");
  if (q.length < 2) return res.status(200).json({ items: [] });
  const want = (c) => cat === "All" || cat === c;
  const jobs = [];
  if (want("Movies") || want("TV Shows")) jobs.push(tmdb(q, cat));
  if (want("Games")) jobs.push(rawg(q));
  if (want("Books")) jobs.push(openLibrary(q), googleBooks(q));
  if (want("Music")) jobs.push(apple(q, "music"));
  if (want("Apps")) jobs.push(apple(q, "apps"));
  const out = await Promise.allSettled(jobs);
  const items = out.flatMap((o) => (o.status === "fulfilled" ? o.value : [])).filter((i) => i.title && i.url);
  const errors = out.filter((o) => o.status === "rejected").map((o) => String(o.reason.message || o.reason));
  const missing = ["TMDB_KEY", "RAWG_KEY"].filter((k) => !process.env[k]);
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).json({ items, errors, missing });
};
