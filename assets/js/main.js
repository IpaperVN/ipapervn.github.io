/* ============================================================
   ipaperVN Portfolio — main.js
   i18n (VN/EN), loading screen, nav, scroll reveal, active nav,
   back-to-top, count-up stats, orbit drag, Discord presence.
   Dùng chung cho tất cả các trang.
   ============================================================ */

/* ---------- Cấu hình ---------- */
// Discord User ID để hiển thị presence qua Lanyard.
// Điền ID Discord của bạn vào đây (dạng số). Để trống = hiện offline.
const DISCORD_ID = "453457576173109249";

/* ---------- 1. i18n dictionary ---------- */
const I18N = {
  vi: {
    "nav.plugins": "Plugins",
    "nav.experience": "Kinh nghiệm",
    "nav.blog": "Blog",
    "nav.support": "Hỗ trợ",
    "nav.tools": "Công cụ",
    "nav.wiki": "Wiki Kite",

    "hero.role": "Minecraft Plugin Developer & Skyblock Server Owner",
    "hero.status": "Available for hire",
    "hero.tagline":
      "Tôi xây dựng plugin Minecraft chất lượng cao cho máy chủ Paper — tối ưu hiệu năng, dễ tùy chỉnh và thân thiện với quản trị viên.",
    "hero.cta-plugins": "Xem plugins",
    "hero.cta-contact": "Liên hệ tôi",
    "hero.orbit": "Kéo để xoay",

    "stat.servers": "Máy chủ",
    "stat.users": "Người dùng",
    "stat.projects": "Dự án",
    "stat.years": "Năm kinh nghiệm",

    "plugins.title": "Plugins nổi bật",
    "plugins.intro": "Một số plugin và dự án tiêu biểu của tôi.",
    "plugins.view-all": "Xem tất cả dự án →",

    "exp.title": "Về tôi & Kinh nghiệm",
    "exp.p1":
      "Xin chào! Tôi là Shinn.Dev (aka ipaperVN) — nhà phát triển plugin Minecraft cho máy chủ Paper, vừa là chủ sở hữu một máy chủ Skyblock. Vì tự vận hành server, tôi hiểu rõ nhu cầu thực tế của quản trị viên: plugin phải mượt, ổn định và dễ bảo trì.",
    "exp.p2":
      "Tôi viết code hoàn toàn bằng Kotlin, từ các plugin đơn giản đến các hệ thống phức tạp như custom items, GUI, vùng bảo vệ, kinh tế skyblock và tối ưu hiệu năng máy chủ.",

    "blog.title": "Blog",
    "blog.intro": "Bài viết về phát triển plugin và quản trị máy chủ.",
    "blog.cat-tutorial": "Hướng dẫn",
    "blog.cat-tips": "Mẹo",
    "blog.cat-guide": "Kinh nghiệm",
    "blog.post1-title": "Bắt đầu với Kite: viết script Kotlin cho Paper",
    "blog.post1-excerpt": "Tìm hiểu cách cài đặt plugin Kite và viết script đầu tiên của bạn...",
    "blog.post2-title": "Tối ưu hiệu năng máy chủ Paper",
    "blog.post2-excerpt": "Những tham số JVM và cấu hình quan trọng giúp server của bạn mượt hơn...",
    "blog.post3-title": "Từ Legacy sang MiniMessage",
    "blog.post3-excerpt": "Chuyển đổi mã màu cũ sang hệ thống Adventure hiện đại trong plugin...",
    "blog.read": "Đọc tiếp →",

    "support.title": "Hỗ trợ & Liên hệ",
    "support.intro":
      "Bạn cần một plugin theo yêu cầu, muốn hợp tác, hay cần hỗ trợ? Kết nối với tôi qua Discord nhé!",
    "support.join": "Tham gia Discord",
    "support.other": "Liên hệ khác",

    "contact.email": "Email",
    "footer.note": "Được xây dựng bằng HTML, CSS & JavaScript thuần.",

    "projects.title": "Dự án",
    "projects.intro": "Toàn bộ dự án của tôi. Lọc theo tag để tìm nhanh plugin hoặc công cụ bạn cần.",
    "projects.view-all": "Xem tất cả dự án →",

    "tools.title": "Công cụ",
    "tools.intro": "Các công cụ chạy ngay trong trình duyệt, hữu ích cho quản trị máy chủ và phát triển plugin.",
    "tools.generate": "Tạo flags",
    "tools.aikar.name": "Generator JVM flags (Aikar)",
    "tools.aikar.desc": "Tạo gợi ý tham số JVM theo RAM cho máy chủ Paper, dựa trên khuyến nghị Aikar.",
    "tools.aikar.ram": "RAM (GB):",
    "tools.aikar.swap": "Cho phép swap (hibernation):",
    "tools.aikar.no-swap": "Không",
    "tools.aikar.yes-swap": "Có",
    "tools.color.name": "Chuyển đổi mã màu",
    "tools.color.desc": "Chuyển đổi giữa mã màu Legacy (&) và định dạng MiniMessage của Adventure.",
    "tools.color.mode": "Hướng:",
    "tools.color.to-legacy": "MiniMessage → Legacy",
    "tools.color.to-mini": "Legacy → MiniMessage",
    "tools.color.input": "Nhập:",
    "tools.color.convert": "Chuyển đổi"
  },

  en: {
    "nav.plugins": "Plugins",
    "nav.experience": "Experience",
    "nav.blog": "Blog",
    "nav.support": "Support",
    "nav.tools": "Tools",
    "nav.wiki": "Kite Wiki",

    "hero.role": "Minecraft Plugin Developer & Skyblock Server Owner",
    "hero.status": "Available for hire",
    "hero.tagline":
      "I build high-quality Minecraft plugins for Paper servers — performance-optimized, easy to configure and admin-friendly.",
    "hero.cta-plugins": "View plugins",
    "hero.cta-contact": "Contact me",
    "hero.orbit": "Drag to orbit",

    "stat.servers": "Servers",
    "stat.users": "Users",
    "stat.projects": "Projects",
    "stat.years": "Years experience",

    "plugins.title": "Featured plugins",
    "plugins.intro": "Some of my notable plugins and projects.",
    "plugins.view-all": "View all projects →",

    "exp.title": "About & Experience",
    "exp.p1":
      "Hello! I'm Shinn.Dev (aka ipaperVN) — a Minecraft plugin developer for Paper servers, and also the owner of a Skyblock server. Running my own server gives me a real feel for what admins need: smooth, stable, maintainable plugins.",
    "exp.p2":
      "I code entirely in Kotlin — from simple plugins to complex systems like custom items, GUIs, protection regions, skyblock economy and server performance optimization.",

    "blog.title": "Blog",
    "blog.intro": "Articles about plugin development and server administration.",
    "blog.cat-tutorial": "Tutorial",
    "blog.cat-tips": "Tips",
    "blog.cat-guide": "Guide",
    "blog.post1-title": "Getting started with Kite: writing Kotlin scripts for Paper",
    "blog.post1-excerpt": "Learn how to install the Kite plugin and write your first script...",
    "blog.post2-title": "Optimizing Paper server performance",
    "blog.post2-excerpt": "The key JVM flags and configs that keep your server running smooth...",
    "blog.post3-title": "From Legacy to MiniMessage",
    "blog.post3-excerpt": "Converting old color codes to the modern Adventure system in plugins...",
    "blog.read": "Read more →",

    "support.title": "Support & Contact",
    "support.intro":
      "Need a custom plugin, want to collaborate, or need support? Reach out on Discord!",
    "support.join": "Join Discord",
    "support.other": "Other contact",

    "contact.email": "Email",
    "footer.note": "Built with plain HTML, CSS & JavaScript.",

    "projects.title": "Projects",
    "projects.intro": "All my projects. Filter by tag to find a plugin or tool you need.",
    "projects.view-all": "View all projects →",

    "tools.title": "Tools",
    "tools.intro": "Tools that run right in your browser, useful for server administration and plugin development.",
    "tools.generate": "Generate flags",
    "tools.aikar.name": "JVM flags generator (Aikar)",
    "tools.aikar.desc": "Generate suggested JVM flags by RAM for your Paper server, based on Aikar's recommendations.",
    "tools.aikar.ram": "RAM (GB):",
    "tools.aikar.swap": "Allow swap (hibernation):",
    "tools.aikar.no-swap": "No",
    "tools.aikar.yes-swap": "Yes",
    "tools.color.name": "Color code converter",
    "tools.color.desc": "Convert between Legacy color codes (&) and Adventure MiniMessage format.",
    "tools.color.mode": "Direction:",
    "tools.color.to-legacy": "MiniMessage → Legacy",
    "tools.color.to-mini": "Legacy → MiniMessage",
    "tools.color.input": "Input:",
    "tools.color.convert": "Convert"
  }
};

/* ---------- 2. i18n engine ---------- */
function getInitialLang() {
  const saved = localStorage.getItem("lang");
  if (saved && I18N[saved]) return saved;
  const nav = (navigator.language || "en").toLowerCase();
  return nav.startsWith("vi") ? "vi" : "en";
}

let lang = getInitialLang();
window.getLang = () => lang;

function setLanguage(l, save = true) {
  lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = I18N[l] && I18N[l][key];
    if (val) el.textContent = val;
  });
  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.textContent = l === "vi" ? "EN" : "VI";
  if (typeof window.renderProjects === "function") window.renderProjects(l);
  if (save) {
    try { localStorage.setItem("lang", l); } catch (e) { /* ignore */ }
  }
}

/* ---------- 3. Loading screen ---------- */
function runLoader() {
  const loader = document.getElementById("loader");
  const bar = document.getElementById("loaderBar");
  const pct = document.getElementById("loaderPct");
  if (!loader) return;

  let progress = 0;
  const tick = () => {
    progress += Math.floor(Math.random() * 18) + 8;
    if (progress >= 100) {
      progress = 100;
      if (bar) bar.style.width = "100%";
      if (pct) pct.textContent = "100%";
      setTimeout(() => {
        loader.classList.add("hide");
        document.body.classList.add("loaded");
      }, 250);
      return;
    }
    if (bar) bar.style.width = progress + "%";
    if (pct) pct.textContent = progress + "%";
    setTimeout(tick, 110);
  };
  tick();
}

/* ---------- 4. Hamburger ---------- */
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- 5. Nav scrolled state ---------- */
function setupNavScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 6. Scroll reveal ---------- */
let revealIO = null;
function setupReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    return;
  }
  revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  window.revealNewEls();
}
window.revealNewEls = function () {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (!revealIO) { els.forEach((el) => el.classList.add("visible")); return; }
  els.forEach((el) => revealIO.observe(el));
};

/* ---------- 7. Active nav (anchor trong trang) ---------- */
function setupActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  if (!("IntersectionObserver" in window) || sections.length === 0) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const href = link.getAttribute("href") || "";
          if (href.startsWith("#")) link.classList.toggle("active", href === "#" + entry.target.id);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((section) => io.observe(section));
}

/* ---------- 8. Count-up stats ---------- */
function setupCountUp() {
  const nums = document.querySelectorAll(".stat-num[data-count]");
  if (nums.length === 0) return;
  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!("IntersectionObserver" in window)) {
    nums.forEach(animate);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  nums.forEach((el) => io.observe(el));
}

/* ---------- 9. Orbit drag ---------- */
function setupOrbit() {
  const img = document.getElementById("orbitImg");
  if (!img) return;
  let dragging = false, lastX = 0, rotY = 0;
  const apply = () => { img.style.transform = `rotateY(${rotY}deg)`; };
  const down = (e) => {
    dragging = true;
    lastX = e.touches ? e.touches[0].clientX : e.clientX;
    img.style.cursor = "grabbing";
  };
  const move = (e) => {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    rotY += (x - lastX) * 0.5;
    lastX = x;
    apply();
  };
  const up = () => { dragging = false; img.style.cursor = "grab"; };

  img.style.cursor = "grab";
  img.addEventListener("mousedown", down);
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
  img.addEventListener("touchstart", down, { passive: true });
  window.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("touchend", up);
}

/* ---------- 10. Back to top ---------- */
function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 400), { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- 11. Footer year ---------- */
function setupYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* ---------- 12. Discord presence (Lanyard) ---------- */
const DISCORD_STATUS = {
  online: { label: "Online", color: "#4ade80" },
  idle: { label: "Idle", color: "#facc15" },
  dnd: { label: "Do Not Disturb", color: "#f87171" },
  offline: { label: "Offline", color: "#9ca3af" }
};

function setupDiscord() {
  const statusEl = document.getElementById("discordStatus");
  const activityEl = document.getElementById("discordActivity");
  if (!statusEl || !activityEl) return;

  const setStatus = (status) => {
    const s = DISCORD_STATUS[status] || DISCORD_STATUS.offline;
    statusEl.textContent = s.label;
    statusEl.style.color = s.color;
  };
  const setActivity = (text) => { activityEl.textContent = text; };

  if (!DISCORD_ID) {
    setStatus("offline");
    setActivity("⚠️ Chưa cấu hình Discord ID — mở main.js, điền const DISCORD_ID.");
    return;
  }

  fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
    .then((r) => r.json())
    .then((data) => {
      if (!data.success) throw new Error("Lanyard error");
      const d = data.data;
      setStatus(d.discord_status || "offline");
      // Avatar từ Discord CDN
      const avatarEl = document.getElementById("discordAvatar");
      if (avatarEl && d.discord_user && d.discord_user.avatar) {
        const url = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.png?size=128`;
        avatarEl.style.backgroundImage = `url("${url}")`;
        avatarEl.textContent = "";
      }
      const acts = (d.activities || []).filter((a) => a.type !== 4 && a.name);
      if (acts.length) {
        const a = acts[0];
        setActivity(`${a.name} — ${a.details || a.state || "Playing"}`);
      } else {
        setActivity(lang === "vi" ? "Đang rảnh." : "No active activity.");
      }
    })
    .catch(() => {
      setStatus("offline");
      setActivity(lang === "vi" ? "Không thể kết nối Discord (offline hoặc ID sai)." : "Could not reach Discord (offline or wrong ID).");
    });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  runLoader();
  setupReveal();
  setLanguage(lang);

  const toggle = document.getElementById("langToggle");
  if (toggle) toggle.addEventListener("click", () => setLanguage(lang === "vi" ? "en" : "vi"));

  setupHamburger();
  setupNavScroll();
  setupActiveNav();
  setupCountUp();
  setupOrbit();
  setupBackToTop();
  setupYear();
  setupDiscord();
});
