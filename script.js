/* ===============================
      KONFIGURASI API
================================ */
const API_URL =
  "https://script.google.com/macros/s/AKfycbwpvwvnlDz8YGmQ771MBl757pZ_r-vNfotAByOcCOo556N8FSafpgLuL4Paa4314bM/exec";

/* ===============================
      NAVIGASI HALAMAN
================================ */
/* ===============================
      NAVIGASI HALAMAN
================================ */
document.querySelectorAll("nav a").forEach((menu) => {
  menu.addEventListener("click", function (e) {
    e.preventDefault();

    // Hapus status aktif di semua tombol
    document
      .querySelectorAll("nav a")
      .forEach((m) => m.classList.remove("active"));

    // Tambah aktif ke menu yang diklik
    this.classList.add("active");

    const page = this.dataset.page;

    // Sembunyikan semua section
    document.querySelectorAll("section").forEach((sec) => {
      sec.classList.remove("active");
    });

    // Tampilkan section yg dipilih
    document.getElementById(page).classList.add("active");

    // Load data sesuai halaman
    if (page === "koleksi") loadBuku();
    if (page === "pinjam") loadPinjam();
    if (page === "kembali") loadKembali();
  });
});

/* ===============================
      LOAD TABEL KOLEKSI BUKU
================================ */
async function loadBuku() {
  const res = await fetch(`${API_URL}?sheet=buku`);
  const data = await res.json();

  const tbody = document.querySelector("#table-buku tbody");
  tbody.innerHTML = "";

  data.forEach((item, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nomor_buku}</td>
        <td>${item.nomor_panggil}</td>
        <td>${item.isbn}</td>
        <td>${item.kategori}</td>
        <td>${item.judul}</td>
        <td>${item.subyek}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

/* ===============================
      LOAD TABEL PEMINJAMAN
================================ */
async function loadPinjam() {
  const res = await fetch(`${API_URL}?sheet=pinjam`);
  const data = await res.json();

  const tbody = document.querySelector("#table-pinjam tbody");
  tbody.innerHTML = "";

  data.forEach((item, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td>${item.judul}</td>
        <td>${item.tanggal}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

/* ===============================
      LOAD TABEL PENGEMBALIAN
================================ */
async function loadKembali() {
  const res = await fetch(`${API_URL}?sheet=kembali`);
  const data = await res.json();

  const tbody = document.querySelector("#table-kembali tbody");
  tbody.innerHTML = "";

  data.forEach((item, i) => {
    const row = `
      <tr>
        <td>${i + 1}</td>
        <td>${item.nama}</td>
        <td>${item.judul}</td>
        <td>${item.tanggal}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

/* ===============================
      SUBMIT PEMINJAMAN
================================ */
document.querySelector("#formPinjam")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.querySelector("#pinjamNama").value;
  const judul = document.querySelector("#pinjamJudul").value;
  const tanggal = document.querySelector("#pinjamTanggal").value;

  if (!nama || !judul || !tanggal) return alert("Semua kolom wajib diisi!");

  const formData = new FormData();
  formData.append("sheet", "pinjam");
  formData.append("action", "add");
  formData.append("nama", nama);
  formData.append("judul", judul);
  formData.append("tanggal", tanggal);

  await fetch(API_URL, { method: "POST", body: formData });

  alert("Peminjaman berhasil disimpan!");

  e.target.reset();
  loadPinjam();
});

/* ===============================
      SUBMIT PENGEMBALIAN
================================ */
document
  .querySelector("#formKembali")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nama = document.querySelector("#kembaliNama").value;
    const judul = document.querySelector("#kembaliJudul").value;
    const tanggal = document.querySelector("#kembaliTanggal").value;

    if (!nama || !judul || !tanggal) return alert("Semua kolom wajib diisi!");

    const formData = new FormData();
    formData.append("sheet", "kembali");
    formData.append("action", "add");
    formData.append("nama", nama);
    formData.append("judul", judul);
    formData.append("tanggal", tanggal);

    await fetch(API_URL, { method: "POST", body: formData });

    alert("Pengembalian berhasil disimpan!");

    e.target.reset();
    loadKembali();
  });

/* ===============================
      AUTO LOAD BERANDA PERTAMA KALI
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadBuku(); // supaya data langsung tampil ketika halaman dibuka
});
