document.getElementById("gacha-button").onclick = buttonClick;

const units = {
    "VS": ["miku", "rin", "len", "luka", "meiko", "kaito"],
    "LN": ["ichika", "saki", "honami", "shiho"],
    "MMJ": ["minori", "haruka", "airi", "shizuku"],
    "VBS": ["kohane", "an", "akito", "toya"],
    "WXS": ["tsukasa", "emu", "nene", "rui"],
    "N25": ["kanade", "mafuyu", "ena", "mizuki"]
};

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function buttonClick() {
    const unit = getRandomItem(Object.keys(units));
    const character = getRandomItem(units[unit]);

    const rarityRoll = Math.random();
    let rarity = "";
    let imageCount = 1; 

    if (rarityRoll < 0.02) { // 2% chance
        rarity = "4";
        imageCount = 3; 
    } else if (rarityRoll < 0.20) { // 18% chance
        rarity = "3";
        imageCount = 3; 
    } else { // 80% chance
        rarity = "2";
    }

    const imageNumber = rarity === "2" ? "1" : Math.floor(Math.random() * 3) + 1;
    
    const basePath = "https://laoloser.github.io/Gacha-Sim/";
    const imagePath = `${basePath}images/${unit}/${character}/${rarity}/${character}${rarity}${imageNumber}.png`;

    let gemsSpent = localStorage.getItem("gems");
    gemsSpent = gemsSpent ? parseInt(gemsSpent) : 0; 
    gemsSpent += 300; 
    localStorage.setItem("gems", gemsSpent); 

    getGemsSpent(); 

    let result = `You pulled <strong>${rarity}★ ${character}</strong>!`;
    document.getElementById("popup-result").innerHTML = result;
    document.getElementById("popup-image").src = imagePath;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function getGemsSpent() {
    let gems = localStorage.getItem("gems");
    gems = gems ? parseInt(gems) : 0;

    let result = `You have spent ${gems} gems.`;
    document.getElementById("gems-spent").innerHTML = result;
}

getGemsSpent();
