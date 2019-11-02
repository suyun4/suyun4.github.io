(function() {
  const simulationFormElement = document.querySelector("#simulation-form");
  const numberSimulations = document.querySelector("#num-of-simulations");
  const numberDoors = document.querySelector("num-of-doors");
  const showIntro = true;

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
    let correctForSwitching = 0;
    let correctForStaying = 0;
    let switched = false;
    let stayed = false;
    updateCounter(0);

    for (let i = 1; i <= sims; i++) {
      let correctDoor = Math.floor(Math.random() * doors) + 1;
      let chosenDoor = Math.floor(Math.random() * doors) + 1;
      let shownDoor = chosenDoor;
      while (shownDoor == chosenDoor || shownDoor == correctDoor) {
        shownDoor = Math.floor(Math.random() * doors);
      }
      // For Staying
      if (shownDoor == correctDoor) {
        correctForStaying++;
        stayed = true;
      }
      // For Switching
      let switchDoor = chosenDoor;
      while (switchDoor == chosenDoor || switchDoor == shownDoor) {
        switchDoor = Math.floor(Math.random() * doors) + 1;
      }
      if (switchDoor == correctDoor) {
        correctforSwitching++;
        switched = true;
      }
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
  const renderResults = () => {
    const resultEl = document.querySelector("#results");
    let newHTML = "";
    todos.forEach((result, i) => (newHTML += makeResultHTML(result, i)));
    resultEl.innerHTML = newHTML;
  };

  const makeResultHTML = () =>
    `<div class="todo-item" id="todo-item-${i}" style="border:thin dotted ${deadlineColor}">` +
    `<div><input type="checkbox" ${
      isChecked ? "checked" : ""
    } data-todo-item-checkbox-index="${i}" />${message}</div>` +
    `<div class="btn btn-info" data-todo-item-update-index="${i}">update</div>` +
    `<div class="btn btn-danger" data-todo-item-delete-index="${i}">delete</div>` +
    `</div>`;

  //    -----Event Listeners------
  window.addEventListener("load", () => {
    if (showIntro) renderIntro();
    console.log("loaded");
  });

  simulationFormElement.addEventListener("submit", e => {
    e.preventDefault();
    totalResults = runSimulation(numberSimulations, numberDoors);
    //renderResults(totalResults);
    console.log(totalResults);
  });
});
