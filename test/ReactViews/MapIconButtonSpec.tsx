import React from "react";
import TestRenderer from "react-test-renderer";
import Terria from "../../lib/Models/Terria";
import ViewState from "../../lib/ReactViewModels/ViewState";
import Icon from "../../lib/Styled/Icon";
import MapIconButton from "../../lib/ReactViews/MapIconButton/MapIconButton";
import { runInAction } from "mobx";

describe("MapIconButton", function() {
  let viewState: ViewState;
  let rendered: TestRenderer.ReactTestRenderer;

  beforeEach(function() {
    const terria = new Terria();
    viewState = new ViewState({
      terria,
      catalogSearchProvider: undefined,
      locationSearchProviders: []
    });
  });

  it("renders", function() {
    rendered = TestRenderer.create(
      <MapIconButton
        viewState={viewState}
        iconElement={() => <Icon glyph={Icon.GLYPHS.bulb} />}
      >
        foo
      </MapIconButton>
    );
    const spans = rendered.root.findAllByType("span");
    expect(spans.some(child => child.props.children === "foo")).toBeTruthy();
  });
  it("does not render children if useSmallScreenInterface is true", function() {
    runInAction(() => {
      viewState.useSmallScreenInterface = true;
    });
    rendered = TestRenderer.create(
      <MapIconButton
        viewState={viewState}
        iconElement={() => <Icon glyph={Icon.GLYPHS.bulb} />}
      >
        foo
      </MapIconButton>
    );
    const spans = rendered.root.findAllByType("span");
    expect(spans.some(child => child.props.children === "foo")).toBeFalsy();
  });
});
