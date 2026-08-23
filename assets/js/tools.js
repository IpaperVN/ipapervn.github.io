/* ============================================================
   ipaperVN Portfolio — tools.js
   Công cụ chạy trong trình duyệt cho quản trị server Minecraft
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setupAikarTool();
  setupColorTool();
});

/* ---------- Tool 1: Generator JVM flags (Aikar) ---------- */
function aikarFlags(ramGB, swapEnabled) {
  const lines = [
    `java -Xms${ramGB}G -Xmx${ramGB}G`,
    `-XX:+UseG1GC`,
    `-XX:+ParallelRefProcEnabled`,
    `-XX:MaxGCPauseMillis=200`,
    `-XX:+UnlockExperimentalVMOptions`,
    `-XX:+DisableExplicitGC`,
    `-XX:+AlwaysPreTouch`,
    `-XX:G1NewSizePercent=30`,
    `-XX:G1MaxNewSizePercent=40`,
    `-XX:G1HeapRegionSize=8M`,
    `-XX:G1ReservePercent=20`,
    `-XX:G1HeapWastePercent=5`,
    `-XX:G1MixedGCCountTarget=4`,
    `-XX:InitiatingHeapOccupancyPercent=15`,
    `-XX:G1MixedGCLiveThresholdPercent=90`,
    `-XX:G1RSetUpdatingPauseTimePercent=5`,
    `-XX:SurvivorRatio=32`,
    `-XX:+PerfDisableSharedMem`,
    `-XX:MaxTenuringThreshold=1`
  ];
  if (swapEnabled) lines.push("-XX:+UseLargePages");
  lines.push("-Dusing.aikars.flags=https://mcflags.emc.gs");
  lines.push("-Daikars.new.flags=true");
  return lines.join(" \\\n  ");
}

function setupAikarTool() {
  const btn = document.getElementById("aikarBtn");
  const out = document.getElementById("aikarOutput");
  const ram = document.getElementById("ramInput");
  const swap = document.getElementById("swapSelect");
  if (!btn || !out) return;

  const run = () => {
    let gb = parseInt(ram.value, 10);
    if (!gb || gb < 1) gb = 1;
    if (gb > 64) gb = 64;
    out.textContent = aikarFlags(gb, swap.value === "yes");
  };

  btn.addEventListener("click", run);
  ram.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
  run();
}

/* ---------- Tool 2: Chuyển đổi mã màu ---------- */
const LEGACY_TO_MINIMESSAGE = {
  "0": "black", "1": "dark_blue", "2": "dark_green", "3": "dark_aqua",
  "4": "dark_red", "5": "dark_purple", "6": "gold", "7": "gray",
  "8": "dark_gray", "9": "blue", "a": "green", "b": "aqua",
  "c": "red", "d": "light_purple", "e": "yellow", "f": "white",
  "k": "obfuscated", "l": "bold", "m": "strikethrough", "n": "underline",
  "o": "italic", "r": "reset"
};

function legacyToMini(str) {
  return str.replace(/&([0-9a-fk-orA-FK-OR])/g, (m, code) => {
    const name = LEGACY_TO_MINIMESSAGE[code.toLowerCase()];
    return name ? `<${name}>` : m;
  });
}

function miniToLegacy(str) {
  const reverse = {};
  Object.keys(LEGACY_TO_MINIMESSAGE).forEach((k) => {
    reverse[LEGACY_TO_MINIMESSAGE[k]] = k;
  });
  // Tag đóng </...> → reset
  let out = str.replace(/<\/[a-z_]+>/gi, "&r");
  // Tag mở <name> → &code
  out = out.replace(/<([a-z_]+)>/gi, (m, name) => {
    const code = reverse[name.toLowerCase()];
    return code ? `&${code}` : m;
  });
  return out;
}

function setupColorTool() {
  const btn = document.getElementById("colorBtn");
  const out = document.getElementById("colorOutput");
  const mode = document.getElementById("colorMode");
  const input = document.getElementById("colorInput");
  if (!btn || !out) return;

  const run = () => {
    const raw = input.value;
    if (!raw) { out.textContent = ""; return; }
    out.textContent = mode.value === "mini" ? legacyToMini(raw) : miniToLegacy(raw);
  };

  btn.addEventListener("click", run);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
}
