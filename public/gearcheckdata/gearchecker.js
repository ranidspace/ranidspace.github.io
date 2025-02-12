const BASE_URL = "https://raw.githubusercontent.com/Leanny/splat3/main";
function submit() {
  //clear all data on the page
  document.getElementById("output").innerHTML = "";

  //grab data
  const gearfile = document.getElementById("geardata").files[0];
  //read data
  const reader = new FileReader();
  reader.readAsText(gearfile);

  //do things with the data
  reader.onload = async function () {
    const result = JSON.parse(reader.result);

    //prepping html stuff
    let div = document.createElement("details");
    div.className = "toggle";
    div.id = "missingear";
    div.open = true;
    document.getElementById("output").appendChild(div);

    div = document.createElement("summary");
    div.className = "lbl-toggle";
    div.id = "missingtitle";
    div.textContent = `Missing Gear`;
    document.getElementById("missingear").appendChild(div);

    div = document.createElement("div");
    div.className = "gear-container";
    div.id = "Missing";
    document.getElementById("missingear").appendChild(div);

    const ver = (await jfetch(BASE_URL + "/versions.json")).at(-1);

    console.log(`The current splatoon version is ${ver.split("").join(".")}`);
    //run the missing gear function
    await missinggear(result, "head", "Head", ver);
    await missinggear(result, "clothing", "Clothes", ver);
    await missinggear(result, "shoes", "Shoes", ver);

    document
      .getElementById("output")
      .appendChild(document.createElement("hr"));

    //Loop through 0-5 stars and find the gear for each
    for (let i = 0; i < 6; i++) {
      let div = document.createElement("details");
      div.className = "toggle";
      div.id = `collapsible${i}`;
      div.open = true;
      document.getElementById("output").appendChild(div);

      div = document.createElement("summary");
      div.className = "lbl-toggle";
      div.textContent = i + " Star Gear";
      document.getElementById(`collapsible${i}`).appendChild(div);

      div = document.createElement("div");
      div.className = "gear-container collapsible-content";
      div.id = String(i);
      document.getElementById(`collapsible${i}`).appendChild(div);

      await starcount(result, "headGear", "GearInfoHead", i, ver);
      await starcount(result, "clothingGear", "GearInfoClothes", i, ver);
      await starcount(result, "shoesGear", "GearInfoShoes", i, ver);
      if (i != 5) {
        document
          .getElementById("output")
          .appendChild(document.createElement("hr"));
      }
    }
  };
}

// This function shows the missing gear for
async function missinggear(gearlist, gear, gearInfo, ver) {
  const path = gearlist["gear"]["data"][gear + "Gears"]["nodes"];
  const jsonlistunfiltered = await jfetch(
    BASE_URL + `/data/mush/${ver}/GearInfo${gearInfo}.json`
  );
  const translate = await jfetch(BASE_URL + "/data/language/USen.json");

  let jsonlist = [];
  // TODO: improve performace. apparently for loops are faster than filtering.
  // idk, nothing seems to work
  jsonlist = jsonlistunfiltered.filter(
    (x) =>
      !(
        x.HowToGet === "Impossible" ||
        x.Season > ver.substring(0, 1) ||
        x.__RowId === "Clt_HAP001"
      )
  );
  const diff = jsonlist.filter(
    (entry1) => !path.some((entry2) => entry1.Id === entry2[gear + "GearId"])
  );

  for (i = 0; i < diff.length; i++) {
    let div = document.createElement("div");
    div.className = "item";
    if (
      diff[i].__RowId.substr(4, 3) === "AMB" ||
      (diff[i].__RowId.substr(4, 3) === "MSN" && diff[i].HowToGet === "Other")
    ) {
      div.classList.add("amiiboitem");
    }
    if (diff[i].HowToGet === "Uroko") {
      div.classList.add("urokoitem");
    }
    div.id = String(gear + String(i));
    document.getElementById("Missing").appendChild(div);

    div = document.createElement("img");
    div.src = BASE_URL + `/images/gear/${diff[i]["__RowId"]}.png`;
    div.alt =
      translate["CommonMsg/Gear/GearName_" + gearInfo][
        diff[i]["__RowId"].substr(4)
      ];
    document.getElementById(gear + String(i)).appendChild(div);

    div = document.createElement("span");
    div.className = "gearname";
    div.textContent =
      translate["CommonMsg/Gear/GearName_" + gearInfo][
        diff[i]["__RowId"].substr(4)
      ];
    document.getElementById(gear + i).appendChild(div);
  }
}
//This function shows gear for a certain star count
async function starcount(gearlist, gear, gearInfo, stars, ver) {
  const path = gearlist.gear.data[gear + "s"].nodes;
  const jsonList = await jfetch(
    BASE_URL + `/data/mush/${ver}/${gearInfo}.json`
  );

  for (let i = 0; i < path.length; i++) {
    if (path[i].rarity === stars) {
      let div = document.createElement("div");

      div.className = "item";
      div.id = path[i].name;
      document.getElementById(stars).appendChild(div);

      const gearitem =
        jsonList[jsonList.findIndex((obj) => obj.Id === path[i][gear + "Id"])];

      div = document.createElement("img");
      div.src = BASE_URL + `/images/gear/${gearitem.__RowId}.png`;
      div.alt = path[i].name;
      document.getElementById(path[i].name).appendChild(div);

      div = document.createElement("span");
      div.className = "gearname";
      div.textContent = path[i].name;
      document.getElementById(path[i].name).appendChild(div);
    }
  }
}

async function jfetch(url) {
  const response = await fetch(url);
  return response.json();
}

//all of this is for the darkmode toggle
function changetheme() {
  let currentThemeSetting = document
    .querySelector("html")
    .getAttribute("data-theme");
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);
  document.querySelector("html").setAttribute("data-theme", newTheme);

  currentThemeSetting = newTheme;
}

function loadpage() {
  switch (localStorage.getItem("theme")) {
    case null:
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        changetheme();
      } else {
        break;
      }
      break;
    case "dark":
      changetheme();
      break;
    default:
      break;
  }
}
