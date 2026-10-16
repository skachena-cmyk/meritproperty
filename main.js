// ======================================================
//  แก้ข้อมูลติดต่อที่นี่ที่เดียว แล้วจะแสดงทุกหน้า
// ======================================================
const CONFIG = {
  phone: "0892029776",                  // ← เช่น "081-234-5678"
  email: "kachen_8328@hotmail.com",       // ← อีเมลจริง (ใช้อีเมลเดียวทั้งเว็บ)
  line:  "https://lin.ee/oB7vuTF",       // ลิงก์ LINE (จากเว็บเดิม)
  formEndpoint: "" // สมัครฟรีที่ formspree.io
};

// ใส่ข้อมูลติดต่อทุกจุด
const telLink = "tel:" + CONFIG.phone.replace(/[^0-9+]/g, "");
document.querySelectorAll(".js-phone").forEach(el => el.textContent = CONFIG.phone);
document.querySelectorAll(".js-email").forEach(el => el.textContent = CONFIG.email);
document.querySelectorAll(".js-tel").forEach(el => el.href = telLink);
document.querySelectorAll(".js-mail").forEach(el => el.href = "mailto:" + CONFIG.email);
document.querySelectorAll(".js-line").forEach(el => el.href = CONFIG.line);

// ปีปัจจุบัน
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ไฮไลต์เมนูของหน้าปัจจุบัน
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach(a => {
  if (a.getAttribute("href") === currentPage) a.classList.add("active");
});

// เมนูมือถือ
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
if (navLinks && menuToggle) {
  menuToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
}

// FAQ: เปิดได้ทีละข้อ
const faqItems = document.querySelectorAll(".faq-list details");
faqItems.forEach(d => d.addEventListener("toggle", () => {
  if (d.open) faqItems.forEach(o => { if (o !== d) o.open = false; });
}));

// ตัวกรองผลงาน (หน้า portfolio)
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => btn.addEventListener("click", () => {
  filterBtns.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const cat = btn.dataset.filter;
  document.querySelectorAll(".work").forEach(w => {
    w.classList.toggle("hide", cat !== "all" && w.dataset.cat !== cat);
  });
}));

// ส่งฟอร์ม (หน้า contact)
const form = document.getElementById("contactForm");
if (form) {
  const msg = document.getElementById("formMsg");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button");
    msg.className = "form-msg";
    btn.disabled = true; btn.textContent = "กำลังส่ง...";
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" }
      });
      if (!res.ok) throw new Error();
      msg.textContent = "ส่งข้อความเรียบร้อย ขอบคุณครับ ทีมงานจะติดต่อกลับภายในวันทำการ";
      msg.classList.add("success");
      form.reset();
    } catch {
      msg.textContent = "ส่งไม่สำเร็จ กรุณาลองใหม่ หรือติดต่อทางไลน์ / โทรศัพท์";
      msg.classList.add("error");
    } finally {
      btn.disabled = false; btn.textContent = "ส่งข้อความ";
    }
  });
}