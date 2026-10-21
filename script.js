(() => {
  const $ = (s) => document.querySelector(s);
  const state = { q: "", cat: "All", filter: "All" };
  const keyOf = (name) => (CATEGORIES.find(c => c.name === name) || {}).key || "Apps";
  const gradients = { Movies:"#c81e3a,#6e0f24", TV:"#6a35e0,#2b1670", Games:"#17a05a,#0a5130", Books:"#1f6bff,#0b2f80", Music:"#e8861a,#7d3d07", Apps:"#13899a,#0a3f55", Software:"#7b3be8,#341a82", Learning:"#3a5bd9,#17297a", AI:"#d6338f,#5b1450" };
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const initials = (t) => t.split(/\s+/).slice(0,2).map(w => w[0]).join("").toUpperCase();

  const thumb = (it, badge = true) => {
    const k = keyOf(it.cat);
    return `<div class="thumb" style="background:linear-gradient(135deg,${gradients[k]})" aria-hidden="true">${esc(initials(it.title))}${badge ? `<span class="badge b-${k}">${esc(it.cat)}</span>` : ""}</div>`;
  };

  const card = (it) => `
    <button class="card" data-id="${ITEMS.indexOf(it)}" aria-label="${esc(it.title)} – details">
      ${thumb(it)}
      <div class="c-body">
        <span class="c-title">${esc(it.title)}</span>
        <span class="c-meta"><span><span class="star">★</span> ${it.rating}</span><span class="price">${it.price}</span></span>
        <span class="c-desc">${esc(it.desc)}</span>
        <span class="tags">${it.tags.slice(0,3).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</span>
        <span class="c-meta">${esc(it.platform)}</span>
        <span class="get">Get Link</span>
      </div>
    </button>`;

  // ----- Filtering -----
  const matchesFilter = (it) => {
    switch (state.filter) {
      case "Free": return it.price.includes("Free");
      case "Paid": return it.price.includes("Paid");
      case "Download": return it.type === "Download";
      case "Watch": return it.type === "Watch";
      case "Read": return it.type === "Read";
      case "Learn": return it.type === "Learn";
      case "AI Tools": return it.type === "AI";
      default: return true;
    }
  };
  const matchesSearch = (it) => {
    const q = state.q.trim().toLowerCase();
    if (!q) return true;
    return [it.title, it.cat, it.desc, it.long, it.platform, ...it.tags].join(" ").toLowerCase().includes(q);
  };
  const filtered = () => ITEMS.filter(it => (state.cat === "All" || it.cat === state.cat) && matchesFilter(it) && matchesSearch(it));

  function render() {
    const active = state.q.trim() || state.cat !== "All" || state.filter !== "All";
    $("#results").hidden = !active;
    $("#home").hidden = !!active;
    if (active) {
      const list = filtered();
      $("#resultsTitle").textContent = `${list.length} result${list.length === 1 ? "" : "s"}` + (state.cat !== "All" ? ` in ${state.cat}` : "");
      $("#resultsGrid").innerHTML = list.map(card).join("");
      $("#empty").hidden = list.length > 0;
    }
    document.querySelectorAll("#catTabs .chip").forEach(b => b.setAttribute("aria-selected", b.dataset.v === state.cat));
    document.querySelectorAll("#typeFilters .chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.v === state.filter));
    document.querySelectorAll(".menu a[data-cat]").forEach(a => a.classList.toggle("active", a.dataset.cat === state.cat));
  }

  // ----- Build static UI -----
  $("#catTabs").innerHTML = ["All", ...CATEGORIES.map(c => c.name)].map(n => `<button class="chip" role="tab" data-v="${esc(n)}">${esc(n)}</button>`).join("");
  $("#typeFilters").innerHTML = ["All","Free","Paid","Download","Watch","Read","Learn","AI Tools"].map(n => `<button class="chip" data-v="${n}">${n}</button>`).join("");
  $("#catTiles").innerHTML = CATEGORIES.map(c => `<button class="tile g-${c.key}" data-cat="${esc(c.name)}"><i aria-hidden="true">${c.icon}</i>${esc(c.name)}</button>`).join("");
  $("#trending").innerHTML = ITEMS.filter(i => i.trending).map(card).join("");
  $("#recommended").innerHTML = ITEMS.filter(i => i.rec).map(card).join("");
  $("#quickLinks").innerHTML = QUICK_LINKS.map(l => `<a class="ql ql-${l.name}" href="${l.url}" target="_blank" rel="noopener noreferrer">${l.name}<span aria-hidden="true">›</span></a>`).join("");
  $("#year").textContent = new Date().getFullYear();

  // ----- Events -----
  const setCat = (c) => { state.cat = c; render(); window.scrollTo({ top: $(".filters").offsetTop - 80, behavior: "smooth" }); };
  $("#catTabs").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) { state.cat = b.dataset.v; render(); } });
  $("#typeFilters").addEventListener("click", e => { const b = e.target.closest(".chip"); if (b) { state.filter = b.dataset.v; render(); } });
  $("#catTiles").addEventListener("click", e => { const t = e.target.closest(".tile"); if (t) setCat(t.dataset.cat); });
  $("#q").addEventListener("input", e => { state.q = e.target.value; render(); });
  $("#searchForm").addEventListener("submit", e => { e.preventDefault(); state.q = $("#q").value; render(); });
  $("#clearBtn").addEventListener("click", () => { state.q = ""; state.cat = "All"; state.filter = "All"; $("#q").value = ""; render(); });
  document.querySelectorAll(".menu a[data-cat]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); setCat(a.dataset.cat); closeMenu(); }));
  $("#bSearch").addEventListener("click", e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); $("#q").focus(); });

  // Mobile menu
  const closeMenu = () => { $("#menu").classList.remove("open"); $("#burger").setAttribute("aria-expanded", "false"); };
  $("#burger").addEventListener("click", () => { const o = $("#menu").classList.toggle("open"); $("#burger").setAttribute("aria-expanded", o); });

  // ----- Detail modal -----
  let lastFocus;
  function openModal(it) {
    const k = keyOf(it.cat);
    lastFocus = document.activeElement;
    $("#mThumb").style.background = `linear-gradient(135deg,${gradients[k]})`;
    $("#mThumb").textContent = initials(it.title);
    $("#mCat").className = `badge b-${k}`; $("#mCat").textContent = it.cat;
    $("#mPrice").textContent = it.price;
    $("#mTitle").textContent = it.title;
    $("#mSource").textContent = `Platform: ${it.platform}`;
    $("#mDesc").textContent = it.long;
    $("#mTags").innerHTML = it.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("");
    $("#mLink").href = it.url;
    $("#modal").hidden = false;
    document.body.style.overflow = "hidden";
    $("#mClose").focus();
  }
  function closeModal() { $("#modal").hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openModal(ITEMS[c.dataset.id]); });
  $("#mClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

  render();
})();
