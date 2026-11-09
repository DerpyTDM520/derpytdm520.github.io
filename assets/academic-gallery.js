
document.querySelectorAll("[data-zoom-image]").forEach(button=>{
 button.addEventListener("click",()=>{
   const box=document.getElementById("academic-lightbox");
   if(!box||typeof box.showModal!=="function")return;
   const image=box.querySelector("img");
   image.src=button.dataset.zoomImage;
   image.alt=button.dataset.zoomAlt||"";
   box.showModal();
 });
});
document.querySelectorAll("[data-close-lightbox]").forEach(button=>button.addEventListener("click",()=>{
 document.getElementById("academic-lightbox")?.close();
}));
document.getElementById("academic-lightbox")?.addEventListener("click",event=>{
 if(event.target.tagName==="DIALOG")event.target.close();
});
