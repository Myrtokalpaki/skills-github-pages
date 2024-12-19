let identityNumberEntered = false;
let taxNumberEntered = false;

function nextStep(answer) {
  var questionBox = document.getElementById("question-box");
  var answerBox = document.getElementById("answer-box");

  answerBox.innerHTML = "";

  if (answer === "yes") {
    questionBox.innerHTML = "<p>Ποιες είναι οι απαιτήσεις για την αίτηση;</p>";
    answerBox.innerHTML = `
      <button class="answer-btn" onclick="nextStep('document')">Αριθμός Ταυτότητας</button>
      <button class="answer-btn" onclick="nextStep('taxNumber')" ${identityNumberEntered ? "" : "disabled"}>Αριθμός Φορολογικού Μητρώου (ΑΦΜ)</button>
    `;
  } else if (answer === "no") {
    questionBox.innerHTML = "<p>Είναι απαραίτητο να υποβάλλετε την αίτηση για να λάβετε το πιστοποιητικό.</p>";
    answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"yes\")'>Ξεκινήστε την αίτηση</button>";
  } else if (answer === "document") {
    questionBox.innerHTML = "<p>Πληκτρολογήστε τον Αριθμό Ταυτότητας:</p>";
    answerBox.innerHTML = '<input type="text" id="identityNumber" placeholder="Αριθμός Ταυτότητας" /><button class="answer-btn" onclick="submitIdentity()">Υποβολή</button>';
  } else if (answer === "taxNumber") {
    if (!identityNumberEntered) {
      questionBox.innerHTML = "<p>Πρώτα πρέπει να καταχωρήσετε τον Αριθμό Ταυτότητας.</p>";
      return;
    }
    questionBox.innerHTML = "<p>Πληκτρολογήστε τον Αριθμό Φορολογικού Μητρώου (ΑΦΜ):</p>";
    answerBox.innerHTML = '<input type="text" id="taxNumber" placeholder="Αριθμός ΑΦΜ" /><button class="answer-btn" onclick="submitTaxNumber()">Υποβολή</button>';
  } else if (answer === "finalStep") {
    if (!identityNumberEntered || !taxNumberEntered) {
      questionBox.innerHTML = "<p>Λυπούμαστε, λείπουν κάποια στοιχεία! Παρακαλούμε ολοκληρώστε την αίτηση.</p>";
      answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"document\")'>Ξεκινήστε ξανά</button>";
      return;
    }
    questionBox.innerHTML = "<p>Η αίτησή σας ολοκληρώθηκε επιτυχώς! Σας ευχαριστούμε!</p>";
    answerBox.innerHTML = "";
  }
}

function submitIdentity() {
  var identityNumber = document.getElementById("identityNumber").value;
  var questionBox = document.getElementById("question-box");
  var answerBox = document.getElementById("answer-box");

  if (identityNumber) {
    identityNumberEntered = true;
    questionBox.innerHTML = "<p>Ο Αριθμός Ταυτότητας καταχωρήθηκε με επιτυχία!</p>";
    answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"taxNumber\")'>Προχωρήστε στο ΑΦΜ</button>";
  } else {
    questionBox.innerHTML = "<p>Παρακαλώ εισάγετε έναν έγκυρο Αριθμό Ταυτότητας.</p>";
    answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"document\")'>Προσπάθησε ξανά</button>";
  }
}

function submitTaxNumber() {
  var taxNumber = document.getElementById("taxNumber").value;
  var questionBox = document.getElementById("question-box");
  var answerBox = document.getElementById("answer-box");

  if (taxNumber) {
    taxNumberEntered = true;
    questionBox.innerHTML = "<p>Ο Αριθμός Φορολογικού Μητρώου (ΑΦΜ) καταχωρήθηκε με επιτυχία!</p>";
    answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"finalStep\")'>Ολοκληρώστε την αίτηση</button>";
  } else {
    questionBox.innerHTML = "<p>Παρακαλώ εισάγετε έναν έγκυρο ΑΦΜ.</p>";
    answerBox.innerHTML = "<button class='answer-btn' onclick='nextStep(\"taxNumber\")'>Προσπάθησε ξανά</button>";
  }
}
