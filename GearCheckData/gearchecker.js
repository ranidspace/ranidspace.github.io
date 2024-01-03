function submit(){
  //clear all data on the page
  document.getElementById("output").innerHTML = "";
  const noamiibo = document.getElementById("amiibo").checked;

  //grab data
  const gearfile = document.getElementById('geardata').files[0];
  //read data
  const reader = new FileReader();
  reader.readAsText(gearfile);

  //do things with the data
  reader.onload = async function() {
    const result = JSON.parse(reader.result);

    //prepping html stuff
    div = document.createElement("h1");
      div.textContent = (`Missing Gear`);
      document.getElementById("output").appendChild(div);

    div = document.createElement("div");
      div.className = "gear-container";
      div.id = "Missing";
      document.getElementById("output").appendChild(div);
    
    //run the missing gear function
    await missinggear(result, 'head', "Head", noamiibo)
    await missinggear(result, 'clothing', "Clothes", noamiibo)
    await missinggear(result, 'shoes', "Shoes", noamiibo)

    //Loop through 0-5 stars and find the gear for each
    for (let i = 0; i < 6; i++){
      div = document.createElement("h1");
      div.textContent = (i+` Star Gear`);
      document.getElementById("output").appendChild(div);
      
      div = document.createElement("div");
      div.className = "gear-container";
      div.id = String(i);
      document.getElementById("output").appendChild(div);

      await starcount(result, "headGear", "GearInfoHead", i);
      await starcount(result, "clothingGear", "GearInfoClothes", i);
      await starcount(result, "shoesGear", "GearInfoShoes", i);
    }
  }

}

//this function shows the missing gear for 
async function missinggear(gearlist, Gear, GearInfo, noamiibo) {
  const path = gearlist['gear']['data'][Gear+"Gears"]['nodes'];
  const jsonlistunfiltered = await jfetch(`https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/GearInfo${GearInfo}.json`);
  const translate = await jfetch(`https://raw.githubusercontent.com/Leanny/splat3/main/data/language/USen.json`);

  let jsonlist = [];
  //TODO: improve performace. apparently for loops are faster than filtering. idk, nothing seems to work
  if (noamiibo === true) {
    jsonlist = jsonlistunfiltered.filter(x => 
      !(x.HowToGet === "Impossible"||
      x.__RowId.substr(4,3) === "AMB" ||
      x.__RowId === "Shs_SHT012" ||
      x.__RowId === "Shs_SHI011"||
      x.__RowId === "Clt_HAP001"||
      x.__RowId === "Clt_TES030" ||
      x.__RowId === "Clt_TNK003"));
    }
  else {
    jsonlist = jsonlistunfiltered.filter(x => 
      !((x.HowToGet === "Impossible" ||
      x.__RowId === "Shs_SHT012" || 
      x.__RowId === "Shs_SHI011"|| 
      x.__RowId === "Clt_HAP001"|| 
      x.__RowId === "Clt_TES030" || 
      x.__RowId === "Clt_TNK003"
      )));
  };

  const difference = jsonlist.filter(entry1 => !path.some(entry2 => entry1.Id === entry2[Gear+"GearId"]));

  for (i=0; i < difference.length; i++) {
    div = document.createElement("div");
    div.className = "item";
    div.id = String(Gear+String(i))
    document.getElementById("Missing").appendChild(div);
    
    div = document.createElement("img");
    div.src = `https://raw.githubusercontent.com/Leanny/splat3/main/images/gear/${difference[i]["__RowId"]}.png`;
    div.alt = translate["CommonMsg/Gear/GearName_"+GearInfo][difference[i]["__RowId"].substr(4,)];
    document.getElementById(Gear+String(i)).appendChild(div);

    div = document.createElement("span");
      div.className = "gearname";
      div.textContent = (translate["CommonMsg/Gear/GearName_"+GearInfo][difference[i]["__RowId"].substr(4,)]);
      document.getElementById(Gear+i).appendChild(div);
  }
  
}
//This function shows gear for a certain star count
async function starcount(gearlist, Gear, GearInfo, Stars) {
  const path = gearlist.gear.data[Gear+"s"].nodes;
  const jsonlist = await jfetch(`https://raw.githubusercontent.com/Leanny/splat3/main/data/mush/600/${GearInfo}.json`);

  for (let i = 0; i < path.length; i++){
    if (path[i].rarity === Stars) {
      div = document.createElement("div");
      div.className = "item";
      div.id = path[i].name;
      document.getElementById(Stars).appendChild(div);

      const gearitem = jsonlist[jsonlist.findIndex(obj => obj.Id === path[i][Gear+"Id"])]

      div = document.createElement("img");
      div.src = `https://raw.githubusercontent.com/Leanny/splat3/main/images/gear/${gearitem.__RowId}.png`;
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
  const currentThemeSetting = document.querySelector("html").getAttribute("data-theme");
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  
  localStorage.setItem("theme", newTheme);
  document.querySelector("html").setAttribute("data-theme", newTheme);

  currentThemeSetting = newTheme;
}; 

function loadpage() {
  switch (localStorage.getItem("theme")) {
    case null:
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        changetheme()
      }
      else {
        break;
      };
      break;
    case "dark":
      changetheme();
      break;
    default:
      break;
  }
}