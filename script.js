const startDate = new Date('2026-06-30T00:00:00');

  function updateCounter(){
    const now = new Date();
    const diffMs = now - startDate;
    const totalSec = Math.max(0, Math.floor(diffMs/1000));
    const days = Math.floor(totalSec/86400);
    const hrs = Math.floor((totalSec%86400)/3600);
    const mins = Math.floor((totalSec%3600)/60);
    const secs = totalSec%60;
    document.getElementById('dayCount').textContent = days;
    document.getElementById('dayLabel').textContent = days===1 ? 'día juntos' : 'días juntos';
    document.getElementById('hrs').textContent = hrs;
    document.getElementById('mins').textContent = mins;
    document.getElementById('secs').textContent = secs;
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  const emojis = ['💗','✨','🌸','💫','🩷'];
  const container = document.getElementById('floaters');
  for(let i=0;i<16;i++){
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    el.style.left = Math.random()*100+'vw';
    el.style.fontSize = (16+Math.random()*18)+'px';
    el.style.animationDuration = (10+Math.random()*10)+'s';
    el.style.animationDelay = (Math.random()*10)+'s';
    container.appendChild(el);
  }

  document.getElementById('heroClick').addEventListener('click', (e)=>{
    spawnHeart(e.clientX, e.clientY);
  });
  function spawnHeart(x,y){
    const h = document.createElement('div');
    h.className='pop-heart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.left = x+'px';
    h.style.top = y+'px';
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),1100);
  }

  const timelineData = [
    {day:'30 de junio', text:'el día en que todo empezó 🌱'},
    {day:'primera semana', text:'entre risas, mensajes largos y ganas de conocernos más'},
    {day:'día 10', text:'ya sentía que encajábamos más de lo que esperaba'},
    {day:'hoy, día 17', text:'y aquí seguimos, con muchas ganas de lo que viene'}
  ];
  const tl = document.getElementById('timeline');
  timelineData.forEach(item=>{
    const div = document.createElement('div');
    div.className='t-item';
    div.innerHTML = `<div class="t-day">${item.day}</div><div class="t-text">${item.text}</div>`;
    tl.appendChild(div);
  });

  const bloomRow = document.getElementById('bloomRow');
  const stages = 5;
  const petalColors = ['#F7A8C4','#F0A6D6','#C6A6E8','#8FDCC3','#F7A8C4'];
  for(let i=0;i<stages;i++){
    const scale = 0.45 + (i/(stages-1))*0.55;
    const color = petalColors[i];
    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 100 140");
    svg.style.transform = `scale(${scale})`;
    svg.style.transformOrigin = 'bottom center';
    svg.innerHTML = `
      <line x1="50" y1="140" x2="50" y2="70" stroke="#8FDCC3" stroke-width="4" stroke-linecap="round"/>
      <g transform="translate(50,55)">
        ${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-16" rx="11" ry="17" fill="${color}" transform="rotate(${a})"/>`).join('')}
        <circle cx="0" cy="0" r="9" fill="#FAEEDA"/>
      </g>`;
    bloomRow.appendChild(svg);
  }

  const reasons = [
    'tu risa se me quedó grabada desde el primer día',
    'la forma en la que me escribes buenos días',
    'lo lindas que se sienten nuestras llamadas, aunque estemos lejos',
    'lo fácil que es hablar contigo de todo',
    'tu forma de ver las cosas pequeñas',
    'que ya extraño hablarte cuando no lo hago'
  ];
  const grid = document.getElementById('reasonsGrid');
  reasons.forEach((text,i)=>{
    const card = document.createElement('div');
    card.className='flip-card';
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-front"><div class="num">0${i+1}</div><div class="tap">toca para ver</div></div>
        <div class="flip-back">${text}</div>
      </div>`;
    card.addEventListener('click',()=>card.classList.toggle('flipped'));
    grid.appendChild(card);
  });

  let taps = 0;
  const bigHeart = document.getElementById('bigHeart');
  bigHeart.addEventListener('click',(e)=>{
    taps++;
    document.getElementById('tapCount').textContent = taps;
    bigHeart.style.transform='scale(1.35)';
    setTimeout(()=>bigHeart.style.transform='scale(1)',150);
    const rect = bigHeart.getBoundingClientRect();
    spawnHeart(rect.left+rect.width/2, rect.top);
  });

  document.getElementById('surpriseBtn').addEventListener('click',()=>{
    document.getElementById('surpriseMsg').classList.add('show');
    for(let i=0;i<20;i++){
      setTimeout(()=>{
        spawnHeart(Math.random()*window.innerWidth, window.innerHeight*0.6);
      }, i*60);
    }
  });
