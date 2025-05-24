document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.dataset.id = expense.id;

      li.innerHTML = `
        <span class="expense-text">${expense.name} - ₹${expense.amount}</span>
        <input type="text" class="edit-name hidden" value="${expense.name}" />
        <input type="number" class="edit-amount hidden" value="${expense.amount}" />
        <button class="edit-btn" data-id="${expense.id}">Edit</button>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      `;
      expenseList.appendChild(li);
    });
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalAmountDisplay.textContent = total.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
      expenses = expenses.filter((exp) => exp.id !== id);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }

    if (e.target.classList.contains("edit-btn")) {
      const li = e.target.closest("li");
      const textSpan = li.querySelector(".expense-text");
      const nameInput = li.querySelector(".edit-name");
      const amountInput = li.querySelector(".edit-amount");

      const isEditing = !nameInput.classList.contains("hidden");

      if (isEditing) {
        const newName = nameInput.value.trim();
        const newAmount = parseFloat(amountInput.value.trim());

        if (newName !== "" && !isNaN(newAmount) && newAmount > 0) {
          const expense = expenses.find((exp) => exp.id === id);
          expense.name = newName;
          expense.amount = newAmount;

          saveExpensesToLocal();
          renderExpenses();
          updateTotal();
        }
      } else {
        textSpan.classList.add("hidden");
        nameInput.classList.remove("hidden");
        amountInput.classList.remove("hidden");
        e.target.textContent = "Save";
      }
    }
  });
});
