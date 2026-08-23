/* ============================================================
   ipaperVN Portfolio — projects.js
   Dữ liệu dự án + render (dùng chung cho trang chủ và projects.html)
   ============================================================ */

/* ---------- Dữ liệu dự án (thay bằng dự án thực tế của bạn) ---------- */
const PROJECTS = [
  {
    title: "Kite Scripting Wiki",
    desc: {
      vi: "Wiki tiếng Việt hướng dẫn viết script Kotlin cho plugin Kite (Paper) — từ cài đặt, script structure, events, commands, scheduler đến các ví dụ thực tế.",
      en: "Vietnamese wiki on writing Kotlin scripts for the Kite plugin (Paper) — from setup, script structure, events, commands, scheduler to practical examples."
    },
    tags: ["Kotlin", "Paper", "Docs"],
    link: "kite/kite-wiki.html"
  },
  {
    title: "Project Name",
    desc: {
      vi: "Mô tả ngắn gọn về dự án này — thay thế bằng thông tin thực tế của bạn.",
      en: "A short description of this project — replace this with your actual info."
    },
    tags: ["Paper", "Kotlin"],
    link: "#"
  },
  {
    title: "Project Name",
    desc: {
      vi: "Mô tả ngắn gọn về dự án này — thay thế bằng thông tin thực tế của bạn.",
      en: "A short description of this project — replace this with your actual info."
    },
    tags: ["Paper", "Kotlin"],
    link: "#"
  },
  {
    title: "Project Name",
    desc: {
      vi: "Mô tả ngắn gọn về dự án này — thay thế bằng thông tin thực tế của bạn.",
      en: "A short description of this project — replace this with your actual info."
    },
    tags: ["Paper", "Kotlin"],
    link: "#"
  },
  {
    title: "Project Name",
    desc: {
      vi: "Mô tả ngắn gọn về dự án này — thay thế bằng thông tin thực tế của bạn.",
      en: "A short description of this project — replace this with your actual info."
    },
    tags: ["Paper", "GUI"],
    link: "#"
  },
  {
    title: "Project Name",
    desc: {
      vi: "Mô tả ngắn gọn về dự án này — thay thế bằng thông tin thực tế của bạn.",
      en: "A short description of this project — replace this with your actual info."
    },
    tags: ["Kotlin", "Scheduler"],
    link: "#"
  }
];

/* ---------- Helpers ---------- */
function i18nValue(obj, lang) {
  return (obj[lang] && obj[lang]) || obj.vi || obj.en || "";
}

function cardHTML(p, lang, cardClass) {
  const linkLabel = lang === "vi" ? "Xem trên GitHub →" : "View on GitHub →";
  const titleCls = cardClass === "plugin-card" ? "plugin-title" : "project-title";
  const descCls = cardClass === "plugin-card" ? "plugin-desc" : "project-desc";
  const tagsCls = cardClass === "plugin-card" ? "plugin-tags" : "project-tags";
  return `
    <article class="${cardClass || "project-card"} reveal">
      <h3 class="${titleCls}">${p.title}</h3>
      <p class="${descCls}">${i18nValue(p.desc, lang)}</p>
      <div class="${tagsCls}">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
      <a href="${p.link}" class="card-link" ${p.link.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>${linkLabel}</a>
    </article>`;
}

/* ---------- Bộ lọc tag (chỉ dùng trên projects.html) ---------- */
function allTags() {
  const set = [];
  PROJECTS.forEach((p) => p.tags.forEach((t) => { if (!set.includes(t)) set.push(t); }));
  return set.sort();
}

function renderFilter(lang, activeTag) {
  const bar = document.getElementById("tagFilters");
  if (!bar) return;
  const labelAll = lang === "vi" ? "Tất cả" : "All";
  const chips = [`<button class="filter-btn ${activeTag === "all" ? "active" : ""}" data-tag="all">${labelAll}</button>`];
  allTags().forEach((t) => {
    chips.push(`<button class="filter-btn ${activeTag === t ? "active" : ""}" data-tag="${t}">${t}</button>`);
  });
  bar.innerHTML = chips.join("");
}

/* ---------- Render chính (gọi từ main.js khi đổi ngôn ngữ) ---------- */
window.renderProjects = function (lang) {
  const featured = document.getElementById("featuredProjects");
  const plugins = document.getElementById("pluginsGrid");
  const grid = document.getElementById("projectsGrid");
  if (!featured && !plugins && !grid) return;

  const active = window._activeTag || "all";

  // Trang chủ: lưới plugins nổi bật (3 dự án đầu)
  if (plugins) {
    plugins.innerHTML = PROJECTS.slice(0, 3).map((p) => cardHTML(p, lang, "plugin-card")).join("");
  }
  if (featured) {
    featured.innerHTML = PROJECTS.slice(0, 3).map((p) => cardHTML(p, lang, "project-card")).join("");
  }

  // Trang kho dự án: tất cả + lọc
  if (grid) {
    const list = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));
    grid.innerHTML = list.map((p) => cardHTML(p, lang, "project-card")).join("");
    renderFilter(lang, active);
    // reveal cho card mới
    if (window.revealNewEls) window.revealNewEls();
  }
};

/* ---------- Init (chỉ trên projects.html) ----------
   Render chính được gọi từ main.js sau khi khởi tạo ngôn ngữ.
   Ở đây chỉ gắn sự kiện cho bộ lọc tag. */
document.addEventListener("DOMContentLoaded", () => {
  const filterBar = document.getElementById("tagFilters");
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      window._activeTag = btn.dataset.tag;
      window.renderProjects(window.getLang ? window.getLang() : "vi");
    });
  }
});
