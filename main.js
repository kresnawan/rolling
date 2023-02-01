const fs = require("fs");

const bangkuP = JSON.parse(fs.readFileSync('json/bangku.json')).bangkuP;
const bangkuL = JSON.parse(fs.readFileSync('json/bangku.json')).bangkuL;
const arrSiswa = JSON.parse(fs.readFileSync('json/siswa.json')).siswa;

function chooseRandom(gender) {
    let chosen;
    if (gender === "L") {
        const randomNumber = Math.floor(Math.random() * bangkuL.length);
        chosen = bangkuL[randomNumber];

        bangkuL.splice(bangkuL.indexOf(chosen), 1);
    } else if (gender === "P") {
        const randomNumber = Math.floor(Math.random() * bangkuP.length);
        chosen = bangkuP[randomNumber];

        bangkuP.splice(bangkuP.indexOf(chosen), 1);
    }
    
    return chosen;
}

for (var i = 0; i < arrSiswa.length; i++) {
    const chosenBangku = chooseRandom(arrSiswa[i].gender);
    const str = `nama: ${arrSiswa[i].nama}\n no_absen: ${arrSiswa[i].nomorAbsen}\n bangku: ${chosenBangku.kodeBangku}\n\n`

    console.log(str);
}

// console.log(bangkuP.length);