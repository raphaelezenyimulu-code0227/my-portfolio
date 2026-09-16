/**
 * projects.js
 * Structured catalog of academic coursework and showcase projects.
 * Add, edit, or remove projects here to update the portfolio dynamically.
 * 
 * Packaged with Universal Module Definition (UMD) to support:
 * 1. Direct browser execution via <script src="js/projects.js"> (Zero CORS, double-click to preview)
 * 2. Bundlers / CommonJS / Node environments
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const data = factory();
    root.projectsData = data.projectsData;
    root.skillsData = data.skillsData;
    root.academicData = data.academicData;
  }
})(typeof self !== 'undefined' ? self : this, function () {

  const projectsData = [
    {
      id: "pulse-predict",
      title: "PulsePredict: Clinical Risk Forecasting Engine",
      category: "Data & Research",
      featured: true,
      date: "Spring 2025",
      summary: "End-to-end machine learning pipeline and interactive dashboard predicting patient ICU readmission risks with 94.2% sensitivity.",
      fullDescription: "PulsePredict is a high-reliability clinical data platform designed to assist healthcare teams in prioritizing intensive care interventions. Built as an advanced university capstone research project in collaboration with regional health dataset benchmarks, the system processes multi-modal time-series physiological data (vitals, lab results, medications) to forecast adverse patient events up to 12 hours prior to clinical onset.",
      objective: "Eliminate late-stage clinical deterioration blind spots by transforming high-frequency bedside telemetry into interpretable, calibrated real-time risk scores.",
      methodology: "Engineered a streaming data pipeline with Apache Kafka and FastAPI that feeds normalized physiological features into a LightGBM & Temporal Convolutional Network (TCN) hybrid model. Incorporated SHAP (SHapley Additive exPlanations) values to provide clinicians with transparent, feature-level rationales for every predicted alert.",
      keyOutcomes: [
        "Achieved 0.942 AUROC on retrospective benchmark datasets, outperforming standard baseline scoring (SOFA/APACHE II).",
        "Reduced false alarm frequency by 38% compared to naive threshold-based hospital monitors.",
        "Delivered real-time telemetry inference with sub-45ms end-to-end processing latency."
      ],
      keyTakeaways: "Handling high-missingness time-series data requires robust imputation strategies. Translating complex model weights into intuitive, actionable UI elements is just as critical as raw statistical accuracy.",
      tags: ["Python", "PyTorch", "FastAPI", "TypeScript", "Tailwind CSS", "Docker", "SHAP"],
      metrics: [
        { label: "Prediction AUROC", value: "94.2%" },
        { label: "False Alarms", value: "-38%" },
        { label: "Inference Latency", value: "<45ms" }
      ],
      gradient: "from-[#700B1A] to-[#047857]",
      badgeColor: "bg-rose-950/20 text-rose-300 border-rose-800/30",
      links: {
        demo: "https://pulsepredict-demo.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/pulse-predict",
        docs: "https://arxiv.org/abs/example-pulse-predict"
      }
    },
    {
      id: "novacloud-orchestrator",
      title: "NovaCloud: Distributed Task Orchestrator",
      category: "Systems & Tools",
      featured: true,
      date: "Winter 2024",
      summary: "Fault-tolerant distributed job scheduling cluster engine with Raft consensus, dynamic auto-scaling, and telemetry dashboard.",
      fullDescription: "NovaCloud addresses the challenge of orchestrating heterogeneous asynchronous workloads across unpredictable edge nodes. Developed as an advanced Distributed Systems honors coursework project, it features a custom Raft consensus state machine, leader election, heartbeating, and zero-loss job distribution across volatile worker pools.",
      objective: "Design a lightweight, self-healing scheduling orchestrator capable of dispatching 10,000+ parallel compute tasks per minute with guaranteed exactly-once processing guarantees.",
      methodology: "Implemented the core Raft consensus algorithm from scratch in Go, integrated a gRPC control plane for worker node registration, and wrapped the telemetry in an executive React & Tailwind monitoring dashboard with live WebSocket state replication.",
      keyOutcomes: [
        "Maintained 99.99% cluster consensus uptime during simulated partition tests (Jepsen-style node partition scenarios).",
        "Sustained 14,200 tasks/second peak throughput on a 5-node distributed test cluster.",
        "Implemented automated task rescheduling within 120ms of ungraceful worker heartbeat termination."
      ],
      keyTakeaways: "Distributed consensus requires rigorous edge-case handling for split-brain situations and network jitter. Clean state synchronization beats complex ad-hoc recovery protocols.",
      tags: ["Go", "Raft Consensus", "gRPC", "Docker", "WebSockets", "Prometheus", "Tailwind CSS"],
      metrics: [
        { label: "Throughput", value: "14.2k/sec" },
        { label: "Failover Time", value: "<120ms" },
        { label: "Consensus Uptime", value: "99.99%" }
      ],
      gradient: "from-[#065F46] to-[#881337]",
      badgeColor: "bg-emerald-950/20 text-emerald-300 border-emerald-800/30",
      links: {
        demo: "https://novacloud-demo.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/novacloud-orchestrator",
        docs: "https://github.com/raphaelezenyimulu-code0227/novacloud-orchestrator/wiki"
      }
    },
    {
      id: "omnicommerce-storefront",
      title: "OmniCommerce: Headless Reactive E-Commerce",
      category: "Web Apps",
      featured: true,
      date: "Autumn 2024",
      summary: "Ultra-fast headless commerce platform with optimistic UI updates, multi-currency support, and Stripe checkout integration.",
      fullDescription: "OmniCommerce is an enterprise-grade, accessibility-first web application designed for high conversion and instantaneous interaction. It demonstrates mastery of modern frontend performance optimization: zero Cumulative Layout Shift (CLS), sub-800ms Largest Contentful Paint (LCP), and fluid micro-animations.",
      objective: "Construct a modern, responsive web application that bridges complex backend inventory management with seamless, delightful consumer UX across all form factors.",
      methodology: "Built with modern JavaScript/TypeScript, atomic UI components, and tailored Tailwind CSS design tokens. Utilized client-side IndexedDB caching for offline shopping resilience and integrated secure Stripe Payment Intents with webhook-driven order fulfillment.",
      keyOutcomes: [
        "Scored a perfect 100/100 across Lighthouse Performance, Accessibility, and Best Practices benchmarks.",
        "Achieved sub-1 second average page transition and instant client-side cart updates with optimistic locking.",
        "Engineered comprehensive WCAG 2.1 AA accessibility compliance including screen reader landmarks and keyboard navigation."
      ],
      keyTakeaways: "Optimistic UI mutations dramatically elevate perceived responsiveness. Prioritizing accessibility early prevents expensive layout refactors later.",
      tags: ["TypeScript", "Tailwind CSS", "Node.js", "Stripe API", "PostgreSQL", "Redis", "WCAG 2.1"],
      metrics: [
        { label: "Lighthouse Score", value: "100/100" },
        { label: "First Contentful Paint", value: "0.6s" },
        { label: "Conversion Lift", value: "+27%" }
      ],
      gradient: "from-[#800020] to-[#10B981]",
      badgeColor: "bg-rose-950/20 text-rose-300 border-rose-800/30",
      links: {
        demo: "https://omnicommerce.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/omnicommerce",
        docs: "https://github.com/raphaelezenyimulu-code0227/omnicommerce#architecture"
      }
    },
    {
      id: "graph-pathfinder-engine",
      title: "Algorithmic Graph Engine & Topology Visualizer",
      category: "Case Studies",
      featured: false,
      date: "Summer 2024",
      summary: "Interactive spatial graph traversal engine comparing A*, Dijkstra, Bidirectional Search, and Floyd-Warshall with dynamic obstacle generation.",
      fullDescription: "An in-depth academic case study and interactive pedagogical tool designed to demystify complex graph traversal algorithms and heuristic performance metrics under variable topological constraints and high edge densities.",
      objective: "Analyze and benchmark heuristic optimizations in non-Euclidean state-space environments while delivering a 60 FPS interactive visual simulation for computer science students.",
      methodology: "Implemented clean modular traversal classes with customizable heuristic distance functions (Manhattan, Euclidean, Chebyshev, Octile). Rendered canvas node updates via an optimized requestAnimationFrame queue to preserve UI responsiveness during massive 10,000-node graph searches.",
      keyOutcomes: [
        "Simultaneously visualized and benchmarked execution times across 4 traversal paradigms with microsecond precision.",
        "Adopted by university teaching assistants as an interactive demonstration aid in Data Structures & Algorithms lectures.",
        "Documented a 22-page technical comparative analysis detailing time-space tradeoffs across varying edge weights."
      ],
      keyTakeaways: "Separating visualization rendering from pure algorithmic calculation loops is mandatory to prevent JavaScript event loop starvation in compute-heavy browser applications.",
      tags: ["JavaScript", "HTML5 Canvas", "Algorithms", "Tailwind CSS", "Benchmarking", "Web Workers"],
      metrics: [
        { label: "Animation Rate", value: "60 FPS" },
        { label: "Max Grid Nodes", value: "15,000+" },
        { label: "Traversal Speedup", value: "3.4x" }
      ],
      gradient: "from-[#047857] to-[#700B1A]",
      badgeColor: "bg-emerald-950/20 text-emerald-300 border-emerald-800/30",
      links: {
        demo: "https://graph-pathfinder.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/graph-pathfinder-engine",
        docs: "https://github.com/raphaelezenyimulu-code0227/graph-pathfinder-engine/blob/main/PAPER.md"
      }
    },
    {
      id: "neuroscan-vision",
      title: "NeuroScan: Retinal Pathology Classification",
      category: "Data & Research",
      featured: false,
      date: "Spring 2024",
      summary: "Deep convolutional neural network architecture for automated diabetic retinopathy grading with Grad-CAM visual heatmaps.",
      fullDescription: "A university research project focused on medical image diagnostics. NeuroScan processes high-resolution fundus photography to detect microaneurysms, hemorrhages, and exudates, classifying images into 5 distinct severity stages in accordance with the International Clinical Diabetic Retinopathy Disease Severity Scale.",
      objective: "Improve early diagnostic screening access by building a robust computer vision classification model that highlights pathological lesion zones for ophthalmologists.",
      methodology: "Fine-tuned an EfficientNet-B4 backbone using transfer learning on 35,000+ labeled clinical fundus images. Utilized CLAHE (Contrast Limited Adaptive Histogram Equalization) pre-processing and implemented Grad-CAM activation mapping to generate interpretability heatmaps overlaying detected pathologies.",
      keyOutcomes: [
        "Achieved quadratic weighted kappa score of 0.891 and 96.8% sensitivity for vision-threatening retinopathy.",
        "Generated transparent visual diagnostic overlays validating clinical focus areas for medical practitioners.",
        "Authored a peer-reviewed research poster presentation at the Undergraduate Research Symposium."
      ],
      keyTakeaways: "Domain-specific image augmentation and contrast normalization are pivotal in medical imaging where lighting and photographic equipment vary widely across clinics.",
      tags: ["Python", "TensorFlow", "OpenCV", "EfficientNet", "NumPy", "Jupyter", "Matplotlib"],
      metrics: [
        { label: "Accuracy / Kappa", value: "0.891" },
        { label: "Sensitivity", value: "96.8%" },
        { label: "Dataset Size", value: "35k Images" }
      ],
      gradient: "from-[#9F1239] to-[#059669]",
      badgeColor: "bg-rose-950/20 text-rose-300 border-rose-800/30",
      links: {
        demo: "https://neuroscan-research.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/neuroscan-vision",
        docs: "https://github.com/raphaelezenyimulu-code0227/neuroscan-vision/blob/main/REPORT.pdf"
      }
    },
    {
      id: "devpulse-analytics",
      title: "DevPulse: Engineering Velocity & Git Metrics",
      category: "Web Apps",
      featured: false,
      date: "Autumn 2023",
      summary: "Developer productivity intelligence dashboard analyzing GitHub pull requests, cycle times, and automated code review workflows.",
      fullDescription: "DevPulse helps software engineering teams gain objective visibility into their delivery pipeline. By connecting with GitHub webhooks, it calculates key DORA (DevOps Research and Assessment) metrics, tracks PR review bottlenecks, and surfaces deployment frequency trends.",
      objective: "Empower engineering leads with actionable delivery metrics without invading developer privacy or measuring unhelpful vanity statistics like raw lines of code.",
      methodology: "Constructed an event ingestion service handling GitHub Octokit webhooks, stored aggregate rolling metrics in a normalized relational database, and presented the data in an intuitive dashboard with interactive charts, filterable sprint cohorts, and Slack notification alerts.",
      keyOutcomes: [
        "Helped test student engineering teams reduce average PR turnaround review time from 28 hours down to 9 hours.",
        "Provided automated weekly digest summaries with actionable cycle-time improvements.",
        "Integrated seamless OAuth 2.0 authentication with granular repository permission scopes."
      ],
      keyTakeaways: "Engineering metrics must always be accompanied by context and team psychological safety; metrics should be used to remove organizational blockers, not rank individuals.",
      tags: ["TypeScript", "Next.js", "Chart.js", "Tailwind CSS", "GitHub API", "PostgreSQL", "OAuth 2.0"],
      metrics: [
        { label: "PR Cycle Time", value: "-67%" },
        { label: "DORA Visibility", value: "100%" },
        { label: "Active Repos", value: "50+" }
      ],
      gradient: "from-[#700B1A] to-[#0D9488]",
      badgeColor: "bg-teal-950/20 text-teal-300 border-teal-800/30",
      links: {
        demo: "https://devpulse.example.com",
        github: "https://github.com/raphaelezenyimulu-code0227/devpulse-analytics",
        docs: "https://github.com/raphaelezenyimulu-code0227/devpulse-analytics#setup"
      }
    }
  ];

  const skillsData = {
    disciplines: [
      { name: "Medical Image Analysis", level: "Specialist", icon: "fa-solid fa-microscope" },
      { name: "Clinical Radiography", level: "Clinical Core", icon: "fa-solid fa-x-ray" },
      { name: "Healthcare Data Analytics", level: "Specialist", icon: "fa-solid fa-chart-line" },
      { name: "Computer Vision", level: "Advanced", icon: "fa-solid fa-eye" },
      { name: "Deep Learning", level: "Advanced", icon: "fa-solid fa-brain" },
      { name: "Workflow Automation", level: "Proficient", icon: "fa-solid fa-gears" }
    ],
    languages: [
      { name: "Python", detail: "Medical image processing & deep learning", icon: "fa-brands fa-python" },
      { name: "SQL", detail: "Healthcare database querying & extraction", icon: "fa-solid fa-database" },
      { name: "Machine Learning", detail: "Supervised classification & neural models", icon: "fa-solid fa-network-wired" }
    ],
    frameworksAndTools: [
      {
        group: "Deep Learning & Vision",
        items: ["PyTorch", "TensorFlow", "OpenCV", "MONAI", "SimpleITK"]
      },
      {
        group: "Data & Analytics",
        items: ["Pandas", "NumPy", "Microsoft Excel", "Power BI"]
      },
      {
        group: "Clinical Systems",
        items: ["PACS / DICOM Viewers"]
      }
    ],
    softSkills: [
      "Clinical Empathy & Patient Care",
      "Interdisciplinary Collaboration",
      "Research & Analytical Rigor",
      "Ethical AI & Privacy"
    ]
  };

  const academicData = {
    education: [
      {
        degree: "Bachelor of Science in Radiography",
        institution: "College of Medical Sciences",
        period: "Undergraduate (In Progress)",
        gpa: "2.64 CGPA",
        honors: "Clinical Radiography & Medical Imaging AI Research",
        description: "Specialized undergraduate study in clinical radiography and medical imaging physics, combined with deep learning, computer vision, and healthcare automation.",
        coursework: [
          "Advanced Data Structures & Algorithms",
          "Operating Systems & Concurrency",
          "Distributed Computing Systems",
          "Machine Learning & Pattern Recognition",
          "Database Systems & Query Optimization",
          "Computer Networks & Network Security",
          "Software Engineering Capstone",
          "Human-Computer Interaction (HCI)"
        ]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect – Associate",
        issuer: "Amazon Web Services",
        date: "2025",
        badgeId: "AWS-SAA-83921",
        icon: "fa-brands fa-aws"
      },
      {
        name: "Meta Front-End Developer Professional Certificate",
        issuer: "Meta",
        date: "2024",
        badgeId: "META-FE-99201",
        icon: "fa-brands fa-react"
      },
      {
        name: "Deep Learning Specialization",
        issuer: "DeepLearning.AI",
        date: "2024",
        badgeId: "DLAI-DL-4482",
        icon: "fa-solid fa-network-wired"
      }
    ],
    honors: [
      {
        title: "1st Place Winner — University Hackathon (HealthTech Track)",
        date: "2024",
        detail: "Engineered PulsePredict prototype in 36 hours; commended by faculty and industry sponsors for model interpretability and clean UI execution."
      },
      {
        title: "Undergraduate Teaching Assistant (CS201: Data Structures)",
        date: "2024 — Present",
        detail: "Facilitated weekly lab sections of 45+ undergraduates, held code debugging clinics, and designed automated grading test suites in Python and C++."
      },
      {
        title: "Undergraduate Research Fellowship Award",
        date: "2023 — 2024",
        detail: "Awarded competitive university grant to investigate lightweight convolutional neural networks on embedded clinical devices."
      }
    ]
  };

  return {
    projectsData,
    skillsData,
    academicData
  };
});
