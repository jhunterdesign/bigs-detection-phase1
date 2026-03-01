/* ---------------------------
   Canonical Session ID (MUST BE FIRST)
---------------------------- */
if (!window.HCS_SESSION_ID) {
  window.HCS_SESSION_ID = Math.random().toString(36).substring(2, 10);
}

/* ---------------------------
   Inject Session ID into UI
---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("sessionId");
  if (el) el.textContent = window.HCS_SESSION_ID;
});



/* ---------------------------
   Demo data — Atlanta area
---------------------------- */
const JOBS = [
  {
    title: "Crew Member",
    location: "Atlanta, GA 30303",
    type: "Part-time",
    pay: "$14–$16/hr",
    blurb: "Front counter & drive-thru support.",
    role: "Crew"
  },
  {
    title: "Line Cook",
    location: "Decatur, GA 30030",
    type: "Full-time",
    pay: "$16–$18/hr",
    blurb: "Prep & line — brisket, ribs, sides.",
    role: "Line Cook"
  },
  {
    title: "Shift Manager",
    location: "Marietta, GA 30060",
    type: "Full-time",
    pay: "$18–$21/hr",
    blurb: "Lead shifts and coach crew.",
    role: "Shift Manager"
  }
];

/* ---------------------------
   DOM helpers
---------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);

const jobGrid = $("#jobGrid");
const cardTpl = $("#jobCardTemplate");

/* ---------------------------
   Render job cards
---------------------------- */
function renderJobs(list) {
  jobGrid.innerHTML = "";

  list.forEach(job => {
    const node = cardTpl.content.cloneNode(true);

    $(".job-title", node).textContent = job.title;
    $(".job-location", node).textContent = job.location;
    $(".job-type", node).textContent = job.type;
    $(".job-pay", node).textContent = job.pay;
    $(".job-blurb", node).textContent = job.blurb;

    $(".view-details", node)
      .addEventListener("click", () => openDetails(job));

    $(".apply-btn", node)
      .addEventListener("click", () => openApply(job));

    jobGrid.appendChild(node);
  });
}

renderJobs(JOBS);

/* ---------------------------
   Details (chat)
---------------------------- */
function openDetails(job){
  openChat();
  biggieSay(`
    **${job.title} — ${job.location}**
    • Type: ${job.type}
    • Pay: ${job.pay}
    • ${job.blurb}
  `);
}

/* ---------------------------
   Apply flow (REAL PAGE)
---------------------------- */
function openApply(job){
  localStorage.setItem("selectedJob", JSON.stringify(job));
  window.location.href = "apply.html";
}

/* ---------------------------
   Session ID
---------------------------- */


/* ---------------------------
   Chat Drawer behavior
---------------------------- */
const chatToggle = $("#chatToggle");
const chatDrawer = $("#chatDrawer");
const chatClose = $("#chatClose");
const chatForm = $("#chatForm");
const chatInput = $("#chatInput");
const chatLog = $("#chatLog");

function openChat(){
  chatDrawer.classList.add("open");
  chatInput.focus();
  if (!chatLog.children.length) {
    biggieSay("Hey! I’m Biggie. Ask me about roles or interviews.");
  }
}

function closeChat(){
  chatDrawer.classList.remove("open");
}

chatToggle?.addEventListener("click", openChat);
chatClose?.addEventListener("click", closeChat);

/* ---------------------------
   Chat UI
---------------------------- */
function addMsg(text, who = "ai"){
  const row = document.createElement("div");
  row.className = `msg-row ${who}`;

  row.innerHTML = `
    ${who === "ai" ? `<img src="images/people/bigs-avatar.png" class="msg-avatar" />` : ``}
    <div class="msg-bubble">${text}</div>
  `;

  chatLog.appendChild(row);
}

function userSay(t){ addMsg(t, "user"); }
function biggieSay(t){ addMsg(t, "ai"); }

/* ---------------------------
   PII Sanitizer
---------------------------- */
function sanitizePII(text){
  return text
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, "XXX-XX-XXXX")
    .replace(/\b(\d{2}\/\d{2}\/\d{4})\b/g, "YYYY-MM-DD");
}

/* ---------------------------
   Chat submit logging
---------------------------- */
chatForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const msg = chatInput.value.trim();
  if (!msg) return;

  const sanitized = sanitizePII(msg);
  userSay(sanitized);
  chatInput.value = "";

  if (window.HCS) {
    window.HCS.log("chat_message", { channel: "biggie" }, sanitized);
  }

  biggieSay("Got it. I can help you find roles or schedule interviews.");
});

/* ---------------------------
   Application Form Logging
---------------------------- */
const applyForm = document.getElementById("applyForm");

if (applyForm) {
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(applyForm));

    Object.entries(data).forEach(([field, value]) => {
      const sanitized = sanitizePII(value);

      if (window.HCS) {
        window.HCS.log("apply_input", {
          field,
          channel: "application_form",
        }, sanitized);
      }
    });

    alert("Application submitted (demo).");
    applyForm.reset();
  });
}


const resumeUpload = document.getElementById("resumeUpload");

if (resumeUpload) {
  resumeUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const meta = {
      name: file.name,
      type: file.type,
      size: file.size
    };

    if (window.HCS) {
      window.HCS.log("file_upload_attempt", {
        channel: "application_form",
        ...meta
      }, file.name);
    }
  });
}
