import { Widget, Invokable } from "@buildwithlayer/sdk";
import * as React from "react";
import { FunctionComponent, useEffect, useRef, useState } from "react";

export interface IMyComponentProps {
  counter: number;
  onClick?: () => void;
}

export const ChatBotReactComponent: FunctionComponent<IMyComponentProps> = (
  props: IMyComponentProps
) => {
  const name = "John Doe";
  const companyName = "Acme Inc";
  const ApiKey = "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";
  console.log("ApiKey", ApiKey);
  const invokables = [
    new Invokable({
      name: "sayHello",
      description: `a function that says hello or hi to the name provided to the tool.`,
      func: async (name) => sayHello(name),
    }),
    new Invokable({
      name: "setWidgetTheme",
      description:
        "change the theme of the widget to the color provided, convert all color to hex before invoking",
      func: async (color: string) => setWidgetTheme(color),
    }),
    new Invokable({
      name: "setWidgetTitle",
      description: "change the title of the widget to the title provided",
      func: async (title: string) => setWidgetTitle(title),
    }),
  ];

  const [widgetColor, setWidgetColor] = useState("#7A65FF");
  const [widgetTitle, setTitle] = useState("Default Title");

  const sayHello = (name: string) => {
    return `hello ${name}!`;
  };

  const setWidgetTheme = (color: string) => {
    setWidgetColor(color);
    return color;
  };

  const setWidgetTitle = (title: string) => {
    setTitle(title);
    return title;
  };

  return (
    <Widget
      openAiApiKey={ApiKey}
      layerApiKey={""}
      invokables={invokables}
      // Optional title for the header
      title={widgetTitle}
      // Optional function to render a logo in the header
      renderLogo={() => <p>Logo</p>}
      // Optional function to render a custom fab
      renderFab={(onClick) => (
        <button onClick={onClick}>Open Layer Assistant</button>
      )}
      // Optional string to override the default message in the chat
      defaultMessage={`Hey there ${name}! Thanks for choosing ${companyName}! Ask me anything at all, and I will do it!`}
      // Optional theme overrides
      themeOverrides={{
        palette: {
          primary: {
            main: widgetColor,
          },
          secondary: {
            main: "#FFFFFF",
          },
        },
      }}
    />
  );
};
