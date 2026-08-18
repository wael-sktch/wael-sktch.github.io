const btn=document.getElementById('themeBtn');if(btn){btn.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('wael-theme',document.body.classList.contains('light')?'light':'dark')});if(localStorage.getItem('wael-theme')==='light')document.body.classList.add('light')}
document.querySelectorAll('.filter button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')}));

/* =========================================================
   ATLAS CORE — AUTOMATED ENGAGEMENT INDEX
   ========================================================= */

async function loadEngagements() {

  const grid = document.getElementById("engagement-grid");
  const status = document.getElementById("engagement-status");

  if (!grid) return;

  try {

    const response = await fetch(
      "https://raw.githubusercontent.com/wael-sktch/atlas-core-enterprise-company/main/engagement-index.json"
    );

    if (!response.ok) {
      throw new Error("Unable to load engagement index");
    }

    const engagements = await response.json();

    grid.innerHTML = "";

    engagements.forEach(engagement => {

      const card = document.createElement("a");

      card.className = "engagement-card";

      card.href = engagement.url;

      card.target = "_blank";

      card.rel = "noopener noreferrer";

      const statusClass =
        engagement.status.toLowerCase() === "completed"
          ? "completed"
          : "planned";

      card.innerHTML = `
        <span class="engagement-number">
          ${engagement.id}
        </span>

        <h3>
          ${engagement.title}
        </h3>

        <p class="engagement-description">
          ${engagement.description || "Engineering engagement scheduled for the Atlas Core environment."}
        </p>

        <div class="engagement-footer">

          <span class="engagement-status ${statusClass}">
            ${engagement.status}
          </span>

          <span class="engagement-arrow">
            OPEN ENGAGEMENT →
          </span>

        </div>
      `;

      grid.appendChild(card);

    });

    status.textContent =
      `${engagements.length} ENGAGEMENTS`;

  } catch (error) {

    console.error(
      "Atlas Core engagement loading failed:",
      error
    );

    status.textContent =
      "ENGAGEMENT INDEX UNAVAILABLE";

    grid.innerHTML = `
      <div class="engagement-card">
        <span class="engagement-number">
          SYSTEM
        </span>

        <h3>
          Engagement Index Offline
        </h3>

        <p class="engagement-description">
          The Atlas Core engagement index could not be loaded.
        </p>
      </div>
    `;
  }
}

loadEngagements();