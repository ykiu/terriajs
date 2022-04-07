import React from "react";
import TestRenderer, { act, ReactTestRenderer } from "react-test-renderer";
import Terria from "../../../lib/Models/Terria";
import ViewState from "../../../lib/ReactViewModels/ViewState";
import WorkflowPanel from "../../../lib/ReactViews/Workflow/WorkflowPanel";

describe("WorkflowPanel", function() {
  let terria: Terria;
  let viewState: ViewState;
  let testRenderer: ReactTestRenderer;

  beforeEach(function() {
    terria = new Terria({
      baseUrl: "./"
    });
    terria.configParameters.regionMappingDefinitionsUrl =
      "./data/regionMapping.json";
    viewState = new ViewState({
      terria,
      catalogSearchProvider: undefined,
      locationSearchProviders: []
    });
  });

  it("sets isWorkflowPanelActive when opened", async function() {
    expect(viewState.terria.isWorkflowPanelActive).toBe(false);
    await act(() => {
      TestRenderer.create(
        <WorkflowPanel
          viewState={viewState}
          title="test"
          icon={{ id: "test-icon" }}
          closeButtonText="close"
          onClose={() => {}}
        />
      );
    });
    expect(viewState.terria.isWorkflowPanelActive).toBe(true);
  });

  it("unsets isWorkflowPanelActive sidepanel when closed", async function() {
    await act(() => {
      testRenderer = TestRenderer.create(
        <WorkflowPanel
          viewState={viewState}
          title="test"
          icon={{ id: "test-icon" }}
          closeButtonText="close"
          onClose={() => {}}
        />
      );
    });
    expect(viewState.terria.isWorkflowPanelActive).toBe(true);
    testRenderer.unmount();
    expect(viewState.terria.isWorkflowPanelActive).toBe(false);
  });
});
