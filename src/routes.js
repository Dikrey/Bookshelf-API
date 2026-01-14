const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  quickAddHandler,
  deleteBookQuickHandler,
} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.response(`
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookshelf API | Dashboard Pro</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0b0f1a;
            --card-bg: rgba(23, 32, 53, 0.7);
            --accent: #38bdf8;
            --text-main: #f8fafc;
            --text-dim: #D7DBE2;
        }

        body { 
            background-color: var(--bg); 
            color: var(--text-main); 
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-image: radial-gradient(circle at 50% -20%, #1e293b, var(--bg));
            min-height: 100vh;
        }

        .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .glass-card:hover {
            transform: translateY(-10px);
            border-color: var(--accent);
            box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(56, 189, 248, 0.2);
        }

        .hero-section {
            padding: 100px 0 60px;
        }

        .status-pill {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            padding: 8px 20px;
            border-radius: 100px;
            font-size: 0.85rem;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .pulse-dot {
            height: 8px; width: 8px;
            background-color: #10b981;
            border-radius: 50%;
            display: inline-block;
            margin-right: 10px;
            box-shadow: 0 0 10px #10b981;
            animation: pulse-animation 2s infinite;
        }

        @keyframes pulse-animation {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .method-badge {
            font-weight: 800;
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            letter-spacing: 0.5px;
        }

        .bg-get { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .bg-post { background: rgba(59, 130, 246, 0.15); color: #3b82f6; }
        .bg-put { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .bg-delete { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

        .btn-modern {
            background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 10px 24px;
            font-weight: 600;
            transition: all 0.3s;
        }

        .btn-modern:hover {
            box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
            transform: scale(1.05);
            color: white;
        }

        .table-container {
            border-radius: 20px;
            overflow: hidden;
            background: rgba(15, 23, 42, 0.5);
        }

        .table { --bs-table-bg: transparent; color: var(--text-main); margin-bottom: 0; }
        .table thead { background: rgba(255,255,255,0.03); }
        .table td { padding: 20px; border-color: rgba(255,255,255,0.05); vertical-align: middle; }

        code { color: var(--accent); background: rgba(56, 189, 248, 0.1); padding: 4px 8px; border-radius: 6px; }
    </style>
</head>
<body>

    <div class="hero-section text-center animate__animated animate__fadeIn">
        <div class="container">
            <div class="status-pill mb-4">
                <span class="pulse-dot"></span> Server Active
            </div>
            <h1 class="display-3 fw-bold mb-3 animate__animated animate__lightSpeedInLeft">
                Bookshelf <span style="color: var(--accent)">API</span>
            </h1>
            <p class="lead text-secondary mx-auto mb-5" style="max-width: 600px;">
                Dokumentasi sistem backend modern dengan manajemen file terpisah dan fitur cerdas untuk perpustakaan digital Anda.
            </p>
        </div>
    </div>

    <div class="container pb-5 animate__animated animate__fadeInUp animate__delay-1s">
        <div class="row g-4 mb-5">
            <div class="col-lg-4 col-md-6">
                <div class="glass-card p-4 h-100 text-center">
                    <div class="mb-3 text-info"><i class="fas fa-code-branch fa-2x"></i></div>
                    <h6 class="text-secondary text-uppercase mb-2">Engineered By</h6>
                    <h4 class="fw-bold">Muhammad Raihan</h4>
                </div>
            </div>
            <div class="col-lg-4 col-md-6">
                <div class="glass-card p-4 h-100 text-center">
                    <div class="mb-3 text-info"><i class="fas fa-bolt fa-2x"></i></div>
                    <h6 class="text-secondary text-uppercase mb-2">Speed Test</h6>
                    <a href="/quick-add?name=BukuBaru" class="btn btn-modern w-100">
                        <i class="fas fa-magic me-2"></i> Quick Add Book
                    </a>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                <div class="glass-card p-4 h-100 text-center">
                    <div class="mb-3 text-info"><i class="fas fa-database fa-2x"></i></div>
                    <h6 class="text-secondary text-uppercase mb-2">Data Status</h6>
                    <a href="/books" class="btn btn-outline-light w-100" style="border-radius: 12px; font-weight: 600;">
                        <i class="fas fa-table me-2"></i> View Database
                    </a>
                </div>
            </div>
        </div>

        <div class="glass-card p-1 overflow-hidden">
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="ps-4">METHOD</th>
                            <th>ENDPOINT</th>
                            <th>DESCRIPTION</th>
                            <th class="text-center">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-get">GET</span></td>
                            <td><code>/books</code></td>
                            <td class="text-secondary small">Ambil semua buku + Metadata Pintar</td>
                            <td class="text-center"><a href="/books" class="text-info"><i class="fas fa-external-link-alt"></i></a></td>
                        </tr>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-get">GET</span></td>
                            <td><code>/quick-add</code></td>
                            <td class="text-secondary small">Instan Add via Query Parameter</td>
                            <td class="text-center"><a href="/quick-add?name=Demo" class="text-info"><i class="fas fa-plus"></i></a></td>
                        </tr>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-get">GET</span></td>
                            <td><code>/delete-book/{id}</code></td>
                            <td class="text-secondary small">Instan Delete via URL Browser</td>
                            <td class="text-center text-muted small">Need ID</td>
                        </tr>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-post">POST</span></td>
                            <td><code>/books</code></td>
                            <td class="text-secondary small">Tambah buku baru (Body JSON)</td>
                            <td class="text-center text-muted small">Postman</td>
                        </tr>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-put">PUT</span></td>
                            <td><code>/books/{id}</code></td>
                            <td class="text-secondary small">Modifikasi data buku berdasarkan ID</td>
                            <td class="text-center text-muted small">Postman</td>
                        </tr>
                        <tr>
                            <td class="ps-4"><span class="method-badge bg-delete">DELETE</span></td>
                            <td><code>/books/{id}</code></td>
                            <td class="text-secondary small">Hapus data permanen</td>
                            <td class="text-center text-muted small">Postman</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <footer class="mt-5 text-center">
            <p class="text-secondary small">
                © 2026 Bookshelf API v1.2.0 • Secured with Hapi Engine • Developed by 
                <span class="text-white fw-bold">Muhammad Raihan</span>
            </p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
      `).type('text/html');
    },
  },
  { method: "POST", path: "/books", handler: addBookHandler },
  { method: "GET", path: "/quick-add", handler: quickAddHandler },
  { method: "GET", path: "/delete-book/{bookId}", handler: deleteBookQuickHandler },
  { method: "GET", path: "/books", handler: getAllBooksHandler },
  { method: "GET", path: "/books/{bookId}", handler: getBookByIdHandler },
  { method: "PUT", path: "/books/{bookId}", handler: editBookByIdHandler },
  { method: "DELETE", path: "/books/{bookId}", handler: deleteBookByIdHandler },
];

module.exports = routes;