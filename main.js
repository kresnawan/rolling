const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname + '/resultFile');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const sec = date.getSeconds();
const minute = date.getMinutes();
const hour = date.getHours();

const fileName = `${sec}${minute}${hour}_${day}${month + 1}${year}`;

const bangkuP = JSON.parse(fs.readFileSync('json/bangku.json')).bangkuP;
const bangkuL = JSON.parse(fs.readFileSync('json/bangku.json')).bangkuL;
const QarrSiswa = JSON.parse(fs.readFileSync('json/siswa.json')).siswa;

let rolled = shuffleArr(QarrSiswa);
let siswa = {
    siswa: []
}
siswa.siswa = rolled;
fs.writeFileSync('json/siswa.json', JSON.stringify(siswa), (err) =>{
    if (err) {
        console.log(err);
    }
})


function shuffleArr(arr) {
    const char1 = arr[arr.length - 1];
    arr.pop();
    arr.unshift(char1);

    return arr;
}

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

let arr = [];

for (var i = 0; i < rolled.length; i++) {
    const chosenBangku = chooseRandom(rolled[i].gender);
    

    const objResult = {
        nama : rolled[i].nama,
        nomorAbsen : rolled[i].nomorAbsen,
        bangku : chosenBangku.kodeBangku
    }

    arr.push(objResult);
}

arr.sort(function(a, b) {
    return a.nomorAbsen - b.nomorAbsen;
});

fs.writeFileSync(dirPath + `/${fileName}.json`, JSON.stringify(arr), function(err) {
    if (err) {
        console.log(err);
    }
});

for (var i = 0; i < arr.length; i++) {
    const str = `nama: ${arr[i].nama}\n no_absen: ${arr[i].nomorAbsen}\n bangku: ${arr[i].bangku}\n\n`

    console.log(str);
}
// console.log(dirPath);
// console.log(bangkuP.length);