document.addEventListener("DOMContentLoaded", function () {
  // Toggle dropdown visibility
  document.addEventListener("click", function (e) {
    if (e.target.closest(".action-button")) {
      var dropdown = e.target
        .closest(".action-dropdown")
        .querySelector(".dropdown-menu");
      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    } else {
      // Hide all dropdowns if clicked outside
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });

  // Edit icon click
  document.addEventListener("click", function (e) {
    if (e.target.closest(".edit-icon")) {
      e.preventDefault();
      var row = e.target.closest("tr");

      // Show input fields for editing
      row.querySelector(".student-name").style.display = "none";
      row.querySelector(".student-subject").style.display = "none";
      row.querySelector(".student-marks").style.display = "none";
      row.querySelector(".edit-name").style.display = "inline-block";
      row.querySelector(".edit-subject").style.display = "inline-block";
      row.querySelector(".edit-marks").style.display = "inline-block";

      // Show save button, hide edit button
      row.querySelector(".save-icon").style.display = "inline-block";
      row.querySelector(".edit-icon").style.display = "none";
    }
  });

  // Save icon click
  document.addEventListener("click", function (e) {
    if (e.target.closest(".save-icon")) {
      e.preventDefault();
      var row = e.target.closest("tr");
      var studentId = e.target.closest(".save-icon").getAttribute("data-id");

      // Get new values
      var newName = row.querySelector(".edit-name").value;
      var newSubject = row.querySelector(".edit-subject").value;
      var newMarks = row.querySelector(".edit-marks").value;

      // Send data to the server for updating the record (AJAX)
      fetch(`/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
          student: {
            name: newName,
            subject_name: newSubject,
            marks: newMarks,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // Update the table with new data
            row.querySelector(".student-name").innerText = data.student.name;
            row.querySelector(".student-subject").innerText =
              data.student.subject_name;
            row.querySelector(".student-marks").innerText = data.student.marks;

            // Hide input fields, show spans
            row.querySelector(".student-name").style.display = "inline-block";
            row.querySelector(".student-subject").style.display =
              "inline-block";
            row.querySelector(".student-marks").style.display = "inline-block";
            row.querySelector(".edit-name").style.display = "none";
            row.querySelector(".edit-subject").style.display = "none";
            row.querySelector(".edit-marks").style.display = "none";

            // Hide save button, show edit button
            row.querySelector(".save-icon").style.display = "none";
            row.querySelector(".edit-icon").style.display = "inline-block";
          } else {
            alert("Failed to update student: " + data.errors.join(", "));
          }
        })
        .catch((error) => {
          console.error("Error updating student:", error);
          alert("An error occurred while updating the student.");
        });
    }
  });

  // Delete icon click
  document.addEventListener("click", function (e) {
    if (e.target.closest(".delete-icon")) {
      e.preventDefault();
      var row = e.target.closest("tr");
      var studentId = e.target.closest(".delete-icon").getAttribute("data-id");

      if (confirm("Are you sure you want to delete this student?")) {
        // Send a DELETE request
        fetch(`/students/${studentId}`, {
          method: "DELETE",
          headers: {
            "X-CSRF-Token": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              row.remove(); // Remove the row from the table
            } else {
              alert("Failed to delete student.");
            }
          })
          .catch((error) => {
            console.error("Error deleting student:", error);
            alert("An error occurred while deleting the student.");
          });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const modal = document.getElementById("addStudentModal");
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.querySelector(".close-button");
  const addStudentButton = document.getElementById("addStudentButton");

  // Function to open the modal
  function openModal() {
    modal.style.display = "flex";
  }

  // Function to close the modal
  function closeModal() {
    modal.style.display = "none";
  }

  // Function to add a new student
  function addStudent() {
    const name = document.getElementById("studentName").value;
    const subject = document.getElementById("studentSubject").value;
    const marks = document.getElementById("studentMarks").value;

    // AJAX request to add a new student
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({
        student: {
          name: name,
          subject_name: subject,
          marks: marks,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          closeModal();
          location.reload(); // Refresh to show the new student in the list
        } else {
          alert("Failed to add student: " + data.errors.join(", "));
        }
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        alert("An error occurred while adding the student.");
      });
  }

  // Attach event listeners
  openModalButton.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);
  addStudentButton.addEventListener("click", addStudent);

  // Close the modal if clicking outside the modal content
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });
});
