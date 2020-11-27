import "./main.css";
import "./font-awesome-4.7.0/css/font-awesome.min.css";

function createSwitcher(containerId) {
  const switcherContainer = document.getElementById(containerId);
  switcherContainer.classList.add("switch-container");

  const switcherElem = document.createElement("div");
  switcherElem.classList.add("switcher");
  switcherElem.innerHTML =
    '<span class="ico lime"><i class="fa fa-power-off" aria-hidden="true"></i></span>';
  switcherContainer.appendChild(switcherElem);

  const switcher = switcherContainer.querySelector("div.switcher");

  let SWITCHER_CURR_Y_POS; // y coord of switcher

  const lightGreyRGB = 242; // RGB(242, 242, 242)
  const darkGreyRGB = 140; // RGB(140, 140, 140)
  const backgroundColor = 229; // RGB(229, 229, 229)
  const shadowStart = 255; // RGB(255, 255, 255)
  const shadowEnd = 132; // RGB(132, 132, 132)

  const ico = switcher?.querySelector("span");

  const changeBtnIconColor = (offsetHeight, currYPos) => {
    if (currYPos < offsetHeight / 4) {
      ico?.classList?.remove("lime", "yellow", "orange", "red");
      ico?.classList?.add("lime");
    } else if (currYPos > offsetHeight / 4 && currYPos < offsetHeight / 2) {
      ico?.classList?.remove("lime", "yellow", "orange", "red");
      ico?.classList?.add("yellow");
    } else if (
      currYPos > offsetHeight / 2 &&
      currYPos < offsetHeight - offsetHeight / 4
    ) {
      ico?.classList?.remove("lime", "yellow", "orange", "red");
      ico?.classList?.add("orange");
    } else {
      ico?.classList?.remove("lime", "yellow", "orange", "red");
      ico?.classList?.add("red");
    }
  };

  const updateContainerShadows = (yPos) => {
    switcherContainer.style.boxShadow = `inset 2px -2px 5px 1px rgb(${
      shadowStart - yPos
    }, ${shadowStart - yPos}, ${shadowStart - yPos}), 
       inset -2px 3px 5px 1px rgb(${shadowEnd - yPos}, ${shadowEnd - yPos}, ${
      shadowEnd - yPos
    })`;
  };

  const updateSwitcherShadows = (yPos) => {
    switcher.style.boxShadow = `0px -3px 8px 0px rgb(${lightGreyRGB - yPos}, ${
      lightGreyRGB - yPos
    }, ${lightGreyRGB - yPos}), 
        0px 5px 9px 0px rgb(${darkGreyRGB - yPos}, ${darkGreyRGB - yPos}, ${
      darkGreyRGB - yPos
    })`;
  };

  const changeColors = (yPos) => {
    const offsetHeight = switcherContainer.offsetHeight;
    const ico = switcher?.querySelector("span");

    const newColorVal = backgroundColor - yPos;

    if (newColorVal > 70) {
      const newColor = `rgb(${newColorVal}, ${newColorVal}, ${newColorVal})`;

      document.querySelector("body").style.backgroundColor = newColor;
      switcher.style.backgroundColor = newColor;

      updateContainerShadows(yPos);

      updateSwitcherShadows(yPos);
    }

    changeBtnIconColor(offsetHeight, yPos);
  };

  // handling events
  switcher.onpointerdown = (event) => {
    event.preventDefault();
  
    SWITCHER_CURR_Y_POS = event.clientY - switcher.getBoundingClientRect().top;
  
    switcher.setPointerCapture(event.pointerId);
  };
  
  switcher.onpointermove = (event) => {
    if (event.buttons !== 1) return; // 1 is mouse LEFT_BTN code
  
    let newTop =
      event.clientY - SWITCHER_CURR_Y_POS - switcherContainer.getBoundingClientRect().top;
  
    if (newTop < 0) {
      newTop = 0;
    }
  
    let bottomEdge = switcherContainer.offsetHeight - switcher.offsetHeight;
    if (newTop > bottomEdge) {
      newTop = bottomEdge;
    }
  
    switcher.style.top = newTop + "px";
    changeColors(newTop);
  };
}


// usage example:
createSwitcher("foo");