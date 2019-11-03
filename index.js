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

  const renderIntro = () => {
    const introEl = document.querySelector("#mh-explanation");
    introEl.innerHTML = "The Monty Hall Problem :";
  };

  const runSimulation = (sims, doors) => {
    results = [];
    let correctForSwitchingCount = 0;
    let correctForStayingCount = 0;
    updateCounter(0);

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
      updateCounter(i);
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

  const updateCounter = i => {return i};
  const renderResultsTable = () => {
    const resultEl = document.querySelector("#results");
    let newHTML =
      "<table><tr><th>#</th><th>Winning Door</th><th>Initially Guessed Door</th><th>Revealed Door</th><th>Secondly Guessed Door</th><th>correctForSwitching Result</th><th>correctForStaying Result</th></tr>";
    results.forEach((result, i) => (newHTML += makeResultTableHTML(result, i)));
    newHTML += "</table>";
    resultEl.innerHTML = newHTML;
  };

  const makeResultTableHTML = ({winningDoor, initGuessDoor, revealedDoor, correctForSwitchingDoor, e: correctForSwitching, correctForStaying} , i) =>
    `<tr><th>${i +
      1}</th><th>${winningDoor}</th><th>${initGuessDoor}</th><th>${revealedDoor}</th><th>${correctForSwitchingDoor}</th><th>${
      correctForSwitching ? "Correct" : "False"
    }</th><th>${correctForStaying ? "Correct" : "False"}</th></tr>`;

  const renderTotalResults = totalResults => {
    return totalResults;
  };
  //    -----Event Listeners------
  window.addEventListener("load", () => {
    renderIntro();

    simulationFormElement.addEventListener("submit", e => {
      e.preventDefault();
      console.log("submitted");
      const numberSimulations = Number(document.querySelector("#num-of-simulations").value);
      const numberDoors = Number(document.querySelector("#num-of-doors").value);
      console.log (numberSimulations + "  "  + numberDoors);
      const totalResults = runSimulation(numberSimulations, numberDoors);
      renderResultsTable();
      renderTotalResults(totalResults);
      console.log(totalResults);
    });
  });
})();