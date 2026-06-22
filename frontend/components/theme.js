const themes={'dark-arena':'#e10600','champion-gold':'#d4af37','red-bloodline':'#ff1744'};
export function applyTheme(t=localStorage.getItem('ufc-theme')||'dark-arena'){document.documentElement.dataset.theme=t;document.documentElement.style.setProperty('--accent',themes[t]||'#e10600');localStorage.setItem('ufc-theme',t)}
export const themeSelectMarkup=()=>`<select id="themeSelect" class="arena-input compact"><option value="dark-arena">Dark Arena</option><option value="champion-gold">Champion Gold</option><option value="red-bloodline">Red Bloodline</option></select>`;
export function wireThemeSelect(){const s=document.querySelector('#themeSelect');if(!s)return;s.value=localStorage.getItem('ufc-theme')||'dark-arena';s.onchange=()=>applyTheme(s.value)}
applyTheme();
