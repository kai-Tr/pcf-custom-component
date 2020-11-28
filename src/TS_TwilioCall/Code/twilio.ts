import * as Twilio from "twilio-client";

let device: Twilio.Device;
let callStatus: HTMLDivElement;

export const init = (url, callStatusElement) => {
  callStatus = callStatusElement;
  device = new Twilio.Device();

  device.on("connect", deviceConnect);
  device.on("error", deviceError);
  device.on("ready", deviceReady);

  genarateToken(url);
};

const genarateToken = (url) => {
  var requestOptions = {
    method: "POST",
    body: "support_agent",
  };

  fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => device.setup(result))
    .catch((error) => updateCallStatus(error));
};

const updateCallStatus = (status) => {
  callStatus.innerHTML = status;
};

export const makeCall = (phoneNumber) => {
  if (!device) return;
  updateCallStatus("Calling " + phoneNumber + "...");

  var params = { phoneNumber: phoneNumber };
  device.connect(params);
};

export const hangUp = () => {
  device.disconnectAll();
};

export const isLegacyEdge = () => {
  let navigatorObject =
    navigator ||
    (typeof window === "undefined" ? global["navigator"] : window.navigator);
  return (
    !!navigatorObject &&
    typeof navigatorObject.userAgent === "string" &&
    /edge\/\d+/i.test(navigatorObject.userAgent)
  );
};

const deviceConnect = (connection) => {
  if ("phoneNumber" in connection.message) {
    updateCallStatus("In call with " + connection.message.phoneNumber);
  } else {
    // This is a call from a website user to a support agent
    updateCallStatus("In call with support");
  }
};

const deviceError = (error) => {
  updateCallStatus("ERROR: " + error.message);
};

const deviceReady = (device) => {
  updateCallStatus("Ready");
};
