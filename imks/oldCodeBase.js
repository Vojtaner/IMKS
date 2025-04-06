var serverIp = ""; // GlobĂˇlnĂ­ promÄ›nnĂˇ pro IP adresu

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("wifi-rezim").dispatchEvent(new Event("change"));
  const timelines = document.querySelectorAll(
    ".kanal1-intensity-timeline, .kanal2-intensity-timeline, .kanal3-intensity-timeline, .kanal4-intensity-timeline"
  );
  /////////////////////////////////

  // Funkce pro aktualizaci hodnoty intenzity
  function updateIntensityValue(slider, valueDisplay) {
    if (valueDisplay) {
      valueDisplay.textContent = slider.value;
    }
  }

  // NastavenĂ­ posluchaÄŤĹŻ udĂˇlostĂ­ pro vĹˇechny posuvnĂ­ky
  document.querySelectorAll(".intensity-slider").forEach(function (slider) {
    // ZĂ­skĂˇnĂ­ odpovĂ­dajĂ­cĂ­ho elementu pro zobrazenĂ­ hodnoty
    const valueDisplayId = slider.id.replace("slider", "value");
    const valueDisplay = document.getElementById(valueDisplayId);

    // Aktualizace hodnoty pĹ™i zmÄ›nÄ› posuvnĂ­ku
    slider.addEventListener("input", function () {
      updateIntensityValue(slider, valueDisplay);
    });

    // Inicializace poÄŤĂˇteÄŤnĂ­ hodnoty
    updateIntensityValue(slider, valueDisplay);
  });

  ////////////////////////////////////

  timelines.forEach(function (timeline, index) {
    const channelNumber = index + 1;
    const pointsContainer = timeline.querySelector(".points-container");
    const addPoint = timeline.querySelector(".intensity-point.add-new");
    const settingsDiv = timeline.querySelector(".point-settings");
    let activePoint = null;

    // PĹ™idĂˇnĂ­ novĂ©ho bodu
    addPoint.addEventListener("click", function () {
      const newPoint = createNewPoint();
      pointsContainer.insertBefore(newPoint, addPoint);
      sortPointsByTime(pointsContainer);
      updateIntensityData(channelNumber); // Aktualizace grafu
    });

    // Aktualizace hodnot aktivnĂ­ho bodu:
    settingsDiv
      .querySelector('input[type="range"]')
      .addEventListener("input", function () {
        if (activePoint) {
          const intensityValue = activePoint.querySelector(".intensity-value");
          intensityValue.textContent = this.value;
          updateIntensityData(channelNumber); // Aktualizace grafu
        }
      });

    settingsDiv
      .querySelector('input[type="time"]')
      .addEventListener("input", function () {
        if (activePoint) {
          const timeValue = activePoint.querySelector(".time-value");
          timeValue.textContent = this.value;
          sortPointsByTime(pointsContainer); // SeĹ™adĂ­ body podle ÄŤasu
          updateIntensityData(channelNumber); // Aktualizace grafu
        }
      });

    // OdstranÄ›nĂ­ aktivnĂ­ho bodu
    const deleteIcon = settingsDiv.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", function () {
      if (activePoint) {
        activePoint.remove();
        activePoint = null;
        settingsDiv.classList.remove("active-settings");
        updateIntensityData(channelNumber); // Aktualizace grafu
      }
    });

    pointsContainer.addEventListener("click", function (e) {
      // ZmÄ›na aktivnĂ­ho bodu:
      const targetPoint = e.target.closest(".intensity-point");
      if (targetPoint && !targetPoint.closest(".add-new")) {
        // OdebrĂˇnĂ­ tĹ™Ă­dy 'active' od vĹˇech bodĹŻ
        pointsContainer
          .querySelectorAll(".intensity-point")
          .forEach((p) => p.classList.remove("active"));

        activePoint = targetPoint;
        // PĹ™idĂˇnĂ­ tĹ™Ă­dy 'active' k vybranĂ©mu bodu
        activePoint.classList.add("active");

        const intensityValue = targetPoint
          .querySelector(".intensity-value")
          .textContent.replace("%", "");
        const timeValue = targetPoint.querySelector(".time-value").textContent;

        settingsDiv.querySelector('input[type="range"]').value = intensityValue;
        settingsDiv.querySelector('input[type="time"]').value = timeValue;
        settingsDiv.querySelector(".intensity-value").textContent =
          intensityValue;

        settingsDiv.classList.add("active-settings");
      }
    });
  });

  if (window.innerWidth <= 768) {
    // PĹ™edpoklĂˇdĂˇm, Ĺľe 768px je vĂˇĹˇ breakpoint pro mobilnĂ­ zaĹ™Ă­zenĂ­
    nav.classList.add("active");
  }

  loadChartJs(); // NaÄŤtenĂ­ Chart.js

  //sbaleni a rozbaleni reĹľimĹŻ
  // Vybereme vĹˇechny nadpisy sekce
  const headers = document.querySelectorAll(".animated-section h2");

  headers.forEach((header) => {
    // PĹ™i kliknutĂ­ na nadpis
    header.addEventListener("click", function () {
      // Vybereme vĹˇechny elementy v sekci kromÄ› nadpisu
      const siblings = Array.from(header.parentNode.children).filter(
        (el) => el !== header
      );

      siblings.forEach((sibling) => {
        if (sibling.classList.contains("collapsed")) {
          sibling.classList.remove("collapsed");
        } else {
          sibling.classList.add("collapsed");
        }
      });
    });
  });

  // NastavĂ­me vĂ˝chozĂ­ stav vĹˇech sekcĂ­ na sbaleno
  const sectionsContent = document.querySelectorAll(
    ".animated-section > :not(h2)"
  );
  sectionsContent.forEach((section) => {
    section.classList.add("collapsed");

    document
      .querySelectorAll('input[id^="kanal"][id$="-nazev"]')
      .forEach((inputElement, index) => {
        if (inputElement.value) {
          updateChartLabel(index, inputElement.value);
        }
      });
  });

  // PĹ™edpoklĂˇdejme, Ĺľe mĂˇte WebSocket instanci jako `websocket`

  document.querySelectorAll(".kanal-button").forEach((button) => {
    button.addEventListener("click", function () {
      const kanalCislo = this.getAttribute("data-kanal");
      const akce = this.getAttribute("data-action");

      let message = {};

      if (akce === "manual-hnojeni") {
        message = {
          type: "instruction_Manualni_Prikazy",
          Kanal_Cislo: kanalCislo,
          Prikaz: "Manulni_Hnojeni",
        };
        websocket.send(JSON.stringify(message));
      } else if (akce === "odeslat-nastaveni") {
        sendDataToServer_kanaly(kanalCislo);
      } else if (akce === "odeslat-vsechno") {
        console.log("odeslat_vsecjno");
        sendDataToServer_vsechnyKanaly();
        sendDataToServer_nastaveni();
      }
      // pokud pĹ™idĂˇte dalĹˇĂ­ akce, mĹŻĹľete zde pĹ™idat dalĹˇĂ­ podmĂ­nky
    });
  });

  ////////////////////////////////////////////////
  //NastavĂ­ vĂ˝chozĂ­ hodnotu rozbalovacĂ­ho seznamu na aktuĂˇlnÄ› vybranĂ˝ jazyk

  // NastavĂ­ vĂ˝chozĂ­ hodnotu rozbalovacĂ­ho seznamu na aktuĂˇlnÄ› vybranĂ˝ jazyk
  document.getElementById("languageSelector").value = getSelectedLanguage();
  applyTranslations();

  ////////////// konec DOMu/////
});

////////////// konec DOMu/////

function sendDataToServer_vsechnyKanaly() {
  let kanalRezimNastaveni = [];

  for (let i = 1; i <= 4; i++) {
    // Pro kaĹľdĂ˝ kanĂˇl
    const dataKanalu = collectDataFromInputs(i);
    kanalRezimNastaveni = kanalRezimNastaveni.concat(
      dataKanalu.KanalRezimNastaveni
    );
  }

  const finalData = {
    type: "updateKanalRezimNastaveni",
    KanalRezimNastaveni: kanalRezimNastaveni,
  };

  websocket.send(JSON.stringify(finalData));
}

///////////////////
//nasteni scriptu pro GRAF

function loadChartJs() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/chart.js";
  script.onload = chartJsLoaded;
  script.onerror = chartJsFailedToLoad;
  document.head.appendChild(script);
}

function chartJsLoaded() {
  isChartJsLoaded = true;
  console.log("Chart.js naÄŤteno.");
  initChart(); // Inicializace grafu
  showGraphContainer();
}

function showGraphContainer() {
  const graphContainer = document.querySelector(".graph-container");
  if (graphContainer) {
    console.log("Chart.js naÄŤteno22.");
    graphContainer.style.display = "block";
  }
}

function chartJsFailedToLoad() {
  isChartJsLoaded = false;
  hideGraphContainer();
}

function initChart() {
  // Zde pĹ™idejte kĂłd pro inicializaci grafu
  // Tento kĂłd se spustĂ­ pouze v pĹ™Ă­padÄ›, Ĺľe je Chart.js ĂşspÄ›ĹˇnÄ› naÄŤten
  const ctx = document.getElementById("intensityChart").getContext("2d");
  intensityChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Array.from(
        { length: Math.ceil(24 * 5) },
        (_, i) => `${i / 5}:00`
      ),

      datasets: [
        {
          label: "KanĂˇl 1",
          data: extractDataFromTimeline(1),
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
          pointRadius: 0,
        },
        {
          label: "KanĂˇl 2",
          data: extractDataFromTimeline(2),
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
          pointRadius: 0,
        },
        {
          label: "KanĂˇl 3",
          data: extractDataFromTimeline(3),
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
          pointRadius: 0,
        },
        {
          label: "KanĂˇl 4",
          data: extractDataFromTimeline(4),
          borderColor: "rgba(153, 102, 255, 1)",
          fill: false,
          pointRadius: 0,
        },
        // Opakujte pro dalĹˇĂ­ kanĂˇly
      ],
    },
    options: {
      scales: {
        x: {
          ticks: {
            // PouĹľitĂ­ callback funkce pro dynamickĂ© formĂˇtovĂˇnĂ­ ĹˇtĂ­tkĹŻ
            callback: function (value, index, values) {
              // Logika pro zobrazenĂ­ ĹˇtĂ­tkĹŻ (napĹ™. kaĹľdĂ˝ 5. ĹˇtĂ­tek)
              if (index % 5 === 0) {
                return this.getLabelForValue(value);
              } else {
                return "";
              }
            },
            autoSkip: false, // ZakĂˇzĂˇnĂ­ automatickĂ©ho pĹ™eskakovĂˇnĂ­
          },
        },
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

//kontrola Kontrola naÄŤtenĂ­ Chart.js:
////////////////////

//////////////////
//Obsluha MENU tlacitka
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("menu-links");

menuToggle.addEventListener("click", function () {
  nav.classList.toggle("active");
});

///////////////////////////////

///////////////////////////////////////////////////////////////
//ÄŤasovĂˇ osa pĹ™idĂˇnĂ­ bodu

function sortPointsByTime(container) {
  const addNewPoint = container.querySelector(".intensity-point.add-new");
  const points = [
    ...container.querySelectorAll(".intensity-point:not(.add-new)"),
  ];

  const sortedPoints = points.sort((a, b) => {
    const timeA = a.querySelector(".time-value").textContent;
    const timeB = b.querySelector(".time-value").textContent;
    return timeA.localeCompare(timeB);
  });

  // NejdĹ™Ă­ve vloĹľĂ­me bod pro pĹ™idĂˇvĂˇnĂ­ novĂ˝ch bodĹŻ
  container.prepend(addNewPoint);

  // Pak vloĹľĂ­me ostatnĂ­ body seĹ™azenĂ© podle ÄŤasu
  sortedPoints.forEach((point) => container.appendChild(point));
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("aktuality-container")
    .addEventListener("click", function (e) {
      const clickedElement = e.target;
      if (clickedElement.classList.contains("aktualita-nadpis")) {
        const obsah = clickedElement.nextElementSibling;
        obsah.style.display = obsah.style.display === "none" ? "block" : "none";
      }
    });
});

////////////////////
//zobrazeni aktualit

document.addEventListener("DOMContentLoaded", function () {
  const kontejnerAktualit = document.getElementById("kontejner-aktualit");

  kontejnerAktualit.addEventListener("click", function (e) {
    const clickedH3 = e.target.closest(".aktualita h3");
    if (clickedH3) {
      const obsah = clickedH3.nextElementSibling;
      obsah.style.display = obsah.style.display === "none" ? "block" : "none";
    }
  });
});

async function nactiAktuality() {
  try {
    // ZmÄ›nÄ›no na URL vaĹˇeho JSON souboru
    const odpoved = await fetch(
      "https://gist.githubusercontent.com/zelvak97/66909d7760f74d431051ef67707f44b2/raw/aktuality.json"
    );
    const aktuality = await odpoved.json(); // PĹ™eÄŤte a parsovat JSON

    zobrazAktuality(aktuality);
  } catch (error) {
    console.error("Chyba pĹ™i naÄŤĂ­tĂˇnĂ­ aktualit:", error);
  }
}

function zobrazAktuality(aktuality) {
  const kontejnerAktualit = document.getElementById("kontejner-aktualit");
  kontejnerAktualit.innerHTML = ""; // VyÄŤistĂ­ pĹ™edchozĂ­ obsah

  aktuality.forEach((aktualita) => {
    const elementAktuality = document.createElement("div");
    elementAktuality.classList.add("aktualita");
    elementAktuality.innerHTML = `
                <h3>${aktualita.nadpis}</h3>
                <p style="display: none;">${aktualita.obsah}</p>
                <small>Datum: ${aktualita.datum}</small>
            `;

    kontejnerAktualit.appendChild(elementAktuality);
  });
}

document.addEventListener("DOMContentLoaded", nactiAktuality);

//zobrazeni aktualit
////////////////////////////

//////////////
//tlacitka pro zvyseni/snizeni jasu

// Funkce pro aktualizaci hodnoty intenzity
// ProchĂˇzĂ­ vĹˇechny tlaÄŤĂ­tka pro zvĂ˝ĹˇenĂ­ a snĂ­ĹľenĂ­ intenzity
document
  .querySelectorAll(".intensity-increase, .intensity-decrease")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const kanal = this.dataset.kanal; // ZĂ­skĂˇnĂ­ ÄŤĂ­sla kanĂˇlu z data atributu
      const isIncrease = this.classList.contains("intensity-increase");
      updateIntensity(kanal, isIncrease);
      updateIntensityData(kanal); // Aktualizace grafu
    });
  });

function updateIntensity(kanal, isIncrease) {
  const intensitySlider = document.getElementById(`intensity-slider${kanal}`);
  const intensityValueDisplay = document.getElementById(
    `intensity-value${kanal}`
  );
  let currentIntensity = parseInt(intensitySlider.value);

  if (isIncrease) {
    currentIntensity = Math.min(currentIntensity + 1, 100);
  } else {
    currentIntensity = Math.max(currentIntensity - 1, 0);
  }

  intensitySlider.value = currentIntensity;
  intensityValueDisplay.textContent = currentIntensity;

  // Aktualizace aktivnĂ­ho bodu na ÄŤasovĂ© ose, pokud existuje
  const activePoint = document.querySelector(
    `.kanal${kanal}-intensity-timeline .intensity-point.active`
  );
  if (activePoint) {
    activePoint.querySelector(".intensity-value").textContent =
      currentIntensity;
  }
}

//tlacitka pro zvyseni/snizeni jasu
////////////////////////////////////////

/////////////////////////////////////
//posluchac pro tlaictko automatickĂ˝ ÄŤas a povolenĂ­ menit inputy

document
  .getElementById("cas-zarizeni-mod")
  .addEventListener("change", function () {
    const isAutomatic = this.checked;
    const datumInput = document.getElementById("datum-zarizeni");
    const casInput = document.getElementById("cas-zarizeni");

    datumInput.disabled = isAutomatic;
    casInput.disabled = isAutomatic;

    if (isAutomatic) {
      const now = new Date();
      datumInput.value = now.toISOString().split("T")[0];
      casInput.value = now.toTimeString().substr(0, 5);
    }
  });

/////////////////////////////////////

let lastPointId = 1; // GlobĂˇlnĂ­ promÄ›nnĂˇ pro udrĹľenĂ­ poslednĂ­ho ID

function createNewPoint() {
  //VytvoĹ™enĂ­ novĂ©ho bodu:
  lastPointId++;

  const pointDiv = document.createElement("div");
  pointDiv.classList.add("intensity-point");
  pointDiv.setAttribute("data-id", lastPointId);
  pointDiv.innerHTML = `
            <div class="point-display">
                <span class="intensity-value">0</span>
                <span class="time-value">00:00</span>
            </div>
        `;

  return pointDiv;
}

function getPointValue(channelId, pointId) {
  //ZĂ­skĂˇnĂ­ hodnot bodu:
  const channelSection = document.querySelector(`#${channelId}`);
  const point = channelSection.querySelector(
    `.intensity-point[data-id="${pointId}"]`
  );
  const intensity = point.querySelector(".intensity-value").textContent;
  const time = point.querySelector(".time-value").textContent;

  return {
    intensity: intensity,
    time: time,
  };
}

//seĹ™azeni dle ÄŤasu

//////////////////////////////////////////////////////
//obsluha tlaÄŤĂ­tka manualni hnojenĂ­ + odeslanĂ­

function sendDataToServer_kanaly(kanalCislo) {
  // OdeĹˇle data pouze pro specifikovanĂ˝ kanĂˇl
  const data = collectDataFromInputs(kanalCislo);
  websocket.send(JSON.stringify(data));
}

////////////////////////////////////////////////////

//obsluha kanalĹŻ skrĂ˝vĂˇnĂ­ dle reĹľimĹŻ

function updateKanalDisplay(kanalNumber) {
  var value = document.getElementById("kanal" + kanalNumber + "-rezim").value;
  if (value == "RezimKanal_Off") {
    // Vypnuto
    document.querySelector(
      ".kanal" + kanalNumber + "-intensity-timeline"
    ).style.display = "none";
    document.querySelector(
      '.kanal-button[data-kanal="' +
        kanalNumber +
        '"][data-action="manual-hnojeni"]'
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-rezim-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-cas-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-mnozstvi-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-koeficient-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-den-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-dny-item"
    ).style.display = "none";
    document.getElementById(
      "kanal" + kanalNumber + "-kalibrace_osvetleni"
    ).style.display = "none";
  } else if (value == "RezimKanal_Hnojeni") {
    // HnojenĂ­
    document.querySelector(
      ".kanal" + kanalNumber + "-intensity-timeline"
    ).style.display = "none";
    document.querySelector(
      '.kanal-button[data-kanal="' +
        kanalNumber +
        '"][data-action="manual-hnojeni"]'
    ).style.display = "block";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-rezim-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-cas-item"
    ).style.display = "block";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-mnozstvi-item"
    ).style.display = "block";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-koeficient-item"
    ).style.display = "block";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-den-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-dny-item"
    ).style.display = "block";
    document.getElementById(
      "kanal" + kanalNumber + "-kalibrace_osvetleni"
    ).style.display = "none";
  } else if (value == "RezimKanal_LED") {
    // OsvÄ›tlenĂ­
    document.querySelector(
      ".kanal" + kanalNumber + "-intensity-timeline"
    ).style.display = "block";
    document.querySelector(
      '.kanal-button[data-kanal="' +
        kanalNumber +
        '"][data-action="manual-hnojeni"]'
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-rezim-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-cas-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-mnozstvi-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-koeficient-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-den-item"
    ).style.display = "none";
    document.querySelector(
      ".kanal" + kanalNumber + "-hnojeni-dny-item"
    ).style.display = "none";
    document.getElementById(
      "kanal" + kanalNumber + "-kalibrace_osvetleni"
    ).style.display = "block";
  }
}

for (let i = 1; i <= 4; i++) {
  // SpustĂ­ funkci pĹ™i naÄŤtenĂ­ strĂˇnky pro kaĹľdĂ˝ kanĂˇl
  updateKanalDisplay(i);

  // PĹ™idĂˇ posluchaÄŤ udĂˇlosti pro zmÄ›nu hodnoty vĂ˝bÄ›ru pro kaĹľdĂ˝ kanĂˇl
  document
    .getElementById("kanal" + i + "-rezim")
    .addEventListener("change", function () {
      updateKanalDisplay(i);
      updateGrafBasedOnRezim(i);
    });
}

//konec obsluha kanalĹŻ skrĂ˝vĂˇnĂ­ dle reĹľimĹŻ

//zacatek nazev kanalu pridat do prvniho radku

// Funkce pro aktualizaci nĂˇzvu kanĂˇlu

function updateKanalNazev(kanalNumber) {
  const nazevInput = document.getElementById("kanal" + kanalNumber + "-nazev");
  const nazevDisplay = document.querySelector(
    'h2[data-kanal="kanal' + kanalNumber + '"] .kanal' + kanalNumber + "-nazev"
  );

  //console.log("nazevInput:", nazevInput);
  //console.log("nazevDisplay:", nazevDisplay);
  nazevDisplay.textContent = nazevInput.value;
}

// Event listener pro kaĹľdĂ˝ input nĂˇzvu kanĂˇlu
for (let i = 1; i <= 4; i++) {
  document
    .getElementById("kanal" + i + "-nazev")
    .addEventListener("input", function () {
      updateKanalNazev(i);
    });
}

function aktualizace_rezimu_kanalu() {
  for (let i = 1; i <= 4; i++) {
    updateKanalNazev(i);
  }
}
//konec nazev kanalu pridat do prvniho radku

//skript pro aktualni cas
document.addEventListener("DOMContentLoaded", function () {
  // Pokud je zaĹˇkrtnuto "AutomatickĂ˝ ÄŤas/datum", naplnĂ­me datum a ÄŤas aktuĂˇlnĂ­mi hodnotami
  document
    .getElementById("cas-zarizeni-mod")
    .addEventListener("change", function () {
      if (this.checked) {
        let currentDate = new Date();
        document.getElementById("datum-zarizeni").value = currentDate
          .toISOString()
          .substring(0, 10);
        let hours = ("0" + currentDate.getHours()).slice(-2);
        let minutes = ("0" + currentDate.getMinutes()).slice(-2);
        document.getElementById("cas-zarizeni").value = hours + ":" + minutes;
      } else {
        document.getElementById("datum-zarizeni").value = "";
        document.getElementById("cas-zarizeni").value = "";
      }
    });
});

///////////////////////////////////////////////////// ODESLAT NA SERVER NASTAVENĂŤ ZAĹ˝ĂŤZENĂŤ
//start - obsluha nastavenĂ­ zaĹ™Ă­zeni

function constructMessage() {
  const isAutomaticTime = document.getElementById("cas-zarizeni-mod").checked;
  let datumUNIX;
  let casRezim = document.getElementById("cas-zarizeni-mod").checked
    ? "Auto"
    : "Manual";
  let zarizeniJmeno = document.getElementById("zarizeni-nazev").value;
  let wifiRezim = document.getElementById("wifi-rezim").value;
  let wifiSSID = document.getElementById("wifi-list").value; // PĹ™edpoklĂˇdĂˇm, Ĺľe tento prvek obsahuje vybranou WiFi sĂ­ĹĄ
  let wifiPassword = document.getElementById("wifi-password").value;

  if (isAutomaticTime) {
    datumUNIX = Math.floor(Date.now() / 1000); // AktuĂˇlnĂ­ ÄŤas v sekundĂˇch
  } else {
    const datum = new Date(document.getElementById("datum-zarizeni").value);
    const cas = document.getElementById("cas-zarizeni").value.split(":");
    datum.setHours(cas[0], cas[1]);
    datumUNIX = Math.floor(datum.getTime() / 1000);
  }

  if (wifiPassword === "nezmÄ›nÄ›no") {
    wifiPassword = ""; // nebo jinou hodnotu, kterou server interpretuje jako "nezmÄ›nÄ›no"
  }

  return {
    type: "update_ZarizeniNastaveni",
    CasRezim: isAutomaticTime ? "Auto" : "Manual",
    Datum_UNIX: datumUNIX,
    Zarizeni_Jmeno: zarizeniJmeno,
    Zarizeni_NazevFW_Aktualni: "iMK_LED_xx_xx",
    Zarizeni_NazevFW_Budouci: "iMK_LED_",
    Wifi_Rezim: wifiRezim,
    Wifi_SoftAP_Mode_SSID_Cele: "iMK_LED_FC4C",
    Wifi_SoftAP_Mode_Password: "akvarium",
    Wifi_ClientMode_SSID: wifiSSID,
    Wifi_ClientMode_heslo: wifiPassword,
  };
}

function createInitialMessage() {
  const datumUNIXzarizeni = Math.floor(Date.now() / 1000); // AktuĂˇlnĂ­ ÄŤas v UNIXovĂ©m formĂˇtu (sekundy)
  return {
    type: "update_Zarizeni_Time",
    Datum_UNIX: datumUNIXzarizeni,
  };
}

function sendDataToServer_nastaveni() {
  // console.log("Kliknuto na tlaÄŤĂ­tko 'Odeslat nastavenĂ­'");
  let message = constructMessage();
  //console.log("VytvoĹ™enĂˇ zprĂˇva pro odeslĂˇnĂ­:", message);
  websocket.send(JSON.stringify(message));
}

document
  .getElementById("odeslat-nastaveni")
  .addEventListener("click", sendDataToServer_nastaveni);

//konec - obsluha nastavenĂ­ zaĹ™Ă­zeni

////////////////////
//kontrola Kontrola naÄŤtenĂ­ Chart.js:

////////////////////////////////////////////////
//sbaleni a rozbaleni sectionu

///////////////////////////////////////////////////////

//konec sbaleni a rozbaleni sectionu

//komunikace

var currentIpAddress = window.location.hostname;
//var currentIpAddress = "192.168.0.229";
var websocket;

function connectWebSocket() {
  websocket = new WebSocket(`ws://${currentIpAddress}:81/`);

  websocket.onopen = function (event) {
    console.log("PĹ™ipojeno k WebSocket");
    // Zde mĹŻĹľete provĂ©st inicializaci oddĂ­lĹŻ podle potĹ™eby
    const initialMessage = createInitialMessage();
    websocket.send(JSON.stringify(initialMessage)); //odeslĂˇnĂ­ ÄŤasu na server

    websocket.send(
      JSON.stringify({
        type: "fetch_KanalRezimNastaveni",
      })
    );
    websocket.send(
      JSON.stringify({
        type: "fetch_ZarizeniNastaveni",
      })
    );

    // Pro cerpadlo_2 lze odeslat oddil: 2
  };

  websocket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    // ZpracovĂˇnĂ­ specifickĂ˝ch typĹŻ zprĂˇv
    if (data.Identifikator === "fetch_ZarizeniNastaveni") {
      updateZarizeni(data);
    } else if (data.Identifikator === "fetch_KanalRezimNastaveni") {
      updateKanal(data);
    }

    // Aktualizace reĹľimĹŻ kanĂˇlĹŻ
  };

  ////zpracovĂˇnĂ­ dat kanal
}

function updateZarizeni(data) {
  // Aktualizace ÄŤasu a data
  const casFloatH = data.CasFloat_h;
  const hodiny = Math.floor(casFloatH);
  const minuty = Math.floor((casFloatH - hodiny) * 60);
  document.getElementById("cas-zarizeni").value = `${hodiny
    .toString()
    .padStart(2, "0")}:${minuty.toString().padStart(2, "0")}`;
  document.getElementById("datum-zarizeni").value = `${
    data.Rok
  }-${data.Mesic.toString().padStart(2, "0")}-${data.Den.toString().padStart(
    2,
    "0"
  )}`;

  // Aktualizace ID zaĹ™Ă­zenĂ­
  document.getElementById("zarizeni-id").textContent =
    data.Zarizeni_ID || "NeznĂˇmĂ©";

  // Aktualizace MAC adresy
  document.getElementById("zarizeni-mac").textContent =
    data.Zarizeni_MAC || "NeznĂˇmĂˇ";

  // Aktualizace nĂˇzvu zaĹ™Ă­zenĂ­
  const nazevZarizeniInput = document.getElementById("zarizeni-nazev");
  nazevZarizeniInput.value = data.Zarizeni_Jmeno || "";

  // Aktualizace Wifi reĹľimu
  const wifiRezimSelect = document.getElementById("wifi-rezim");
  if (wifiRezimSelect) {
    wifiRezimSelect.value = data.Wifi_Rezim;
    updateWifiModeVisibility(data.Wifi_Rezim); // PĹ™idĂˇno volĂˇnĂ­ novĂ© funkce
  }

  // Aktualizace seznamu dostupnĂ˝ch WiFi sĂ­tĂ­
  const wifiListSelect = document.getElementById("wifi-list");
  if (wifiListSelect && Array.isArray(data.Wifi_ClientMode_DostupneWifi)) {
    // PrvnÄ› odstranĂ­me vĹˇechny stĂˇvajĂ­cĂ­ moĹľnosti
    wifiListSelect.innerHTML = "";

    // ZĂ­skĂˇme aktuĂˇlnĂ­ WiFi sĂ­ĹĄ
    const aktualniWifi = data.Wifi_ClientMode_SSID || "nevybranĂˇ wifi";

    // PĹ™idĂˇme aktuĂˇlnĂ­ WiFi sĂ­ĹĄ jako prvnĂ­ poloĹľku
    let option = document.createElement("option");
    option.value = aktualniWifi;
    option.textContent = aktualniWifi;
    wifiListSelect.appendChild(option);

    // PĹ™idĂˇme oddÄ›lovaÄŤ
    option = document.createElement("option");
    option.disabled = true;
    option.textContent = "_________";
    wifiListSelect.appendChild(option);

    // PĹ™idĂˇme vĹˇechny dostupnĂ© WiFi sĂ­tÄ›, vÄŤetnÄ› moĹľnĂ©ho opakovĂˇnĂ­ aktuĂˇlnĂ­ sĂ­tÄ›
    data.Wifi_ClientMode_DostupneWifi.forEach((wifi) => {
      option = document.createElement("option");
      option.value = wifi;
      option.textContent = wifi;
      wifiListSelect.appendChild(option);
    });
  }

  // Aktualizace CasRezim
  const casRezimCheckbox = document.getElementById("cas-zarizeni-mod");
  if (casRezimCheckbox) {
    casRezimCheckbox.checked = data.CasRezim === "Auto";
  }
  document
    .getElementById("cas-zarizeni-mod")
    .dispatchEvent(new Event("change"));

  // Zde je vĂˇĹˇ stĂˇvajĂ­cĂ­ kĂłd...

  // Aktualizace IP adresy v domĂˇcĂ­ sĂ­ti
  const ipAdresa = data.Wifi_ClientMode_IP || "NeznĂˇmĂˇ";
  document.getElementById("IP-adresa-clientmode").textContent = ipAdresa;

  // Aktualizace aktuĂˇlnĂ­ho a budoucĂ­ho firmwaru
  document.getElementById("FW-aktualni").textContent =
    data.Zarizeni_NazevFW_Aktualni || "NeznĂˇmĂ˝";
  document.getElementById("FW-budouci").textContent =
    data.Zarizeni_NazevFW_Budouci || "NeznĂˇmĂ˝";

  // Aktualizace stavu pĹ™ipojenĂ­ k domĂˇcĂ­ sĂ­ti
  const pripojeno = data.Wifi_ClientMode_Pripojeno
    ? "PĹ™ipojeno"
    : "NepĹ™ipojeno";
  // PĹ™idejte novĂ˝ element do HTML pro zobrazenĂ­ stavu pĹ™ipojenĂ­
  document.getElementById("wifi-status").textContent = pripojeno;

  // ZobrazenĂ­ sĂ­ly signĂˇlu WiFi
  const signalStrength = data.Wifi_ClientMode_SilaSignalu;
  updateWifiSignalStrength(signalStrength);
}

function updateKanal(data) {
  console.log(data);

  data.KanalRezimNastaveni.forEach((kanal, kanalIndex) => {
    // Index pro HTML ID (protoĹľe pole zaÄŤĂ­nĂˇ na indexu 0, ale chceme zaÄŤĂ­t od kanĂˇlu 1)
    kanalIndex += 1;

    document.getElementById(`kanal${kanalIndex}-nazev`).value =
      kanal.Kanal_Nazev;
    document.getElementById(`kanal${kanalIndex}-rezim`).value =
      kanal.Kanal_Rezim;
    document.getElementById(`kanal${kanalIndex}-hnojeni-rezim`).value =
      kanal.Hnojeni_Rezim;

    // PĹ™evedenĂ­ ÄŤĂ­sla na formĂˇt ÄŤasu HH:mm
    var hours = Math.floor(kanal.Hnojeni_Cas);
    var minutes = Math.round((kanal.Hnojeni_Cas - hours) * 60);
    var formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    document.getElementById(`kanal${kanalIndex}-hnojeni-cas`).value =
      formattedTime;

    document.getElementById(`kanal${kanalIndex}-hnojeni-mnozstvi`).value =
      kanal.Hnojeni_Mnozstvi;
    document.getElementById(`kanal${kanalIndex}-hnojeni-koeficient`).value =
      kanal.Hnojeni_KalibracniKoeficient;
    document.getElementById(`kanal${kanalIndex}-hnojeni-den`).value =
      kanal.Hnojeni_DenPoslednihoHnojeni;

    kanal.Hnojeni_DnyHnojeni.forEach((jeZaskrtnuto, denIndex) => {
      denIndex += 0;
      var checkboxElement = document.getElementById(
        `kanal${kanalIndex}-hnojeni-dny-${denIndex}`
      );
      if (checkboxElement) {
        checkboxElement.checked = jeZaskrtnuto;
      }
    });

    // Aktualizace nĂˇzvu kanĂˇlu v textovĂ©m poli
    const nazevInput = document.getElementById(`kanal${kanalIndex}-nazev`);
    nazevInput.value = kanal.Kanal_Nazev;

    // Aktualizace nĂˇzvu v grafu
    updateChartLabel(kanalIndex - 1, kanal.Kanal_Nazev);

    // NastavenĂ­ viditelnosti kanĂˇlu v grafu
    const isLightingMode = kanal.Kanal_Rezim === "RezimKanal_LED";
    if (
      intensityChart &&
      intensityChart.data &&
      intensityChart.data.datasets &&
      intensityChart.data.datasets[kanalIndex]
    ) {
      intensityChart.data.datasets[kanalIndex - 1].hidden = !isLightingMode;
    }
  });
  aktualizace_rezimu_kanalu(); //aktualizuje reĹľimy zobrazenĂ­ po obdrĹľenĂ­ zprĂˇvy
  console.log("aaaaaaaaaaaaaaa");
  updateTimelineWithJSONData(data); //vyplni timeline
  updateAllCharts();

  for (let i = 1; i <= 4; i++) {
    updateKanalDisplay(i); //vyplni rezim hnojeni,vypnuto, LED nastavenĂ­ (ukaze menu)
    updateGrafBasedOnRezim(i);
  }

  // Aktualizace grafu
  if (intensityChart) {
    intensityChart.update();
  }
}

////////////////////
//kalibrace
// Funkce pro zmÄ›nu hodnoty slideru
function zmenitHodnotuSlideru(kanal, zmena) {
  const slider = document.getElementById(`kanal${kanal}-kalibrace-slider`);
  let novaHodnota = parseInt(slider.value) + zmena;

  // Omezit hodnotu na rozmezĂ­ slideru
  novaHodnota = Math.max(slider.min, Math.min(slider.max, novaHodnota));

  slider.value = novaHodnota;
  aktualizovatHodnotuSlideru(kanal, novaHodnota);
  odeslatKalibraci(kanal, novaHodnota);
}

// PĹ™idĂˇnĂ­ posluchaÄŤĹŻ udĂˇlostĂ­ pro tlaÄŤĂ­tka plus a minus
document.querySelectorAll(".slider-plus").forEach((button) => {
  button.addEventListener("click", () => {
    const kanal = button.getAttribute("data-kanal");
    zmenitHodnotuSlideru(kanal, 1);
  });
});

document.querySelectorAll(".slider-minus").forEach((button) => {
  button.addEventListener("click", () => {
    const kanal = button.getAttribute("data-kanal");
    zmenitHodnotuSlideru(kanal, -1);
  });
});

// Zbytek vaĹˇeho kĂłdu ...

// Funkce pro zahĂˇjenĂ­ kalibrace
function zahajitKalibraci(kanal) {
  const kalibraceData = {
    type: "instruction_Manualni_Prikazy",
    Kanal_Cislo: kanal,
    Prikaz: "Kalibrace_LED_Start",
  };
  websocket.send(JSON.stringify(kalibraceData));

  // Zobrazit slider
  document.getElementById(
    `kanal${kanal}-kalibrace-slider-container`
  ).style.display = "block";
}

// Funkce pro odeslĂˇnĂ­ hodnoty kalibrace
let kalibraceTimeout;
function odeslatKalibraci(kanal, hodnota) {
  clearTimeout(kalibraceTimeout);
  kalibraceTimeout = setTimeout(() => {
    const kalibraceData = {
      type: "instruction_Manualni_Prikazy_Kalibrace_LED_Hodnota",
      Kanal_Cislo: kanal,
      Prikaz: hodnota.toString(),
    };
    websocket.send(JSON.stringify(kalibraceData));
  }, 100); // ZpoĹľdÄ›nĂ­ 500 ms
}

// Funkce pro aktualizaci zobrazenĂ­ hodnoty slideru
function aktualizovatHodnotuSlideru(kanal, hodnota) {
  document.getElementById(`kanal${kanal}-kalibrace-slider-value`).textContent =
    hodnota;
}

// PĹ™idĂˇnĂ­ posluchaÄŤĹŻ udĂˇlostĂ­
for (let i = 1; i <= 4; i++) {
  document
    .getElementById(`kanal${i}-kalibrace-start`)
    .addEventListener("click", () => zahajitKalibraci(i));
  document
    .getElementById(`kanal${i}-kalibrace-slider`)
    .addEventListener("input", (e) => {
      odeslatKalibraci(i, e.target.value);
      aktualizovatHodnotuSlideru(i, e.target.value);
    });
  document
    .getElementById(`kanal${i}-kalibrace-ulozit`)
    .addEventListener("click", () => ulozitKalibraci(i));
  document
    .getElementById(`kanal${i}-kalibrace-zrusit`)
    .addEventListener("click", () => zrusitKalibraci(i));
}

// Funkce pro uloĹľenĂ­ kalibrace
function ulozitKalibraci(kanal) {
  const kalibraceData = {
    type: "instruction_Manualni_Prikazy",
    Kanal_Cislo: kanal,
    Prikaz: "Kalibrace_LED_Ulozit",
  };
  websocket.send(JSON.stringify(kalibraceData));
  alert(translate("saved"));
  document.getElementById(
    `kanal${kanal}-kalibrace-slider-container`
  ).style.display = "none";
}

// Funkce pro uloĹľenĂ­ kalibrace
function zrusitKalibraci(kanal) {
  const kalibraceData = {
    type: "instruction_Manualni_Prikazy",
    Kanal_Cislo: kanal,
    Prikaz: "Kalibrace_LED_End",
  };
  websocket.send(JSON.stringify(kalibraceData));
  alert(translate("notSaved"));
  document.getElementById(
    `kanal${kanal}-kalibrace-slider-container`
  ).style.display = "none";
}

document
  .getElementById("connect-button")
  .addEventListener("click", function () {
    if (confirm(translate("confirmConnect"))) {
      let wifiSSID = document.getElementById("wifi-list").value;
      let wifiPassword = document.getElementById("wifi-password").value;

      websocket.send(
        JSON.stringify({
          type: "instruction_Wifi_Client",
          Prikaz: "Wifi_Client_Connect",
          Wifi_ClientMode_SSID: wifiSSID,
          Wifi_ClientMode_heslo: wifiPassword,
        })
      );
    }
  });

document
  .getElementById("restart-button")
  .addEventListener("click", function () {
    if (confirm(translate("confirmConnect"))) {
      let wifiSSID = document.getElementById("wifi-list").value;
      let wifiPassword = document.getElementById("wifi-password").value;

      websocket.send(
        JSON.stringify({
          type: "instruction_Wifi_Client",
          Prikaz: "Restart_Devices",
        })
      );
    }
  });

document
  .getElementById("default-settings-button")
  .addEventListener("click", function () {
    if (confirm(translate("confirmDefaultSettings"))) {
      websocket.send(
        JSON.stringify({ type: "instruction_Reset", Prikaz: "Default_Reset" })
      );
      // Nastavit zpoĹľdÄ›nĂ­ (delay) 1 sekundu (1000 milisekund)
      setTimeout(function () {
        // Obnovit strĂˇnku
        window.location.reload();
      }, 1000); // 1000 milisekund = 1 sekunda
    }
  });

document
  .getElementById("factory-settings-button")
  .addEventListener("click", function () {
    if (confirm(translate("confirmFactoryReset"))) {
      websocket.send(
        JSON.stringify({ type: "instruction_Reset", Prikaz: "Factory_Reset" })
      );
    }
  });

function updateGrafBasedOnRezim(kanalNumber) {
  const rezim = document.getElementById("kanal" + kanalNumber + "-rezim").value;
  const isLightingMode = rezim === "RezimKanal_LED";

  if (intensityChart && intensityChart.data && intensityChart.data.datasets) {
    // PĹ™edpoklĂˇdĂˇme, Ĺľe index v datasets odpovĂ­dĂˇ kanalNumber - 1
    const datasetIndex = kanalNumber - 1;
    if (intensityChart.data.datasets[datasetIndex]) {
      intensityChart.data.datasets[datasetIndex].hidden = !isLightingMode;
    }

    intensityChart.update();
  }
}

function createIntensityPoint(timeFloat, intensity) {
  // PĹ™evod float hodnoty ÄŤasu na hodiny a minuty
  const hours = Math.floor(timeFloat);
  const minutes = Math.round((timeFloat - hours) * 60);

  // FormĂˇtovĂˇnĂ­ hodnot na HH:mm formĂˇt
  const timeFormatted = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  const pointDiv = document.createElement("div");
  pointDiv.classList.add("intensity-point");
  pointDiv.innerHTML = `
            <div class="point-display">
                <span class="intensity-value">${intensity}</span>
                <span class="time-value">${timeFormatted}</span>
            </div>
        `;
  return pointDiv;
}

function updateWifiSignalStrength(strength) {
  const signalElement = document.getElementById("wifi-signal");
  signalElement.innerHTML = ""; // VymazĂˇnĂ­ pĹ™edchozĂ­ho obsahu

  // VytvoĹ™enĂ­ teÄŤek pro grafickĂ© zobrazenĂ­
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("span");
    dot.classList.add("wifi-dot");
    if (i < strength) {
      dot.classList.add("active");
    }
    signalElement.appendChild(dot);
  }

  // PĹ™idĂˇnĂ­ ÄŤĂ­selnĂ© hodnoty sĂ­ly signĂˇlu
  const strengthText = document.createElement("span");
  strengthText.textContent = ` (${strength})`;
  signalElement.appendChild(strengthText);
}

function updateTimelineWithJSONData(jsonData) {
  jsonData.KanalRezimNastaveni.forEach((kanal, index) => {
    const pointsContainer = document.querySelector(
      `.kanal${index + 1}-intensity-timeline .points-container`
    );

    // OdstranĂ­me vĹˇechny body kromÄ› bodu pro pĹ™idĂˇnĂ­ novĂ˝ch bodĹŻ
    const existingPoints = pointsContainer.querySelectorAll(
      ".intensity-point:not(.add-new)"
    );
    existingPoints.forEach((point) => point.remove());

    // PĹ™idĂˇme novĂ© body
    kanal.Osvetleni_Body.forEach((body) => {
      const time = body.Cas;
      const intensity = body.Intenzita;
      const pointDiv = createIntensityPoint(time, intensity);
      pointsContainer.appendChild(pointDiv);
    });
  });
}

function changeIpAddress(newIpAddress) {
  serverIp = newIpAddress;
  currentIpAddress = newIpAddress;
  if (websocket) {
    websocket.close();
  }
  connectWebSocket();
}

//POSLUCHAT PRO VYBER REĹ˝IMU WI-FI
document.getElementById("wifi-rezim").addEventListener("change", function () {
  const wifiMode = this.value;
  updateWifiModeVisibility(wifiMode); // VolĂˇnĂ­ funkce s aktuĂˇlnÄ› vybranĂ˝m reĹľimem WiFi
});

///////////////////
//KALIBRACE

// Event listener pro tlaÄŤĂ­tka kalibrace
document.querySelectorAll(".kalibrace-button").forEach((button) => {
  button.addEventListener("click", function () {
    const kanalCislo = this.getAttribute("data-kanal");

    // 1. Krok: PotvrzenĂ­ kalibrace
    const confirmKalibrace = confirm(
      translate("confirmCalibration").replace("{0}", kanalCislo)
    );
    if (!confirmKalibrace) return; // UĹľivatel zruĹˇil akci

    // 2. Krok: NĂˇvod na kalibraci
    alert(translate("alertCalibrationInstruction"));

    // 3. Krok: SpuĹˇtÄ›nĂ­ ÄŤerpadla
    websocket.send(
      JSON.stringify({
        type: "instruction_Manualni_Prikazy",
        Kanal_Cislo: kanalCislo,
        Prikaz: "Kalibrace_Hnojeni",
      })
    );

    // 4. Krok: ZadĂˇnĂ­ hodnoty
    const ml = prompt(translate("promptEnterFertilizerAmount"));
    const mlParsed = parseFloat(ml);

    if (isNaN(mlParsed)) {
      alert(translate("alertInvalidValue"));
      return;
    }

    // 5. Krok: VĂ˝poÄŤet kalibraÄŤnĂ­ho koeficientu a uloĹľenĂ­ hodnoty
    const kalibracniKoeficient = 10 / mlParsed; // PĹ™edpoklĂˇdĂˇme 10ml za 10 sekund jako zĂˇkladnĂ­ hodnotu
    document.getElementById(`kanal${kanalCislo}-hnojeni-koeficient`).value =
      kalibracniKoeficient.toFixed(2);

    // 6. Krok: NĂˇvod na kalibraci

    alert(translate("alertCalibrationComplete"));

    // UloĹľenĂ­ hodnoty pro odeslĂˇnĂ­ pĹ™i dalĹˇĂ­m odesĂ­lĂˇnĂ­ dat
    // Toto mĹŻĹľete implementovat podle vaĹˇĂ­ logiky pro odesĂ­lĂˇnĂ­ dat
  });
});

//KALIBRACE
///////////////////

function updateWifiModeVisibility(wifiMode) {
  const wifiPasswordLabel = document.getElementById("wifi-password-label");
  const wifiPasswordInput = document.getElementById("wifi-password");
  const wifiList = document.getElementById("wifi-list");
  const wifiListLabel = document.getElementById("wifi-list-label");
  const togglePassword = document.getElementById("toggle-password");

  if (wifiMode === "ClientMode") {
    wifiPasswordLabel.style.display = "block";
    wifiPasswordInput.style.display = "block";
    wifiList.style.display = "block";
    wifiListLabel.style.display = "block";
    togglePassword.style.display = "block";
  } else {
    // APMode nebo jinĂ˝ reĹľim
    wifiPasswordLabel.style.display = "none";
    wifiPasswordInput.style.display = "none";
    wifiList.style.display = "none";
    wifiListLabel.style.display = "none";
    togglePassword.style.display = "none";
  }
}

//obsluha nastavenĂ­ kanalĹŻ    (odesĂ­lĂˇnĂ­)

function collectDataFromInputs(kanalCislo) {
  //const numberOfChannels = 4;
  const kanalRezimNastaveni = [];

  const kanal = {};

  kanal.Kanal_Nazev =
    document.getElementById(`kanal${kanalCislo}-nazev`).value ||
    `Hnojeni_${kanalCislo}`;
  kanal.Kanal_Cislo = kanalCislo;
  kanal.Kanal_Rezim =
    document.getElementById(`kanal${kanalCislo}-rezim`).value ||
    "RezimKanal_Off";
  kanal.Hnojeni_Rezim =
    parseInt(
      document.getElementById(`kanal${kanalCislo}-hnojeni-rezim`).value
    ) || 0;

  const timeValue = document.getElementById(
    `kanal${kanalCislo}-hnojeni-cas`
  ).value;
  const [hours, minutes] = timeValue.split(":");
  kanal.Hnojeni_Cas = parseInt(hours) + parseInt(minutes) / 60;

  kanal.Hnojeni_Mnozstvi =
    parseFloat(
      document.getElementById(`kanal${kanalCislo}-hnojeni-mnozstvi`).value
    ) || 1;
  kanal.Hnojeni_KalibracniKoeficient =
    parseFloat(
      document.getElementById(`kanal${kanalCislo}-hnojeni-koeficient`).value
    ) || 1;
  kanal.Hnojeni_DenPoslednihoHnojeni =
    parseInt(document.getElementById(`kanal${kanalCislo}-hnojeni-den`).value) ||
    0;

  kanal.Hnojeni_DnyHnojeni = [];
  for (let j = 1; j <= 7; j++) {
    const checkbox = document.getElementById(
      `kanal${kanalCislo}-hnojeni-dny-${j}`
    );
    kanal.Hnojeni_DnyHnojeni.push(checkbox && checkbox.checked);
  }

  // ShromaĹľÄŹovĂˇnĂ­ dat pro intenzitu svÄ›tla
  const intensityPointsContainer = document.querySelector(
    `.kanal${kanalCislo}-intensity-timeline .points-container`
  );
  const intensityPoints = intensityPointsContainer.querySelectorAll(
    ".intensity-point:not(.add-new)"
  );

  kanal.Osvetleni_Body = [];

  intensityPoints.forEach((point) => {
    const timeElement = point.querySelector(".time-value");
    const intensityElement = point.querySelector(".intensity-value");

    const time = timeElement ? timeElement.textContent : null;
    if (time) {
      const [hours, minutes] = time.split(":");
      const timeFloat = parseInt(hours) + parseInt(minutes) / 60;
      const intensity = intensityElement
        ? parseInt(intensityElement.textContent)
        : null;

      kanal.Osvetleni_Body.push({
        Cas: timeFloat,
        Intenzita: intensity,
      });
    }
  });

  kanalRezimNastaveni.push(kanal);

  return {
    type: "updateKanalRezimNastaveni",
    KanalRezimNastaveni: kanalRezimNastaveni,
  };
}

////////////////////////////////////////////////////////////
//odeslani tlacitka vsechno

/*
    // Seznam vĹˇech tlaÄŤĂ­tek pro odeslĂˇnĂ­
    const sendALLButton = document.getElementById('odeslat-vsechno');
    
    // PĹ™idĂˇnĂ­ posluchaÄŤe udĂˇlosti pro kaĹľdĂ© tlaÄŤĂ­tko
    
    sendALLButton.addEventListener('click', function() {
        sendDataToServer_kanaly();
        sendDataToServer_nastaveni();
       });
    
    
    */
////////////////////////////////////////////////////////
//konec - obsluha nastavenĂ­ kanalĹŻ

window.onload = connectWebSocket;

aktualizace_rezimu_kanalu();

//////////////////////////////////
//IP websocketu
// Najdeme HTML prvky
const ipInput = document.getElementById("ip-address-input");
const changeIpButton = document.getElementById("change-ip-button");

// PĹ™idĂˇme posluchaÄŤ udĂˇlosti na tlaÄŤĂ­tko
changeIpButton.addEventListener("click", function () {
  const newIpAddress = ipInput.value;
  changeIpAddress(newIpAddress);
});

// MĹŻĹľeme takĂ© zachytit stisk Enter v textovĂ©m poli
ipInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const newIpAddress = ipInput.value;
    changeIpAddress(newIpAddress);
  }
});

/////////////////////////////////////////////
// PĹEKLAD

//DEFAULT
function getSelectedLanguage() {
  return localStorage.getItem("selectedLanguage") || "cz"; // Default to Czech
}

//POSLUCHAÄŚ

document
  .getElementById("toggle-password")
  .addEventListener("click", function (e) {
    // pĹ™epĂ­nĂˇnĂ­ mezi typem hesla a textem
    var passwordInput = document.getElementById("wifi-password");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  });

document
  .getElementById("languageSelector")
  .addEventListener("change", function () {
    const selectedLanguage = this.value;
    localStorage.setItem("selectedLanguage", selectedLanguage);
    applyTranslations();
  });
document.addEventListener("DOMContentLoaded", applyTranslations);

function applyTranslations() {
  const selectedLanguage = getSelectedLanguage();
  document.querySelectorAll("[data-translate]").forEach((element) => {
    const key = element.getAttribute("data-translate");
    if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
      // PĹ™eklĂˇdejte pouze textovĂ˝ obsah, ponechte vĹˇechny vnitĹ™nĂ­ elementy (napĹ™. inputy) netknutĂ©
      if (element.childNodes.length > 0) {
        // ProchĂˇzĂ­me vĹˇechny textovĂ© uzly a nahradĂ­me jejich hodnotu
        element.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            child.textContent = translations[selectedLanguage][key];
          }
        });
      } else {
        // Pokud element neobsahuje dalĹˇĂ­ uzly, nastavĂ­me textContent pĹ™Ă­mo
        element.textContent = translations[selectedLanguage][key];
      }
    }
  });
}

function translate(key) {
  const selectedLanguage = getSelectedLanguage();
  return translations[selectedLanguage][key] || key;
}

////////////////////////////////////////////////////
//GRAF
//
//generovĂˇnĂ­ dat pro graf

document
  .querySelectorAll('input[id^="kanal"][id$="-nazev"]')
  .forEach((inputElement, index) => {
    inputElement.addEventListener("input", function () {
      updateChartLabel(index, this.value);
    });
  });

function updateChartLabel(channelIndex, newName) {
  if (intensityChart && intensityChart.data && intensityChart.data.datasets) {
    intensityChart.data.datasets[channelIndex].label = newName;
    intensityChart.update();
  }
}

//
//ExtrahovĂˇnĂ­ Dat z Timeline

// START
//=============================================================
//=============================================================
//=============================================================
//=============================================================

function extractDataFromTimeline(channelNumber) {
  const pointsContainer = document.querySelector(
    `.kanal${channelNumber}-intensity-timeline .points-container`
  );
  const points = pointsContainer.querySelectorAll(
    ".intensity-point:not(.add-new)"
  );

  // PĹ™evod bodĹŻ na pole hodnot s ÄŤasovĂ˝mi znaÄŤkami
  let pointsArray = [];
  points.forEach((point) => {
    const time = point.querySelector(".time-value").textContent;
    const hour = parseInt(time.split(":")[0]) + time.split(":")[1] / 60;
    //console.log("TADY ======================");
    //console.log(channelNumber);
    //console.log(hour);
    const intensity = parseInt(
      point.querySelector(".intensity-value").textContent
    );
    //console.log(intensity);
    pointsArray.push({ hour, intensity });
  });

  // SeĹ™adĂ­me body podle ÄŤasu
  pointsArray.sort((a, b) => a.hour - b.hour);

  // Interpolace hodnot mezi body
  let intensityData = new Array(25 * 5).fill(null);
  for (let i = 0; i < pointsArray.length; i++) {
    const point = pointsArray[i];
    intensityData[Math.floor(point.hour * 5)] = point.intensity;

    // Interpolace mezi tĂ­mto bodem a dalĹˇĂ­m bodem
    if (i < pointsArray.length - 1) {
      const nextPoint = pointsArray[i + 1];
      const diff = nextPoint.intensity - point.intensity;
      const hoursDiff = nextPoint.hour - point.hour;

      for (let j = 1; j < hoursDiff * 5; j++) {
        const interpolatedIntensity =
          point.intensity + diff * (j / hoursDiff / 5);
        intensityData[Math.floor(point.hour * 5) + j] = interpolatedIntensity;
      }
    }
  }
  // NastavĂ­me hodnoty pro hodiny, kterĂ© nebyly explicitnÄ› definovĂˇny
  const point = pointsArray[pointsArray.length - 1];
  const nextPoint = pointsArray[0];
  const diff = nextPoint.intensity - point.intensity;
  const hoursDiff = 24 + nextPoint.hour - point.hour;

  for (let j = 1; j < hoursDiff * 5; j++) {
    const interpolatedIntensity = point.intensity + diff * (j / hoursDiff / 5);
    if (point.hour * 5 + j < 24 * 5) {
      intensityData[Math.floor(point.hour * 5) + j] = interpolatedIntensity;
    } else {
      intensityData[Math.floor(point.hour * 5 - 24 * 5) + j] =
        interpolatedIntensity;
    }
  }

  return intensityData;
}

// END
//=============================================================
//=============================================================
//=============================================================
//=============================================================
//=============================================================

///Inicializace Grafu s Daty z Timeline
let intensityChart;

function updateChartData(channelNumber, newData) {
  if (intensityChart && intensityChart.data && intensityChart.data.datasets) {
    intensityChart.data.datasets[channelNumber - 1].data = newData;
    intensityChart.update();
  }
}

//Aktualizace Grafu pĹ™i ZmÄ›nÄ› Dat
function updateIntensityData(channelNumber) {
  const newData = extractDataFromTimeline(channelNumber);
  updateChartData(channelNumber, newData);
}

// PĹ™Ă­klad: PĹ™i zmÄ›nÄ› v nastavenĂ­ KanĂˇlu 1

function updateAllCharts() {
  //aktualizuje graf podle vsech kanĂˇlĹŻ
  // PĹ™edpoklĂˇdĂˇme, Ĺľe mĂˇte 4 kanĂˇly
  for (let i = 1; i <= 4; i++) {
    updateIntensityData(i);
  }
}

document
  .getElementById("toggle-graph-fixed")
  .addEventListener("click", function () {
    const graphContainer = document.querySelector(".graph-container");
    graphContainer.classList.toggle("graph-fixed");

    // Toto zajistĂ­ pĹ™ekreslenĂ­ grafu, aby odpovĂ­dal novĂ© velikosti kontejneru
    intensityChart.resize();
  });

////////////////////////////////
//nahravani OTA - aktualizace

function updateProgress(evt) {
  if (evt.lengthComputable) {
    var percentComplete = evt.loaded / evt.total;
    document.getElementById("progress").value = percentComplete;
  }
}

function uploadFile() {
  alert(translate("inserted"));
  var form = document.getElementById("upload_form");
  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", updateProgress, false);

  // Dynamicky vytvoĹ™enĂ© URL podle aktuĂˇlnĂ­ IP adresy
  var url = serverIp
    ? `http://${serverIp}/update_FWhandleUpload`
    : "/update_FWhandleUpload";
  xhr.open("POST", url, true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      alert(xhr.responseText);
    }
  };
  xhr.send(new FormData(form));
}

//nahravani OTA - aktualizace

////////////////////////////////

//////////////////////////
////////EXPORT
//toto se musi upravit asi na kanal collectDataFromInputs(kanalCislo);
function exportChannelSettings() {
  const data = collectDataFromInputs(); // Tato funkce shromaĹľÄŹuje data pro odeslĂˇnĂ­ na server
  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "channel_settings_backup.json"; // NĂˇzev souboru
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function importChannelSettings(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedData = JSON.parse(event.target.result);

      // PĹ™edpoklĂˇdĂˇme, Ĺľe 'importedData' mĂˇ stejnĂ˝ formĂˇt jako data pĹ™ijatĂˇ ze serveru
      // Zde mĹŻĹľete zavolat funkce pro aktualizaci UI
      updateKanal(importedData); // Funkce pro aktualizaci UI
      // DalĹˇĂ­ potĹ™ebnĂ© aktualizace...
    } catch (error) {
      console.error("Chyba pĹ™i naÄŤĂ­tĂˇnĂ­ souboru", error);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

////EXPORT
///////////////

const translations = {
  cz: {
    kanal: "KanĂˇl",
    kanal_nazev: "NĂˇzev",
    kanal_rezim: "ReĹľim kanĂˇlu",
    Rezim_Kanal_Off: "Vypnuto",
    Rezim_Kanal_Hnojeni: "HnojenĂ­",
    Rezim_Kanal_LED: "OsvÄ›tlenĂ­",
    "kanal-hnojeni-rezim": "ReĹľim hnojenĂ­",
    "kanal-hnojeni-cas": "ÄŚas hnojenĂ­",
    "kanal-hnojeni-mnozstvi": "MnoĹľstvĂ­ hnojiva v ml",
    "kanal-hnojeni-koeficient": "KalibraÄŤnĂ­ koeficient",
    "kanal-kalibrace": "Kalibrace",
    "kanal-hnojeni-den": "Den poslednĂ­ho hnojenĂ­",
    "dny-hnojeni": "Dny hnojenĂ­",
    pondeli: "PondÄ›lĂ­",
    utery: "ĂšterĂ˝",
    streda: "StĹ™eda",
    ctvrtek: "ÄŚtvrtek",
    patek: "PĂˇtek",
    sobota: "Sobota",
    nedele: "NedÄ›le",
    "manual-hnojeni": "ManuĂˇlnĂ­ HnojenĂ­",
    ulozit: "UloĹľit",
    time: "ÄŚas",
    intenzity: "Intenzita",
    "zarizeni-nastaveni-h2": "NastavenĂ­ zaĹ™Ă­zenĂ­",
    "datum-zarizeni-label": "Datum zaĹ™Ă­zenĂ­:",
    "cas-zarizeni-label": "ÄŚas zaĹ™Ă­zenĂ­:",
    "automaticky-cas-datum-label": "AutomatickĂ˝ ÄŤas/datum",
    "zarizeni-nazev-label": "NĂˇzev zaĹ™Ă­zenĂ­:",
    "wifi-rezim-label": "ReĹľim WiFi:",
    "wifi-rezim-client": "ClientMode",
    "wifi-rezim-ap": "APMode",
    "wifi-list-label": "DostupnĂ© WiFi sĂ­tÄ›:",
    "zarizeni-id-label": "ID zaĹ™Ă­zenĂ­:",
    "zarizeni-mac-label": "MAC adresa zaĹ™Ă­zenĂ­:",
    ulozit: "UloĹľit",
    "menu-kanal-1": "KanĂˇl 1",
    "menu-kanal-2": "KanĂˇl 2",
    "menu-kanal-3": "KanĂˇl 3",
    "menu-kanal-4": "KanĂˇl 4",
    "menu-nastaveni": "NastavenĂ­",
    "menu-kontakt": "Kontakt",
    "menu-napoveda": "NĂˇpovÄ›da",
    "ulozit-vsechno": "UloĹľit VĹˇechno",
    "IP-adresa-clientmode-label": "IP adresa v domĂˇcĂ­ sĂ­ti",
    "wifi-password-label": "Heslo Wifi",
    "wifi-status-label": "Stav Wifi sĂ­tÄ›",
    "wifi-signal-strength-label": "SĂ­la Wifi sĂ­tÄ›",
    "FW-aktualni-label": "FW aktuĂˇlnĂ­",
    "FW-budouci-label": "FW budoucĂ­",
    "restore-settings-buttons-label": "ObnovenĂ­ nastavenĂ­",
    "default-settings-button-label": "DefaultnĂ­ nastavenĂ­",
    "factory-settings-button-label": "TovĂˇnĂ­ nastavenĂ­",
    "IP-address-communication": "ZmÄ›nit IP adresu kominukace",
    "Update-setting": "Aktualizace systĂ©mu",
    "Export/Import-setting": "Export/Import NastavenĂ­",
    Export: "Exportovat",
    Import: "Importovat",
    "expert-setting": "PokroÄŤilĂ© nastavenĂ­",
    Update: "Aktualizovat",
    connect: "Test pĹ™ipojenĂ­",
    restart: "Restart zaĹ™Ă­zenĂ­",
    confirmConnect: "Opravdu chcete pĹ™ipojit zaĹ™Ă­zenĂ­?",
    confirmDefaultSettings: "Opravdu chcete nastavit defaultnĂ­ nastavenĂ­?",
    confirmFactoryReset: "Opravdu chcete provĂ©st tovĂˇrnĂ­ reset?",
    alertCalibrationInstruction:
      "NĂˇvod na kalibraci: \nPo stisknutĂ­ tlaÄŤĂ­tka 'DalĹˇĂ­' se na 10 sekund spustĂ­ ÄŤerpadlo hnojenĂ­...",
    alertInvalidValue: "Byla zadĂˇna neplatnĂˇ hodnota.",
    alertCalibrationComplete:
      "Kalibrace dokonÄŤena. NezapomeĹte jeĹˇtÄ› uloĹľit hodnoty!",
    confirmCalibration: "Opravdu chcete kalibrovat kanĂˇl {0}?",
    promptEnterFertilizerAmount:
      "Zadejte mnoĹľstvĂ­ naÄŤerpanĂ©ho hnojiva v ml:",
    saved: "UloĹľeno",
    notSaved: "NEuloĹľeno",
    inserted: "VloĹľeno",
    startCalibration: "Spustit Kalibraci OsvÄ›tlenĂ­",
    saveCalibration: "UloĹľit Kalibraci",
    cancelCalibration: "ZruĹˇit/NeuloĹľit Kalibraci",
  },
  en: {
    kanal: "Channel",
    kanal_nazev: "Name",
    kanal_rezim: "Channel Mode",
    Rezim_Kanal_Off: "Off",
    Rezim_Kanal_Hnojeni: "Fertilization",
    Rezim_Kanal_LED: "Lighting",
    "kanal-hnojeni-rezim": "Fertilization Mode",
    "kanal-hnojeni-cas": "Fertilization Time",
    "kanal-hnojeni-mnozstvi": "Fertilizer Quantity in ml",
    "kanal-hnojeni-koeficient": "Calibration Coefficient",
    "kanal-kalibrace": "Calibration",
    "kanal-hnojeni-den": "Day of Last Fertilization",
    "dny-hnojeni": "Fertilization Days",
    pondeli: "Monday",
    utery: "Tuesday",
    streda: "Wednesday",
    ctvrtek: "Thursday",
    patek: "Friday",
    sobota: "Saturday",
    nedele: "Sunday",
    "manual-hnojeni": "Manual Fertilization",
    ulozit: "Save",
    time: "Time",
    intenzity: "Intensity",
    "zarizeni-nastaveni-h2": "Device Settings",
    "datum-zarizeni-label": "Device Date:",
    "cas-zarizeni-label": "Device Time:",
    "automaticky-cas-datum-label": "Automatic Date/Time",
    "zarizeni-nazev-label": "Device Name:",
    "wifi-rezim-label": "WiFi Mode:",
    "wifi-rezim-client": "ClientMode",
    "wifi-rezim-ap": "APMode",
    "wifi-list-label": "Available WiFi Networks:",
    "zarizeni-id-label": "Device ID:",
    "zarizeni-mac-label": "Device MAC Address:",
    ulozit: "Save",
    "menu-kanal-1": "Channel 1",
    "menu-kanal-2": "Channel 2",
    "menu-kanal-3": "Channel 3",
    "menu-kanal-4": "Channel 4",
    "menu-nastaveni": "Settings",
    "menu-kontakt": "Contact",
    "menu-napoveda": "Help",
    "ulozit-vsechno": "Save All Settings",
    "IP-adresa-clientmode-label": "Home Network IP Address",
    "wifi-password-label": "WiFi Password",
    "wifi-status-label": "WiFi Network Status",
    "wifi-signal-strength-label": "WiFi Signal Strength",
    "FW-aktualni-label": "Current FW",
    "FW-budouci-label": "Future FW",
    "restore-settings-buttons-label": "Restore Settings",
    "default-settings-button-label": "Default Settings",
    "factory-settings-button-label": "Factory Settings",
    "IP-address-communication": "Change Communication IP Address",
    "Update-setting": "System Update",
    "Export/Import-setting": "Export/Import Settings",
    Export: "Export",
    Import: "Import",
    "expert-setting": "Expert setting",
    Update: "Update",
    connect: "Connection test",
    restart: "Device restart",
    confirmConnect: "Do you really want to connect the device?",
    confirmDefaultSettings: "Do you really want to set default settings?",
    confirmFactoryReset: "Do you really want to perform a factory reset?",
    alertCalibrationInstruction:
      "Calibration instructions: \nAfter pressing 'Next', the fertilizer pump will run for 10 seconds...",
    alertInvalidValue: "An invalid value was entered.",
    alertCalibrationComplete:
      "Calibration complete. Don't forget to save the settings!",
    confirmCalibration: "Do you really want to calibrate channel {0}?",
    promptEnterFertilizerAmount: "Enter the amount of fertilizer pumped in ml:",
    saved: "Saved",
    notSaved: "Not Saved",
    inserted: "Inserted",
    startCalibration: "Start Light Calibration",
    saveCalibration: "Save Calibration",
    cancelCalibration: "Cancel/Do Not Save Calibration",
  },
  de: {
    kanal: "Kanal",
    kanal_nazev: "Name",
    kanal_rezim: "Kanalmodus",
    Rezim_Kanal_Off: "Aus",
    Rezim_Kanal_Hnojeni: "DĂĽngung",
    Rezim_Kanal_LED: "Beleuchtung",
    "kanal-hnojeni-rezim": "DĂĽngungsmodus",
    "kanal-hnojeni-cas": "DĂĽngungszeit",
    "kanal-hnojeni-mnozstvi": "DĂĽngermenge in ml",
    "kanal-hnojeni-koeficient": "Kalibrierungskoeffizient",
    "kanal-kalibrace": "Kalibrierung",
    "kanal-hnojeni-den": "Tag der letzten DĂĽngung",
    "dny-hnojeni": "DĂĽngungstage",
    pondeli: "Montag",
    utery: "Dienstag",
    streda: "Mittwoch",
    ctvrtek: "Donnerstag",
    patek: "Freitag",
    sobota: "Samstag",
    nedele: "Sonntag",
    "manual-hnojeni": "Manuelle DĂĽngung",
    ulozit: "Speichern",
    time: "Zeit",
    intenzity: "IntensitĂ¤t",
    "zarizeni-nastaveni-h2": "GerĂ¤teeinstellungen",
    "datum-zarizeni-label": "GerĂ¤tedatum:",
    "cas-zarizeni-label": "GerĂ¤teuhrzeit:",
    "automaticky-cas-datum-label": "Automatisches Datum/Uhrzeit",
    "zarizeni-nazev-label": "GerĂ¤tename:",
    "wifi-rezim-label": "WiFi-Modus:",
    "wifi-rezim-client": "Client-Modus",
    "wifi-rezim-ap": "AP-Modus",
    "wifi-list-label": "VerfĂĽgbare WiFi-Netzwerke:",
    "zarizeni-id-label": "GerĂ¤te-ID:",
    "zarizeni-mac-label": "GerĂ¤te-MAC-Adresse:",
    ulozit: "Speichern",
    "menu-kanal-1": "Kanal 1",
    "menu-kanal-2": "Kanal 2",
    "menu-kanal-3": "Kanal 3",
    "menu-kanal-4": "Kanal 4",
    "menu-nastaveni": "Einstellungen",
    "menu-kontakt": "Kontakt",
    "menu-napoveda": "Hilfe",
    "ulozit-vsechno": "Alle Einstellungen speichern",
    "IP-adresa-clientmode-label": "IP-Adresse im Heimnetzwerk",
    "wifi-password-label": "WiFi-Passwort",
    "wifi-status-label": "WiFi-Netzwerkstatus",
    "wifi-signal-strength-label": "WiFi-SignalstĂ¤rke",
    "FW-aktualni-label": "Aktuelle FW",
    "FW-budouci-label": "ZukĂĽnftige FW",
    "restore-settings-buttons-label": "Einstellungen wiederherstellen",
    "default-settings-button-label": "Standard-Einstellungen",
    "factory-settings-button-label": "Werkseinstellungen",
    "IP-address-communication": "Kommunikations-IP-Adresse Ă¤ndern",
    "Update-setting": "Systemaktualisierung",
    "Export/Import-setting": "Einstellungen exportieren/importieren",
    Export: "Exportieren",
    Import: "Importieren",
    "expert-setting": "Experten-Einstellungen",
    Update: "Aktualisieren",
    connect: "Verbindungstest",
    restart: "GerĂ¤teneustart",
    confirmConnect: "MĂ¶chten Sie das GerĂ¤t wirklich verbinden?",
    confirmDefaultSettings:
      "MĂ¶chten Sie wirklich die Standard-Einstellungen festlegen?",
    confirmFactoryReset: "MĂ¶chten Sie wirklich einen Werksreset durchfĂĽhren?",
    alertCalibrationInstruction:
      "Kalibrierungsanleitung: \nNach DrĂĽcken von 'Weiter' lĂ¤uft die DĂĽngerpumpe 10 Sekunden lang...",
    alertInvalidValue: "Eine ungĂĽltige Wert wurde eingegeben.",
    alertCalibrationComplete:
      "Kalibrierung abgeschlossen. Vergessen Sie nicht, die Einstellungen zu speichern!",
    confirmCalibration: "MĂ¶chten Sie wirklich Kanal {0} kalibrieren?",
    promptEnterFertilizerAmount:
      "Geben Sie die Menge des gepumpten DĂĽngers in ml ein:",
    saved: "Gespeichert",
    notSaved: "Nicht gespeichert",
    inserted: "EingefĂĽgt",
    startCalibration: "Starten der Lichtkalibrierung",
    saveCalibration: "Kalibrierung speichern",
    cancelCalibration: "Abbrechen/Kalibrierung nicht speichern",
  },
};
