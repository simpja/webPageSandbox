let chatPanelShown = false;
let chatButtonEnabledClass = "boostAiChatButtonEnabled";
let chatButtonId = "#boostAiChatButton";
let chatButton = document.querySelector(chatButtonId);
const dayInMilliseconds = 86400000;
let conversationIdKeyName = "boostAiChatId";
let conversationStartedTimestampKeyName = "boostAiChatTimestamp";
let chatPanel = boostChatPanel({
  apiUrlBase: "https://partner20.boost.ai/api",
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
