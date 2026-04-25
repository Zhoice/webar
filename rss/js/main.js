// =============================================
// Surgical Care Hospital — main.js
// =============================================

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.getElementById("navbar");

  // --- Navbar scroll effect ---
  window.onscroll = function () {
    if (navbar) {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    // back to top button
    var backBtn = document.getElementById("backTop");
    if (backBtn) {
      if (window.scrollY > 400) {
        backBtn.classList.add("visible");
      } else {
        backBtn.classList.remove("visible");
      }
    }
  };

  // set initial navbar state on page load
  window.onscroll();

  // --- Active nav link (highlight halaman aktif) ---
  var allNavLinks = document.querySelectorAll(".nav-menu a");
  var currentPage = window.location.pathname.split("/").pop();
  allNavLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // --- Scroll reveal animation ---
  var revealEls = document.querySelectorAll(".reveal");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );
  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  // klik di luar modal = tutup
  var modalOverlay = document.getElementById("modalOverlay");
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === this) closeModal();
    });
  }

  // --- Validasi form modal daftar ---
  var modalForm = document.getElementById("modalForm");
  if (modalForm) {
    modalForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var namaVal = document.getElementById("mNama").value.trim();
      var nikVal = document.getElementById("mNik").value.trim();
      var ttlVal = document.getElementById("mTtl").value;
      var telpVal = document.getElementById("mTelp").value.trim();
      var poliVal = document.getElementById("mPoli").value;
      var jadwalVal = document.getElementById("mJadwal").value;

      var ada_error = false;

      if (!namaVal) {
        showErr("mNama", "eMNama");
        ada_error = true;
      } else clearErr("mNama", "eMNama");

      if (nikVal.length !== 16 || isNaN(nikVal)) {
        showErr("mNik", "eMNik");
        ada_error = true;
      } else clearErr("mNik", "eMNik");

      if (!ttlVal) {
        showErr("mTtl", "eMTtl");
        ada_error = true;
      } else clearErr("mTtl", "eMTtl");

      if (!telpVal) {
        showErr("mTelp", "eMTelp");
        ada_error = true;
      } else clearErr("mTelp", "eMTelp");

      if (!poliVal) {
        showErr("mPoli", "eMPoli");
        ada_error = true;
      } else clearErr("mPoli", "eMPoli");

      if (!jadwalVal) {
        showErr("mJadwal", "eMJadwal");
        ada_error = true;
      } else clearErr("mJadwal", "eMJadwal");

      if (ada_error) return;

      var btn = document.getElementById("btnDaftar");
      btn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
      btn.disabled = true;

      setTimeout(function () {
        document.getElementById("modalForm").style.display = "none";
        document.getElementById("modalSuccess").style.display = "block";
        btn.innerHTML =
          '<i class="fa-solid fa-calendar-check"></i> Kirim Pendaftaran';
        btn.disabled = false;
      }, 1800);
    });
  }

  document.querySelectorAll("input, select, textarea").forEach(function (el) {
    el.addEventListener("input", function () {
      this.style.borderColor = "";
      var errId = "e" + this.id.charAt(0).toUpperCase() + this.id.slice(1);
      var errEl = document.getElementById(errId);
      if (errEl) errEl.style.display = "none";
    });
  });

  var backTopBtn = document.getElementById("backTop");
  if (backTopBtn) {
    backTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});

function toggleMobile() {
  var ham = document.getElementById("garis3");
  var mob = document.getElementById("mobMenu");
  var backdrop = document.getElementById("mobBackdrop");
  ham.classList.toggle("open");
  mob.classList.toggle("open");
  if (backdrop) backdrop.classList.toggle("open");
}

function closeMobile() {
  document.getElementById("garis3").classList.remove("open");
  document.getElementById("mobMenu").classList.remove("open");
  var backdrop = document.getElementById("mobBackdrop");
  if (backdrop) backdrop.classList.remove("open");
}

function openModal() {
  var overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  var jadwalInput = document.getElementById("mJadwal");
  if (jadwalInput) {
    var today = new Date().toISOString().split("T")[0];
    jadwalInput.min = today;
  }
}

function closeModal() {
  var overlay = document.getElementById("modalOverlay");
  if (!overlay) return;
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(function () {
    var form = document.getElementById("modalForm");
    var successBox = document.getElementById("modalSuccess");
    if (form) form.style.display = "";
    if (successBox) successBox.style.display = "none";
    if (form) form.reset();
  }, 300);
}

function showErr(inputId, errId) {
  var el = document.getElementById(inputId);
  var errEl = document.getElementById(errId);
  if (el) el.style.borderColor = "#e53e3e";
  if (errEl) errEl.style.display = "block";
}

function clearErr(inputId, errId) {
  var el = document.getElementById(inputId);
  var errEl = document.getElementById(errId);
  if (el) el.style.borderColor = "";
  if (errEl) errEl.style.display = "none";
}
