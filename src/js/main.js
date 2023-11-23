// Seleksi elemen HTML
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const start = document.querySelector(".start");
const gameOver = document.querySelector(".game-over");

// Pembuatan objek audio untuk pemutaran suara
audioStart = new Audio("./src/audio/audio_theme.mp3");
audioGameOver = new Audio("./src/audio/audio_gameover.mp3");

let score = 0; // Variabel untuk menyimpan skor
let jumpCount = 0; // Variabel untuk menyimpan jumlah lompatan

const updateScore = () => {
  // Update nilai skor pada elemen HTML
  document.getElementById("scoreValue").innerText = score;
};

const updateJumpCount = () => {
  // Update jumlah lompatan pada elemen HTML
  document.getElementById("jumpCount").innerText = jumpCount;
};

// Fungsi untuk memulai permainan
const startGame = () => {
  pipe.classList.add("pipe-animation"); // Menambahkan animasi pipa
  start.style.display = "none"; // Menyembunyikan layar awal
  score += 10;
  updateScore();

  // Pemutaran suara mulai
  audioStart.play();
};

// Fungsi untuk mereset permainan setelah game over
const restartGame = () => {
  gameOver.style.display = "none"; // Menyembunyikan layar game over
  pipe.style.left = ""; // Mengatur ulang posisi pipa
  pipe.style.right = "0";
  mario.src = "./src/img/mario.gif"; // Mengatur ulang gambar mario
  mario.style.width = "150px";
  mario.style.bottom = "0";

  start.style.display = "none"; // Menyembunyikan layar awal

  // Menghentikan dan mengatur ulang suara game over dan suara mulai
  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;
};

// Fungsi untuk lompatan mario
const jump = () => {
  mario.classList.add("jump");
  jumpCount++; // Tambahkan jumlah lompatan
  updateJumpCount();

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 800);
};

// Fungsi untuk loop permainan
const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window.getComputedStyle(mario).bottom.replace("px", " ");

    // Deteksi tabrakan antara pipa dan mario
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove(".pipe-animation"); // Menghapus animasi pipa
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove(".jump");
      mario.style.bottom = `${marioPosition}px`;

      // Mengganti gambar mario dengan gambar game over
      mario.src = "./src/img/game-over.png";
      mario.style.width = "80px";
      mario.style.marginLeft = "50px";

      // Menghentikan suara mulai
      function stopAudioStart() {
        audioStart.pause();
      }
      stopAudioStart();

      // Memainkan suara game over
      audioGameOver.play();

      // Menghentikan suara game over setelah beberapa detik
      function stopAudio() {
        audioGameOver.pause();
      }
      setTimeout(stopAudio, 7000);

      gameOver.style.display = "flex"; // Menampilkan layar game over

      clearInterval(loop); // Menghentikan loop permainan
    }
  }, 10);
};

loop();

// Event listener untuk lompatan saat spasi ditekan
document.addEventListener("keypress", (e) => {
  const tecla = e.key;
  if (tecla === " ") {
    jump();
  }
});

// Event listener untuk lompatan saat layar disentuh
document.addEventListener("touchstart", (e) => {
  if (e.touches.length) {
    jump();
  }
});

// Event listener untuk memulai permainan saat Enter ditekan
document.addEventListener("keypress", (e) => {
  const tecla = e.key;
  if (tecla === "Enter") {
    startGame();
  }
});
