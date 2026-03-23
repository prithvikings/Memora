const API_URL = "http://localhost:5000/api/v1";

document.addEventListener("DOMContentLoaded", async () => {
  const authWarning = document.getElementById("auth-warning");
  const appContent = document.getElementById("app-content");
  const urlDisplay = document.getElementById("current-url");
  const collectionSelect = document.getElementById("collection-select");
  const saveBtn = document.getElementById("save-btn");
  const statusMsg = document.getElementById("status-msg");

  let currentTabUrl = "";

  // 1. Get the active tab URL immediately
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      currentTabUrl = tabs[0].url;
      urlDisplay.textContent = currentTabUrl;
    }
  });

  // 2. Fetch the user's collections to check auth and populate dropdown
  try {
    const res = await fetch(`${API_URL}/collections`, {
      method: "GET",
      credentials: "include", // CRITICAL: Sends the HttpOnly cookie
    });

    if (res.status === 401) {
      // User is not logged in on localhost:3000
      authWarning.classList.remove("hidden");
      return;
    }

    const data = await res.json();

    // Populate the dropdown
    data.data.forEach((collection) => {
      const option = document.createElement("option");
      option.value = collection._id;
      option.textContent = collection.name;
      collectionSelect.appendChild(option);
    });

    // Show the app UI
    appContent.classList.remove("hidden");
  } catch (error) {
    console.error("Failed to connect to API", error);
    authWarning.classList.remove("hidden");
    authWarning.innerHTML =
      '<p class="text-sm text-red-600">Ensure backend server is running.</p>';
  }

  // 3. Handle the Save action
  saveBtn.addEventListener("click", async () => {
    if (!currentTabUrl) return;

    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";
    saveBtn.classList.replace("bg-blue-600", "bg-gray-400");

    const selectedCollection = collectionSelect.value;

    try {
      const res = await fetch(`${API_URL}/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          url: currentTabUrl,
          collection_id: selectedCollection === "" ? null : selectedCollection,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      saveBtn.classList.add("hidden");
      statusMsg.textContent = "✅ Saved! AI is processing...";
      statusMsg.classList.remove("hidden");
      statusMsg.classList.add("text-emerald-600");

      // Auto-close popup after 2 seconds
      setTimeout(() => window.close(), 2000);
    } catch (error) {
      saveBtn.disabled = false;
      saveBtn.textContent = "Try Again";
      saveBtn.classList.replace("bg-gray-400", "bg-red-600");
      statusMsg.textContent = "❌ Error saving bookmark";
      statusMsg.classList.remove("hidden");
      statusMsg.classList.add("text-red-600");
    }
  });
});
