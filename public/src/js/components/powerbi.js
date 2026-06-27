document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".sidebar-menu a");

  const title = document.getElementById("section-title");
  const desc = document.getElementById("section-desc");
  const moduleTitle = document.getElementById("module-title");
  const moduleText = document.getElementById("module-text");

  const ctxMain = document.getElementById("chartMain");
  const ctxSide1 = document.getElementById("chartSide1");
  const ctxSide2 = document.getElementById("chartSide2");
  const ctxBottom = document.getElementById("chartBottom");

  let chartMain, chartSide1, chartSide2, chartBottom;

  // =========================
  // DADOS (FIXO 3 BARRAS)
  // =========================
  const sections = {
    dashboard: {
      title: "Dashboard",
      desc: "Visão geral dos serviços MockyCode",
      text: "Acompanhe todas as métricas gerais em tempo real.",
      main: [12, 19, 8, 15, 22],
      side1: [5, 10, 8], // ✔ 3 valores
      side2: [30, 40, 30],
      bottom: [20, 18, 25, 30],
      kpis: [20, 10, "A+", "100%"],
    },

    sites: {
      title: "Sites",
      desc: "Gestão de sites institucionais",
      text: "Monitoramento de performance de sites.",
      main: [30, 25, 40, 35, 50],
      side1: [10, 15, 12],
      side2: [25, 35, 40],
      bottom: [45, 38, 50, 60],
      kpis: [35, 18, "A", "98%"],
    },

    landing: {
      title: "Landing Pages",
      desc: "Conversão e campanhas",
      text: "Análise de conversão em tempo real.",
      main: [60, 70, 65, 80, 90],
      side1: [30, 35, 32],
      side2: [20, 25, 18],
      bottom: [85, 90, 88, 95],
      kpis: [50, 22, "A+", "99%"],
    },

    systems: {
      title: "Sistemas",
      desc: "Automações e sistemas",
      text: "Acompanhamento de sistemas ativos.",
      main: [10, 15, 20, 18, 25],
      side1: [5, 8, 6],
      side2: [15, 25, 20],
      bottom: [12, 18, 22, 28],
      kpis: [12, 6, "B+", "95%"],
    },

    uxui: {
      title: "UX/UI",
      desc: "Design e experiência",
      text: "Projetos de interface.",
      main: [40, 45, 50, 55, 60],
      side1: [20, 25, 22],
      side2: [18, 22, 30],
      bottom: [50, 60, 65, 70],
      kpis: [28, 14, "A", "97%"],
    },

    analytics: {
      title: "Analytics",
      desc: "Dados e métricas",
      text: "Visualização avançada.",
      main: [80, 75, 90, 95, 100],
      side1: [40, 50, 45],
      side2: [30, 40, 30],
      bottom: [90, 95, 98, 100],
      kpis: [60, 30, "A+", "100%"],
    },
  };

  // =========================
  // HELPERS
  // =========================
  function setActive(item) {
    items.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  }

  function updateText(key) {
    title.textContent = sections[key].title;
    desc.textContent = sections[key].desc;
    moduleTitle.textContent = sections[key].title;
    moduleText.textContent = sections[key].text;
  }

  function animateCounters(kpis) {
    const counters = document.querySelectorAll(".counter");

    counters.forEach((counter, index) => {
      const value = kpis[index];

      if (typeof value === "number") {
        let current = 0;
        const step = value / 50;

        const run = () => {
          current += step;
          if (current < value) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(run);
          } else {
            counter.textContent = value;
          }
        };
        run();
      } else {
        counter.textContent = value;
      }
    });
  }

  // =========================
  // CHART OPTIONS (PREMIUM)
  // =========================
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#9da5b4",
        },
      },
    },
  };

  // =========================
  // CHARTS
  // =========================
  function createCharts(data) {
    if (chartMain) chartMain.destroy();
    if (chartSide1) chartSide1.destroy();
    if (chartSide2) chartSide2.destroy();
    if (chartBottom) chartBottom.destroy();

    // LINE
    chartMain = new Chart(ctxMain, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
        datasets: [
          {
            label: "Evolução",
            data: data.main,
            borderColor: "#6b07b0",
            backgroundColor: "rgba(107,7,176,.2)",
            tension: 0.4,
          },
        ],
      },
      options: chartOptions,
    });

    // BAR (✔ FORÇA 3 BARRAS SEM BUG)
    // BAR (CORRIGIDO FIXO 3 BARRAS)
    if (chartSide1) chartSide1.destroy();

    chartSide1 = new Chart(ctxSide1, {
      type: "bar",
      data: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            label: "Performance",
            data: data.side1, // já vem com 3 valores no seu sections
            backgroundColor: ["#42C2F5", "#6b07b0", "#B4FF66"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // 🔥 remove “undefined”
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "#9da5b4" },
          },
          x: {
            ticks: { color: "#9da5b4" },
          },
        },
      },
    });
    // DOUGHNUT
    chartSide2 = new Chart(ctxSide2, {
      type: "doughnut",
      data: {
        labels: ["A", "B", "C"],
        datasets: [
          {
            data: data.side2,
            backgroundColor: ["#42C2F5", "#6b07b0", "#B4FF66"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        ...chartOptions,
        cutout: "60%",
      },
    });

    // BOTTOM
    chartBottom = new Chart(ctxBottom, {
      type: "line",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Total",
            data: data.bottom,
            borderColor: "#B4FF66",
            backgroundColor: "rgba(180,255,102,.2)",
            tension: 0.4,
          },
        ],
      },
      options: chartOptions,
    });
  }

  // =========================
  // EVENTS
  // =========================
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const key = item.dataset.section;
      if (!sections[key]) return;

      setActive(item);
      updateText(key);
      createCharts(sections[key]);
      animateCounters(sections[key].kpis);
    });
  });

  // INIT
  createCharts(sections.dashboard);
  animateCounters(sections.dashboard.kpis);
});

const themeBtn = document.getElementById("theme-toggle");
const neonBtn = document.getElementById("theme-neon");

// DARK (lua)
themeBtn.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "dark");
});

// NEON (átomo)
neonBtn.addEventListener("click", () => {
  document.documentElement.setAttribute("data-theme", "neon");
});

