let currentArticle = null;

let currentLanguage = "en";

const filterState = {
  category: "all",
  author: "all",
  search: "",
  sort: "newest"
  
};

const translations = {
en: {
  title: "MindSpace",
  subtitle: "Articles written by people who think too much.",
  newArticle: "Try to write something",

  allCategories: "All Categories",
  allWriters: "All Writers",

  resetFilter: "Reset Filters",
  switchToFa: "Persian",
  switchToEn: "English",

  submit: "Submit",
  deleteArticle: "Delete Article",

  commentPlaceholder: "Write your opinion",
  authorPlaceholder: "Write your name",

  deleteAlert: "Do you want to delete this article?",

  footerText: "Trying to restore humanity, one article at a time",
  articlesShared: "Articles Shared:",
  footerCredit: "Loosing-it LLC 2026",

  image: "Image",
  video: "Video",
  audio: "Audio",

  titleLabel: "Title",
  authorLabel: "Author",
  categoryLabel: "Category",
  summaryLabel: "Summary",
  mediaTypeLabel: "Media Type",
  languageLabel: "Article Language",
  mediaUrlLabel: "Media URL",
  contentLabel: "Content"
},
fa: {
  title: "هزارتو",
  subtitle: "مقاله برای کسانی که زیادی فکر میکنن",
  newArticle: "مقاله جدید",

  allCategories: "همه موضوعات",
  allWriters: "همه نویسندگان",

  resetFilter: "تنظیم مجدد فیلترها",
  switchToFa: "فارسی",
  switchToEn: "انگلیسی",

  submit: "ثبت",
  deleteArticle: "حذف مقاله",

  commentPlaceholder: "نظر خودتان را بنویسید",
  authorPlaceholder: "نام شما",

  deleteAlert: "آیا میخواهید این مقاله حذف شود؟",

  footerText: "در تلاش برای بازگردانی انسانیت",
  articlesShared: "مقاله های به اشتراک گذاشته شده:",
  footerCredit: "Loosing-it LLC 2026",

  image: "عکس",
  video: "ویدیو",
  audio: "صوت",

  titleLabel: "عنوان",
  authorLabel: "نویسنده",
  categoryLabel: "موضوع",
  summaryLabel: "خلاصه مقاله",
  mediaTypeLabel: "نوع فایل اشتراکی",
  languageLabel: "زبان مقاله",
  mediaUrlLabel: "آدرس فایل اشتراکی",
  contentLabel: "محتوای اصلی"
}
};

let allArticles = [];

const languageBtn = document.getElementById("language-btn");

const writeLanguage = document.getElementById("input-language");

const writerSidebar = document.getElementById("writer-sidebar");

const resetBtn = document.getElementById("reset-filters");

const categorySelect = document.getElementById("filter-category");

const searchInput = document.getElementById("search-input");

const searchForm = document.getElementById("search-form");

const sortSelect = document.getElementById("sort-select");

const themeBtn = document.getElementById("theme-btn");

// Get the container where we'll put the cards
const container = document.getElementById('articles-container');

// Modal logic for user written articles
const writeOverlay = document.querySelector('.write-overlay');
const writeBox = document.querySelector('.write-box');
const writeForm = document.querySelector('.write-form');

// event link for opening and closing the overlay
const writeOpen = document.querySelector('.new-user-article');
const writeClose = document.querySelector('.write-close');

// User input form input
const writeTitle = document.getElementById('input-title');
const writeAuthor = document.getElementById('input-author');
const writeCategory = document.getElementById('input-category');
const writeSummary = document.getElementById('input-summary');
const writeContent = document.getElementById('input-content');
const writeMediaType = document.getElementById('input-media-type');
const writeMediaUrl = document.getElementById('input-media-url');

// Modal logic for the user to see articles
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');
const modalBox = document.querySelector('.modal-box');
const modalContent = document.querySelector('.modal-content');



// =======================================
// 1. loadAllArticles()
// =======================================
function loadAllArticles() {
  
  const saved = localStorage.getItem('userArticles');
  const userArticles = saved ? JSON.parse(saved) : [];
  
  const defaultArticleSource = articles.map(a => ({
    ...a,
    source: "default",
    language: a.language || "en",
    mediaType: a.mediaType || "",
    mediaUrl: a.mediaUrl || ""
  }));
  const userArticleSource = userArticles.map(a =>({
    ...a, 
    source : "user",
    language: a.language || "en",
    mediaType: a.mediaType || "",
    mediaUrl: a.mediaUrl || ""
  }));
  
  allArticles = [...defaultArticleSource,...userArticleSource];

  refreshUI();
}


// =======================================
// 2. createArticleCard(article)
// =======================================
function createArticleCard(article){
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
      <div class="card-category">${article.category}</div>
      <div class="card-title">${article.title}</div>
      <div class="card-summary">${article.summary}</div>
      <div class="card-meta">By ${article.author} &middot; ${article.date}</div>
      <a class="read-more">Read article</a>
  `;

  card.addEventListener('click', function(){
    openArticleModal(article);
  });

  return card;
}

function renderArticles() {
  container.innerHTML = "";

  const filtered = getFilteredArticles();

  document.getElementById('article-count').textContent = 
    filtered.length;

  filtered.forEach(a =>
    container.appendChild(createArticleCard(a))
  );
}

function applyFilters() {
  refreshUI();
}

function renderCategoryDropdown() {
  categorySelect.innerHTML = 
  '<option value = "all"> All categories</option>';

  const categories = [
    ...new Set(allArticles.map(a => a.category))
  ];

  categories.forEach(category => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);
  });

  categorySelect.value = filterState.category;
}

function renderWriterSidebar(){
  writerSidebar.innerHTML = "";

  const authors = [... new Set(allArticles.map(a => a.author))];

  // "All" option
  const allBtn = document.createElement("div");
  allBtn.className = "writer-item";
  allBtn.classList.toggle("active", filterState.author === "all");
  allBtn.textContent = "All writers";

  allBtn.addEventListener("click", () => {
    filterState.author = "all";
    applyFilters();
  });

  writerSidebar.appendChild(allBtn);

  // Individual authors
  authors.forEach(author => {
    const el = document.createElement("div");
    el.className = "writer-item";
    el.textContent = author;

    el.classList.toggle("active", filterState.author === author);
    el.addEventListener("click", () => {
      filterState.author = author;
      applyFilters();
    });
    writerSidebar.appendChild(el);
  });
}

function resetFilters() {
    filterState.category = "all";
    filterState.author = "all";

    filterState.search = "";
    searchInput.value = "";

    document.getElementById("filter-category").value = "all";

    applyFilters();

}

function updateModalLanguage(t) {
  const author = modalContent.querySelector(".comment-author");
  const input = modalContent.querySelector(".comment-input");
  const deleteBtn = modalContent.querySelector(".delete-btn");
  const submitBtn = modalContent.querySelector(".comment-submit");

  if (author) author.placeholder = t.authorPlaceholder;
  if (input) input.placeholder = t.commentPlaceholder;
  if (deleteBtn) deleteBtn.textContent = t.deleteArticle;
  if (submitBtn) submitBtn.textContent = t.submit;

}

function setLanguage(lang) {
  currentLanguage = lang;

  const t = translations[lang];

  // --- Title ---
  document.title = t.title;

  // --- Header ---
  document.querySelector("h1").textContent = t.title;
  document.querySelector(".subtitle").textContent = t.subtitle;
  document.querySelector(".new-user-article").textContent = t.newArticle;

  // --- Filters ---
  document.getElementById("reset-filters").textContent = t.resetFilter;

  const categorySelect = document.getElementById("filter-category");
  categorySelect.querySelector('option[value="all"]').textContent = t.allCategories;

  // --- Sidebar (static labels only, dynamic authors stay the same)
  refreshUI();

  // --- Footer ---
  document.querySelector(".footer-quote").textContent = t.footerText;
  const span = document.querySelector("#article-count");
  document.querySelector(".footer-count").innerHTML =
  `${t.articlesShared} <span id="article-count">${span.textContent}</span>`;

  // --- Write Form Labels ---
  document.querySelector('label[for="input-title"]').textContent = t.titleLabel;
  document.querySelector('label[for="input-author"]').textContent = t.authorLabel;
  document.querySelector('label[for="input-category"]').textContent = t.categoryLabel;
  document.querySelector('label[for="input-summary"]').textContent = t.summaryLabel;
  document.querySelector('label[for="input-media-type"]').textContent = t.mediaTypeLabel;
  document.querySelector('label[for="input-language"]').textContent = t.languageLabel;
  document.querySelector('label[for="input-media-url"]').textContent = t.mediaUrlLabel;
  document.querySelector('label[for="input-content"]').textContent = t.contentLabel;

  // --- Write Form Button ---
  document.getElementById("write-submit").textContent = t.submit;

  // --- Language Button ---
  const langBtn = document.getElementById("language-btn");
  langBtn.textContent = lang === "en" ? t.switchToFa : t.switchToEn;

  // --- Body Direction ---
  document.body.dir = lang === "fa" ? "rtl" : "ltr";

  // --- Re-render Articles for placeholders ---
  refreshUI();

  // --- Modal Translations ---
  updateModalLanguage(t);
}

document.getElementById("language-btn").addEventListener("click", () => {
  const next = currentLanguage === "en" ? "fa" : "en";
  setLanguage(next);
});

function refreshUI() {
  renderCategoryDropdown();
  renderWriterSidebar();
  renderArticles();

}

searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  filterState.search = searchInput.value.toLowerCase();

  applyFilters();
});

sortSelect.addEventListener("change", function(){
  filterState.sort = sortSelect.value;
  applyFilters();
});


// ===================================================================
// 3. openArticleModal(article)(It builds and displays the article modal)
// ===================================================================
function renderArticleModalContent(article){
  const deleteButtonHtml = article.source === "user"
  ? "<button class='delete-btn'>Delete Article</button>"
  : "";

  const mediaHtml = renderArticleMedia(article);

  const articleDirection = article.language === "fa" ? "rtl" : "ltr";

  return `
    <div class="article-wrapper ${articleDirection}">

    <div class="article-category">${article.category}</div>
    <div class="article-title">${article.title}</div>
    <div class="article-meta">By ${article.author} · ${article.date}</div>
    ${mediaHtml}
    <div class="article-content">${article.content}</div>

    <input type="text" class="comment-author" placeholder="Your name">
    <input type="text" class="comment-input" placeholder="Write your opinion">
    <button class="comment-submit">Submit</button>

    <div class="comment-section"></div>

    ${deleteButtonHtml}

    </div>

  `;
}


function openArticleModal(article) {
  currentArticle = article;

  modalContent.innerHTML = renderArticleModalContent(article);

  modalOverlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.title = currentLanguage === "fa" ? `${article.title} | هزارتو` : `${article.title} | MindSpace`;

  initArticleModal(article);

  updateModalLanguage(translations[currentLanguage]);
}

function initArticleModal(article) {
  const commentBtn = modalContent.querySelector('.comment-submit');

  if (commentBtn) {
    commentBtn.addEventListener('click', () =>{saveComment(article.id)});
  }


  const deleteBtn = modalContent.querySelector('.delete-btn');

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {deleteArticle(article.id)});
  }

  loadComments(article.id);
}


// =======================================
// 4. saveComment(articleId)
// =======================================
function saveComment(articleId) {
  const commentAuthor = modalContent.querySelector('.comment-author');
  const commentContent = modalContent.querySelector('.comment-input');

  const saved = localStorage.getItem(`comments-${articleId}`);
  const comments = saved ? JSON.parse(saved) : [];

  if (!commentAuthor.value.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!commentContent.value.trim()) {
    alert("Please write something");
    return;
  }

  const newComment = {
    author: commentAuthor.value,
    text: commentContent.value
  };

  comments.push(newComment);
  localStorage.setItem(`comments-${articleId}`, JSON.stringify(comments));

  commentAuthor.value = "";
  commentContent.value = "";

  loadComments(articleId);
}


// =======================================
// 5. loadComments(articleId)
// =======================================
function loadComments(id){
  const savedComments = localStorage.getItem(`comments-${id}`);
  const comments = savedComments ? JSON.parse(savedComments) : [];
  const section = modalContent.querySelector('.comment-section');

  section.innerHTML = '';

  comments.forEach(function(comment){
    const div = document.createElement('div');
    div.className = 'comment';
    div.innerHTML = `
      <span class="comment-author">${comment.author}</span>
      <p class="comment-text">${comment.text}</p>
    `;
    section.appendChild(div);
  });
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList
  .contains("light") ? "⏾" : "☀";
});

function getFilteredArticles() {
  const filtered = allArticles.filter(article => {
    const categoryMatch = 
    filterState.category === "all" ||
    article.category === filterState.category;

    const authorMatch =
    filterState.author === "all" ||
    article.author === filterState.author;

    const searchableText = `
    ${article.title},
    ${article.summary},
    ${article.content},
    ${article.author}
    `.toLocaleLowerCase();

    const searchMatch = searchableText.includes(filterState.search);

    

    return categoryMatch && authorMatch && searchMatch;
  });
  switch (filterState.sort) {
      case "newest":
        filtered.sort((a,b) => b.id - a.id)
        break;
      case "oldest":
        filtered.sort((a,b) => a.id - b.id)
        break;
      case "az":
        filtered.sort((a,b) => a.title.localeCompare(b.title))
        break;
      case "za":
        filtered.sort((a,b) => b.title.localeCompare(a.title))
        break;
    }
  return filtered;
}

function renderArticleMedia(article) {
  if (!article.mediaUrl) {
    return "";
  }

  if (article.mediaType === "image") {
    return `
    <img
    src="${article.mediaUrl}"
    class="article-media"
    >
    `;
  }

  if (article.mediaType === "video") {
    return `
    <video controls class="article-media">
      <source src="${article.mediaUrl}">
    </video>
    `;
  }

  if (article.mediaType === "audio") {
    return `
    <audio controls class="article-media">
      <source src="${article.mediaUrl}">
    </audio>
    `;
  }

  return "";
}



// =======================================
// Overlay + modal + form logic (OLD)
// =======================================

function openOverlay () {
  writeOverlay.style.display = 'flex';
  document.title = currentLanguage === "fa" ? "مقاله جدید | هزارتو" : "New Article | MindSpace";
}
writeOpen.addEventListener('click', openOverlay);
resetBtn.addEventListener("click", resetFilters);

categorySelect.addEventListener("change", function(){
  filterState.category = categorySelect.value;
  applyFilters();
});


function closeOverlay () {
  writeOverlay.style.display = "none";
  document.title = currentLanguage === "fa" ? "هزارتو" : "MindSpace";
}
writeClose.addEventListener('click', closeOverlay);
writeOverlay.addEventListener('click', closeOverlay);

writeBox.addEventListener('click', function (event){
  event.stopPropagation();
});

function closeModal () {
  modalOverlay.style.display = 'none';
  document.body.style.overflow = '';
  document.title = currentLanguage === "fa" ? "هزارتو" : "MindSpace";
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

modalBox.addEventListener('click', function(event) {
  event.stopPropagation();
});

function deleteArticle(id) {
  const confirmed = window.confirm(translations[currentLanguage].deleteAlert);
  if (!confirmed) return;


  const saved = localStorage.getItem('userArticles');
  const userArticles = saved ? JSON.parse(saved) : [];

  const update = userArticles.filter(a => a.id !== id);

  localStorage.setItem('userArticles', JSON.stringify(update));
  closeModal();
  loadAllArticles();
}

writeForm.addEventListener('submit', function(event){
  event.preventDefault();

  if (writeMediaType.value && !writeMediaUrl.value.trim()) {
    alert("Please enter a media URL");
    return;
  }

  const newArticle = {
    id: Date.now(),
    title: writeTitle.value,
    author: writeAuthor.value,
    date: new Date().toISOString().slice(0,10),
    category: writeCategory.value,
    summary: writeSummary.value,
    mediaType: writeMediaType.value,
    mediaUrl: writeMediaUrl.value,
    content: writeContent.value,
    language: writeLanguage.value,
    source: "user"
  };

  const saved = localStorage.getItem('userArticles');
  const userArticles = saved ? JSON.parse(saved) : [];

  userArticles.push(newArticle);
  localStorage.setItem('userArticles', JSON.stringify(userArticles));

  writeForm.reset();
  closeOverlay();
  loadAllArticles();
});

// Initial load
loadAllArticles();