var numberArray = new Array();
var pickedNumberArray = new Array();
var lock = false;
let numberArray2 = JSON.parse(localStorage.getItem('numberArray2')) || [];

 // Obtener el botón de cerrar sesión
 var logoutButton = document.getElementById("logoutButton");
const pastNumbersList = document.querySelector("#past-numbers");
function init() {
    initNumberArray();
    createNumbers();
    // First try to load from local storage
    if (localStorage.getItem("numberArray") != null) {
        restoreVariables();
        glowNumbers();
    }

}

function storeVariables() {
    localStorage.setItem("numberArray", JSON.stringify(numberArray));
    localStorage.setItem("pickedNumberArray", JSON.stringify(pickedNumberArray));
}

function restoreVariables() {
    numberArray = JSON.parse(localStorage.getItem("numberArray"));
    pickedNumberArray = JSON.parse(localStorage.getItem("pickedNumberArray"));
}


function createNumbers() {

    var numbersTableDiv = document.getElementById("numbersTableDiv");
    var tableHTML = "<table id=\"numbersTable\">";
    var cellIndex = 1;
    for (var i = 0; i < 5; i++) {
        tableHTML = tableHTML + "<tr>";
        for (var j = 0; j < 15; j++) {
            tableHTML = tableHTML + "<td id=\"cell" + cellIndex + "\">" + cellIndex + "</td>";
            cellIndex = cellIndex + 1;
        }
        tableHTML = tableHTML + "</tr>";
    }
    tableHTML = tableHTML + "</table>";

    numbersTableDiv.innerHTML = tableHTML;
}


function initNumberArray() {
    for (var i = 0; i < 75; i++) {
        numberArray[i] = i + 1;
    }
}


function pickARandomNumber() {
    if (!lock) {
        lock = true;
        // Initial setup
        randomNumber = $('#randomNumber');
        var randomIndex;
        // Animate
        animationTimer = setInterval(function () {
            randomIndex = Math.floor(Math.random() * numberArray.length);

            if (numberArray.length == 0) {
                randomNumber.html('FIN');
            } else {
                randomNumber.text('' + numberArray[randomIndex]);
            }

        }, 20);

        // Set timeout to stop random counter
        setTimeout(function () {
            speakLetterWithNumber(numberArray[randomIndex]);
            addNumberToArray(numberArray[randomIndex]);
            console.log("numberArray[randomIndex22] 2 " + numberArray[randomIndex]);
            clearInterval(animationTimer)
            updateArrays(randomIndex);
            lock = false;
        }, 3000);
    }

}


function speakLetterWithNumber(number) {
    var letter = "";

    if (number >= 1 && number <= 15) {
        letter = "B";
    } else if (number >= 16 && number <= 30) {
        letter = "i";
    } else if (number >= 31 && number <= 45) {
        letter = "n";
    } else if (number >= 46 && number <= 60) {
        letter = "G";
    } else if (number >= 61 && number <= 75) {
        letter = "O";
    }

    if (letter !== "") {
        var speechText = letter + (number);
        var utterance = new SpeechSynthesisUtterance(speechText);
        utterance.lang = 'es-ES'; // Establece el idioma a español de España (cambiar según necesites)
        utterance.voiceURI = 'Google español';
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;

        // Reproduce el texto dos veces
        var repeatCount = 0;
        utterance.addEventListener('end', function () {
            repeatCount++;
            if (repeatCount < 2) {
                speechSynthesis.speak(utterance);
            }
        });

        // Reproduce el texto
        speechSynthesis.speak(utterance);
    }
}




function glowNumbers() {
    for (var i = 0; i < pickedNumberArray.length; i++) {
        var cell = document.getElementById("cell" + pickedNumberArray[i]);
        if (cell) {
            cell.className = cell.className + " glowingText";
          }
        // cell.className = cell.className + " glowingText";
    }
}

function updateArrays(pickedIndex) {
    pickedNumberArray.push(numberArray[pickedIndex]); // Copy the picked number to a seperate array
    numberArray.splice(pickedIndex, 1); // removeNumberFromNumberArray
    storeVariables();
    glowNumbers();
}


function askForRestart() {
    if (confirm('¿Quieres realmente reiniciar el juego?')) {
        localStorage.clear();
        location.reload();
        clearArray();
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

 // Escuchar el evento de clic en el botón de cerrar sesión
 logoutButton.addEventListener("click", function (event) {
    event.preventDefault();
    logout();
});


  
function addNumberToArray(number) {
    if (typeof number === 'number' && !isNaN(number)) {
      numberArray2.push(number);
      if (numberArray2.length > 5) {
        numberArray2.shift();
      }
      // Guardar el array en localStorage después de cada modificación
      localStorage.setItem('numberArray2', JSON.stringify(numberArray2));
    showNumbers();
    }
  }
  
  function showNumbers() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = '';
  
    for (let i = numberArray2.length - 1; i >= 0; i--) {
      const listItem = document.createElement('li');
      listItem.classList.add('lic');
      listItem.textContent = numberArray2[i];
      numberList.appendChild(listItem);
    }
  }

// Función para vaciar el array
function clearArray() {
    numberArray2 = [];
    // Limpiar el almacenamiento local también
    localStorage.removeItem('numberArray2');
    showNumbers();
  }
