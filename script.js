const header = document.querySelector(".site-header");
const scrollTopLink = document.querySelector("[data-scroll-top]");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("[data-search-input]");
const searchResults = document.querySelector("[data-search-results]");
const searchTrigger = document.querySelector(".search-trigger");
const searchCloseButtons = document.querySelectorAll("[data-search-close]");
const searchTagButtons = document.querySelectorAll("[data-search-tag]");
const sitePrefix = document.body.dataset.pathPrefix ?? "";

const setHeaderShadow = () => {
  header?.toggleAttribute("data-scrolled", window.scrollY > 24);
};

const easeOutQuart = (progress) => 1 - Math.pow(1 - progress, 4);

const animateScrollTop = () => {
  const scroller = document.scrollingElement || document.documentElement;
  const startY = scroller.scrollTop;
  const duration = Math.min(2800, Math.max(1600, startY * 0.42));
  let startTime = null;

  const step = (timestamp) => {
    startTime ??= timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);

    scroller.scrollTop = startY * (1 - eased);

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    scroller.scrollTop = 0;
  };

  requestAnimationFrame(step);
};

const postIndex = [
  {
    title: "福岡六日遊",
    href: "posts/fukuoka.html",
    image: "assets/trips/fukuoka.jpg",
    meta: "Japan / Oct 2023",
    tags: "#旅途 #日常",
    keywords: "福岡 Fukuoka 太宰府 門司港 九州 旅行",
  },
  {
    title: "布拉格跨年",
    href: "posts/prague-new-year.html",
    image: "assets/trips/prague-new-year.jpg",
    meta: "Czechia / Jan 2024",
    tags: "#旅途",
    keywords: "布拉格 Prague 捷克 跨年 歐洲",
  },
  {
    title: "釜山",
    href: "posts/busan.html",
    image: "assets/trips/busan.jpg",
    meta: "Korea / May 2024",
    tags: "#旅途 #日常",
    keywords: "釜山 Busan 韓國 海邊 旅行",
  },
  {
    title: "東京",
    href: "posts/tokyo.html",
    image: "assets/trips/tokyo.jpg",
    meta: "Japan / Aug 2024",
    tags: "#旅途 #日常",
    keywords: "東京 Tokyo 日本 街道 咖啡",
  },
  {
    title: "曼谷泰豪吃",
    href: "posts/bangkok.html",
    image: "assets/trips/bangkok.jpg",
    meta: "Thailand / Oct 2024",
    tags: "#旅途 #日常",
    keywords: "曼谷 Bangkok 泰國 美食 泰豪吃",
  },
  {
    title: "河內",
    href: "posts/hanoi.html",
    image: "assets/trips/hanoi.jpg",
    meta: "Vietnam / Dec 2024",
    tags: "#旅途 #日常",
    keywords: "河內 Hanoi 越南 舊城 咖啡",
  },
  {
    title: "北海道",
    href: "posts/hokkaido.html",
    image: "assets/trips/hokkaido.jpg",
    meta: "Japan / Feb 2025",
    tags: "#旅途",
    keywords: "北海道 Hokkaido 小樽 札幌 雪 海邊",
  },
  {
    title: "日本北陸十日遊",
    href: "posts/hokuriku.html",
    image: "assets/trips/hokuriku.jpg",
    meta: "Japan / Jun 2025",
    tags: "#旅途",
    keywords: "北陸 Hokuriku 金澤 富山 立山黑部 日本",
  },
  {
    title: "濟州島跨年與北海道",
    href: "posts/jeju-hokkaido-202601.html",
    image: "assets/trips/jeju-hokkaido-202601.jpg",
    meta: "Korea + Japan / Jan 2026",
    tags: "#旅途 #日常",
    keywords: "濟州 Jeju 北海道 跨年 韓國 日本",
  },
  {
    title: "京阪六日遊",
    href: "posts/keihanshin.html",
    image: "assets/trips/keihanshin.jpg",
    meta: "Japan / Mar 2026",
    tags: "#旅途",
    keywords: "京都 大阪 神戶 京阪 Keihanshin 櫻花",
  },
  {
    title: "一些日常和閱讀筆記",
    href: "index.html#notes",
    image: "assets/profile.jpg?v=2",
    meta: "Short captions",
    tags: "#日常 #閱讀",
    keywords: "日常 閱讀 筆記 生活",
  },
];

const resolveAsset = (path) => {
  if (path.startsWith("index.html")) return `${sitePrefix}${path}`;
  return `${sitePrefix}${path}`;
};

const posts = postIndex.map((post) => ({
  ...post,
  href: resolveAsset(post.href),
  image: resolveAsset(post.image),
  alt: post.title,
  searchText: `${post.title} ${post.meta} ${post.tags} ${post.keywords}`.toLowerCase(),
}));

const renderSearchResults = (query = "") => {
  if (!searchResults) return;

  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? posts.filter((post) => post.searchText.includes(normalized))
    : posts;

  searchResults.innerHTML = matches.length
    ? matches
        .map(
          (post) => `
            <a class="search-result" href="${post.href}">
              <img src="${post.image}" alt="${post.alt}" />
              <span>
                <strong>${post.title}</strong>
                <span>${post.meta} / ${post.tags}</span>
              </span>
            </a>
          `,
        )
        .join("")
    : '<p class="search-empty">目前沒有找到相近的文章，可以試試 #旅途、#日常 或城市名稱。</p>';
};

const openSearch = () => {
  if (!searchPanel || !searchInput) return;
  searchPanel.hidden = false;
  document.body.classList.add("search-open");
  renderSearchResults(searchInput.value);
  requestAnimationFrame(() => searchInput.focus());
};

const closeSearch = () => {
  if (!searchPanel) return;
  searchPanel.hidden = true;
  document.body.classList.remove("search-open");
  searchTrigger?.focus();
};

setHeaderShadow();
window.addEventListener("scroll", setHeaderShadow, { passive: true });

scrollTopLink?.addEventListener("click", (event) => {
  event.preventDefault();
  animateScrollTop();
});

searchTrigger?.addEventListener("click", openSearch);
searchCloseButtons.forEach((button) => button.addEventListener("click", closeSearch));
searchInput?.addEventListener("input", () => renderSearchResults(searchInput.value));
searchTagButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = button.dataset.searchTag ?? "";
    renderSearchResults(searchInput.value);
    searchInput.focus();
  });
});

searchResults?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeSearch();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !searchPanel?.hidden) closeSearch();
});
