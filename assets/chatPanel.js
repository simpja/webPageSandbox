let chatPanelShown = false;
let chatButtonEnabledClass = "boostAiChatButtonEnabled";
let chatButtonId = "#boostAiChatButton";
let chatButton = document.querySelector(chatButtonId);
let avoChatLabel = document.querySelector("#AvoChatLabel");
const dayInMilliseconds = 86400000;
let conversationIdKeyName = "boostAiChatId";
let conversationStartedTimestampKeyName = "boostAiChatTimestamp";
let chatPanel = boostChatPanel({
  apiUrlBase: "https://partner20.boost.ai/api",
  filterValues: "uio_it",
  conversationId: sessionStorage.getItem(conversationIdKeyName),
  pace: "supersonic",
});

// Get the conversationStartedTimeStamp from sessionStorage if it exists.
const conversationStartedTimestamp = sessionStorage.getItem(
  conversationStartedTimestampKeyName
);

// If we have a timestamp and the timestamp is older than a day, clear the conversation
if (
  conversationStartedTimestamp &&
  Date.now() - Number(conversationStartedTimestamp) >= dayInMilliseconds
) {
  sessionStorage.removeItem(conversationIdKeyName);
  sessionStorage.removeItem(conversationStartedTimestampKeyName);
}

chatPanel.addEventListener("conversationIdChanged", function (event) {
  console.log("ConverstationIDChanged");
  sessionStorage.setItem(conversationIdKeyName, event.detail.conversationId);
  sessionStorage.setItem(conversationStartedTimestampKeyName, Date.now());
});

function flashText() {
  //console.log(avoChatLabel);
  avoChatLabel.classList.toggle("flash");
}

function changeFilter(filter) {
  chatPanel.setFilterValues([`${filter}`]);
  if (filter == "Privat" || filter == "Bedrift") {
    //chatPanel.setFilterValues(["Privat", "Bedrift"]);
    console.log(`Filter was changed to ${filter}!`);
  }
}

chatPanel.addEventListener("testEmitter", function (event) {
  console.log("Emit some event from the chatPanel");
  const { detail } = event;
  console.log(detail);
  flashText();
});

// Open the chat panel on load
chatPanel.show();
chatPanelShown = true;

if (chatButton) {
  chatButton.addEventListener("click", function () {
    if (chatPanelShown) {
      chatPanel.minimize();
      chatPanelShown = false;
      chatButton.classList.toggle(chatButtonEnabledClass);
    } else if (!chatPanelShown) {
      chatPanel.show();
      chatPanelShown = true;
      chatButton.classList.toggle(chatButtonEnabledClass);
    }
  });
}
