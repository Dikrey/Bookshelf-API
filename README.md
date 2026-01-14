# Bookshelf API - Dashboard Edition

![Status Online](https://img.shields.io/badge/Server-Online-10b981?style=for-the-badge&logo=statuspal)
![Node Version](https://img.shields.io/badge/Node.js-v22.14.0-339933?style=for-the-badge&logo=nodedotjs)
![Hapi Framework](https://img.shields.io/badge/Hapi.js-v21.x-ff512f?style=for-the-badge&logo=hapi)
![Author](https://img.shields.io/badge/Developed%20By-Muhammad%20Raihan-38bdf8?style=for-the-badge)

Bookshelf API Pro bukan sekadar backend biasa. Ini adalah sistem manajemen perpustakaan digital yang dirancang dengan arsitektur modular, fitur kalkulasi otomatis, dan **Dashboard Modern** terintegrasi.



---

## 🚀 Fitur Unggulan (Premium Features)

Aplikasi ini telah ditingkatkan dengan berbagai logika cerdas di luar standar kriteria:

* **💎 Ultra-Modern Dashboard**: Tampilan visual di root `/` dengan Glassmorphism UI.
* **⚡ Quick Add & Delete**: Kelola data langsung melalui URL browser tanpa aplikasi tambahan.
* **📊 Smart Metadata**: Kalkulasi otomatis persentase progres (`75%`), sisa halaman, dan kategori ketebalan buku.
* **🎲 Book of The Day**: Fitur rekomendasi acak setiap kali API diakses.
* **📂 Modular File Management**: Struktur file yang rapi (`server`, `routes`, `handler`, `data`) untuk skalabilitas tinggi.
* **📡 Advanced Query Search**: Filter berdasarkan nama, status membaca (`reading`), dan status selesai (`finished`).

---

## 🛠️ Struktur Proyek

```text
.
├── src/
│   ├── server.js   # Konfigurasi & Inisialisasi Server
│   ├── routes.js   # Definisi rute & Dashboard UI
│   ├── handler.js  # Logika Bisnis & Fitur Cerdas
│   └── books.js    # Data Layer (In-memory Database)
├── package.json    # Dependencies & Scripts
└── .gitignore      # Auto-exclude node_modules

```

---

## 📥 Instalasi & Menjalankan

1. **Clone Repository**
```bash
git clone https://github.com/Dikrey/Bookshelf-API.git

```


2. **Instal Dependencies**
```bash
npm install

```


3. **Jalankan Server**
```bash
npm run start

```


Server akan berjalan di `http://localhost:9000`

---

## 📡 API Endpoints

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| `GET` | `/` | **Dashboard Visual Pro** |
| `GET` | `/books` | List Buku + Smart Metadata |
| `POST` | `/books` | Tambah Buku (JSON) |
| `GET` | `/quick-add` | Magic Link: Tambah via URL |
| `GET` | `/delete-book/{id}` | Magic Link: Hapus via URL |
| `PUT` | `/books/{id}` | Update Data Buku |
| `DELETE` | `/books/{id}` | Hapus Buku (Permanent) |

---

## 👤 Author

**Muhammad Raihan**

* **Project**: Submission Bookshelf API - Dicoding
* **Stack**: Hapi.js, Node.js, Nanoid

---


## ⚠️ Peringatan & Lisensi (Disclaimer)

Projek ini dibuat untuk tujuan **pembelajaran**. Dengan menggunakan atau mengunduh kode ini, anda setuju untuk mematuhi syarat berikut:

1. **Hormati Karya Asli**: Dilarang keras mengubah atau menghapus nama pembuat asli (**Muhammad Raihan**) dari projek ini, baik di dalam kode sumber maupun di paparan Dashboard.
2. **Kreativiti Sendiri**: Anda sangat digalakkan untuk berkarya mengikut idea anda sendiri. Gunakan kode ini sebagai rujukan atau asas untuk membina sesuatu yang lebih hebat.
3. **Syarat Recode**: Anda dibenarkan untuk *recode* atau mengubah kode ini, tetapi **dengan syarat tetap mencantumkan nama pembuat asli** sebagai kredit atau rujukan asal.

> "Berkaryalah dengan etika. Ilmu akan lebih berkah apabila kita menghargai hasil usaha orang lain."
> Visualcodepo
---

<p align="center">Made with ❤️ for Better Backend Developer</p>



```
