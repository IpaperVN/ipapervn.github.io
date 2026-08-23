# Shinn.Dev — Portfolio & Website

Trang web cá nhân của **Shinn.Dev** (aka **ipaperVN**), nhà phát triển plugin Minecraft cho máy chủ Paper (thuần Kotlin) và chủ sở hữu server Skyblock.

Được xây dựng bằng **HTML, CSS & JavaScript thuần** — không cần build tool, deploy trực tiếp lên GitHub Pages.

## Cấu trúc trang (multi-page)

| Trang | File | Mô tả |
|-------|------|-------|
| Trang chủ | `index.html` | Portfolio: hero, giới thiệu, kỹ năng, dự án nổi bật, liên hệ |
| Kho dự án | `projects.html` | Toàn bộ dự án + bộ lọc theo tag |
| Công cụ | `tools.html` | Công cụ chạy trong trình duyệt (Aikar flags, chuyển màu code) |
| Wiki Kite | `kite/kite-wiki.html` | Wiki tiếng Việt về plugin Kite (copy nguyên bộ, tự đủ) |

## Cấu trúc thư mục

```
├─ index.html
├─ projects.html
├─ tools.html
├─ kite/                          # Wiki Kite (giữ nguyên, tự đủ)
│  ├─ kite-wiki.html
│  ├─ guide.html
│  ├─ style.css
│  └─ script.js
├─ assets/
│  ├─ css/style.css               # Giao diện chung (dark, gradient đen-tím)
│  ├─ js/main.js                  # i18n, menu, animation...
│  ├─ js/projects.js              # Dữ liệu dự án + render + bộ lọc
│  ├─ js/tools.js                 # Logic các công cụ
│  └─ img/background.jpg          # Ảnh nền
├─ .gitignore
└─ README.md
```

## Cách chỉnh sửa

### 1. Đổi ngôn ngữ / nội dung văn bản

Toàn bộ text dịch được nằm trong dictionary `I18N` ở đầu `assets/js/main.js`, gồm hai khối `vi` và `en` dùng **chung một tập key**.

Sửa cả **hai bản** `vi` và `en` cho khớp khi thay đổi nội dung.

### 2. Thêm / sửa dự án

Dữ liệu dự án nằm trong mảng `PROJECTS` ở đầu `assets/js/projects.js`. Mỗi dự án gồm:

```js
{
  title: "Tên dự án",
  desc: { vi: "Mô tả tiếng Việt", en: "English description" },
  tags: ["Paper", "Kotlin"],
  link: "https://github.com/ipapervn/..."   // hoặc "#"
}
```

- Thêm `desc` cho **cả hai** ngôn ngữ.
- Tag mới xuất hiện tự động trong bộ lọc của `projects.html`.
- Trang chủ tự hiển thị 3 dự án đầu tiên trong `PROJECTS`.

### 3. Thêm công cụ

Mỗi công cụ là một `.tool-card` trong `tools.html` + logic tương ứng trong `assets/js/tools.js`. Nhãn dịch được thêm key vào `I18N` (cả `vi` và `en`).

### 4. Cập nhật Wiki Kite

Thư mục `kite/` là một bản copy độc lập từ `C:\Users\Administrator\Desktop\Kotlin Script Kite`. Muốn cập nhật, copy lại 4 file `kite-wiki.html`, `guide.html`, `style.css`, `script.js` từ thư mục nguồn.

### 5. Thông tin liên hệ

Các link liên hệ nằm trong `#contact` của `index.html` — cập nhật link GitHub, Discord và email thực tế (đang là placeholder).

## Deploy lên GitHub Pages

Repo phải nằm trên nhánh `master` để GitHub Pages hoạt động.

```bash
git init
git add .
git commit -m "Khởi tạo website"
git branch -M master
git remote add origin https://github.com/ipapervn/ipapervn.github.io.git
git push -u origin master
```

Sau khi push, truy cập `https://ipapervn.github.io/`.
