window.onload = outputBins
let id = 1;

function outputBins() {
  const binTemplate = document.getElementById("bin-template");
  const binList = document.getElementById("bin-list");

  const weekNo = getWeekNo();
  addBin(binTemplate, binList, "Recycling");
  addBin(binTemplate, binList, "Food");
  if (weekNo % 2 == 0) {
    addBin(binTemplate, binList, "Garden");
  } else {
    addBin(binTemplate, binList, "General Waste");
  }
}

function addBin(binTemplate, binList, binName) {
  const binElement = document.importNode(binTemplate.content, true);
  const label = binElement.querySelector("li");
  label.htmlFor = id;
  label.append(binName);
  binList.appendChild(binElement);
  id++;
}

function getWeekNo() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));

  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4);

  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}
