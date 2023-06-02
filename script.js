function foreground(id) {
  switch (id) {
    case "6d0c1907-0947-f147-6473-d529ac2dbb9a":
      selectType();
      break;
    case "9abbfe16-4beb-fc41-07fb-f5eb834ad8b6":
      generateLogFunction();
      break;
    case "801a622e-88e1-f3f5-c604-f131573411af":
      generateOreFunction();
      break;
    default:
      break;
  }
}
function selectType() {
  let type = checkedRadio("radio_type");
  if (type == "log") {
    screenSwitch("div#settings-log");
  } else if (type == "ore") {
    screenSwitch("div#settings-ore");
  }
}
function screenSwitch(to) {
  document.querySelector("div.visible").className = "hidden";
  document.querySelector(to).className = "visible";
}
function generateLogFunction() {
  if (
    Array.from(document.querySelectorAll("#settings-log>div>input")).filter(
      (e) => e.value.length == 0
    ).length == 0
  ) {
    let itemName = document.querySelector(
      "#input_settings-log_item-name"
    ).value;
    let logId =
      document
        .querySelector("#input_settings-log_log-block-id")
        .value.indexOf(":") != -1
        ? "minecraft:" +
          document.querySelector("#input_settings-log_log-block-id").value
        : document.querySelector("#input_settings-log_log-block-id").value;
    let leavesId =
      document
        .querySelector("#input_settings-log_leave-block-id")
        .value.indexOf(":") != -1
        ? "minecraft:" +
          document.querySelector("#input_settings-log_leave-block-id").value
        : document.querySelector("#input_settings-log_leave-block-id").value;
    let codeLogTemplate = (_itemName, _logId, _axis) =>
      `execute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~-1 ~ --logId ["pillar_axis":"--axis"] run fill ~ ~-1 ~ ~ ~-1 ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~-1 --logId ["pillar_axis":"--axis"] run fill ~-1 ~ ~-1 ~-1 ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~ --logId ["pillar_axis":"--axis"] run fill ~-1 ~ ~ ~-1 ~ ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~1 --logId ["pillar_axis":"--axis"] run fill ~-1 ~ ~1 ~-1 ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~ ~-1 --logId ["pillar_axis":"--axis"] run fill ~ ~ ~-1 ~ ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~ ~1 --logId ["pillar_axis":"--axis"] run fill ~ ~ ~1 ~ ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~-1 --logId ["pillar_axis":"--axis"] run fill ~1 ~ ~-1 ~1 ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~ --logId ["pillar_axis":"--axis"] run fill ~1 ~ ~ ~1 ~ ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~1 --logId ["pillar_axis":"--axis"] run fill ~1 ~ ~1 ~1 ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~1 ~ --logId ["pillar_axis":"--axis"] run fill ~ ~2 ~ ~ ~1 ~ air destroy`
        .replaceAll("--itemName", _itemName)
        .replaceAll("--logId", _logId)
        .replaceAll("--axis", _axis);
    let codeLeaveTemplate = (_itemName, _leavesId) =>
      `execute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~ ~1 --leavesId run fill ~ ~ ~1 ~ ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~1 --leavesId run fill ~1 ~ ~1 ~1 ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~1 --leavesId run fill ~-1 ~ ~1 ~-1 ~ ~1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~-1 --leavesId run fill ~1 ~ ~-1 ~1 ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~-1 --leavesId run fill ~-1 ~ ~-1 ~-1 ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~1 ~ ~ --leavesId run fill ~1 ~ ~ ~1 ~ ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~-1 ~ ~ --leavesId run fill ~-1 ~ ~ ~-1 ~ ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~ ~-1 --leavesId run fill ~ ~ ~-1 ~ ~ ~-1 air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~-1 ~ --leavesId run fill ~ ~-1 ~ ~ ~-1 ~ air destroy\nexecute as @e[type=item,name="--itemName",r=12] at @s if block ~ ~1 ~ --leavesId run fill ~ ~2 ~ ~ ~1 ~ air destroy`
        .replaceAll("--itemName", _itemName)
        .replaceAll("--leavesId", _leavesId);
    let code = [
      codeLogTemplate(itemName, logId, "y"),
      codeLogTemplate(itemName, logId, "x"),
      codeLogTemplate(itemName, logId, "z"),
      codeLeaveTemplate(itemName, leavesId),
    ].join("\n\n");
    document.querySelector("code#result-code").textContent = code;

    screenSwitch("div#result");
    setupClipboard();
  } else {
    iziToast.show({
      title: "Error",
      message: "Blank exist.",
      position: "center",
    });
  }
}
function generateOreFunction() {
  if (
    Array.from(document.querySelectorAll("#settings-ore>div>input")).filter(
      (e) => e.value.length == 0
    ).length == 0
  ) {
    let itemName = document.querySelector(
      "#input_settings-ore_item-name"
    ).value;
    let oreId =
      document
        .querySelector("#input_settings-ore_ore-block-id")
        .value.indexOf(":") != -1
        ? "minecraft:" +
          document.querySelector("#input_settings-ore_ore-block-id").value
        : document.querySelector("#input_settings-ore_ore-block-id").value;
    let codeOreTemplate = (_itemName, _oreId) =>
      `execute as @e[name="--itemName",r=6] at @s if block ~ ~-1 ~ --oreId run fill ~ ~-1 ~ ~ ~-1 ~ air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~-1 ~ ~-1 --oreId run fill ~-1 ~ ~-1 ~-1 ~ ~-1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~-1 ~ ~ --oreId run fill ~-1 ~ ~ ~-1 ~ ~ air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~-1 ~ ~1 --oreId run fill ~-1 ~ ~1 ~-1 ~ ~1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~ ~ ~-1 --oreId run fill ~ ~ ~-1 ~ ~ ~-1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~ ~ ~1 --oreId run fill ~ ~ ~1 ~ ~ ~1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~1 ~ ~-1 --oreId run fill ~1 ~ ~-1 ~1 ~ ~-1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~1 ~ ~ --oreId run fill ~1 ~ ~ ~1 ~ ~ air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~1 ~ ~1 --oreId run fill ~1 ~ ~1 ~1 ~ ~1 air destroy\nexecute as @e[name="--itemName",r=6] at @s if block ~ ~1 ~ --oreId run fill ~ ~1 ~ ~ ~1 ~ air destroy`
        .replaceAll("--itemName", _itemName)
        .replaceAll("--oreId", _oreId);
    let code = [codeOreTemplate(itemName, oreId)].join("\n\n");
    document.querySelector("code#result-code").textContent = code;

    screenSwitch("div#result");
    setupClipboard();
  } else {
    iziToast.show({
      title: "Error",
      message: "Blank exist.",
      position: "center",
    });
  }
}
function checkedRadio(name) {
  return Array.from(
    document.querySelectorAll("input[type=radio][name=" + name + "]")
  ).filter((e) => e.checked).length == 0
    ? undefined
    : Array.from(
        document.querySelectorAll("input[type=radio][name=" + name + "]")
      ).filter((e) => e.checked)[0].value;
}
