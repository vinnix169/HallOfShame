import React, { useEffect } from "react";
import SmoothScroll from "smooth-scroll";

const UseScroll = (target, anchor, speed, ease) => {
    var scroll = new SmoothScroll();
    var scrollOptions = {speed: speed, easing: ease}
    scroll.animateScroll(document.querySelector(target), document.querySelector(anchor),scrollOptions)      
}
 
export default UseScroll;