# Customizing defaults

TerriaJS can visualize data with sensible default configurations. However, you can customize the defaults to optimize them for your specific use cases.

To override the defaults, use one of the `itemProperty`, `itemPropertiesByType`, or `itemPropertiesByIds` traits of the catalog group. `itemProperty` applies to all the child items of a group, while `itemPropertiesByType` and `itemPropertiesByIds` apply to items with specific types or IDs, respectively.

## Setting global defaults

The example below sets `itemPropertiesByType` to the root group (`/`) to change the default configurations for GeoJSON and 3D Tiles datasets:

```json
{
  "catalog": [
    {
      "type": "geojson",
      "id": "Cemeteries",
      "url": "test/cemeteries.geojson"
    },
    {
      "type": "3d-tiles",
      "id": "Buildings - Chiyoda, Tokyo",
      "url": "https://assets.cms.plateau.reearth.io/assets/aa/ecf312-95c2-4e24-8351-642f27e447b6/13100_tokyo23-ku_2022_3dtiles_1_1_op_bldg_13101_chiyoda-ku_lod1/tileset.json"
    }
  ],
  "models": {
    "/": {
      "itemPropertiesByType": [
        {
          "type": "geojson",
          "itemProperties": {
            "disableExport": true
          }
        },
        {
          "type": "3d-tiles",
          "itemProperties": {
            "highlightColor": "#0000ff"
          }
        }
      ]
    }
  }
}
```

Here, all the GeoJSON datasets in the catalog have `disableExport: true` and the 3D Tiles datasets have `highlightColor: "#0000ff"`.

## Scoping defaults to a group

The defaults can be scoped to a group instead of globally by adding `itemProperty`, `itemPropertiesByType`, or `itemPropertiesByIds` to the catalog group.

The init file below sets the default style of datasets under the "Buildings" group and the datasets under the "Flood inundation areas" group differently:

```json
{
  "catalog": [
    {
      "type": "group",
      "id": "Buildings",
      "members": [
        {
          "type": "3d-tiles",
          "id": "Buildings - Chiyoda, Tokyo",
          "url": "https://assets.cms.plateau.reearth.io/assets/aa/ecf312-95c2-4e24-8351-642f27e447b6/13100_tokyo23-ku_2022_3dtiles_1_1_op_bldg_13101_chiyoda-ku_lod1/tileset.json"
        },
        {
          "type": "3d-tiles",
          "id": "Buildings - Chuo, Tokyo",
          "url": "https://assets.cms.plateau.reearth.io/assets/04/5fbfc0-3b50-4041-afe5-0bbf971090ef/13100_tokyo23-ku_2022_3dtiles_1_1_op_bldg_13102_chuo-ku_lod1/tileset.json"
        }
      ],
      "itemPropertiesByType": [
        {
          "type": "3d-tiles",
          "itemProperties": {
            // Set the color of buildings based on their height
            "colorBlendMode": "REPLACE",
            "style": {
              "color": {
                "conditions": [
                  [
                    "${attributes[\"bldg:measuredHeight\"]} === null",
                    "rgb(255, 255, 255)"
                  ],
                  [
                    "${attributes[\"bldg:measuredHeight\"]} <= 12.0",
                    "rgb(56, 42, 84)"
                  ],
                  [
                    "${attributes[\"bldg:measuredHeight\"]} <= 31.0",
                    "rgb(90, 34, 200)"
                  ],
                  [
                    "${attributes[\"bldg:measuredHeight\"]} <= 60.0",
                    "rgb(166, 117, 190)"
                  ],
                  [
                    "${attributes[\"bldg:measuredHeight\"]} <= 120.0",
                    "rgb(240, 211, 123)"
                  ],
                  [
                    "${attributes[\"bldg:measuredHeight\"]} <= 180.0",
                    "rgb(255, 205, 0)"
                  ],
                  ["true", "rgb(247, 255, 0)"]
                ]
              }
            }
          }
        }
      ]
    },
    {
      "type": "group",
      "id": "Flood inundation areas",
      "members": [
        {
          "type": "3d-tiles",
          "id": "Flood - Arakawa River",
          "url": "https://assets.cms.plateau.reearth.io/assets/2c/bfb9aa-ff8d-48f8-b25d-fe39dd37aa08/13100_tokyo23-ku_2022_3dtiles_1_1_op_fld_natl_arakawa_arakawa_l1/tileset.json"
        },
        {
          "type": "3d-tiles",
          "id": "Flood - Edogawa River",
          "url": "https://assets.cms.plateau.reearth.io/assets/1c/733f2e-56c1-45d4-b766-9e3a5504994d/13100_tokyo23-ku_2022_3dtiles_1_1_op_fld_natl_tonegawa_edogawa_l1/tileset.json"
        }
      ],
      "itemPropertiesByType": [
        {
          "type": "3d-tiles",
          "itemProperties": {
            // Filter by inundation severity
            "filters": [
              {
                "name": "Inundation Severity",
                "maximumShown": 6,
                "maximumValue": 6,
                "minimumShown": 1,
                "minimumValue": 1,
                "property": "rank_code"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Overriding the default configurations of user-added data

To override the default configurations of user-added data, set the `itemProperties`, `itemPropertiesByType`, or `itemPropertiesByIds` of the `__User-Added_Data__` group. The example file below makes datasets added from the "My Data" tab show a disclaimer in the workbench:

```json
{
  "models": {
    "__User-Added_Data__": {
      "itemProperties": {
        "shortReportSections": [
          {
            "name": "User added data",
            "content": "This dataset has been added by the user. The quality of this data is not guaranteed."
          }
        ]
      }
    }
  }
}
```
