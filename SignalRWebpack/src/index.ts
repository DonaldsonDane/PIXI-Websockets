import * as signalR from "@microsoft/signalr";
import "./css/main.css";
import { Application, Graphics, Text } from "pixi.js";
import { Button } from "@pixi/ui";

export class Game {
  private _app: Application;
  private _sendButton: Button;
  private _defaultMessage: string;
  private _messageDisplay: Graphics;
  private _userName: string;
  private _connection: signalR.HubConnection;

  private static instance: Game;

  constructor() {
    this._app = new Application();


    this._sendButton = new Button(
      new Graphics().fill(0xBBAFFC).rect(50, 50, 100, 50).fill()
    );

    this._messageDisplay = new Graphics().fill(0xff0000).rect(0, 0, 500, 500).fill();

    this._userName = "Dane Donaldson";

    this._connection = new signalR.HubConnectionBuilder().withUrl("/hub").build();

    this._connection.on("messageReceived", (username: string, message: string) => {
      console.log(`${username} has sent the message: ${message}`);

      const messageText = new Text({
        text: message,
        style:{
          fontFamily:'short-stack',

        }
      });
      messageText.localColor = 0xbbcaaf;
      this._messageDisplay.addChild(messageText);
    });

    this._sendButton.onPress.connect(() => {

      this.SendMessage();
    });

    this._connection.start().then(() => {
      console.log("SignalR connection established");
    }).catch((err) => {
      console.error("Error establishing SignalR connection: ", err);
    });
  }

  async init() {
    await this._app.init({
      background: '#1099bb',
      resizeTo: window
    });

    this._app.stage.interactive = true;
    this._app.stage.addChild(this._messageDisplay);
    this._app.stage.addChild(this._sendButton.view);
    document.body.appendChild(this._app.canvas);
  }

  private SendMessage() {
    this._defaultMessage = "Sausages";
    this._connection.send("newMessage", this._userName, this._defaultMessage).then(() => {
      console.log("Message sent");
    }).catch((err) => {
      console.error("Error sending message: ", err);
    });
  }

  public static GetInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }
}

const game = Game.GetInstance();
game.init();
