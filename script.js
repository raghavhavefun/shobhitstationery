const header=document.querySelector('.header');
const menu=document.querySelector('.menu-button');
const nav=document.querySelector('.nav-links');
const video=document.getElementById('brandVideo');
const audio=document.getElementById('brandAudio');
const audioButton=document.getElementById('audioToggle');
const audioText=audioButton.querySelector('.audio-text');
const toast=document.getElementById('toast');
let soundOn=false;

window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>18));
menu.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

function setAudioState(on){
  soundOn=on;
  audioButton.classList.toggle('playing',on);
  audioButton.setAttribute('aria-pressed',String(on));
  audioButton.setAttribute('aria-label',on?'Turn music off':'Turn music on');
  audioText.textContent=on?'Sound on':'Play sound';
}

audioButton.addEventListener('click',async()=>{
  if(soundOn){
    audio.pause();
    setAudioState(false);
    return;
  }
  try{
    if(video.paused) await video.play();
    audio.currentTime=Math.min(video.currentTime,audio.duration||video.currentTime);
    await audio.play();
    setAudioState(true);
  }catch(e){
    showToast('Tap again to enable sound');
    setAudioState(false);
  }
});

video.addEventListener('ended',()=>{
  if(soundOn){audio.currentTime=0;audio.play().catch(()=>setAudioState(false))}
});
video.addEventListener('timeupdate',()=>{
  if(video.currentTime<.2 && soundOn && audio.currentTime>.5){
    audio.currentTime=0;
  }
});
audio.addEventListener('ended',()=>{
  if(soundOn){audio.currentTime=0;audio.play().catch(()=>setAudioState(false))}
});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){audio.pause()}
  else if(soundOn){audio.play().catch(()=>setAudioState(false))}
});

document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
    button.classList.add('active');
    const selected=button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>{
      card.classList.toggle('hidden',selected!=='all'&&card.dataset.category!==selected);
    });
  });
});

function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),1700);
}
document.querySelectorAll('[data-product]').forEach(button=>{
  button.addEventListener('click',()=>{
    const text=encodeURIComponent(`Hi Shobhit Gift & Stationary, is "${button.dataset.product}" available?`);
    showToast('Opening WhatsApp…');
    setTimeout(()=>window.open(`https://wa.me/918882808088?text=${text}`,'_blank'),350);
  });
});
document.getElementById('enquiryForm').addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.getElementById('name').value.trim();
  const item=document.getElementById('item').value.trim();
  const details=document.getElementById('message').value.trim()||'No extra details';
  const text=encodeURIComponent(`Hi Shobhit Gift & Stationary,\n\nName: ${name}\nProduct/Service: ${item}\nDetails: ${details}`);
  showToast('Opening WhatsApp…');
  setTimeout(()=>window.open(`https://wa.me/918882808088?text=${text}`,'_blank'),350);
});
document.getElementById('year').textContent=new Date().getFullYear();
