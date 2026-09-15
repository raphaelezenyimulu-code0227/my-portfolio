/**
 * app.js - Portfolio Application Core
 * Handles Theme Switching, Dynamic Project Catalog & Filtering,
 * Native Accessible Modal Dialog, Academic Timeline, and Contact Form Validation.
 * 
 * Works out-of-the-box in all modern browsers without CORS or build requirements.
 */

function startApp() {
  // Grab structured data from window (provided by js/projects.js)
  const projectsData = window.projectsData || [];
  const skillsData = window.skillsData || { disciplines: [], languages: [], frameworks: [], tools: [], softSkills: [] };
  const academicData = window.academicData || { education: [], certifications: [], honors: [] };

  try { initTheme(); } catch (e) { console.error('Theme init error:', e); }
  try { initNavigation(); } catch (e) { console.error('Navigation init error:', e); }
  try { initSkillsSection(skillsData); } catch (e) { console.error('Skills init error:', e); }
  try { initProjectsSection(projectsData); } catch (e) { console.error('Projects init error:', e); }
  try { initAcademicSection(academicData); } catch (e) { console.error('Academic init error:', e); }
  try { initContactForm(); } catch (e) { console.error('Contact init error:', e); }
  try { initBackToTop(); } catch (e) { console.error('BackToTop init error:', e); }
  try { initEmailCopy(); } catch (e) { console.error('EmailCopy init error:', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const html = document.documentElement;

  // Retrieve saved preference or check system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
    updateThemeIcons(true);
  } else {
    html.classList.remove('dark');
    updateThemeIcons(false);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
    });
  });

  // Listen to OS-level theme changes if no manual preference is saved
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      if (e.matches) {
        html.classList.add('dark');
        updateThemeIcons(true);
      } else {
        html.classList.remove('dark');
        updateThemeIcons(false);
      }
    }
  });
}

function updateThemeIcons(isDark) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    const icon = btn.querySelector('i');
    if (!icon) return;
    if (isDark) {
      icon.className = 'fa-solid fa-sun text-amber-400 text-lg transition-transform duration-300 rotate-0 hover:rotate-45';
      btn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      icon.className = 'fa-solid fa-moon text-slate-700 text-lg transition-transform duration-300 rotate-0 hover:-rotate-12';
      btn.setAttribute('aria-label', 'Switch to dark mode');
    }
  });
}

/* ==========================================================================
   2. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');

      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = isExpanded ? 'fa-solid fa-bars text-xl' : 'fa-solid fa-xmark text-xl';
      }
    });

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars text-xl';
      });
    });
  }

  // Scroll Progress Indicator
  window.addEventListener('scroll', () => {
    if (!scrollProgressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   3. SKILLS SECTION RENDERING
   ========================================================================== */
function initSkillsSection(skillsData) {
  // 1. Disciplines
  const disciplinesContainer = document.getElementById('skillsDisciplines');
  if (disciplinesContainer && skillsData.disciplines) {
    disciplinesContainer.innerHTML = skillsData.disciplines.map(item => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-colors flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-base">
          <i class="${item.icon}"></i>
        </div>
        <div>
          <h4 class="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">${item.name}</h4>
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> ${item.level}
          </span>
        </div>
      </div>
    `).join('');
  }

  // 2. Languages
  const languagesContainer = document.getElementById('skillsLanguages');
  if (languagesContainer && skillsData.languages) {
    languagesContainer.innerHTML = skillsData.languages.map(item => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
        <div class="flex justify-between items-center mb-1.5">
          <span class="font-semibold text-slate-900 dark:text-white text-sm">${item.name}</span>
          <span class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">${item.level}</span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400">${item.experience} experience</p>
      </div>
    `).join('');
  }

  // 3. Frameworks & Tools Pills
  const techPillsContainer = document.getElementById('skillsTechPills');
  if (techPillsContainer) {
    const frameworks = (skillsData.frameworks || []).map(f => ({ ...f, type: 'Framework' }));
    const tools = (skillsData.tools || []).map(t => ({ ...t, type: 'Tool' }));
    const allTools = [...frameworks, ...tools];

    techPillsContainer.innerHTML = allTools.map(t => `
      <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors">
        <span class="w-1.5 h-1.5 rounded-full ${t.type === 'Framework' ? 'bg-indigo-500' : 'bg-cyan-500'}"></span>
        ${t.name}
        <span class="text-[10px] text-slate-400 dark:text-slate-500">(${t.category})</span>
      </span>
    `).join('');
  }

  // 4. Soft Skills
  const softSkillsContainer = document.getElementById('skillsSoft');
  if (softSkillsContainer && skillsData.softSkills) {
    softSkillsContainer.innerHTML = skillsData.softSkills.map(s => `
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
        <h4 class="font-semibold text-slate-900 dark:text-white text-sm mb-1">${s.title}</h4>
        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${s.desc}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   4. DYNAMIC PROJECTS CATALOG & FILTERING
   ========================================================================== */
function initProjectsSection(projectsData) {
  const container = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const searchInput = document.getElementById('projectSearch');

  let currentCategory = 'all';
  let searchQuery = '';

  function renderProjects() {
    if (!container) return;

    const filtered = projectsData.filter(project => {
      const matchesCat = currentCategory === 'all' || 
        project.category.toLowerCase() === currentCategory.toLowerCase();
      
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 px-4 bg-white dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <div class="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 text-xl">
            <i class="fa-solid fa-folder-open"></i>
          </div>
          <h3 class="text-base font-semibold text-slate-900 dark:text-white mb-1">No matching projects found</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">Try selecting another filter category or clear your search query.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(project => `
      <article class="card-hover-effect flex flex-col bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/90 dark:border-slate-700/70 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 overflow-hidden transition-all duration-300" data-id="${project.id}">
        <!-- Card Header Banner -->
        <div class="relative h-44 bg-gradient-to-r ${project.gradient} p-5 flex flex-col justify-between overflow-hidden">
          <div class="absolute -right-6 -bottom-8 opacity-15 text-white text-9xl select-none pointer-events-none font-mono">
            #
          </div>
          <div class="flex items-center justify-between z-10">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 text-white border border-white/30 shadow-sm">
              ${project.category}
            </span>
            <span class="text-xs text-white/90 font-medium">
              ${project.date}
            </span>
          </div>

          <div class="z-10">
            ${project.featured ? `
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-400/90 text-slate-900 shadow-sm">
                <i class="fa-solid fa-star text-[10px]"></i> Featured Project
              </span>
            ` : ''}
          </div>
        </div>

        <!-- Card Body -->
        <div class="p-6 flex-1 flex flex-col">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-2 cursor-pointer project-card-title" data-id="${project.id}">
            ${project.title}
          </h3>
          
          <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 flex-1">
            ${project.summary}
          </p>

          <!-- Metrics Preview Grid -->
          <div class="grid grid-cols-3 gap-2 py-3 px-3.5 mb-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
            ${project.metrics.map(m => `
              <div>
                <span class="block text-xs font-bold text-indigo-600 dark:text-indigo-400">${m.value}</span>
                <span class="block text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${project.tags.slice(0, 5).map(tag => `
              <span class="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300">
                ${tag}
              </span>
            `).join('')}
            ${project.tags.length > 5 ? `
              <span class="px-2 py-1 rounded-md text-[11px] font-medium text-slate-400 dark:text-slate-500">
                +${project.tags.length - 5}
              </span>
            ` : ''}
          </div>

          <!-- Card Actions -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
            <button type="button" class="read-casestudy-btn inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors" data-id="${project.id}">
              Read Case Study <i class="fa-solid fa-arrow-right text-[11px] transition-transform"></i>
            </button>

            <div class="flex items-center gap-1">
              ${project.links.demo ? `
                <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Open Live Demo">
                  <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
                </a>
              ` : ''}
              ${project.links.github ? `
                <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Open GitHub Repository">
                  <i class="fa-brands fa-github text-sm"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Attach Event Listeners to Case Study triggers
    container.querySelectorAll('.read-casestudy-btn, .project-card-title').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.getAttribute('data-id');
        openCaseStudyModal(id, projectsData);
      });
    });
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      });

      btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md', 'shadow-indigo-500/20');

      currentCategory = btn.getAttribute('data-category');
      renderProjects();
    });
  });

  // Search Input Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderProjects();
    });
  }

  // Initial Render
  renderProjects();
}

/* ==========================================================================
   5. NATIVE <dialog> MODAL DETAIL CONTROLLER
   ========================================================================== */
function openCaseStudyModal(projectId, projectsData) {
  const modal = document.getElementById('caseStudyModal');
  const modalContent = document.getElementById('modalDynamicContent');
  if (!modal || !modalContent) return;

  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  modalContent.innerHTML = `
    <!-- Modal Hero Banner -->
    <div class="relative bg-gradient-to-r ${project.gradient} p-6 sm:p-8 text-white">
      <div class="flex items-center justify-between gap-4 mb-3">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/20 border border-white/30">
          ${project.category}
        </span>
        <span class="text-xs text-white/90 font-medium">
          ${project.date}
        </span>
      </div>

      <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
        ${project.title}
      </h2>
      
      <p class="text-white/90 text-sm sm:text-base max-w-2xl leading-relaxed">
        ${project.summary}
      </p>

      <!-- Quick Action Badges in Banner -->
      <div class="flex flex-wrap items-center gap-3 mt-5">
        ${project.links.demo ? `
          <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 font-semibold text-xs hover:bg-slate-100 transition-colors shadow-sm">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
          </a>
        ` : ''}
        ${project.links.github ? `
          <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 text-white border border-white/20 font-semibold text-xs hover:bg-slate-900 transition-colors">
            <i class="fa-brands fa-github"></i> View Repository
          </a>
        ` : ''}
        ${project.links.docs ? `
          <a href="${project.links.docs}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 font-semibold text-xs hover:bg-white/20 transition-colors">
            <i class="fa-solid fa-file-lines"></i> Research / Docs
          </a>
        ` : ''}
      </div>
    </div>

    <!-- Modal Body Content -->
    <div class="p-6 sm:p-8 space-y-8 bg-white dark:bg-slate-900">
      <!-- Key Metrics Strip -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Performance Benchmarks & Key Metrics
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${project.metrics.map(m => `
            <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80">
              <span class="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 block">${m.value}</span>
              <span class="text-xs text-slate-600 dark:text-slate-300 font-medium">${m.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Problem & Objective -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
          Project Objective & Problem Context
        </h4>
        <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          ${project.objective}
        </p>
      </div>

      <!-- Full Description & Methodology -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Architecture & In-Depth Implementation
          </h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            ${project.fullDescription}
          </p>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Engineering Methodology
          </h4>
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            ${project.methodology}
          </p>
        </div>
      </div>

      <!-- Key Outcomes Checklist -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
          Measurable Outcomes & Deliverables
        </h4>
        <ul class="space-y-2.5">
          ${project.keyOutcomes.map(item => `
            <li class="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
              <span class="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xs">
                <i class="fa-solid fa-check"></i>
              </span>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Key Takeaway / Lessons Learned -->
      <div class="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/50">
        <h4 class="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
          <i class="fa-solid fa-lightbulb text-amber-500"></i> Engineering Retrospective & Key Takeaway
        </h4>
        <p class="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed">
          ${project.keyTakeaways}
        </p>
      </div>

      <!-- Technology Stack Tags -->
      <div>
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
          Full Technology & Tooling Stack
        </h4>
        <div class="flex flex-wrap gap-2">
          ${project.tags.map(t => `
            <span class="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              ${t}
            </span>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (typeof modal.showModal === 'function') {
    if (!modal.open) {
      modal.showModal();
    }
  } else {
    modal.setAttribute('open', '');
  }
  document.body.classList.add('modal-open');

  // Close handlers
  const closeBtn = document.getElementById('closeModalBtn');
  const footerCloseBtn = document.getElementById('modalFooterCloseBtn');

  const closeModal = () => {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
    document.body.classList.remove('modal-open');
  };

  if (closeBtn) closeBtn.onclick = closeModal;
  if (footerCloseBtn) footerCloseBtn.onclick = closeModal;

  // Backdrop click closes dialog
  modal.onclick = (e) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog = (
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width
    );
    if (!isInDialog) {
      closeModal();
    }
  };

  // Close on native Cancel event (Esc key)
  modal.oncancel = () => {
    document.body.classList.remove('modal-open');
  };
}

/* ==========================================================================
   6. ACADEMIC & COURSEWORK TIMELINE
   ========================================================================== */
function initAcademicSection(academicData) {
  const eduContainer = document.getElementById('academicEducation');
  const certsContainer = document.getElementById('academicCertifications');
  const honorsContainer = document.getElementById('academicHonors');

  // Education Timeline Card
  if (eduContainer && academicData.education) {
    eduContainer.innerHTML = academicData.education.map(edu => `
      <div class="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            <i class="fa-solid fa-graduation-cap"></i> ${edu.period}
          </span>
          <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-md">
            GPA: ${edu.gpa}
          </span>
        </div>

        <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
          ${edu.degree}
        </h3>
        <p class="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
          ${edu.institution}
        </p>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium mb-4">
          <i class="fa-solid fa-award mr-1"></i> ${edu.honors}
        </p>

        <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
          ${edu.description}
        </p>

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Core Academic Coursework
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${edu.coursework.map(c => `
              <div class="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <i class="fa-solid fa-check text-indigo-500 text-[10px]"></i>
                <span>${c}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // Certifications
  if (certsContainer && academicData.certifications) {
    certsContainer.innerHTML = academicData.certifications.map(cert => `
      <div class="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-lg">
          <i class="${cert.icon}"></i>
        </div>
        <div class="flex-1">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white leading-snug">${cert.name}</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${cert.issuer} • ${cert.date}</p>
          <span class="inline-block mt-1 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded">
            ID: ${cert.badgeId}
          </span>
        </div>
      </div>
    `).join('');
  }

  // Honors & Academic Leadership
  if (honorsContainer && academicData.honors) {
    honorsContainer.innerHTML = academicData.honors.map(h => `
      <div class="p-4 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 shadow-sm">
        <div class="flex items-center justify-between gap-2 mb-1">
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">${h.title}</h4>
          <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">${h.date}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">${h.detail}</p>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   7. INTERACTIVE CONTACT FORM WITH VALIDATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const submitBtn = document.getElementById('contactSubmitBtn');

  // Input Error Helper
  function setError(input, message) {
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.remove('hidden');
    }
    input.classList.add('border-rose-500', 'focus:ring-rose-500');
    input.classList.remove('border-slate-300', 'dark:border-slate-600');
  }

  function clearError(input) {
    const errorEl = document.getElementById(`${input.id}Error`);
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.classList.add('hidden');
    }
    input.classList.remove('border-rose-500', 'focus:ring-rose-500');
    input.classList.add('border-slate-300', 'dark:border-slate-600');
  }

  // Clear errors on typing
  [nameInput, emailInput, messageInput].forEach(input => {
    if (input) {
      input.addEventListener('input', () => clearError(input));
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setError(nameInput, 'Please provide your name (at least 2 characters).');
      isValid = false;
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(emailInput);
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setError(messageInput, 'Please enter a message of at least 10 characters.');
      isValid = false;
    } else {
      clearError(messageInput);
    }

    if (!isValid) return;

    // Simulate submission state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner fa-spin mr-2"></i> Sending...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();
      showToast('Thank you! Your message has been sent successfully. I will get back to you promptly.');
    }, 1000);
  });
}

/* ==========================================================================
   8. TOAST NOTIFICATION & EMAIL COPY
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

function initEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('userEmailText');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', async () => {
      const email = emailText.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        showToast(`Copied "${email}" to clipboard!`);
        
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-500"></i> Copied';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      } catch (err) {
        // Fallback for non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied "${email}" to clipboard!`);
      }
    });
  }
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
