// Access the active document
var doc = app.activeDocument;

// Function to show a layer by name
function showLayer(layerName) {
    var layer = getLayerByName(layerName, doc.layers);
    if (layer) {
        layer.visible = true;
    } else {
        alert("Layer not found: " + layerName);
    }
}

// Function to hide a layer by name
function hideLayer(layerName) {
    var layer = getLayerByName(layerName, doc.layers);
    if (layer) {
        layer.visible = false;
    } else {
        alert("Layer not found: " + layerName);
    }
}

// Recursive function to get a layer or sublayer by name
function getLayerByName(layerName, layers) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.name == layerName) {
            return layer;
        }
        var sublayer = getLayerByName(layerName, layer.layers);
        if (sublayer) {
            return sublayer;
        }
    }
    return null;
}

// Function to collect all selectable objects from visible and unlocked layers and sublayers
function collectVisibleObjects() {
    var selectableItems = [];
    collectVisibleObjectsFromLayers(doc.layers, selectableItems);

    if (selectableItems.length > 0) {
        doc.selection = selectableItems;
        return selectableItems;
    }
    return null;
}

// Recursive function to collect selectable objects from layers and sublayers
function collectVisibleObjectsFromLayers(layers, selectableItems) {
    for (var i = 0; i < layers.length; i++) {
        var layer = layers[i];
        if (layer.visible && !layer.locked) {
            for (var j = 0; j < layer.pageItems.length; j++) {
                var item = layer.pageItems[j];
                if (!item.locked && item.hidden == false) {
                    selectableItems.push(item);
                }
            }
            collectVisibleObjectsFromLayers(layer.layers, selectableItems);
        }
    }
}

// Function to export selected objects as assets
function exportSelectedObjects(destinationFolder, fileName) {
    var exportOptions = new ExportOptionsPNG24();
    exportOptions.artBoardClipping = true;

    var file = new File(destinationFolder + "/" + fileName + ".png");
    doc.exportFile(file, ExportType.PNG24, exportOptions);
}

var LAYERS = {
  CUTLINE: "Cutline",
  ICONS: "Icons",
  SIDE1: "Side 1",
  SIDE1B: "side1B",
  SIDE1W: "side1W",
  SIDE1F: "side1F",
  SIDE1H: "side1H",
  SIDE2: "Side 2",
  SIDE2B: "side2B",
  SIDE2W: "side2W",
  SIDE2F: "side2F",
  SIDE2H: "side2H",
  SIDE3: "Side 3",
  SIDE3B: "side3B",
  SIDE3W: "side3W",
  SIDE3F: "side3F",
  SIDE3H: "side3H",
  NUMERICAL_VALUES: "Numerical Values",
  VALUE_1: "1",
  VALUE_2: "2",
  VALUE_3: "3",
  VALUE_5: "5",
  VALUE_10: "10",
  SHAPES: "Shapes",
  NUMBER_HOLDER: "Number holder",
  DASHED_LINE: "Dashed Line",
  BACKGROUND: "Background",
  AURAS: "Auras",
  SUBPLATE: "Subplate",
  PLATE: "Plate"
}

// Function to hide all layers defined in an object
function hideAllLayers() {
  for (var key in LAYERS) {
      if (LAYERS.hasOwnProperty(key)) {
          var layerName = LAYERS[key];
          hideLayer(layerName);
      }
  }
}

var RECIPES = [
  {
    "name": "card01",
    "layers": [
      LAYERS.ICONS,
      LAYERS.SIDE1,
      LAYERS.SIDE1B,
      LAYERS.SIDE2,
      LAYERS.SIDE2B,
      LAYERS.SIDE3,
      LAYERS.SIDE3B,
      LAYERS.NUMERICAL_VALUES,
      LAYERS.VALUE_1,
      LAYERS.SHAPES,
      LAYERS.NUMBER_HOLDER,
      LAYERS.DASHED_LINE,
      LAYERS.BACKGROUND,
      LAYERS.AURAS,
      LAYERS.SUBPLATE,
      LAYERS.PLATE
    ],
    "symbols": "BBB",
    "value": 1
  }
];

const destFolder = Folder.selectDialog("Select the folder to export to");

for (var i = 0; i < RECIPES.length; i++) {
  var recipe = RECIPES[i];
  hideAllLayers();
  
  for (var j = 0; j < recipe.layers.length; j++) {
    showLayer(recipe.layers[j]);
  }
  
  if (recipe.symbols.length) {
    var symbols = recipe.symbols.split("");
    for (var k = 0; k < symbols.length; k++) {
      showLayer("side" + (k + 1) + symbols[k]);
    }
  }
  
  if (recipe.value > 0) {
    showLayer("Numerical Values");
    showLayer("" + recipe.value);
  }

  var selectedItems = collectVisibleObjects();
  if (selectedItems) {
    if (destFolder) {
      exportSelectedObjects(destFolder, recipe.name);
    }
  } else {
    alert("No selectable objects found in visible and unlocked layers.");
  }
}