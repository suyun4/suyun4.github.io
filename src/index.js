(function() {
  const simulationFormElement = document.querySelector("#simulation-form");
  let results = [];

  // const storeShowIntro = () =>
  //   localStorage.setItem("showIntro", JSON.stringify(showIntro));
  // const restoreShowIntro = () => {
  //   const storedShowIntro = localStorage.getItem("showIntro");
  //   if (storedShowIntro) {
  //     showIntro = JSON.parse(storedShowIntro);
  //   }
  // };

  const runSimulation = (sims, doors) => {
    results = [];
    let correctForSwitchingCount = 0;
    let correctForStayingCount = 0;

    for (let i = 1; i <= sims; i++) {
      const correctDoor = Math.floor(Math.random() * doors);
      const chosenDoor = Math.floor(Math.random() * doors);

      let correctForStaying = false;
      let correctForSwitching = false;
      let shownDoor = chosenDoor;
      while (shownDoor === chosenDoor || shownDoor === correctDoor) {
        shownDoor = Math.floor(Math.random() * doors);
      }
      // For Staying
      if (chosenDoor === correctDoor) {
        correctForStayingCount++;
        correctForStaying = true;
      }

      // For Switching
      let switchDoor = chosenDoor;
      while (switchDoor === chosenDoor || switchDoor === shownDoor) {
        switchDoor = Math.floor(Math.random() * doors);
      }
      if (switchDoor === correctDoor) {
        correctForSwitchingCount++;
        correctForSwitching = true;
      }
      if (i <= 100) {
        addResult(
          correctDoor,
          chosenDoor,
          shownDoor,
          switchDoor,
          correctForSwitching,
          correctForStaying
        );
      }
    }
    return [correctForSwitchingCount, correctForStayingCount];
  };

  const addResult = (
    correctDoor,
    chosenDoor,
    shownDoor,
    switchDoor,
    correctForSwitching,
    correctForStaying
  ) => {
    const newResult = {
      winningDoor: correctDoor,
      initGuessDoor: chosenDoor,
      revealedDoor: shownDoor,
      correctForSwitchingDoor: switchDoor,
      correctForSwitching: correctForSwitching,
      correctForStaying: correctForStaying
    };
    results.push(newResult);
  };

  const renderResults = (sims, doors, results) => {
    renderTotalResults(sims, doors, results);
    renderResultsTable();
  };
  const renderTotalResults = (sims, doors, results) => {
    const resultHeaderEl = document.querySelector("#summary-result");
    let newHeaderHTML = "<h2 id=result-heading>Results</h2>";
    resultHeaderEl.innerHTML = newHeaderHTML;
    const resultEl = document.querySelector("#summary-paragraph");
    let newResultHTML =
      `${sims} iterations of simulation completed for ${doors} doors.</br>` +
      `<b>${results[0]}/${sims} (${((results[0] / sims) * 100).toFixed(
        2
      )}%)</b> correct for switching.</br> ` +
      `<b>${results[1]}/${sims} (${((results[1] / sims) * 100).toFixed(
        2
      )}%)</b> correct for staying.` +
      `<div id = "result-statement"><h3>${
        results[0] > results[1] ? "Switching wins!" : "Staying wins!"
      }<h3></div>`;
    resultEl.innerHTML = newResultHTML;
  };

  const renderResultsTable = () => {
    const resultEl = document.querySelector("#table-results");
    let newHTML = `<table class = "table"><tr>
        <th class = "first-column">#</th><th class = "second-column">Winning Door</th>
        <th>Initial Guess</th>
        <th>Revealed Door</th>
        <th>Second Guess</th>
        <th>Switch Result</th>
        <th>Stay Result</th>
      </tr>`;
    results.forEach((result, i) => (newHTML += makeResultTableHTML(result, i)));
    newHTML += "</table>";
    resultEl.innerHTML = newHTML;
  };

  const makeResultTableHTML = (
    {
      winningDoor,
      initGuessDoor,
      revealedDoor,
      correctForSwitchingDoor,
      correctForSwitching,
      correctForStaying
    },
    i
  ) =>
    `<tr><td class = "first-column">${i + 1}</td>
      <td class = "second-column">${winningDoor + 1}</td>
      <td>${initGuessDoor + 1}</td>
      <td>${revealedDoor + 1}</td>
      <td>${correctForSwitchingDoor + 1}</td>
      <td>${correctForSwitching ? "Correct" : "Incorrect"}</td>
      <td>${correctForStaying ? "Correct" : "Incorrect"}</td>
    </tr>`;

  //    -----Event Listeners------
  window.addEventListener("load", () => {
    simulationFormElement.addEventListener("submit", e => {
      e.preventDefault();
      const numberSimulations = Number(
        document.querySelector("#num-of-simulations").value
      );
      const numberDoors = Number(document.querySelector("#num-of-doors").value);
      const totalResults = runSimulation(numberSimulations, numberDoors);
      renderResults(numberSimulations, numberDoors, totalResults);
    });
  });
})();

window.onload = () => {
  const svg = document.querySelector("#svg-animated");

  document
    .querySelector("#flash-circle-button")
    .addEventListener("click", () => {
      window.requestAnimationFrame(() => {
        svg.classList.remove("fade-in-animation");

        window.requestAnimationFrame(() => {
          svg.classList.add("fade-in-animation");
        });
      });
    });
};
