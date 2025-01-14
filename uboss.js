





  var isOnExtension = window.location.host === "glitch.com";

if (!isOnExtension) {
  alert("Uboss can only be used when iboss is present and on; maybe you disabled it?");
}

function disableExtensions(ids) {
  ids.forEach((id) => {
    chrome.management.setEnabled(id.trim(), false);
  });
}

function toggleExtension() {
  var extensionId = this.id;
  var isEnabled = this.enabled;

  chrome.management.setEnabled(extensionId, !isEnabled);
  this.enabled = !isEnabled;
}

function setupExtensionToggle(extension) {
  var button = document.createElement("button");
  button.textContent = extension.name;
  button.id = extension.id;
  button.enabled = extension.enabled;
  button.onclick = toggleExtension;
  document.documentElement.appendChild(button);
}

function initialize() {
  document.documentElement.innerHTML = `
    <head>
      <center>
        <h1>[UBoss] <strong>Ur</strong> moms the <strong>BOSS</strong></h1>
      </center>
    </head>
    <br>
    <h4>
      <center>
        This is based off of the original swamp launcher, the new Point Blank and Aka,
        but nice#5094 for the Chrome extension ID disabler.
        <hr>
        <strong>Credits:</strong> Aka, but nice (for the main code layout and javascript),
        Bypassi (for the original Swamp code and Point-Blank), Lego Axolotl (For name idea, and beta testing),
        and finally, the <a href="https://www.youtube.com/@thebluehatcrew/Sub_Confirmation=1">BlueHatCrew</a>
        for making the UI and initial idea of this.
      </center>
    </h4>
    <hr>
    <br>
    <div>
      <style>
      pre,textarea{display:inline-block;height:400px}*{font-family:"Noto sans",sans-serif;box-sizing:border-box}body{padding:10px;font-size:110%;color:#3527ce;background-color:#2e2e31}h1{text-align:center;font-size:70px}h2{text-align:left;font-size:175%}button,input,pre,select,textarea{color:#000;font-size:15px}h1,h2,h3,button,label,p,select{font-family:Roboto,sans-serif}hr{border:none;border-bottom:3px solid #fff}input,kbd,pre,textarea{font-family:monospace;border:none}input,select,textarea{background-color:#fff;border-radius:10px;p dding:10px 17px;border:none}button,input{background-color:#fff;padding:10px 20px;margin:0 5px 5px 0}input{width:600px;border-radius:10px}kbd{background-color:#ccc;color:#222;font-family:monospace;font-weight:400;padding:.5em;border-radius:10px;border:3px solid #000}textarea{white-space:pre;float:left;width:60%;border-radius:10px 0 0 10px;resize:none;background-color:#99edc3;margin-bottom:15px}pre{border-radius:0 10px 10px 0;padding:8px;float:right;margin:0 0 25px;width:40%;overflow-y:scroll;word-break:break-all;white-space:pre-line;background-color:#1c8e40}button{border:none;border-radius:10px;cursor:pointer;transition:filter 250ms}button:hover{filter:brightness(.8)}.gg{background-color:#4e60c9}a{color:#4e60c9;transition:color 250ms}a:hover{color:#132693}.button{display:inline-block;padding:.75rem 1.25rem;border-radius:10rem;color:#fff;text-transform:uppercase;font-size:1rem;letter-spacing:.15rem;transition:all 0.3s;position:relative;overflow:hidden;z-index:1}.button:after{content:'';position:absolute;bottom:0;left:0;width:100%;height:100%;background-color:#4e60c9;border-radius:10rem;z-index:-2}.button:before{content:'';position:absolute;bottom:0;left:0;width:0%;height:100%;background-color:#26099b;transition:all 0.3s;border-radius:10rem;z-index:-1}.button:hover{color:#fff}.button:hover:before{width:100%}}]}span{display:block;margin-top:2rem;font-size:.7rem;color:#777}span a{font-size:.7rem;color:#999;text-decoration:underline}
      .button-54{font-family:"Open Sans",sans-serif;font-size:16px;letter-spacing:2px;text-decoration:none;text-transform:uppercase;color:#000;cursor:copy;border:3px solid;padding:.25em .5em;box-shadow:1px 1px 0 0,2px 2px 0 0,3px 3px 0 0,4px 4px 0 0,5px 5px 0 0;position:relative;user-select:none;-webkit-user-select:none;touch-action:manipulation}.button-54:active{box-shadow:0 0 0 0;top:5px;left:5px}@media (min-width:768px){.button-54{padding:.25em .75em}}
      </style>
      <br><br>
      <center>
        <input id="id" placeholder="Put Extension ID Here: (split by commas)">
        <br>
        <a href="#" class="button">
          <button id="disable">Disable</button>
        </a>
        <hr>
        <center>
          <div>
            <a href="#" class="button">
              <button id="soft-disable">Soft-Disable iBoss</button>
            </a>
            <br>
            <p>
              Soft-Disable turns off the iBoss proxy feature and persists until Chrome is fully restarted (naturally with chrome://restart for example).
              There is other ways to use Soft-Disable, however, the others mentioned do not disable the iBoss proxy as the regular Soft-Disable does.
              If you wanted another way to use Soft-Disable, you would use:
              <br><br>
            </p>
          </div>
        </center>
      </center>
      <hr>
      <br>
      <kbd>opener.chrome.extension.getBackgroundPage().ur = null </kbd>
      <p> To disable it until restart.</p>
    </div>
  `;

  document.getElementById("disable").addEventListener("click", function () {
    var ids = document.getElementById("id").value.split(",");
    disableExtensions(ids);
  });

  document.title = "Uboss [Launcher]";

  chrome.management.getAll(function (extensions) {
    extensions.forEach(setupExtensionToggle);
  });

  var blocking = false;

  function toggle() {
    var extensionId = this.id;
    if (blocking) {
      chrome.management.setEnabled(extensionId, false);
    } else {
      chrome.management.setEnabled(extensionId, true);
    }
    blocking = !blocking;
  }

  toggle();
  this.onclick = toggle();

  document.write(`
    <style>
      /* CSS styles */

      <style> pre,textarea{display:inline-block;height:400px}*{box-sizing:border-box}body{padding:10px;font-size:110%;color:#fff;background-color:#2e2e31}h1{text-align:center;font-size:70px}h2{text-align:left;font-size:175%}button,input,pre,select,textarea{color:#000;font-size:15px}h1,h2,h3,button,label,p,select{font-family:Roboto,sans-serif}hr{border:none;border-bottom:3px solid #fff}input,kbd,pre,textarea{font-family:monospace;border:none}input,select,textarea{background-color:#fff;border-radius:10px;padding:10px 17px;border:none}button,input{background-color:#fff;padding:10px 20px;margin:0 5px 5px 0}input{width:600px;border-radius:10px}textarea{white-space:pre;float:left;width:60%;border-radius:10px 0 0 10px;resize:none;background-color:#99edc3;margin-bottom:15px}pre{border-radius:0 10px 10px 0;padding:8px;float:right;margin:0 0 25px;width:40%;overflow-y:scroll;word-break:break-all;white-space:pre-line;background-color:#1c8e40}button{border:none;border-radius:10px;cursor:pointer;transition:filter 250ms}button:hover{filter:brightness(.8)}.gg{background-color:#99edc3}a{color:#99edc3;transition:color 250ms}a:hover{color:#1c8e40} </style> 

    </style>
    <center>
      <input id="extension" placeholder="Put Extension Id Here">
      <button id="disable">Disable Extension</button>
    </center>
  `);

  document.getElementById("disable").addEventListener("click", function () {
    var ids = document.getElementById("extension").value.split(",");
    disableExtensions(ids);
  });
}

initialize();


var chrome = window.chrome;
if (window !== chrome.extension?.getBackgroundPage() && isOnExtension == true)
  open("/manifest.json").onload = function () {
    this.eval(
      swamp.toString() + "swamp();var chrome",
      (this.document.body.textContent = ""),
      this.history.replaceState({}, {}, "/uboss_on"),
      this.opener.close()
    );
    top.close();
  };