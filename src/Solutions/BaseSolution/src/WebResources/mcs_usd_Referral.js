function ExecuteCommand(context, commandid) {
    if (window.top.document.getElementById(commandid) == null ||
     (window.top.document.getElementById(commandid).parentElement.id == "moreCommandsList"
      && window.top.document.getElementById(commandid).parentElement.parentElement.parentElement.style.display == "none")) {
        window.top.document.getElementById("moreCommands").getElementsByTagName("A")[0].click();
    }
    window.top.document.getElementById(commandid).getElementsByTagName("A")[0].click();
}
