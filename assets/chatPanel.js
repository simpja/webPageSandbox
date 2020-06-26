// Create chat panel
/*
var chatPanel = window.boostChatPanel({
  apiUrlBase: "https://partner20.boost.ai/api",
  pace: "supersonic",
});
*/

// Open the chat panel on load
// chatPanel.show();

// Open panel on click
/*
document.querySelector(".modal_trigger").addEventListener("click", function () {
  chatPanel.show();
});
*/
let chatButtonEnabledClass = "boostAiChatButtonEnabled";
let chatButtonId = "#boostAiChatButton";
let conversationIdKeyName = "boostAiChatId";
let conversationStartedTimestampKeyName = "boostAiChatTimestamp";
let chatButton = document.querySelector(chatButtonId);
let chatPanel = boostChatPanel({
  apiUrlBase: "https://partner20.boost.ai/api",
  conversationId: sessionStorage.getItem(conversationIdKeyName),
  pace: "supersonic",
});

chatPanel.addEventListener("conversationIdChanged", function (event) {
  sessionStorage.setItem(conversationIdKeyName, event.detail.conversationId);
});
// Get the conversationStartedTimeStamp from sessionStorage if it exists.
const conversationStartedTimestamp = sessionStorage.getItem(
  conversationStartedTimestampKeyName
);
const dayInMilliseconds = 86400000;
// If we have a timestamp and the timestamp is older than a day, clear the conversation.
if (
  conversationStartedTimeStamp &&
  Date.now() - Number(conversationStartedTimestamp) >= dayInMilliseconds
) {
  sessionStorage.removeItem(conversationIdKeyName);
  sessionStorage.removeItem(conversationStartedTimestampKeyName);
}
chatPanel.addEventListener("conversationIdChanged", function (event) {
  sessionStorage.setItem(conversationIdKeyName, event.detail.conversationId);
  sessionStorage.setItem(conversationStartedTimestampKeyName, Date.now());
});
if (chatButton) {
  chatButton.addEventListener("click", function () {
    chatPanel.show();
  });
  let currentWindowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!(currentWindowWidth < 768)) {
    chatPanel.show();
  }
  chatButton.className = chatButtonEnabledClass;
}
