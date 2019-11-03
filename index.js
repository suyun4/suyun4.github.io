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
    const introEl = document.querySelector("#paragraph");
    introEl.innerHTML = "The Monty Hall problem is an interesting statistical paradox based on the American TV game show, Let's make a Deal. "
    + "The game show host would ask a contestant to choose 1 out of 3 doors, two doors which hid a goat each, and one that revealed a new car. "
    + "The host will then reveal a door that the contestant did not pick and had a goat behind it, and then ask the contestant if they would like to switch their choice. "
    + "Although many would say all doors had an equal chance to lead to the prize of a car, statisticians found that this was not the case. "
    + "This site will simulate many times the outcomes to help show that switching is a more favorable choice than staying on an initial decision.";
  };

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

  const renderResultsTable = () => {
    const resultEl = document.querySelector("#results");
    let newHTML =
      `<table class = "table"><tr>
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

  const makeResultTableHTML = ({winningDoor, initGuessDoor, revealedDoor, correctForSwitchingDoor, correctForSwitching, correctForStaying} , i) =>
    `<tr><td class = "first-column">${i + 1}</td>
      <td class = "second-column">${winningDoor}</td>
      <td>${initGuessDoor}</td><td>${revealedDoor}</td>
      <td>${correctForSwitchingDoor}</td>
      <td>${correctForSwitching ? "Correct" : "Incorrect"}</td>
      <td>${correctForStaying ? "Correct" : "Incorrect"}</td>
    </tr>`;

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