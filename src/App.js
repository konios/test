import React, { useEffect, useState } from "react";
import Modeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import axios from "axios";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule
} from "bpmn-js-properties-panel";

function App() {
  const [diagram, diagramSet] = useState("");
  const container = document.getElementById("container");
  useEffect(() => {
    if (diagram.length === 0) {
      axios
        .get(
          "https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/master/colors/resources/pizza-collaboration.bpmn"
        )
        .then((r) => {
          diagramSet(r.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [diagram]);
  if (diagram.length > 0) {
    const modeler = new Modeler({
      container,
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      keyboard: {
        bindTo: document
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        CamundaPlatformPropertiesProviderModule
      ]
    });
    modeler
      .importXML(diagram)
      .then(({ warnings }) => {
        if (warnings.length) {
          console.log("Warnings", warnings);
        }

        const canvas = modeler.get("modeling");
        canvas.setColor("CalmCustomerTask", {
          stroke: "green",
          fill: "yellow"
        });
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <div className="App">
      <div
        id="container"
        style={{
          border: "1px solid #000000",
          height: "90vh",
          width: "50vw",
          left: "0",
          position: "absolute"
        }}
      ></div>
      <div
        id="js-properties-panel"
        width="200px"
        height="200px"
        position="absolute"
        right="0"
      ></div>
    </div>
  );
}
export default App;
