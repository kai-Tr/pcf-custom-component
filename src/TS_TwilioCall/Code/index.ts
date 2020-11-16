// @ts-nocheck
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import MyTwilio from "./twilio";
import { postData } from "./apiCall";

export class TwilioCall
  implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _twilioAccountSid: string;
  private _twilioAuthToken: string;
  private _twiMLApplicationSid: string;
  private _twilioPhoneNumber: string;
  private _twilio: any;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ) {
    this._container = container;
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;
    container.innerHTML = `
    <input type="text" id="twilioNumberTo" placeholder="Make call to"/> <br />
    <input type="button" id="twilioTokenBtn" value="Token" />
    <input type="button" id="twilioCallBtn" value="Call" />
    <input type="button" id="twilioEndCallBtn" value="Hangup" />
  `;

    container
      .querySelector("input#twilioCallBtn")!
      .addEventListener("click", this.onCallButtonClick.bind(this));

    container
      .querySelector("input#twilioEndCallBtn")!
      .addEventListener("click", this.onEndButtonClick.bind(this));

    container
      .querySelector("input#twilioTokenBtn")!
      .addEventListener("click", this.onGetTokenButtonClick.bind(this));

    this._twilio = MyTwilio();
  }

  /**
   * called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // add code to update control view
    this._twilioAccountSid = context.parameters.TwilioAccountSid.formatted
      ? context.parameters.TwilioAccountSid.formatted
      : "";
    this._twilioAuthToken = context.parameters.TwilioAuthToken.formatted
      ? context.parameters.TwilioAuthToken.formatted
      : "";
    this._twiMLApplicationSid = context.parameters.TwiMLApplicationSid.formatted
      ? context.parameters.TwiMLApplicationSid.formatted
      : "";
    this._twilioPhoneNumber = context.parameters.TwilioPhoneNumber.formatted
      ? context.parameters.TwilioPhoneNumber.formatted
      : "";
  }

  private onCallButtonClick(event: Event): void {
    // let inputNumber: HTMLInputElement = this._container.querySelector(
    //   "input#twilioNumber"
    // ) as HTMLInputElement;
    // if (!inputNumber.value) return;
    // this._twilio.call("", inputNumber.value);
  }

  private onEndButtonClick(event: Event): void {}

  private onGetTokenButtonClick(event: Event): void {
    postData({
      url: "https://localhost:44397/api/token/generate",
      body: JSON.stringify("support_agent"),
    }).then((res) => {
      console.log(res);
    });
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
