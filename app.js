'use strict';

const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  swords: '<path d="m4 3 6 2 10 13-2 2L5 10 3 4Zm13 0-4 5m7-5 1 4-5 6M3 21l5-5m8 0 5 5M3 16l5 5m8-1 4-4"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m0-16a3 3 0 0 1 0 6m3 4a5 5 0 0 1 3 4v2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>',
  list: '<path d="M9 5h12M9 12h12M9 19h12M3 5h.1M3 12h.1M3 19h.1"/>',
  trophy: '<path d="M7 3h10v6a5 5 0 0 1-10 0Zm5 11v5m-4 2h8M7 5H3v2a5 5 0 0 0 5 5m9-7h4v2a5 5 0 0 1-5 5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h.1m4 0h.1m4 0h.1"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = icon(node.dataset.icon); });
const $ = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nf = new Intl.NumberFormat('ru-RU');
const number = value => nf.format(value || 0);
const percent = value => value === null || !Number.isFinite(value) ? '—' : (value * 100).toLocaleString('ru-RU', {minimumFractionDigits:1, maximumFractionDigits:1}) + '%';
const key = value => String(value).toLowerCase().replace(/[^a-zа-яё0-9]/g, '').replaceAll('ё', 'е');

// Exact game API IDs mapped to official artwork IDs and readable Russian names.
const catalog = [
 ['Scorpion','scorpion','SCORPION','Скорпион','Ширай Рю','#cf9b43'],
 ['SubZero','sub-zero','SUB-ZERO','Саб-Зиро','Лин Куэй','#699db9'],
 ['Smoke','smoke','SMOKE','Смоук','Ширай Рю','#a2a1ab'],
 ['JohnnyCage','johnny-cage','JOHNNY CAGE','Джонни Кейдж','Земное царство','#9f9c71'],
 ['Raiden','raiden','RAIDEN','Рейден','Земное царство','#8eafd1'],
 ['Kitana','kitana','KITANA','Китана','Внешний мир','#6690bc'],
 ['LiuKang','liu-kang','LIU KANG','Лю Кан','Хранитель времени','#b6654d'],
 ['NoobSaibot','noob-saibot','NOOB SAIBOT','Нуб Сайбот','Хаос','#8a7aaf'],
 ['Homelander','homelander','HOMELANDER','Хоумлендер','Гость','#bf5d52'],
 ['Havik','havik','HAVIK','Хавик','Царство порядка','#ac6660'],
 ['OmniMan','omni-man','OMNI-MAN','Омни-Мэн','Гость','#ba5c53'],
 ['Baraka','baraka','BARAKA','Барака','Внешний мир','#b08c6d'],
 ['Mileena','mileena','MILEENA','Милина','Внешний мир','#bf7ca6'],
 ['Ghostface','ghostface','GHOSTFACE','Гоустфейс','Гость','#a3aaa5'],
 ['T1000','t-1000','T-1000','Т-1000','Гость','#91adbe'],
 ['Reiko','reiko','REIKO','Рейко','Внешний мир','#a86e62'],
 ['Peacemaker','peacemaker','PEACEMAKER','Миротворец','Гость','#9cacae'],
 ['QuanChi','quan-chi','QUAN CHI','Куан Чи','Преисподняя','#81a994'],
 ['Reptile','reptile','REPTILE','Рептилия','Затерра','#75a187'],
 ['LiMei','li-mei','LI MEI','Ли Мей','Внешний мир','#b482a9'],
 ['Cyrax','cyrax','CYRAX','Сайракс','Лин Куэй','#c2a35a'],
 ['ShaoKahn','shao-kahn','GENERAL SHAO','Генерал Шао','Внешний мир','#ba6a52'],
 ['Nitara','nitara','NITARA','Нитара','Ваэтэрнус','#b2626d'],
 ['KungLao','kung-lao','KUNG LAO','Кун Лао','Земное царство','#9a9272'],
 ['Sindel','sindel','SINDEL','Синдел','Внешний мир','#a78db9'],
 ['Ashrah','ashrah','ASHRAH','Ашра','Преисподняя','#bab394'],
 ['Conan','conan','CONAN','Конан','Гость','#b99573'],
 ['Takeda','takeda','TAKEDA','Такеда','Ширай Рю','#c49c67'],
 ['Tanya','tanya','TANYA','Таня','Внешний мир','#ba9c51'],
 ['Kenshi','kenshi-takahashi','KENSHI','Кенши','Земное царство','#b66a61'],
 ['ShangTsung','shang-tsung','SHANG TSUNG','Шан Цзун','Внешний мир','#c4a367'],
 ['Geras','geras','GERAS','Герас','Хранитель времени','#bcaa88'],
 ['Ermac','ermac','ERMAC','Ермак','Внешний мир','#84a88a'],
 ['Rain','rain','RAIN','Рейн','Внешний мир','#9a83ba'],
 ['Sektor','sektor','SEKTOR','Сектор','Лин Куэй','#bd7061']
].map(([id,slug,name,ru,faction,color]) => ({id,slug,name,ru,faction,color,base:false}));
const byId = Object.fromEntries(catalog.map(f => [f.id,f]));
const kameoCatalog = {
 SubZeroKAM:['sub-zero','SUB-ZERO'], ShujinkoKAM:['shujinko','SHUJINKO'], ScorpionKAM:['scorpion','SCORPION'], MotaroKAM:['motaro','MOTARO'], KungLaoKAM:['kung-lao','KUNG LAO'], CyraxKAM:['cyrax','CYRAX'], FrostKAM:['frost','FROST'], GoroKAM:['goro','GORO'], JaxKAM:['jax','JAX'], KanoKAM:['kano','KANO'], DarriusKAM:['darrius','DARRIUS'], SareenaKAM:['sareena','SAREENA'], SektorKAM:['sektor','SEKTOR'], SonyaKAM:['sonya','SONYA'], StrykerKAM:['stryker','STRYKER'], TremorKAM:['tremor','TREMOR'], KhameleonKAM:['khameleon','KHAMELEON'], JanetCageKAM:['janet-cage','JANET CAGE'], MavadoKAM:['mavado','MAVADO'], FerraKAM:['ferra','FERRA'], MadamBoKAM:['madam-bo','MADAM BO']
};
const kameoName = id => kameoCatalog[id]?.[1] || id.replace(/KAM$/, '');

const rankLevels = {6:'Полубог', 7:'Бог', 8:'Старший бог'};
let rankSide = 'any', rankLevel = '6', appliedRankFilter = 'any-6', rankRequest = 0;
const rankViews = {};
let snapshot = null;
let category = 'all';
let layout = 'grid';
let favorites = new Set();
try { const stored = JSON.parse(localStorage.getItem('mk1-meta-favorites') || '[]'); if (Array.isArray(stored)) favorites = new Set(stored.filter(id => byId[id])); } catch { /* Storage may be disabled in privacy mode. */ }
const currentView = () => snapshot?.views[$('period').value];
const statsFor = id => currentView()?.fighters[id] || {appearances:0,wins:0,players:0};
const winrate = s => s.appearances ? s.wins / s.appearances : null;
const weightedRate = s => s.appearances && Number.isFinite(s.weighted_win_rate) ? s.weighted_win_rate : null;
const weightedTitle = s => weightedRate(s) === null ? 'Недостаточно данных для оценки' : `Оценка против случайного соперника по его популярности. Покрытие: ${percent(s.coverage)}.`;
const intervalText = interval => Array.isArray(interval) && interval.length === 2 ? `${percent(interval[0])}–${percent(interval[1])}` : '—';
const tone = rate => rate === null ? '' : rate >= .5 ? 'positive' : 'negative';
const imageFor = f => `assets/fighters/${f.slug}-thumb.webp`;
const heroFor = f => `assets/fighters/${f.slug}-hero.webp`;

function renderRankFilter() {
 const period = $('period').value, id = `${rankSide}-${rankLevel}`, v = currentView();
 document.querySelectorAll('[data-rank-side]').forEach(b => { const on = b.dataset.rankSide === rankSide; b.classList.toggle('selected', on); b.setAttribute('aria-pressed', on); });
 document.querySelectorAll('[data-rank-level]').forEach(b => {
  const on = b.dataset.rankLevel === rankLevel;
  b.classList.toggle('selected', on); b.setAttribute('aria-pressed', on);
  b.querySelector('small').textContent = number(snapshot.rank_filters?.[`${rankSide}-${b.dataset.rankLevel}`]?.[period]);
 });
 $('rank-metric').textContent = rankLevels[rankLevel].toUpperCase() + ' +';
 $('rank-metric-note').textContent = rankSide === 'both' ? 'оба игрока' : 'хотя бы один игрок';
 $('download-link').href = id === snapshot.rank_filter ? 'data/stats.json' : `data/stats-${id}.json`;
 $('download-link').download = id === snapshot.rank_filter ? 'mk1-meta-stats.json' : `mk1-meta-stats-${id}.json`;
 const thin = catalog.filter(f => (v.fighters[f.id]?.appearances || 0) < 30).length;
 const who = rankSide === 'both' ? 'у обоих игроков' : 'хотя бы у одного игрока';
 $('rank-caption').innerHTML = `Сетов: <strong>${number(v.sets)}</strong>. Ранг ${rankLevels[rankLevel]} или выше подтверждён ${who}.${thin ? ` <span class="rank-warning">У ${thin} из ${catalog.length} бойцов меньше 30 участий: их винрейт ненадёжен.</span>` : ''}`;
}

async function applyRankFilter() {
 const id = `${rankSide}-${rankLevel}`, request = ++rankRequest;
 $('main').setAttribute('aria-busy', 'true');
 try {
  if (!rankViews[id]) {
   const response = await fetch(`data/stats-${id}.json`);
   if (!response.ok) throw new Error('Rank filter unavailable');
   const data = await response.json();
   if (data.generated_at !== snapshot.generated_at) throw new Error('Rank filter belongs to another snapshot');
   rankViews[id] = data.views;
  }
  if (request !== rankRequest) return;
  snapshot.views = rankViews[id];
  appliedRankFilter = id;
  renderSummary(); showPage();
 } catch (error) {
  if (request !== rankRequest) return;
  [rankSide, rankLevel] = appliedRankFilter.split('-');
  renderSummary();
  $('rank-caption').innerHTML = '<span class="rank-warning">Не удалось загрузить этот срез. Проверь соединение и попробуй ещё раз.</span>';
  console.error('MK1 META: failed to load rank filter', error);
 } finally {
  if (request === rankRequest) $('main').removeAttribute('aria-busy');
 }
}

function renderSummary() {
 const v = currentView();
 renderRankFilter();
 $('total-sets').textContent = number(v.sets);
 $('total-players').textContent = number(v.players);
 $('updated-at').textContent = 'Снимок: ' + new Date(snapshot.generated_at).toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Dubai'}) + ' GST';
}

function filteredFighters() {
 const term = key($('search').value);
 return catalog.filter(f => (!term || key(f.name + f.ru + f.id).includes(term)) && (category === 'all' || category === 'base' && f.base || category === 'dlc' && !f.base || category === 'favorites' && favorites.has(f.id))).sort((a,b) => {
  if ($('sort').value === 'name') return a.name.localeCompare(b.name);
  if ($('sort').value === 'weighted') return (weightedRate(statsFor(b.id)) ?? -1) - (weightedRate(statsFor(a.id)) ?? -1) || a.name.localeCompare(b.name);
  if ($('sort').value === 'winrate') return (winrate(statsFor(b.id)) ?? -1) - (winrate(statsFor(a.id)) ?? -1) || a.name.localeCompare(b.name);
  return statsFor(b.id).appearances - statsFor(a.id).appearances || a.name.localeCompare(b.name);
 });
}

function renderFighters() {
 if (!snapshot) return;
 const fighters = filteredFighters();
 const total = currentView().sets * 2;
 $('results-count').textContent = `Показано ${fighters.length} из ${catalog.length} персонажей`;
 $('fighter-grid').hidden = layout !== 'grid' || !fighters.length;
 $('fighter-table').hidden = layout !== 'table' || !fighters.length;
 $('empty-state').hidden = fighters.length > 0;
 if (layout === 'grid') {
  $('fighter-grid').innerHTML = fighters.map((f,index) => {
   const s = statsFor(f.id), share = total ? s.appearances / total : null;
   return `<article class="fighter-card" style="--fighter-color:${f.color}"><button class="favorite-button" data-favorite="${f.id}" aria-label="${favorites.has(f.id) ? 'Убрать из избранного' : 'В избранное'}: ${f.ru}" aria-pressed="${favorites.has(f.id)}">${icon('star')}</button><button class="fighter-main" data-fighter="${f.id}" aria-label="Открыть статистику: ${f.ru}"><div class="fighter-image"><span class="card-index">${String(index+1).padStart(2,'0')}</span><img src="${heroFor(f)}" alt="${f.ru}" loading="${index < 4 ? 'eager' : 'lazy'}" width="1280" height="1280"></div><div class="fighter-identity"><h3>${f.name}</h3><span><span class="color-mark"></span>${f.ru} <span> / </span> ${f.base ? 'Основной ростер' : 'DLC'}</span></div><div class="fighter-stats"><div class="winrate-stat" title="${weightedTitle(s)}"><span class="stat-label">ВИНРЕЙТ</span><strong class="stat-value ${tone(weightedRate(s))}">${percent(weightedRate(s))}</strong></div><div class="popularity-stat"><span class="stat-label">ПОПУЛЯРНОСТЬ</span><strong class="stat-value">${percent(share)}</strong><div class="pick-bar"><span style="width:${Math.min(100,(share || 0)*1000)}%"></span></div></div></div><div class="card-bottom"><span>${number(s.appearances)} участий ${s.appearances < 30 ? '<small>· мало данных</small>' : ''}</span><span>Статистика ${icon('arrow')}</span></div></button></article>`;
  }).join('');
 } else {
  $('fighter-table').innerHTML = `<table><thead><tr><th>#</th><th>ПЕРСОНАЖ</th><th>ФАКТ. ВИНРЕЙТ</th><th>ВЗВЕШ. ВИНРЕЙТ</th><th>ПОКРЫТИЕ</th><th>ПОПУЛЯРНОСТЬ</th><th>УЧАСТИЙ</th><th>ИГРОКОВ</th></tr></thead><tbody>${fighters.map((f,i) => {const s=statsFor(f.id),rate=winrate(s);return `<tr><td>${String(i+1).padStart(2,'0')}</td><td><button data-fighter="${f.id}" aria-label="Открыть статистику: ${f.ru}"><img src="${imageFor(f)}" alt="" loading="lazy"><strong>${f.name}</strong></button></td><td class="${tone(rate)}">${percent(rate)}</td><td class="${tone(weightedRate(s))}" title="${weightedTitle(s)}">${percent(weightedRate(s))}</td><td>${weightedRate(s)===null?'—':percent(s.coverage)}</td><td>${percent(total?s.appearances/total:null)}</td><td>${number(s.appearances)}</td><td>${number(s.players)}</td></tr>`;}).join('')}</tbody></table>`;
 }
}

function renderWeightedDetail(s) {
 if (weightedRate(s) === null) return '<p class="detail-note">Нет данных для расчёта взвешенного винрейта в выбранном периоде.</p>';
 return `<section class="weighted-explanation" aria-label="Подробности взвешенного винрейта"><h3>Против случайного соперника</h3><p>Результаты матчапов взвешены по популярности соперников в выбранном периоде. Малые выборки сглажены; зеркало всегда даёт 50%.</p><div class="weighted-confidence"><div><span>Покрытие по популярности</span><strong>${percent(s.coverage)}</strong></div><div><span>Условный 95% интервал</span><strong>${intervalText(s.conditional_credible_95)}</strong></div></div>${s.unknown_matchup_mass>0.000001?`<p class="coverage-warning">Для ${percent(s.unknown_matchup_mass)} популярности соперников встреч нет: использована нейтральная оценка 50%. Границы влияния неизвестных матчапов: ${intervalText(s.missing_data_bounds)}.</p>`:''}<p class="weighted-caveat">Интервал учитывает неопределённость модели, но не исправляет смещение выборки и зависимость повторных встреч одних игроков.</p></section>`;
}

// Sort choice survives switching fighters; collapsed sections reset on every open.
const detailSort = {kameos:{key:'game_share',dir:-1}, opponents:{key:'rate',dir:-1}};
const kameoColumns = [['name','КАМЕО'],['game_share','ДОЛЯ ИГР'],['popularity','ДОЛЯ ИГРОКОВ'],['rate','ВИНРЕЙТ'],['sets','СЕТОВ'],['players','ИГРОКОВ']];
const opponentColumns = [['name','СОПЕРНИК'],['rate','ВИНРЕЙТ'],['sets','СЕТОВ'],['game_share','ДОЛЯ ИГР'],['popularity','ПОПУЛЯРНОСТЬ'],['players','ИГРОКОВ']];
let detailFighter = null;

function sortedRows(rows, table) {
 const {key:field, dir} = detailSort[table];
 return [...rows].sort((a,b) => {
  const x = a[field] ?? null, y = b[field] ?? null;
  if (x === null || y === null) { if (x !== y) return x === null ? 1 : -1; }
  else if (x !== y) return dir * (typeof x === 'string' ? x.localeCompare(y,'ru') : x - y);
  return a.name.localeCompare(b.name,'ru');
 });
}

function sortableHead(table, columns) {
 const state = detailSort[table];
 return `<thead><tr>${columns.map(([field,label]) => {
  const active = state.key === field;
  return `<th aria-sort="${active ? (state.dir < 0 ? 'descending' : 'ascending') : 'none'}"><button type="button" class="sort-button${active ? ' active' : ''}" data-sort-table="${table}" data-sort-key="${field}">${label}<span aria-hidden="true">${active ? (state.dir < 0 ? '▼' : '▲') : ''}</span></button></th>`;
 }).join('')}</tr></thead>`;
}

const collapsible = (title, count, content) => `<details class="detail-section"><summary><h3>${title}</h3><span class="detail-count">${number(count)}</span><span class="detail-toggle"><span class="when-closed">Показать</span><span class="when-open">Скрыть</span></span></summary>${content}</details>`;

function kameoTable(id) {
 const data = currentView().fighter_kameos[id];
 const rows = sortedRows(Object.entries(data.kameos).map(([kameo,s]) => ({...s, kameo, name:kameoName(kameo), rate:s.display_win_rate})), 'kameos');
 return `<table>${sortableHead('kameos', kameoColumns)}<tbody>${rows.map(s => {
  const entry = kameoCatalog[s.kameo];
  return `<tr><td><span class="detail-cell">${entry?`<img src="assets/kameos/${entry[0]}.webp" alt="" loading="lazy" width="108" height="108">`:''}${escapeHtml(s.name)}</span></td><td>${percent(s.game_share)}</td><td>${percent(s.popularity)}</td><td class="${tone(s.rate)}"${s.rate===null&&s.sets?` title="Малая выборка: нужно ещё ${number(s.sets_needed)} сетов"`:''}>${percent(s.rate)}${s.rate===null&&s.sets?' <small>мало данных</small>':''}</td><td>${number(s.sets)}</td><td>${number(s.players)}</td></tr>`;
 }).join('')}</tbody></table>`;
}

function renderFighterKameos(id) {
 const data = currentView().fighter_kameos?.[id];
 if (!data) return '<h3>Камео</h3><p class="matchup-caption">Нет данных о камео в выбранном периоде.</p>';
 return collapsible('Камео', Object.keys(data.kameos).length, `<div class="table-wrap detail-table" id="kameos-table">${kameoTable(id)}</div><p class="detail-table-note">Доля игр — какую часть всех игр этого бойца сыграли с этим камео, в сумме 100%; сильнее учитывает активных игроков. Доля игроков — сколько из ${number(data.players)} игроков на этом бойце брали камео хотя бы раз; игрок может менять камео, поэтому сумма бывает больше 100%. Винрейт связки показывается от ${number(snapshot.team_min_sets)} сетов.</p>`);
}

function opponentRows(id) {
 const view = currentView(), picks = view.sets * 2;
 const rows = catalog.filter(other => other.id !== id).map(other => {
  const s = view.pairs[id+':'+other.id];
  return {f:other, name:other.ru, rate:s ? winrate(s) : null, sets:s?.sets || 0, players:s?.players ?? null,
          popularity:picks ? (view.fighters[other.id]?.appearances || 0) / picks : null};
 });
 const sets = rows.reduce((sum,row) => sum + row.sets, 0);
 return rows.map(row => ({...row, game_share:sets ? row.sets / sets : null}));
}

function opponentTable(id) {
 return `<table>${sortableHead('opponents', opponentColumns)}<tbody>${sortedRows(opponentRows(id), 'opponents').map(s => `<tr><td><span class="detail-cell"><img src="${imageFor(s.f)}" alt="" loading="lazy">${s.f.ru}</span></td><td class="${tone(s.rate)}">${percent(s.rate)}${s.sets&&s.sets<30?' <small>мало данных</small>':''}</td><td>${s.sets?number(s.sets):'нет встреч'}</td><td>${percent(s.game_share)}</td><td>${percent(s.popularity)}</td><td>${s.players===null?'—':number(s.players)}</td></tr>`).join('')}</tbody></table>`;
}

function renderOpponents(id) {
 const rows = opponentRows(id);
 if (!rows.some(row => row.sets)) return '<h3>Винрейт против соперников</h3><p class="matchup-caption">Нет встреч в выбранном периоде.</p>';
 return collapsible('Винрейт против соперников', rows.length, `<div class="table-wrap detail-table" id="opponents-table">${opponentTable(id)}</div><p class="detail-table-note">Доля игр — какую часть игр этого бойца заняли встречи с этим соперником, в сумме 100%. Популярность — доля соперника среди всех выборов бойцов за период. Игроков — сколько игроков на этом бойце встречали соперника. Зеркало не показано: в нём всегда 50%.</p>`);
}

function openFighter(id) {
 const f = byId[id]; if (!f || !snapshot) return;
 detailFighter = id;
 const s = statsFor(id), rate = winrate(s);
 $('fighter-detail').innerHTML = `<div class="detail-hero" style="--fighter-color:${f.color}"><img src="${heroFor(f)}" alt="${f.ru}"><div><span class="eyebrow">${f.faction.toUpperCase()} / ${f.base ? 'BASE ROSTER' : 'DLC'}</span><h2 id="dialog-title">${f.name}</h2><p>${f.ru}</p></div></div><div class="detail-content"><div class="detail-metrics"><div><span class="stat-label">ФАКТИЧЕСКИЙ ВИНРЕЙТ</span><strong class="${tone(rate)}">${percent(rate)}</strong></div><div title="${weightedTitle(s)}"><span class="stat-label">ВЗВЕШЕННЫЙ ВИНРЕЙТ</span><strong class="${tone(weightedRate(s))}">${percent(weightedRate(s))}</strong></div><div><span class="stat-label">УЧАСТИЙ В СЕТАХ</span><strong>${number(s.appearances)}</strong></div><div><span class="stat-label">ИГРОКОВ</span><strong>${number(s.players)}</strong></div></div>${renderWeightedDetail(s)}${renderFighterKameos(id)}${renderOpponents(id)}${s.appearances<30?'<p class="detail-note">Малая выборка: менее 30 участий. Этот винрейт пока не позволяет уверенно судить о результатах бойца.</p>':''}<button class="secondary-button detail-cta" data-compare="${id}">Сравнить с другим бойцом ${icon('arrow')}</button></div>`;
 $('fighter-dialog').showModal();
}

function renderMatchup() {
 if (!snapshot) return;
 const a = byId[$('matchup-own').value], b = byId[$('matchup-opponent').value];
 const pair = currentView().pairs[a.id+':'+b.id];
 const rate = pair ? winrate(pair) : null;
 const mirror = a.id === b.id;
 $('matchup-result').innerHTML = `<div class="versus-card">${[[a,rate],[b,rate===null?null:1-rate]].map(([f,r])=>`<div class="versus-fighter" style="--fighter-color:${f.color}"><img src="${heroFor(f)}" alt="${f.ru}"><div><h3>${f.name}</h3><span class="win-number ${tone(r)}">${percent(r)}</span></div></div>`).join('')}</div>${pair?`<div class="probability-bar"><span style="width:${rate*100}%"></span></div><p class="matchup-caption">${mirror?'Зеркальный матчап: обе стороны играют одним бойцом. Винрейт по определению равен 50%.':`<strong>${number(pair.wins)}</strong> побед и <strong>${number(pair.appearances-pair.wins)}</strong> поражений у ${a.ru}.`}<br>${number(pair.sets)} уникальных сетов · ${$('period').selectedOptions[0].textContent}${pair.sets < 30 ? '<br><span class="negative">Малая выборка — меньше 30 сетов.</span>' : ''}</p>`:'<p class="matchup-empty">В выбранном периоде встреч нет. Выбери другую пару или расширь период.</p>'}`;
}

function renderKameos() {
 if (!snapshot) return;
 const items = Object.entries(currentView().kameos).sort((a,b)=>b[1].appearances-a[1].appearances);
 const total = items.reduce((sum,[,s])=>sum+s.appearances,0);
 $('kameo-grid').innerHTML = items.length ? items.map(([id,s])=>{
  const entry = kameoCatalog[id], display = kameoName(id), rate = winrate(s);
  return `<article class="kameo-card">${entry?`<img src="assets/kameos/${entry[0]}.webp" alt="${display}" loading="lazy" width="108" height="108">`:''}<div><h3>${escapeHtml(display)}</h3><p>Винрейт <strong class="${tone(rate)}">${percent(rate)}</strong> · популярность ${percent(total?s.appearances/total:null)}</p><p>${number(s.appearances)} участий ${s.appearances<30?'· мало данных':''}</p></div></article>`;
 }).join('') : '<p class="matchup-empty">Нет данных о камео в выбранном периоде.</p>';
}

function showPage() {
 const page = ['fighters','matchups','kameos'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'fighters';
 const config = {fighters:['ПЕРСОНАЖИ','РОСТЕР / THE FIGHTERS','Найди своего бойца','Изучай персонажей. Сравнивай цифры. Выбирай свой стиль.'],matchups:['МАТЧАПЫ','ПРОТИВОСТОЯНИЕ / HEAD TO HEAD','Узнай своего соперника','Выбери пару бойцов и изучи результаты их встреч.'],kameos:['КАМЕО','ПОДДЕРЖКА / KAMEO FIGHTERS','Сила в партнёрстве','Популярность и винрейты камео в собранной выборке.']}[page];
 $('breadcrumb-current').textContent=config[0]; $('section-eyebrow').textContent=config[1]; $('section-title').innerHTML=config[2]+'<span>.</span>'; $('section-description').textContent=config[3];
 document.querySelectorAll('[data-page]').forEach(link=>{link.classList.toggle('active',link.dataset.page===page);if(link.dataset.page===page)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
 for (const name of ['fighters','matchups','kameos']) $(name+'-panel').hidden=name!==page;
 if (page==='fighters') renderFighters(); if(page==='matchups')renderMatchup(); if(page==='kameos')renderKameos();
}

document.addEventListener('click', event => {
 const sort = event.target.closest('[data-sort-table]');
 if (sort) {
  const {sortTable:table, sortKey:field} = sort.dataset, state = detailSort[table];
  if (state.key === field) state.dir = -state.dir; else { state.key = field; state.dir = field === 'name' ? 1 : -1; }
  $(table+'-table').innerHTML = (table === 'kameos' ? kameoTable : opponentTable)(detailFighter);
  $(table+'-table').querySelector(`[data-sort-key="${field}"]`).focus();
  return;
 }
 const favorite = event.target.closest('[data-favorite]');
 if (favorite) { const id=favorite.dataset.favorite; favorites.has(id)?favorites.delete(id):favorites.add(id);try{localStorage.setItem('mk1-meta-favorites',JSON.stringify([...favorites]));}catch{} renderFighters();return; }
 const fighter = event.target.closest('[data-fighter]'); if(fighter){openFighter(fighter.dataset.fighter);return;}
 const compare = event.target.closest('[data-compare]');if(compare){$('fighter-dialog').close();$('matchup-own').value=compare.dataset.compare;if($('matchup-opponent').value===compare.dataset.compare)$('matchup-opponent').value=compare.dataset.compare==='Scorpion'?'SubZero':'Scorpion';location.hash='matchups';showPage();$('section-title').scrollIntoView({behavior:'smooth',block:'start'});}
});
document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{category=button.dataset.category;document.querySelectorAll('[data-category]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',b===button);});renderFighters();}));
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{layout=button.dataset.view;document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',b===button);});renderFighters();}));
$('search').addEventListener('input',renderFighters);$('sort').addEventListener('change',renderFighters);
$('period').addEventListener('change',()=>{if(snapshot){renderSummary();showPage();}});
document.querySelectorAll('[data-rank-side]').forEach(button=>button.addEventListener('click',()=>{if(snapshot&&rankSide!==button.dataset.rankSide){rankSide=button.dataset.rankSide;renderRankFilter();applyRankFilter();}}));
document.querySelectorAll('[data-rank-level]').forEach(button=>button.addEventListener('click',()=>{if(snapshot&&rankLevel!==button.dataset.rankLevel){rankLevel=button.dataset.rankLevel;renderRankFilter();applyRankFilter();}}));
$('reset-filters').addEventListener('click',()=>{$('search').value='';document.querySelector('[data-category="all"]').click();});
for(const id of ['matchup-own','matchup-opponent']){$(id).innerHTML=catalog.map(f=>`<option value="${f.id}">${f.ru}</option>`).join('');$(id).addEventListener('change',renderMatchup);}$('matchup-own').value='Scorpion';$('matchup-opponent').value='SubZero';
for(const id of ['about-button','help-button','method-button'])$(id).addEventListener('click',()=>$('about-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});});
document.addEventListener('keydown',event=>{if(event.key==='/'&&!document.querySelector('dialog[open]')&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){event.preventDefault();if(location.hash!=='#fighters')location.hash='fighters';$('search').focus();}});
window.addEventListener('hashchange',showPage);
$('retry-button').addEventListener('click',load);

async function load() {
 $('error-state').hidden=true;
 $('fighter-grid').innerHTML=Array.from({length:4},()=>'<div class="fighter-card loading-shimmer" aria-hidden="true"></div>').join('');
 try {
  const [dataResponse,rosterResponse]=await Promise.all([fetch('data/stats.json'),fetch('assets/roster.json')]);
  if(!dataResponse.ok||!rosterResponse.ok)throw new Error('Snapshot unavailable');
  const [data,roster]=await Promise.all([dataResponse.json(),rosterResponse.json()]);
  snapshot=data;
  rankViews[data.rank_filter]=data.views;
  for(const f of catalog)f.base=roster.find(r=>r.id===f.slug)?.categories.includes('base')||false;
  renderSummary();showPage();
 }catch(error){$('fighter-grid').innerHTML='';$('results-count').textContent='Данные недоступны';$('error-state').hidden=false;console.error('MK1 META: failed to load static snapshot',error);}
}
load();
