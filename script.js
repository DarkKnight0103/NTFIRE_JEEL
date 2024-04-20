document.querySelector(".login-btn").addEventListener("click", function () {
  window.location.href = "./popup.html";
});

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const inputOutputBox = document.getElementById("inputOutputBox");
  const cards = document.querySelectorAll(".card");
  const searchInput = document.getElementById("searchInput");

  const databaseName = sessionStorage.getItem("databaseName");
  const databaseNameElement = document.getElementById("databaseName");

  if (databaseName) {
    // If database name exists, display it
    databaseNameElement.textContent = databaseName;
  } else {
    // If database name does not exist, hide the database info section
    document.querySelector(".database-info").style.display = "none";
  }
  
  const loggedIn = sessionStorage.getItem("loggedIn");

  if (loggedIn) {
    // If the user is logged in, hide the login button
    document.querySelector(".login-btn").style.display = "none";
  }

  // Set focus on the search input by default
  searchInput.focus();

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const query = searchInput.value.trim();
    if (query !== "") {
      // Simulate backend response
      const responseData = {
        message: "This is a sample SQL query generated for: " + query,
        sqlQuery: "SELECT * FROM table WHERE condition;",
        output: "Sample output for the query: " + query,
      };

      // Create input, output, and container elements
      const container = document.createElement("div");
      container.classList.add("response-container");

      const inputDiv = document.createElement("div");
      inputDiv.classList.add("input");
      inputDiv.innerHTML = `
                <h3><i class="fas fa-arrow-alt-circle-right"></i> Input:</h3>
                <p>${query}</p>
            `;

      const outputDiv = document.createElement("div");
      outputDiv.classList.add("output");
      outputDiv.innerHTML = `
                <h3><i class="fas fa-arrow-alt-circle-left"></i> Output:</h3>
                <p>${responseData.message}</p>
            `;

      // Add execute button
      const executeButton = document.createElement("button");
      executeButton.innerHTML = '<i class="fas fa-play"></i> Execute SQL Query';
      executeButton.classList.add("execute-button");
      executeButton.onclick = function () {
        executeSQL(responseData.sqlQuery, outputDiv);
        executeButton.disabled = true; // Disable button after execution
        searchInput.focus(); // Set focus back to input field
        container.removeChild(executeButton); // Remove button after execution
      };

      // Append elements to container
      container.appendChild(inputDiv);
      container.appendChild(outputDiv);
      container.appendChild(executeButton);

      // Append container to inputOutputBox
      inputOutputBox.appendChild(container);

      // Display inputOutputBox and hide cards
      inputOutputBox.style.display = "block";
      cards.forEach((card) => {
        card.style.display = "none";
      });

      // Clear input field
      searchInput.value = "";

      // Scroll to the bottom of inputOutputBox
      inputOutputBox.scrollTop = inputOutputBox.scrollHeight;
    }
  });

  // Function to execute SQL query
  function executeSQL(sqlQuery, outputDiv) {
    // Simulate execution and display output under the corresponding response
    const output = "Output for SQL query: " + sqlQuery;
    const outputP = document.createElement("p");
    outputP.innerHTML = `<i class="fas fa-database"></i> ${output}`; // Replace text with icon
    outputDiv.appendChild(outputP);
  }

  // Add event listener for Enter key press in the input field
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default Enter key behavior (form submission)
      searchForm.dispatchEvent(new Event("submit"));
    }
  });
});
