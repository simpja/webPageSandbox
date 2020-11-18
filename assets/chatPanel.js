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
  // Set inital filter value here. uio_it could be one
  filterValues: "default",
  conversationId: sessionStorage.getItem(conversationIdKeyName),
  pace: "supersonic",
  title: "Avo Partner 20",
  startTriggerActionId: 3370,
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

chatPanel.addEventListener("changeFilterEvent", function (event) {
  console.log("Filter change event emitted from chat user");
  const { detail } = event;
  if (detail.filter != undefined) {
    chatPanel.setFilterValues(detail.filter);
    console.log(`Changed conversation filter to: ${detail.filter}`);
  }
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
