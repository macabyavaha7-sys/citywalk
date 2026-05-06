const featuredPost = {
  title: "雨后街口：一盏灯把行人的影子拖得很长",
  href: "#",
};

const posts = [
  {
    type: "图文",
    date: "2026-05-06",
    title: "便利店门口的三分钟夜色",
    subtitle: "城市角落里，等待、路灯和塑料椅组成的小剧场。",
    category: "城市角落",
    href: "#",
    tone: "warm",
  },
  {
    type: "图文",
    date: "2026-05-06",
    title: "电线、窗台和突然停下的人",
    subtitle: "把复杂街景整理成可呼吸画面的取景练习。",
    category: "摄影技巧",
    href: "#",
    tone: "blue",
  },
  {
    type: "视频",
    date: "2026-05-06",
    title: "地铁口的风把广告纸吹起",
    subtitle: "一秒钟的城市幽默，刚好被镜头接住。",
    category: "趣味瞬间",
    href: "#",
    tone: "red",
  },
  {
    type: "图文",
    date: "2026-05-05",
    title: "老小区楼下的下午四点",
    subtitle: "晾衣杆、快递架和聊天声，构成生活的横截面。",
    category: "城市角落",
    href: "#",
    tone: "green",
  },
  {
    type: "图文",
    date: "2026-05-05",
    title: "不要急着按快门",
    subtitle: "等人物进入关系，画面才会自己说话。",
    category: "摄影技巧",
    href: "#",
    tone: "paper",
  },
  {
    type: "视频",
    date: "2026-05-04",
    title: "早餐摊前的精准让路",
    subtitle: "人与人之间没有台词，却完成了一次默契调度。",
    category: "趣味瞬间",
    href: "#",
    tone: "dark",
  },
  {
    type: "图文",
    date: "2026-05-04",
    title: "天桥下的临时阴影",
    subtitle: "强光、阴影和路人的速度，把普通路口切成两层。",
    category: "城市角落",
    href: "#",
    tone: "orange",
  },
  {
    type: "图文",
    date: "2026-05-03",
    title: "用反光面补一张城市侧脸",
    subtitle: "橱窗、车窗和水面都可以成为第二台相机。",
    category: "摄影技巧",
    href: "#",
    tone: "violet",
  },
];

const socialProfiles = [
  { name: "小红书", mark: "红", href: "#" },
  { name: "抖音", mark: "抖", href: "#" },
  { name: "微信公众号", mark: "微", href: "#" },
  { name: "bilibili", mark: "B", href: "#" },
  { name: "大众点评", mark: "评", href: "#" },
  { name: "马蜂窝", mark: "蜂", href: "#" },
];

const pageSize = 6;
let currentPage = 1;
let activeCategory = "";
let activeQuery = "";

const featuredTitle = document.querySelector("#featured-title");
const featuredLink = document.querySelector("#featured-link");
const worksGrid = document.querySelector("#works-grid");
const pageStatus = document.querySelector("#page-status");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#site-search");
const menuToggle = document.querySelector(".menu-toggle");
const categoryMenu = document.querySelector("#category-menu");
const socialLinks = document.querySelector("#social-links");

function getFilteredPosts() {
  const query = activeQuery.trim().toLowerCase();

  return posts.filter((post) => {
    const matchesCategory = !activeCategory || post.category === activeCategory;
    const searchable = `${post.type} ${post.date} ${post.title} ${post.subtitle} ${post.category}`.toLowerCase();
    const matchesQuery = !query || searchable.includes(query);

    return matchesCategory && matchesQuery;
  });
}

function renderFeatured() {
  featuredTitle.textContent = featuredPost.title;
  featuredLink.href = featuredPost.href;
}

function renderPosts() {
  const filteredPosts = getFilteredPosts();
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * pageSize;
  const visiblePosts = filteredPosts.slice(start, start + pageSize);

  worksGrid.innerHTML = visiblePosts.map(createPostCard).join("");
  emptyState.hidden = filteredPosts.length > 0;
  pageStatus.textContent = `${currentPage} / ${totalPages}`;

  document.querySelector('[data-page-action="first"]').disabled = currentPage === 1;
  document.querySelector('[data-page-action="prev"]').disabled = currentPage === 1;
  document.querySelector('[data-page-action="next"]').disabled = currentPage === totalPages;
  document.querySelector('[data-page-action="last"]').disabled = currentPage === totalPages;
}

function createPostCard(post) {
  return `
    <article class="work-card" data-category="${post.category}">
      <a class="work-cover" href="${post.href}" aria-label="打开文章：${post.title}">
        <div class="work-image image-placeholder work-tone-${post.tone}"></div>
      </a>
      <div class="work-meta">
        <span>${post.type}</span>
        <time datetime="${post.date}">${post.date}</time>
      </div>
      <a class="work-title" href="${post.href}">${post.title}</a>
      <p class="work-subtitle">${post.subtitle}</p>
    </article>
  `;
}

function renderSocialProfiles() {
  socialLinks.innerHTML = socialProfiles.map((profile) => `
    <a class="social-link" href="${profile.href}" target="_blank" rel="noreferrer">
      <span class="social-mark">${profile.mark}</span>
      <span class="social-name">${profile.name}</span>
    </a>
  `).join("");
}

function closeMenu() {
  categoryMenu.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const nextState = categoryMenu.hidden;
  categoryMenu.hidden = !nextState;
  menuToggle.setAttribute("aria-expanded", String(nextState));
});

categoryMenu.addEventListener("click", (event) => {
  const categoryLink = event.target.closest("[data-category]");
  if (!categoryLink) return;

  activeCategory = categoryLink.dataset.category;
  currentPage = 1;
  renderPosts();
  closeMenu();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-left")) {
    closeMenu();
  }
});

searchInput.addEventListener("input", (event) => {
  activeQuery = event.target.value;
  currentPage = 1;
  renderPosts();
});

document.querySelector(".pagination").addEventListener("click", (event) => {
  const button = event.target.closest("[data-page-action]");
  if (!button) return;

  const filteredPosts = getFilteredPosts();
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));

  if (button.dataset.pageAction === "first") currentPage = 1;
  if (button.dataset.pageAction === "prev") currentPage = Math.max(1, currentPage - 1);
  if (button.dataset.pageAction === "next") currentPage = Math.min(totalPages, currentPage + 1);
  if (button.dataset.pageAction === "last") currentPage = totalPages;

  renderPosts();
});

renderFeatured();
renderPosts();
renderSocialProfiles();
