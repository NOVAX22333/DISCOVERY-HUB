/* Sample data. Only official/legal sources. Ratings are placeholder values — replace with real data later.
   type: Watch | Download | Read | Learn | AI   ·   price: Free | Paid | Free/Paid */
const CATEGORIES = [
  { name: "Movies", key: "Movies", icon: "🎬" },
  { name: "TV Shows", key: "TV", icon: "📺" },
  { name: "Games", key: "Games", icon: "🎮" },
  { name: "Books", key: "Books", icon: "📖" },
  { name: "Music", key: "Music", icon: "🎵" },
  { name: "Apps", key: "Apps", icon: "▦" },
  { name: "Software", key: "Software", icon: "💻" },
  { name: "Learning", key: "Learning", icon: "🎓" },
  { name: "AI Tools", key: "AI", icon: "✨" }
];

const QUICK_LINKS = [
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "Netflix", url: "https://www.netflix.com" },
  { name: "Spotify", url: "https://www.spotify.com" }
];

const ITEMS = [
  // Movies
  { title: "Dune: Part Two", cat: "Movies", type: "Watch", price: "Paid", platform: "Apple TV / Prime Video / YouTube Movies", url: "https://tv.apple.com", rating: 8.7, trending: true,
    desc: "Rent or buy the sci-fi epic from official stores.", long: "Check official movie stores to rent or buy this film in digital HD. Streaming availability changes by country, so confirm on the platform before you pay.", tags: ["sci-fi", "epic", "rent or buy"] },
  { title: "Interstellar", cat: "Movies", type: "Watch", price: "Paid", platform: "YouTube Movies / Prime Video", url: "https://www.youtube.com/movies", rating: 8.6, rec: true,
    desc: "Space drama available to rent or buy.", long: "A space-exploration drama. Look for it in YouTube Movies or Prime Video's rent/buy section.", tags: ["sci-fi", "space", "drama"] },
  { title: "The Batman", cat: "Movies", type: "Watch", price: "Paid", platform: "Prime Video / Apple TV", url: "https://www.primevideo.com", rating: 8.2, rec: true,
    desc: "Detective-style superhero thriller.", long: "Rent or buy from official digital stores. Subscription availability depends on your region.", tags: ["thriller", "superhero"] },
  { title: "Free Movies on YouTube", cat: "Movies", type: "Watch", price: "Free", platform: "YouTube", url: "https://www.youtube.com/movies", rating: 4.4,
    desc: "Full-length movies with ads, offered legally.", long: "YouTube lists a selection of free, ad-supported movies from licensed distributors.", tags: ["free", "ad-supported"] },

  // TV
  { title: "Stranger Things", cat: "TV Shows", type: "Watch", price: "Paid", platform: "Netflix", url: "https://www.netflix.com", rating: 8.9, trending: true,
    desc: "Sci-fi mystery series on Netflix.", long: "Stream with a Netflix subscription. Plans and availability vary by country.", tags: ["sci-fi", "mystery", "series"] },
  { title: "Disney+ Originals", cat: "TV Shows", type: "Watch", price: "Paid", platform: "Disney+", url: "https://www.disneyplus.com", rating: 4.5,
    desc: "Family shows and original series.", long: "Stream Disney, Pixar, Marvel and Star Wars series with a subscription.", tags: ["family", "series"] },
  { title: "Pluto TV", cat: "TV Shows", type: "Watch", price: "Free", platform: "Pluto TV", url: "https://pluto.tv", rating: 4.2,
    desc: "Free live channels and on-demand TV.", long: "A legal, ad-supported service with live channels and on-demand shows.", tags: ["free", "live TV"] },

  // Games
  { title: "Grand Theft Auto V", cat: "Games", type: "Download", price: "Paid", platform: "Steam / Epic Games Store", url: "https://store.steampowered.com", rating: 9.7, trending: true,
    desc: "Open-world action game. Buy from official stores.", long: "Buy and download from official PC stores or console stores. Mature content — check the age rating.", tags: ["open world", "action", "PC"] },
  { title: "Minecraft", cat: "Games", type: "Download", price: "Paid", platform: "minecraft.net", url: "https://www.minecraft.net", rating: 4.6, rec: true,
    desc: "Build and explore blocky worlds.", long: "Get Minecraft from the official site for PC, console and mobile.", tags: ["sandbox", "creative", "family"] },
  { title: "Fortnite", cat: "Games", type: "Download", price: "Free", platform: "Epic Games", url: "https://www.fortnite.com", rating: 4.3,
    desc: "Free-to-play battle royale.", long: "Free to download from the official site. In-game purchases are optional.", tags: ["free to play", "multiplayer"] },
  { title: "Free Games on GOG", cat: "Games", type: "Download", price: "Free/Paid", platform: "GOG", url: "https://www.gog.com", rating: 4.5,
    desc: "DRM-free games, plus free giveaways.", long: "GOG sells DRM-free games and sometimes offers free titles.", tags: ["DRM-free", "PC"] },
  { title: "itch.io Indie Games", cat: "Games", type: "Download", price: "Free/Paid", platform: "itch.io", url: "https://itch.io", rating: 4.4,
    desc: "Thousands of indie games from their makers.", long: "Many creators offer free or pay-what-you-want downloads directly.", tags: ["indie", "free", "creative"] },

  // Books
  { title: "Atomic Habits", cat: "Books", type: "Read", price: "Paid", platform: "Kindle / Apple Books / Google Play Books", url: "https://play.google.com/store/books", rating: 4.8, trending: true,
    desc: "Habit-building guide by James Clear.", long: "Buy an ebook or audiobook from official stores, or borrow from your local library through apps like Libby.", tags: ["self-help", "habits"] },
  { title: "The 7 Habits of Highly Effective People", cat: "Books", type: "Read", price: "Paid", platform: "Apple Books / Kindle", url: "https://www.apple.com/apple-books/", rating: 4.7, rec: true,
    desc: "Classic personal-effectiveness book.", long: "Available from official bookstores. Check your library for free loans.", tags: ["self-help", "classic"] },
  { title: "Project Gutenberg", cat: "Books", type: "Read", price: "Free", platform: "gutenberg.org", url: "https://www.gutenberg.org", rating: 4.7,
    desc: "Free public-domain ebooks.", long: "Over 70,000 public-domain books you can read or download legally.", tags: ["free", "public domain", "classics"] },
  { title: "Open Library", cat: "Books", type: "Read", price: "Free", platform: "openlibrary.org", url: "https://openlibrary.org", rating: 4.5,
    desc: "Borrow digital books for free.", long: "A nonprofit library catalog with lendable digital books.", tags: ["borrow", "free"] },
  { title: "Standard Ebooks", cat: "Books", type: "Read", price: "Free", platform: "standardebooks.org", url: "https://standardebooks.org", rating: 4.8,
    desc: "Beautifully formatted public-domain ebooks.", long: "Carefully produced editions of classic literature, free to download.", tags: ["free", "classics"] },

  // Music
  { title: "Spotify Premium", cat: "Music", type: "Watch", price: "Free/Paid", platform: "Spotify", url: "https://www.spotify.com", rating: 4.6, trending: true,
    desc: "Music and podcasts, free with ads or Premium.", long: "Stream millions of songs. Premium removes ads and allows offline listening.", tags: ["streaming", "podcasts"] },
  { title: "Billie Eilish on Apple Music", cat: "Music", type: "Watch", price: "Paid", platform: "Apple Music", url: "https://music.apple.com", rating: 4.3, rec: true,
    desc: "Stream albums from an official service.", long: "Listen on Apple Music, Spotify or YouTube Music. Catalogs vary by country.", tags: ["pop", "streaming"] },
  { title: "Bandcamp", cat: "Music", type: "Download", price: "Free/Paid", platform: "Bandcamp", url: "https://bandcamp.com", rating: 4.7,
    desc: "Buy music directly from artists.", long: "Artists set their price and you can download in many formats.", tags: ["indie", "support artists"] },

  // Apps
  { title: "CapCut", cat: "Apps", type: "Download", price: "Free/Paid", platform: "capcut.com", url: "https://www.capcut.com", rating: 4.5, trending: true,
    desc: "Video editor for phone and desktop.", long: "Download from the official site or your app store. Some features need a subscription.", tags: ["video", "editing"] },
  { title: "Canva", cat: "Apps", type: "Download", price: "Free/Paid", platform: "canva.com", url: "https://www.canva.com", rating: 4.8, rec: true,
    desc: "Design posters, slides and social posts.", long: "Use in the browser or install the app. Canva Pro adds more templates and tools.", tags: ["design", "templates"] },

  // Software
  { title: "Adobe Photoshop", cat: "Software", type: "Download", price: "Paid", platform: "adobe.com", url: "https://www.adobe.com/products/photoshop.html", rating: 4.7, trending: true,
    desc: "Professional image editing.", long: "Subscription software with a free trial from Adobe's official site.", tags: ["photo", "design"] },
  { title: "Blender", cat: "Software", type: "Download", price: "Free", platform: "blender.org", url: "https://www.blender.org", rating: 4.8,
    desc: "Free, open-source 3D creation suite.", long: "Model, animate and render in 3D. Download from the official site only.", tags: ["3D", "open source"] },
  { title: "VS Code", cat: "Software", type: "Download", price: "Free", platform: "code.visualstudio.com", url: "https://code.visualstudio.com", rating: 4.8,
    desc: "Popular free code editor.", long: "A lightweight editor with extensions for most languages.", tags: ["coding", "editor"] },

  // Learning
  { title: "Coursera", cat: "Learning", type: "Learn", price: "Free/Paid", platform: "coursera.org", url: "https://www.coursera.org", rating: 4.6, trending: true,
    desc: "University courses and certificates.", long: "Audit many courses for free or pay for certificates and degrees.", tags: ["courses", "certificates"] },
  { title: "Khan Academy", cat: "Learning", type: "Learn", price: "Free", platform: "khanacademy.org", url: "https://www.khanacademy.org", rating: 4.9,
    desc: "Free lessons in math, science and more.", long: "A nonprofit offering free lessons and practice for all ages.", tags: ["free", "school", "math"] },
  { title: "OpenStax", cat: "Learning", type: "Learn", price: "Free", platform: "openstax.org", url: "https://openstax.org", rating: 4.7,
    desc: "Free, peer-reviewed college textbooks.", long: "Legally free textbooks from Rice University.", tags: ["free", "textbooks"] },
  { title: "freeCodeCamp", cat: "Learning", type: "Learn", price: "Free", platform: "freecodecamp.org", url: "https://www.freecodecamp.org", rating: 4.8,
    desc: "Learn to code with free projects.", long: "Interactive lessons and certifications in web development and more.", tags: ["coding", "free"] },
  { title: "MIT OpenCourseWare", cat: "Learning", type: "Learn", price: "Free", platform: "ocw.mit.edu", url: "https://ocw.mit.edu", rating: 4.8,
    desc: "Free MIT course materials.", long: "Lecture notes, videos and assignments from MIT courses.", tags: ["free", "university"] },
  { title: "edX", cat: "Learning", type: "Learn", price: "Free/Paid", platform: "edx.org", url: "https://www.edx.org", rating: 4.5,
    desc: "Online courses from universities.", long: "Audit for free or pay for verified certificates.", tags: ["courses", "university"] },
  { title: "The Odin Project", cat: "Learning", type: "Learn", price: "Free", platform: "theodinproject.com", url: "https://www.theodinproject.com", rating: 4.8,
    desc: "Free full-stack web development path.", long: "A project-based curriculum maintained by an open-source community.", tags: ["coding", "free"] },

  // AI
  { title: "Claude", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "claude.ai", url: "https://claude.ai", rating: 4.8, trending: true,
    desc: "AI assistant for writing, coding and analysis.", long: "Best for long documents, careful writing and coding help. Free plan with paid upgrades.", tags: ["writing", "coding", "research"] },
  { title: "ChatGPT", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "chatgpt.com", url: "https://chatgpt.com", rating: 4.7,
    desc: "General-purpose AI chat assistant.", long: "Best for everyday questions, brainstorming and study help.", tags: ["writing", "studying"] },
  { title: "Gemini", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "gemini.google.com", url: "https://gemini.google.com", rating: 4.5,
    desc: "Google's AI assistant.", long: "Best if you use Google Workspace and want help inside those apps.", tags: ["writing", "research"] },
  { title: "Qwen", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "qwen.ai", url: "https://chat.qwen.ai", rating: 4.4,
    desc: "AI models and chat from Alibaba Cloud.", long: "Chat assistant with open-weight model options for developers.", tags: ["coding", "chat"] },
  { title: "Perplexity", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "perplexity.ai", url: "https://www.perplexity.ai", rating: 4.5,
    desc: "AI search with cited sources.", long: "Best for research questions where you want sources to check.", tags: ["research", "search"] },
  { title: "Cursor", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "cursor.com", url: "https://www.cursor.com", rating: 4.6,
    desc: "AI-first code editor.", long: "Best for building software with AI help inside your editor.", tags: ["coding", "editor"] },
  { title: "GitHub Copilot", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "github.com/features/copilot", url: "https://github.com/features/copilot", rating: 4.5,
    desc: "AI pair programmer in your IDE.", long: "Suggests code as you type in popular editors.", tags: ["coding"] },
  { title: "Replit AI", cat: "AI Tools", type: "AI", price: "Free/Paid", platform: "replit.com", url: "https://replit.com", rating: 4.3,
    desc: "Build and host apps from the browser.", long: "Best for beginners who want to build and run apps without setup.", tags: ["coding", "website building"] }
];
