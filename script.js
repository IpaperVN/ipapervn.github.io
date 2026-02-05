// --- Three.js Background Animation ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00f2ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += 0.05 * (mouseX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (mouseY - particlesMesh.rotation.x);
        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// --- Live Typing Animation (Interleaved HTML & CSS) ---
const initLiveEditor = () => {
    const htmlCodeEl = document.getElementById('html-code');
    const cssCodeEl = document.getElementById('css-code');
    const previewEl = document.getElementById('live-preview');
    const htmlCursor = document.getElementById('html-cursor');
    const cssCursor = document.getElementById('css-cursor');

    const dynamicStyle = document.createElement('style');
    previewEl.appendChild(dynamicStyle);

    const appendToEditor = (element, char, type) => {
        let colorClass = 'token-content';
        if (type === 'tag') colorClass = 'token-tag';
        if (type === 'attr' || type === 'prop') colorClass = 'token-attr';
        if (type === 'string' || type === 'val') colorClass = 'token-string';
        if (type === 'selector') colorClass = 'token-sel';

        const span = document.createElement('span');
        span.className = colorClass;
        span.textContent = char;
        element.appendChild(span);
        element.scrollTop = element.scrollHeight;
    };

    // Combined Sequence - SHORTER & CLEANER
    const combinedSequence = [
        // Grid Container
        { target: 'html', text: '<div class="grid">', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        // Grid CSS
        { target: 'css', text: '.grid', type: 'selector' },
        { target: 'css', text: '{display:grid;', type: 'content' },
        { target: 'css', text: 'grid-template-columns', type: 'prop' },
        { target: 'css', text: ':1fr 1fr;', type: 'content' },
        { target: 'css', text: 'gap', type: 'prop' },
        { target: 'css', text: ':1rem}', type: 'content' },
        { target: 'css', text: '\n', type: 'content' },

        // Name Box
        { target: 'html', text: '  <div class="box">', type: 'tag' },
        { target: 'html', text: '\n    ', type: 'content' },
        { target: 'html', text: '<span>', type: 'tag' },
        { target: 'html', text: 'Name', type: 'content' },
        { target: 'html', text: '</span>', type: 'tag' },
        { target: 'html', text: '\n    ', type: 'content' },
        { target: 'html', text: '<h3>', type: 'tag' },
        { target: 'html', text: 'Tín', type: 'content' },
        { target: 'html', text: '</h3>', type: 'tag' },
        { target: 'html', text: '\n  ', type: 'content' },
        { target: 'html', text: '</div>', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        // Box CSS
        { target: 'css', text: '.box', type: 'selector' },
        { target: 'css', text: '{background:', type: 'content' },
        { target: 'css', text: 'rgba(255,255,255,0.05)', type: 'val' },
        { target: 'css', text: ';padding:1rem;', type: 'content' },
        { target: 'css', text: 'border-radius', type: 'prop' },
        { target: 'css', text: ':10px;', type: 'content' },
        { target: 'css', text: 'border', type: 'prop' },
        { target: 'css', text: ':1px solid #444}', type: 'content' },
        { target: 'css', text: '\n', type: 'content' },

        // Span & H3 CSS
        { target: 'css', text: 'span', type: 'selector' },
        { target: 'css', text: '{color:#888;font-size:.8rem}', type: 'content' },
        { target: 'css', text: '\n', type: 'content' },
        { target: 'css', text: 'h3', type: 'selector' },
        { target: 'css', text: '{color:', type: 'content' },
        { target: 'css', text: 'cyan', type: 'val' },
        { target: 'css', text: ';font-size:1.3rem}', type: 'content' },
        { target: 'css', text: '\n', type: 'content' },

        // AKA Box
        { target: 'html', text: '  <div class="box">', type: 'tag' },
        { target: 'html', text: '\n    <span>AKA</span>\n    <h3>iPaperVN</h3>\n  ', type: 'content' },
        { target: 'html', text: '</div>', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        // Born Box
        { target: 'html', text: '  <div class="box">', type: 'tag' },
        { target: 'html', text: '\n    <span>Born</span>\n    <h3>2005</h3>\n  ', type: 'content' },
        { target: 'html', text: '</div>', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        // Role Box
        { target: 'html', text: '  <div class="box">', type: 'tag' },
        { target: 'html', text: '\n    <span>Role</span>\n    <h3>Dev</h3>\n  ', type: 'content' },
        { target: 'html', text: '</div>', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        { target: 'html', text: '</div>', type: 'tag' }, // Close Grid
        { target: 'html', text: '\n\n', type: 'content' },

        // Bio - SHORTER
        { target: 'html', text: '<p class="bio">', type: 'tag' },
        { target: 'html', text: 'Passionate developer from Vietnam, crafting digital experiences with clean code and creative solutions.', type: 'content' },
        { target: 'html', text: '</p>', type: 'tag' },
        { target: 'html', text: '\n', type: 'content' },

        // Bio CSS
        { target: 'css', text: '.bio', type: 'selector' },
        { target: 'css', text: '{margin-top:1.2rem;', type: 'content' },
        { target: 'css', text: 'line-height', type: 'prop' },
        { target: 'css', text: ':1.6;', type: 'content' },
        { target: 'css', text: 'color', type: 'prop' },
        { target: 'css', text: ':#aaa}', type: 'content' }
    ];

    let currentHTML = "";
    let currentCSS = "";

    const runTyping = () => {
        let stepIndex = 0;
        let charIndex = 0;

        const typeLoop = () => {
            if (stepIndex >= combinedSequence.length) return;

            const seg = combinedSequence[stepIndex];
            const isHTML = seg.target === 'html';
            const editorEl = isHTML ? htmlCodeEl : cssCodeEl;

            htmlCursor.style.display = isHTML ? 'inline-block' : 'none';
            cssCursor.style.display = !isHTML ? 'inline-block' : 'none';

            if (charIndex < seg.text.length) {
                const char = seg.text[charIndex];
                appendToEditor(editorEl, char, seg.type);

                if (isHTML) {
                    currentHTML += char;
                    previewEl.innerHTML = currentHTML;
                    previewEl.appendChild(dynamicStyle);
                } else {
                    currentCSS += char;
                    dynamicStyle.textContent = currentCSS;
                }

                charIndex++;
                setTimeout(typeLoop, 12);
            } else {
                stepIndex++;
                charIndex = 0;
                setTimeout(typeLoop, 80);
            }
        };
        typeLoop();
    };

    ScrollTrigger.create({
        trigger: '#about',
        start: 'top 70%',
        once: true,
        onEnter: () => setTimeout(runTyping, 500)
    });
};

// --- GSAP ---
const initGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();
    tl.from('.logo', { y: -20, opacity: 0, duration: 0.8 })
        .from('.nav-item', { y: -20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.5")
        .from('.hero-content', { y: 30, opacity: 0, duration: 0.8 }, "-=0.3");

    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: { trigger: section, start: "top 80%" },
            y: 50, opacity: 0, duration: 1, ease: "power3.out"
        });
    });

    gsap.utils.toArray('.skill-item').forEach(skill => {
        const bar = skill.querySelector('.progress-bar-fill');
        const width = bar.style.width;
        gsap.set(bar, { width: 0 });
        gsap.to(bar, {
            scrollTrigger: { trigger: skill, start: "top 90%" },
            width: width, duration: 1.5, ease: "power4.out"
        });
    });

    gsap.fromTo('.project-card',
        { y: 50, opacity: 0 },
        {
            scrollTrigger: { trigger: '.projects-grid', start: "top 85%" },
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2
        }
    );
};

document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGSAP();
    initLiveEditor();
});
