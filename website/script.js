/* Variables */


/* Code */

/* Event Listeners */
window.addEventListener("load", ()=> {
    const setAlarmBtn = document.querySelector("#setAlarmBtn");
    const clrAlarmBtn = document.querySelector("#clrAlarmBtn");
    
    const inputs = document.querySelectorAll("input[type=text]");
    
    const audio = new Audio("test.mp3");
    audio.loop = true;
    
    var timeout;
    var time = 0;

    /* Internal functions */
    function timeoutFn() {
        timeout = setTimeout(timeoutFn, 1000);
        
        if(--time == 0) {
            clearTimeout(timeout);
            audio.play();
        }

        inputs[0].value = Math.floor(time/3600);
        inputs[1].value = Math.floor((time%3600)/60);
        inputs[2].value = time%60;
    }


    setAlarmBtn.addEventListener("click", () => {
        audio.pause();
        
        /* Validation */
        for(element of inputs) {
            const val = element.value;
            const parsedVal = parseInt(val);

            if(parsedVal!=NaN && isFinite(parsedVal) && parsedVal >= 0) {
                element.readOnly = true;
            }
            else {
                alert("Error: NaN or value too large");
                return;
            }
        }
        
        time = parseInt(inputs[0].value)*3600 +
                parseInt(inputs[1].value)*60 +
                parseInt(inputs[2].value);
        
        if(time < 1) {
            alert("Error: time must be > 0");
            
            for(element of inputs) {
                element.readOnly = false;
            }
            
            return;
        }

        timeout = setTimeout(timeoutFn ,1000);
    });

    clrAlarmBtn.addEventListener("click", () => {
        clearTimeout(timeout);
        audio.pause();

        for(element of inputs) {
            element.readOnly = false;
            element.value = "00";
        }
    });
});

