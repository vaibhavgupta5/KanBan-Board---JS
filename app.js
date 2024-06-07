const btn = document.querySelector("button");
const container = document.querySelector(".container");
const currentDiv = document.querySelector(" .container .div1");
const sContainer = document.querySelectorAll(".small-container");
const boxes = document.querySelectorAll(".container-box");
const topUp = document.querySelector(".top-up");
const crossBtnAll = document.querySelector(".cross-btn-all");
const lockBtnAll = document.querySelector(".lock-btn-all");
const unlockBtnAll = document.querySelector(".unlock-btn-all");
const toggleTheme = document.querySelector(".toogle-theme");
const startingMsg = document.querySelector(".starting-msg");
const textarea = document.querySelector("textarea");

let bgColor = "white";

const mediaQuery = window.matchMedia("(min-width: 768px)");

if (mediaQuery.matches) {
  
  //creating a popup when plus icon clicked.

  btn.addEventListener("click", () => {
    startingMsg.style.display = "none";
    btn.disabled = true;

    let divN = document.createElement("div");
    let innerDiv = document.createElement("div");

    let colorBtnDiv = document.createElement("div");

    const colors = ["#0c66e4", "#6e5dc6", "#f5cd47", "#1f845a"];

    const newContent = document.createElement("textarea");

    if (bgColor === "white") {
      newContent.style.backgroundColor = "white";
    } else {
      newContent.style.backgroundColor = "#1d2124";
      newContent.style.color = "white";
    }

    colors.forEach((color) => {
      const btnColor = document.createElement("button");
      btnColor.style.backgroundColor = color;
      btnColor.value = color;

      colorBtnDiv.appendChild(btnColor);

      btnColor.addEventListener("click", () => {
        divN.style.display = "none";
        btn.disabled = false;

        setDiv(newContent, btnColor);
      });
    });

    let msgN = document.createElement("div");
    msgN.textContent = "Click Outside to Cancel";

    makeDiv(divN, innerDiv, colorBtnDiv, newContent, msgN);
  });

  //Giving Popup styling and adding modal classes

  const makeDiv = (divN, innerDiv, colorBtnDiv, newContent, msgN) => {
    innerDiv.classList.add("div-inner");
    colorBtnDiv.classList.add("color-btn");
    divN.classList.add("div-style");
    msgN.classList.add("msg-style");

    innerDiv.appendChild(newContent);
    innerDiv.appendChild(colorBtnDiv);
    divN.appendChild(innerDiv);
    divN.appendChild(msgN);

    newContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    innerDiv.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    divN.addEventListener("click", () => {
      divN.setAttribute("class", "hidden");
      btn.disabled = false;
      startingMsg.style.display = "flex";
    });

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "Escape") {
          divN.style.display = "none";
          btn.disabled = false;
        }
      },
      { once: true }
    );

    container.insertBefore(divN, currentDiv);
  };

  //Setting Up small containers with text and color that will be visible on screen

  const setDiv = (newContent, btnColor) => {
    if (newContent.value != "") {
      container.style.height = "100%";
      topUp.style.display = "flex";
      let smallContainer = document.createElement("div");
      let topBar = document.createElement("div");

      let uniqueId = document.createElement("div");
      let crossBtn = document.createElement("div");
      let lockBtn = document.createElement("div");
      let lockBtnyes = document.createElement("div");

      const arr = "abcdefghijklmnkoqrstuvwxyz1234567890";
      let len = 6;
      let uID = "";
      for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        uID += arr[randomIndex];
      }

      uniqueId.textContent = `#${uID}`;
      crossBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      lockBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`;
      lockBtnyes.innerHTML = `<i class="fa-solid fa-lock"></i>`;

      smallContainer.id += " out";

      let msgMini = document.createElement("div");

      msgMini.textContent = `${newContent.value}`;

      makeSetDiv(smallContainer,topBar,uniqueId,msgMini,btnColor,crossBtn,lockBtn, lockBtnyes);
    }
  };

  // Giving small containers styling and modal classes then appending

  const makeSetDiv = (smallContainer, topBar, uniqueId, msgMini, btnColor, crossBtn, lockBtn, lockBtnyes) => {
    if (bgColor == "black") {
      dragDiv(smallContainer);
      smallContainer.classList.add("small-container");
      smallContainer.style.backgroundColor = "#1d2124";

      smallContainer.draggable = true;

      topBar.classList.add("top-bar");

      msgMini.classList.add("msg-mini", "white-text");
      crossBtn.classList.add("cross-btn");
      crossBtn.style.color = "#fffff";
      lockBtn.classList.add("lock-btn");
      lockBtn.style.color = "#fffff";
      lockBtnyes.classList.add("lock-btn-yes");
      lockBtnyes.style.color = "#fffff";
      topBar.style.backgroundColor = btnColor.value;
      smallContainer.classList.add(uniqueId.textContent);
    } else if (bgColor == "white") {
      dragDiv(smallContainer);
      smallContainer.classList.add("small-container");
      smallContainer.draggable = true;

      topBar.classList.add("top-bar");
      msgMini.classList.add("msg-mini");
      crossBtn.classList.add("cross-btn");
      lockBtn.classList.add("lock-btn");
      lockBtnyes.classList.add("lock-btn-yes");
      topBar.style.backgroundColor = btnColor.value;
      smallContainer.classList.add(uniqueId.textContent);
    }

    smallContainer.appendChild(topBar);
    topBar.appendChild(uniqueId);
    topBar.appendChild(crossBtn);
    topBar.appendChild(lockBtn);
    topBar.appendChild(lockBtnyes);
    smallContainer.appendChild(msgMini);

    container.insertBefore(smallContainer, currentDiv);

    crossBtn.addEventListener("click", () => {
      hidesmallContainer(smallContainer);
      deleteLocalStorageOne(smallContainer);
    });

    lockBtn.addEventListener("click", () => {
      smallContainer.classList.add("lock");
      updatelockLocal(smallContainer);
      locksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
    });

    lockBtnyes.addEventListener("click", () => {
      updatelockLocal(smallContainer);
      smallContainer.classList.remove("lock");
      unlocksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
    });

    dragDiv(smallContainer);
    savetoLocalStorage(smallContainer, topBar, msgMini, btnColor);
  };

  // This function is to enable the drag functionality using event listeners

  const dragDiv = (smallContainer) => {
    smallContainer.addEventListener("dragstart", (e) => {
      smallContainer.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";

      smallContainer.style.cursor = "grabbing";
    });
    smallContainer.addEventListener("dragend", (e) => {
      smallContainer.classList.remove("dragging");
      e.stopPropagation();
      smallContainer.style.cursor = "grab";
    });

    boxes.forEach((box) => {
      box.addEventListener("dragover", (e) => {
        e.dataTransfer.dropEffect = "move";
        e.preventDefault();
      });

      box.addEventListener("dragenter", () => {
        if (bgColor === "white") {
          box.classList.add("hoverd-box");
        } else if (bgColor === "black") {
          box.classList.add("hoverd-box-dark");
        }
      });

      box.addEventListener("dragleave", () => {
        box.classList.remove("hoverd-box");
        box.classList.remove("hoverd-box-dark");
      });

      box.addEventListener("drop", (e) => {
        const draggingElement = document.querySelector(".dragging");
        box.classList.remove("hoverd-box-dark");
        if (draggingElement) {
          box.classList.remove("hoverd-box");
          box.classList.remove("hoverd-box");
          box.appendChild(draggingElement);
          updateboxheight();
          smallContainer.id = box.id;
          updateLocalStorage(draggingElement);
        }
      });
    });
  };

  // This function updates hieght if any new small container is added to upper boxes.

  const updateboxheight = () => {
    let countBoxes = 0;

    boxes.forEach((box) => {
      const containerCount = box.querySelectorAll(".small-container").length;

      if (containerCount > countBoxes) {
        countBoxes = containerCount;
      }
    });

    if (countBoxes != 0) {
      let newBoxHeight = countBoxes * 40;
      newBoxHeight = newBoxHeight;

      topUp.style.height = `${newBoxHeight + 10}vh`;

      boxes.forEach((box) => {
        box.style.height = `${newBoxHeight}vh`;
      });
    } else {
      topUp.style.height = "50vh";
    }
  };

  //When cross button is pressed this removes small container

  const hidesmallContainer = (smallContainer) => {
    smallContainer.classList.add("cross-small-container");

    smallContainer.addEventListener("animationend", () => {
      smallContainer.remove();
      updateboxheight();

      if (!document.querySelector(".small-container")) {
        topUp.style.display = "none";
        startingMsg.style.display = "flex";
      }
    });
  };

  // When botton bar's cross btn is pressed than deletes all small containers

  crossBtnAll.addEventListener("click", () => {
    let c = 0;
    const newSmallContainer = document.querySelectorAll(".small-container");

    newSmallContainer.forEach((scont) => {
      c++;
    });

    if (c !== 0) {
      topUp.classList.add("top-up-hidden");

      topUp.addEventListener("animationend", (event) => {
        if (event.animationName === "topUpEaseOut") {
          topUp.classList.remove("top-up-hidden");
          topUp.style.height = "50vh";
          topUp.style.display = "none";
          startingMsg.style.display = "flex";

          boxes.forEach((box) => {
            box.style.height = "35vh";
          });
        }
      });

      newSmallContainer.forEach((nsc) => {
        nsc.classList.add("cross-small-containers-all");

        nsc.addEventListener("animationend", () => {
          nsc.classList.remove("cross-small-container");
          nsc.remove();
          deleteLocalStorageOne(nsc);
        });

        boxes.forEach((box) => {
          let boxCont = box.querySelector(".small-container");
          if (boxCont) {
            boxCont.remove();
            deleteLocalStorageOne(boxCont);
          }
        });
      });
    }
  });

  // This locks the small container when lock icon pressed, disables draggable property

  const locksmallContainer = (
    smallContainer,
    lockBtnyes,
    lockBtn,
    crossBtn
  ) => {
    smallContainer.draggable = false;
    crossBtn.style.display = "none";
    lockBtn.style.display = "none";

    smallContainer.style.cursor = "not-allowed";
    lockBtnyes.style.display = "flex";
  };

  const unlocksmallContainer = (
    smallContainer,
    lockBtnyes,
    lockBtn,
    crossBtn
  ) => {
    smallContainer.draggable = true;
    crossBtn.style.display = "flex";
    lockBtn.style.display = "flex";

    smallContainer.style.cursor = "grab";
    lockBtnyes.style.display = "none";
  };

  lockBtnAll.addEventListener("click", () => {
    document.querySelectorAll(".small-container").forEach((scont) => {
      scont.draggable = false;
      scont.style.cursor = "not-allowed";

      updatelockLocal(scont);
    });

    document.querySelectorAll(".cross-btn").forEach((scont) => {
      scont.style.display = "none";
    });

    document.querySelectorAll(".lock-btn").forEach((scont) => {
      scont.style.display = "none";
    });

    document.querySelectorAll(".lock-btn-yes").forEach((scont) => {
      scont.style.display = "flex";
    });
  });

  //// This unlocks the small container when unlock icon pressed, enable draggable property

  unlockBtnAll.addEventListener("click", () => {
    document.querySelectorAll(".small-container").forEach((scont) => {
      scont.draggable = true;
      scont.style.cursor = "grab";

      updatelockLocal(scont);
    });

    document.querySelectorAll(".cross-btn").forEach((scont) => {
      scont.style.display = "flex";
    });

    document.querySelectorAll(".lock-btn").forEach((scont) => {
      scont.style.display = "flex";
    });

    document.querySelectorAll(".lock-btn-yes").forEach((scont) => {
      scont.style.display = "none";
    });
  });

  //This changes theme of background color

  toggleTheme.addEventListener("click", () => {
    if (bgColor === "black") {
      document.body.style.backgroundColor = "#1d2124";
      document.body.style.backgroundImage = "none";
      container.style.backgroundColor = "#1d2124";
      container.style.backgroundImage = "none";
      document.querySelectorAll(".container-box").forEach((scont) => {
        scont.style.backgroundColor = "#343a40";

        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "#ffffff";
        });
      });

      document.querySelectorAll(".small-container").forEach((scont) => {
        scont.setAttribute("backgroundColor", "blacks");

        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "#ffffff";
        });
      });

      document.querySelectorAll(".small-container").forEach((scont) => {
        scont.draggable = true;
        scont.style.cursor = "grab";
      });

      document.querySelectorAll(".cross-btn").forEach((scont) => {
        scont.style.display = "flex";
      });

      document.querySelectorAll(".lock-btn").forEach((scont) => {
        scont.style.display = "flex";
      });

      document.querySelectorAll(".lock-btn-yes").forEach((scont) => {
        scont.style.display = "none";
      });
    }
  });

  toggleTheme.addEventListener("click", () => {
    if (bgColor === "white") {
      toggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      startingMsg.style.color = "white";
      document.body.style.backgroundColor = "#1d2124";
      document.body.style.backgroundImage = "none";
      container.style.backgroundColor = "#1d2124";
      container.style.backgroundImage = "none";
      document.querySelectorAll(".container-box").forEach((scont) => {
        scont.style.backgroundColor = "#343a40";
        scont.querySelectorAll("*").forEach((child) => {
          if (!child.closest(".top-bar")) {
            child.style.color = "#ffffff";
          }
        });
      });

      document.querySelectorAll(".small-container").forEach((scont) => {
        scont.style.backgroundColor = "#1d2124";
        scont.querySelectorAll("*").forEach((child) => {
          if (!child.closest(".top-bar")) {
            child.style.color = "#ffffff";
          }
        });
      });

      document.querySelectorAll(".cross-btn").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      document.querySelectorAll(".lock-btn").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      document.querySelectorAll(".lock-btn-yes").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      bgColor = "black";
    } else if (bgColor === "black") {
      toggleTheme.innerHTML = `<i class="fa-solid fa-sun">`;
      startingMsg.style.color = "#4B5B7D";
      document.body.style.backgroundColor = "white";
      document.body.style.backgroundImage = "url('Grid-Bg.png')";
      container.style.backgroundColor = "white";
      container.style.backgroundImage = "url('Grid-Bg.png')";

      document.querySelectorAll(".container-box").forEach((scont) => {
        scont.style.backgroundColor = "#f7f8f9";
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "#4b5b75";
        });
      });

      document.querySelectorAll(".small-container").forEach((scont) => {
        scont.style.backgroundColor = "white";
        scont.querySelectorAll("*").forEach((child) => {
          if (!child.closest(".top-bar")) {
            child.style.color = "black";
          } else {
            child.style.color = "white";
          }
        });
      });

      document.querySelectorAll(".cross-btn").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      document.querySelectorAll(".lock-btn").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      document.querySelectorAll(".lock-btn-yes").forEach((scont) => {
        scont.querySelectorAll("*").forEach((child) => {
          child.style.color = "black";
        });
      });

      bgColor = "white";
    }
  });

  // LocalStorage

  const savetoLocalStorage = (smallContainer, topBar, msgMini, btnColor) => {
    let data = {
      Uid: topBar.innerText,
      color: btnColor.value,
      msg: msgMini.innerText,
      Cont_Id: smallContainer.id,
      lock: "false",
    };

    let existingData = JSON.parse(localStorage.getItem("userItems")) || [];

    existingData.push(data);

    localStorage.setItem("userItems", JSON.stringify(existingData));
  };

  window.onload = function () {
    let data = JSON.parse(localStorage.getItem("userItems"));

    if (data.length === 0) {
      topUp.style.display = "none";
      startingMsg.style.display = "flex";
    } else {
      startingMsg.style.display = "none";
      constructDiv(data);
    }
  };

  const constructDiv = (data) => {
    data.forEach((element) => {
      container.style.height = "100%";
      topUp.style.display = "flex";
      let smallContainer = document.createElement("div");
      let topBar = document.createElement("div");

      let uniqueId = document.createElement("div");
      let crossBtn = document.createElement("div");
      let lockBtn = document.createElement("div");
      let lockBtnyes = document.createElement("div");

      uniqueId.textContent = element.Uid;
      crossBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
      lockBtn.innerHTML = `<i class="fa-solid fa-lock-open"></i>`;
      lockBtnyes.innerHTML = `<i class="fa-solid fa-lock"></i>`;

      let msgMini = document.createElement("div");

      msgMini.textContent = element.msg;

      if (bgColor === "black") {
        dragDiv(smallContainer);

        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#1d2124";

        smallContainer.classList.add("small-container");
        smallContainer.style.backgroundColor = "#1d2124";
        smallContainer.draggable = true;
        textarea.style.backgroundColor = "#1d2124";

        topBar.classList.add("top-bar");

        msgMini.classList.add("msg-mini", "white-text");
        crossBtn.classList.add("cross-btn");
        crossBtn.style.color = "#fffff";
        lockBtn.classList.add("lock-btn");
        lockBtn.style.color = "#fffff";
        lockBtnyes.classList.add("lock-btn-yes");
        lockBtnyes.style.color = "#fffff";
        topBar.style.backgroundColor = element.color;
        smallContainer.classList.add(element.Uid);
      } else if (bgColor === "white") {
        dragDiv(smallContainer);
        smallContainer.classList.add("small-container");
        smallContainer.draggable = true;
        textarea.style.backgroundColor = "white";

        topBar.classList.add("top-bar");
        msgMini.classList.add("msg-mini");
        crossBtn.classList.add("cross-btn");
        lockBtn.classList.add("lock-btn");
        lockBtnyes.classList.add("lock-btn-yes");
        topBar.style.backgroundColor = element.color;
        smallContainer.classList.add(element.Uid);
      }

      smallContainer.appendChild(topBar);
      topBar.appendChild(uniqueId);
      topBar.appendChild(crossBtn);
      topBar.appendChild(lockBtn);
      topBar.appendChild(lockBtnyes);
      smallContainer.appendChild(msgMini);

      if (element.Cont_Id === " out") {
        container.insertBefore(smallContainer, currentDiv);
      } else {
        if (element.Cont_Id === "b1") {
          document.querySelector("#b1").append(smallContainer);
        } else if (element.Cont_Id === "b2") {
          document.querySelector("#b2").append(smallContainer);
        } else if (element.Cont_Id === "b3") {
          document.querySelector("#b3").append(smallContainer);
        } else {
          document.querySelector("#b4").append(smallContainer);
        }
      }

      crossBtn.addEventListener("click", () => {
        hidesmallContainer(smallContainer);
        deleteLocalStorageOne(smallContainer);
      });

      lockBtn.addEventListener("click", () => {
        updatelockLocal(smallContainer);
        smallContainer.classList.add("lock");
        locksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
      });

      lockBtnyes.addEventListener("click", () => {
        updatelockLocal(smallContainer);
        smallContainer.classList.remove("lock");
        unlocksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
      });

      if (element.lock === "true") {
        locksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
      } else {
        unlocksmallContainer(smallContainer, lockBtnyes, lockBtn, crossBtn);
      }

      updateboxheight();
    });
  };

  const updateLocalStorage = (smallContainer) => {
    let existingData = JSON.parse(localStorage.getItem("userItems")) || [];

    existingData.forEach((item) => {
      if (smallContainer.classList.contains(item.Uid)) {
        item.Cont_Id = smallContainer.id;
      }
    });

    localStorage.setItem("userItems", JSON.stringify(existingData));
  };

  const deleteLocalStorageOne = (smallContainer) => {
    let existingData = JSON.parse(localStorage.getItem("userItems")) || [];

    let updatedData = existingData.filter(
      (item) => !smallContainer.classList.contains(item.Uid)
    );

    localStorage.setItem("userItems", JSON.stringify(updatedData));
  };

  const updatelockLocal = (smallContainer) => {
    let existingData = JSON.parse(localStorage.getItem("userItems")) || [];

    const classList = smallContainer.classList;

    const isLocked = smallContainer.draggable;
    existingData.forEach((item) => {
      if (item.Uid == classList[1]) {
        item.lock = isLocked ? "true" : "false";
      }
    });
    localStorage.setItem("userItems", JSON.stringify(existingData));
  };
} else {
  topUp.style.display = "none";
  container.style.display = "none";
  document.querySelector(".btn-container").style.display = "none";

  startingMsg.innerText = "Mobile Devices not Supported";
  startingMsg.style.fontSize = "2rem";
  startingMsg.style.textAlign = "center";
  startingMsg.style.color = "white";

  document.body.style.backgroundColor = "#1f1f1f";
  document.body.style.backgroundImage = "none";
}

//Coded this much first time 😅
