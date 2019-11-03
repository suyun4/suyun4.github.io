(function() {
  const simulationFormElement = document.querySelector("#simulation-form");
  let results = [];

  const storeShowIntro = () =>
    localStorage.setItem("showIntro", JSON.stringify(showIntro));
  const restoreShowIntro = () => {
    const storedShowIntro = localStorage.getItem("showIntro");
    if (storedShowIntro) {
      showIntro = JSON.parse(storedShowIntro);
    }
  };

  const renderIntro = () => {
    const introEl = document.querySelector("#mh-explanation");
    introEl.innerHTML = "The Monty Hall Problem :";
  };

  const runSimulation = (sims, doors) => {
    console.log(sims + " " + doors);
    let correctForSwitching = 0;
    let correctForStaying = 0;
    updateCounter(0);

    for (let i = 1; i <= sims; i++) {
      const correctDoor = Math.floor(Math.random() * doors);
      const chosenDoor = Math.floor(Math.random() * doors);
      let shownDoor = chosenDoor;
      while (shownDoor == chosenDoor || shownDoor == correctDoor) {
        shownDoor = Math.floor(Math.random() * doors);
      }
      // For Staying
      if (shownDoor == correctDoor) {
        correctForStaying++;
        const stayed = true;
      } else const stayed = false;
      // For Switching
      let switchDoor = chosenDoor;
      while (switchDoor == chosenDoor || switchDoor == shownDoor) {
        switchDoor = Math.floor(Math.random() * doors);
      }
      if (switchDoor == correctDoor) {
        correctforSwitching++;
        const switched = true;
      } else const switched = false;

      if (i < 100) {
        addResult(
          correctDoor,
          chosenDoor,
          shownDoor,
          switchDoor,
          switched,
          stayed
        );
      }
      updateCounter(i);
    }
    return [correctForSwitching, correctForStaying];
  };

  const addResult = (
    correctDoor,
    chosenDoor,
    shownDoor,
    switchDoor,
    switched,
    stayed
  ) => {
    const newResult = {
      winningDoor: correctDoor,
      initGuessDoor: chosenDoor,
      revealedDoor: shownDoor,
      switchedDoor: switchDoor,
      correctForSwitching: switched,
      correctForStaying: stayed
    };
    results.push(newResult);
  };

  const updateCounter = i => {};
  const renderResultsTable = () => {
    const resultEl = document.querySelector("#results");
    let newHTML =
      "<table><tr><th>#</th><th>Winning Door</th><th>Initially Guessed Door</th><th>Revealed Door</th><th>Secondly Guessed Door</th><th>Switched Result</th><th>Stayed Result</th></tr>";
    results.forEach((result, i) => (newHTML += makeResultTableHTML(result, i)));
    newHTML += "</table>";
    resultEl.innerHTML = newHTML;
  };

  const makeResultTableHTML = ({ a, b, c, d, e, f }, i) =>
    `<tr><th>${i +
      1}</th><th>${a}</th><th>${b}</th><th>${c}</th><th>${d}</th><th>${
      e ? "Correct" : "false"
    }</th><th>${f ? "Correct" : "false"}</th></tr>`;

  const renderTotalResults = totalResults => {
    return totalResults;
  };
  //    -----Event Listeners------
  window.addEventListener("load", () => {
    renderIntro();

    simulationFormElement.addEventListener("submit", e => {
      e.preventDefault();
      console.log("submitted");
      const numberSimulations = Number(document.querySelector("#num-of-simulations"));
      const numberDoors = Number(document.querySelector("num-of-doors"));
      totalResults = runSimulation(numberSimulations, numberDoors);
      renderResultsTable();
      renderTotalResults(totalResults);
      console.log(totalResults);
    });
  });
})();
