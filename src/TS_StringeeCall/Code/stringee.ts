import { StringeeClient, StringeeCall } from "stringee-chat-js-sdk";

let authenticatedWithUserId = "";
let call: any;
let stringeeClient: any;

const settingCallEvents = (call1: any) => {
  call1.on("error", function (info: any) {
    console.log("on error: " + JSON.stringify(info));
  });

  call1.on("addlocalstream", function (stream: any) {
    console.log("on addlocalstream", stream);
  });

  call1.on("addremotestream", function (stream: any) {
    console.log("on addremotestream", stream);
  });

  call1.on("signalingstate", function (state: any) {
    console.log("signalingstate", state);

    if (state.code == 6) {
      //call ended
    }

    if (state.code == 5) {
      //busy here
    }

    var reason = state.reason;
  });

  call1.on("mediastate", function (state: any) {
    console.log("mediastate ", state);
  });

  call1.on("info", function (info: any) {
    console.log("on info", info);
  });

  call1.on("otherdevice", function (data: any) {
    console.log("on otherdevice:" + JSON.stringify(data));

    if (
      (data.type === "CALL_STATE" && data.code >= 200) ||
      data.type === "CALL_END"
    ) {
      //
    }
  });
};

const settingClientEvents = (client: any) => {
  client.on("connect", function () {
    console.log("connected to StringeeServer");
  });

  client.on("authen", function (res: any) {
    console.log("on authen: ", res);
    if (res.r === 0) {
      authenticatedWithUserId = res.userId;
    }
  });

  client.on("disconnect", function () {
    console.log("disconnected");
  });

  client.on("incomingcall", function (incomingcall: any) {
    call = incomingcall;
    settingCallEvents(incomingcall);

    console.log("incomingcall: ", incomingcall);
  });

  client.on("requestnewtoken", function () {
    console.log(
      "request new token; please get new access_token from YourServer and call client.connect(new_access_token)"
    );
    //please get new access_token from YourServer and call:
    //client.connect(new_access_token);
  });

  client.on("otherdeviceauthen", function (data: any) {
    console.log("otherdeviceauthen: ", data);
  });
};

const makeCall = (fromNumber: string, callTo: string) => {
  if (fromNumber.length === 0) {
    fromNumber = authenticatedWithUserId;
  }
  call = new StringeeCall(stringeeClient, fromNumber, callTo);

  settingCallEvents(call);

  call.makeCall(function (res) {
    console.log("make call callback: " + JSON.stringify(res));
    if (res.r !== 0) {
    } else {
      //call type
      if (res.toType === "internal") {
      } else {
      }
    }
  });
};

const hangupCall = () => {
  call.hangup(function (res) {
    console.log("hangup res", res);
  });
};

function getAccessToken(
  apiKeySid: string,
  apiKeySecret: string,
  userId: string
) {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 3600;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    jti: apiKeySid + "-" + now,
    iss: apiKeySid,
    exp: exp,
    userId: userId,
  };

  var jwt = require("jsonwebtoken");
  var token = jwt.sign(payload, apiKeySecret, {
    algorithm: "HS256",
    header: header,
  });
  return token;
}

const Stringee = () => {
  stringeeClient = new StringeeClient();
  settingClientEvents(stringeeClient);
  return {
    client: stringeeClient,
    call: makeCall,
    connect: (access_token: string) => {
      stringeeClient.connect(access_token);
    },
    getAccessToken,
    hangupCall,
  };
};

export default Stringee;
