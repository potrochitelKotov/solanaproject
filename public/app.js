const issuerTab = document.querySelector("#issuerTab");
const investorTab = document.querySelector("#investorTab");
const issuerView = document.querySelector("#issuerView");
const investorView = document.querySelector("#investorView");
const actionDialog = document.querySelector("#actionDialog");
const actionForm = document.querySelector("#actionForm");
const actionRows = document.querySelector("#actionRows");
const toast = document.querySelector("#toast");
const entitlementBox = document.querySelector("#entitlementBox");
const claimButton = document.querySelector("#claimButton");
const claimResult = document.querySelector("#claimResult");
let actionCount = 3;
let toastTimeout;

function showView(view) {
  const showInvestor = view === "investor";
  issuerView.hidden = showInvestor;
  investorView.hidden = !showInvestor;
  issuerTab.classList.toggle("active", !showInvestor);
  investorTab.classList.toggle("active", showInvestor);
  issuerTab.setAttribute("aria-selected", String(!showInvestor));
  investorTab.setAttribute("aria-selected", String(showInvestor));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2800);
}

function formatTestAmount(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

issuerTab.addEventListener("click", () => showView("issuer"));
investorTab.addEventListener("click", () => showView("investor"));

document.querySelector("#createActionButton").addEventListener("click", () => {
  actionDialog.showModal();
});

document.querySelector("#closeDialogButton").addEventListener("click", () => actionDialog.close());
document.querySelector("#cancelDialogButton").addEventListener("click", () => actionDialog.close());

actionDialog.addEventListener("click", (event) => {
  if (event.target === actionDialog) actionDialog.close();
});

actionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(actionForm);
  const name = String(formData.get("name")).trim();
  const type = String(formData.get("type"));
  const rawDate = String(formData.get("date"));
  const amount = Number(formData.get("amount"));
  const date = new Date(`${rawDate}T00:00:00`);
  const formattedDate = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(date);

  actionCount += 1;
  const row = document.createElement("tr");
  const eventCell = document.createElement("td");
  const eventName = document.createElement("div");
  eventName.className = "event-name";
  eventName.textContent = name;
  const eventId = document.createElement("div");
  eventId.className = "event-id";
  eventId.textContent = `EVT-DEMO-${String(actionCount).padStart(3, "0")}`;
  eventCell.append(eventName, eventId);

  const typeCell = document.createElement("td");
  const typePill = document.createElement("span");
  typePill.className = `type-pill${type === "Redemption" ? " redemption" : ""}`;
  typePill.textContent = type.toUpperCase();
  typeCell.append(typePill);

  const dateCell = document.createElement("td");
  dateCell.textContent = formattedDate;
  const investorCell = document.createElement("td");
  investorCell.textContent = "24";
  const statusCell = document.createElement("td");
  const status = document.createElement("span");
  status.className = "status status-draft";
  const statusDot = document.createElement("span");
  status.append(statusDot, document.createTextNode(" DRAFT"));
  statusCell.append(status);
  const arrowCell = document.createElement("td");
  arrowCell.className = "row-arrow";
  arrowCell.textContent = "↗";
  row.append(eventCell, typeCell, dateCell, investorCell, statusCell, arrowCell);
  actionRows.prepend(row);
  actionForm.reset();
  actionDialog.close();
  showToast(`${type} demo event added · ₸ ${formatTestAmount(amount)} test tokens`);
});

document.querySelector("#checkEligibilityButton").addEventListener("click", () => {
  entitlementBox.hidden = false;
  claimResult.hidden = true;
  claimButton.disabled = false;
  showToast("Sample wallet is eligible in this demo");
});

claimButton.addEventListener("click", () => {
  claimButton.disabled = true;
  claimButton.textContent = "Claim simulated ✓";
  claimResult.hidden = false;
  claimResult.textContent = "Demo claim recorded in this browser session only. No wallet transaction was sent.";
});

document.querySelector("#walletButton").addEventListener("click", () => {
  showToast("Wallet connection is not enabled in this static demo");
});
