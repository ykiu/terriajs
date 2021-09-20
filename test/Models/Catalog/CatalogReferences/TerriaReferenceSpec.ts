import GroupMixin from "../../../../lib/ModelMixins/GroupMixin";
import TerriaReference from "../../../../lib/Models/Catalog/CatalogReferences/TerriaReference";
import WebMapServiceCatalogItem from "../../../../lib/Models/Catalog/Ows/WebMapServiceCatalogItem";
import CommonStrata from "../../../../lib/Models/Definition/CommonStrata";
import Terria from "../../../../lib/Models/Terria";

describe("TerriaReference", function() {
  it("can load a full terria catalog", async function() {
    const ref = new TerriaReference("test", new Terria());
    ref.setTrait(CommonStrata.user, "url", "test/init/wms-v8.json");
    ref.setTrait(CommonStrata.user, "isGroup", true);
    await ref.loadReference();
    const target = ref.target;
    expect(target).toBeDefined();
    expect(GroupMixin.isMixedInto(target)).toBe(true);
    if (GroupMixin.isMixedInto(target)) {
      expect(target.members.length).toEqual(1);
    }
  });

  it("can load a group inside the catalog", async function() {
    const ref = new TerriaReference("test", new Terria());
    ref.setTrait(CommonStrata.user, "url", "test/init/wms-v8.json");
    ref.setTrait(CommonStrata.user, "isGroup", true);
    ref.setTrait(CommonStrata.user, "path", ["MLzS8W"]);
    await ref.loadReference();
    const target = ref.target;
    expect(target).toBeDefined();
    expect(GroupMixin.isMixedInto(target)).toBe(true);
    if (GroupMixin.isMixedInto(target)) {
      // Check wether we have loaded all 7 catalog items
      expect(target.members.length).toEqual(7);
    }
  });

  it("can load an item inside the catalog", async function() {
    const ref = new TerriaReference("test", new Terria());
    ref.setTrait(CommonStrata.user, "url", "test/init/wms-v8.json");
    ref.setTrait(CommonStrata.user, "path", ["MLzS8W", "fCUx4Y"]);
    await ref.loadReference();
    const target = ref.target;
    expect(target).toBeDefined();
    expect(target instanceof WebMapServiceCatalogItem).toBe(true);
  });
});
