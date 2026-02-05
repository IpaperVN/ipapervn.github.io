# Portfolio - iPaperVN

Personal portfolio website with 3D particle effects, live code editor animation, and modern glassmorphism design.

## Quick Start

1. Open `index.html` in a web browser
2. No build tools required - pure HTML/CSS/JS

---

## Customization Guide

### 1. Edit Personal Information

**Location:** `index.html` (Hero Section, lines 48-60)

```html
<h1 class="name glitched-text" data-text="Your Name">Your Name</h1>
<p class="role">Your Role</p>
<p class="tagline">Your tagline goes here.</p>
```

### 2. Edit About Me Section

The About Me section uses a **Live Code Editor** effect. The content is generated dynamically in JavaScript.

**Location:** `script.js` (inside `combinedSequence` array, starting around line 85)

To change displayed info, find and edit these values:

```javascript
// Name
{ target: 'html', text: 'Your Name', type: 'content' },

// Alias
{ target: 'html', text: 'Your Alias', type: 'content' },

// Birth year
{ target: 'html', text: '2000', type: 'content' },

// Role
{ target: 'html', text: 'Developer', type: 'content' },

// Bio paragraph
{ target: 'html', text: 'Your bio description goes here...', type: 'content' },
```

### 3. Add a New Project

**Location:** `index.html` (Projects Section, starting around line 220)

Copy this template and add it inside `<div class="projects-grid">`:

```html
<div class="project-card tilt-card">
    <div class="project-image-container">
        <div class="project-thumb thumb-1"></div>
        <div class="project-overlay">
            <a href="GITHUB_LINK" class="btn-icon">
                <i class="fa-brands fa-github"></i>
            </a>
            <a href="LIVE_DEMO_LINK" class="btn-icon">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
        </div>
    </div>
    <div class="card-content">
        <h3>Project Title</h3>
        <p class="project-desc">Project description here.</p>
        <div class="tags">
            <span>Tag 1</span>
            <span>Tag 2</span>
            <span>Tag 3</span>
        </div>
    </div>
</div>
```

**To add a custom thumbnail:**

1. Add image to project folder
2. Edit `styles.css`, add new class:

```css
.thumb-custom {
    background-image: url('path/to/image.jpg');
}
```

3. Replace `thumb-1` with `thumb-custom` in the HTML

### 4. Edit Social Links

**Location:** `index.html` (Contact Section, around line 290)

```html
<a href="https://facebook.com/YOUR_USERNAME" class="social-card fb">
    <i class="fa-brands fa-facebook-f"></i>
    <span>Facebook</span>
</a>
<a href="https://github.com/YOUR_USERNAME" class="social-card gh">
    <i class="fa-brands fa-github"></i>
    <span>GitHub</span>
</a>
```

### 5. Edit Contact Email

**Location:** `index.html` (Contact Section)

```html
<a href="mailto:your@email.com" class="btn-primary btn-large">
    Say Hello <i class="fa-solid fa-paper-plane"></i>
</a>
```

---

## File Structure

```
portfolio/
├── index.html     # Main HTML structure
├── styles.css     # All styling
├── script.js      # Three.js, GSAP animations, Live Editor
└── README.md      # This file
```

---

## Technologies Used

- HTML5 / CSS3
- JavaScript (Vanilla)
- Three.js (3D Particles)
- GSAP + ScrollTrigger (Animations)
- Font Awesome (Icons)

---

## License

Free to use and modify for personal projects.
