import { GROUND } from "@/lib/brand";
import { SYSTEM_LIGHT_QUERY, THEME_KEY } from "@/lib/theme";

export const THEME_SCRIPT = `(function(){var d=document.documentElement,m=window.matchMedia(${JSON.stringify(
  SYSTEM_LIGHT_QUERY,
)});function s(){var t;try{t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})}catch(e){}var r=t==="light"||t==="dark"?t:m.matches?"light":"dark";d.dataset.theme=r;var c=document.querySelector('meta[name="theme-color"]');if(!c){c=document.createElement("meta");c.name="theme-color";document.head.appendChild(c)}c.setAttribute("content",r==="light"?${JSON.stringify(
  GROUND.light,
)}:${JSON.stringify(GROUND.dark)})}s();if(m.addEventListener)m.addEventListener("change",s)})()`;
