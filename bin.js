document.addEventListener('DOMContentLoaded', outputBins);

function outputBins() {
    const binTemplate = document.getElementById("bin-template").content;
    const binList = document.getElementById("bin-list");
    const fragment = document.createDocumentFragment();

    [
        "Recycling",
        "Food",
        getWeekNo() % 2 == 0 ? "Garden" : "General Waste"
    ]
    .map(binName => {
            const binElement = binTemplate.cloneNode(true);
            const item = binElement.querySelector("#bin-item");
            item.append(binName);
            return binElement;
        })
        .forEach(item => fragment.appendChild(item));

    binList.appendChild(fragment);
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