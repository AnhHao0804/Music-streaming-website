const song = document.getElementById("song");
const playBtn = document.querySelector(".play-pasue");
const nextBtn = document.querySelector(".btn-forward");
const prevBtn = document.querySelector(".btn-prev");
const nameSong = document.querySelector(".song-name");
const artistSong = document.querySelector(".artist");
const imgSong = document.querySelector(".img-img");
const durationSong = document.querySelector(".duration");
const remainingSong = document.querySelector(".remaining");
const rangeSong = document.querySelector(".range-time");
const btnSearch = document.querySelector(".tim");


let songPlaying = true;
let indexSong = 0;
const songs = [
    {
        name: "Ly hôn ở cộng hòa Gaha",
        singer: "Dương Khôn x Trần Bích Thần",
        path: "./song/1.mp3",
        image: "./img/1.jpg",
        id: "1"
    },
    {
        name: "Tay trái chỉ trăng",
        singer: "Tát Đỉnh Đỉnh",
        path: "./song/2.mp3",
        image: "./img/2.jpg",
        id: "2"
    },
    {
        name: "Anh ta không hiểu",
        singer: "Trương Kiệt",
        path: "./song/3.mp3",
        image: "./img/3.jpg",
        id: "3"
    },
    {
        name: "Trang giấy cuối cùng",
        singer: "Vương Hách Dã x Diêu Hiểu Đường",
        path: "./song/4.mp3",
        image: "./img/4.jpg",
        id: "4"
    },
    {
        name: "Gặp nhưng không gặp",
        singer: "Vương Hách Dã x Trần Bích Thần",
        path: "./song/5.mp3",
        image: "./img/5.jpg",
        id: "5"
    },
    {
        name: "Ai muốn làm bạn với anh",
        singer: "Bạch Lộc x Chu Dực Nhiên",
        path: "./song/6.mp3",
        image: "./img/6.jpg",
        id: "6"
    },
    {
        name: "Vận mệnh",
        singer: "Trương Bích Thần x Uông Tố Lang",
        path: "./song/7.mp3",
        image: "./img/7.jpg",
        id: "7"
    },
    {
        name: "Làm sao thế",
        singer: "Uông Tố Lang x Vu Văn Văn",
        path: "./song/8.mp3",
        image: "./img/8.jpg",
        id: "8"
    },
    {
        name: "Nếu quên đi tình yêu",
        singer: "Uông Tố Lang x Thiệu Y Thần",
        path: "./song/9.mp3",
        image: "./img/9.jpg",
        id: "9"
    },
    {
        name: "Ngủ ngon",
        singer: "Uông Tố Lang",
        path: "./song/10.mp3",
        image: "./img/10.jpg",
        id: "10"
    },]
song.setAttribute("src", `${songs[indexSong].path}`);
imgSong.setAttribute("src", `${songs[indexSong].image}`);
nextBtn.addEventListener("click", function () {
    changeSongs(1)
});
prevBtn.addEventListener("click", function () {
    changeSongs(-1)
});



btnSearch.addEventListener("click", function () {
    const searchValue = document.getElementById("input-search").value.toLowerCase();
    findSongByName(searchValue);
});

function findSongByName(searchValue) {
    let result = songs.filter(song =>  song.name.toLowerCase().includes(searchValue));
    displayList(result)
}


function changeSongs(dir) {
    if (dir === 1) {
        indexSong++;
        if (indexSong >= songs.length) {
            indexSong = 0;
        }
        playnPause();
    } else if (dir === -1) {
        indexSong--;
        if (indexSong < 0) {
            indexSong = songs.length - 1;
        }
        playnPause();
    }
    song.setAttribute("src", `${songs[indexSong].path}`);
    imgSong.setAttribute("src", `${songs[indexSong].image}`);
    playnPause();
}

playBtn.addEventListener("click", playnPause);

function playnPause() {
    if (songPlaying) {
        song.play();
        nameSong.innerHTML = songs[indexSong].name;
        artistSong.innerHTML = songs[indexSong].singer;
        playBtn.innerHTML = '<ion-icon name="pause"></ion-icon>';
        songPlaying = false;
    } else {
        song.pause();
        nameSong.innerHTML = songs[indexSong].name;
        artistSong.innerHTML = songs[indexSong].singer;
        playBtn.innerHTML = '<ion-icon name="play"></ion-icon>';
        songPlaying = true;
    }
}

function displayTimer() {
    const {duration, currentTime} = song;
    rangeSong.max = duration;
    rangeSong.value = currentTime;
    remainingSong.textContent = formatTimer(currentTime);
    if (!duration) {
        durationSong.textContent = "00:00";
    } else {
        durationSong.textContent = formatTimer(duration);
    }

}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

displayTimer();
setInterval(displayTimer, 500);

rangeSong.addEventListener("change", rangeChange)

function rangeChange(e) {
    song.currentTime = rangeSong.value;
}

song.addEventListener("ended", endedSong);

function endedSong() {
    changeSongs(1);
}


function displayList(list) {
    const musicList = document.getElementById('music-list');
    musicList.innerHTML=""
    const selectedMusic = document.getElementById('select-mysong');
    list.forEach((item) => {
        const li = document.createElement("li");
        const image = document.createElement("img");
        const icon = document.createElement("i");
        image.setAttribute("src", `${item.image}`);
        icon.setAttribute("class", "fas fa-plus");
        li.textContent = `${item.name}`;
        li.prepend(image)
        li.appendChild(icon)
        li.addEventListener("click", (icon) => {
            const selectedLi = li.cloneNode(true);
            selectedMusic.appendChild(selectedLi);
        })

        musicList.appendChild(li);
    });
}

displayList(songs);
