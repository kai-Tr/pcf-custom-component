import * as Twilio from "twilio-client";
import { postData } from "./apiCall";

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
  postData({
    url: url,
    body: "support_agent",
  }).then((res) => {
    device.setup(res.data);
  });
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
