var scaling_factor = 6;
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
  exportOptions.horizontalScale = 100 * scaling_factor;
  exportOptions.verticalScale = 100 * scaling_factor;

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
  PLATE: "Plate",
  BIG_BEE: "Big Bee",
  BIG_QUEEN: "Big Queen",
  HOW_TO_PLAY: "How to Play",
  HOW_TO_PLAY_BACKGROUND: "HTPBackground",
  BEELINE: "Beeline",
  BEELINE_TITLE: "Beeline Title",
  BEELINE_STEP1: "Beeline Step 1",
  BEELINE_STEP2: "Beeline Step 2",
  BEELINE_STEP3: "Beeline Step 3",
  BEELINE_STEP4: "Beeline Step 4",
  CARD_BACK: "Card Back"
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
  { name: 'card01', layers: [], symbols: 'BBB', value: 1 },
  { name: 'card02', layers: [], symbols: 'BBH', value: 1 },
  { name: 'card03', layers: [], symbols: 'BBF', value: 1 },
  { name: 'card04', layers: [], symbols: 'BHB', value: 1 },
  { name: 'card05', layers: [], symbols: 'BHH', value: 1 },
  { name: 'card06', layers: [], symbols: 'BHF', value: 1 },
  { name: 'card07', layers: [], symbols: 'BFB', value: 1 },
  { name: 'card08', layers: [], symbols: 'BFH', value: 1 },
  { name: 'card09', layers: [], symbols: 'BFF', value: 2 },
  { name: 'card10', layers: [], symbols: 'HBB', value: 2 },
  { name: 'card11', layers: [], symbols: 'HBH', value: 2 },
  { name: 'card12', layers: [], symbols: 'HBF', value: 2 },
  { name: 'card13', layers: [], symbols: 'HHB', value: 2 },
  { name: 'card14', layers: [], symbols: 'HHH', value: 2 },
  { name: 'card15', layers: [], symbols: 'HHF', value: 2 },
  { name: 'card16', layers: [], symbols: 'HFB', value: 3 },
  { name: 'card17', layers: [], symbols: 'HFH', value: 3 },
  { name: 'card18', layers: [], symbols: 'HFF', value: 3 },
  { name: 'card19', layers: [], symbols: 'FBB', value: 3 },
  { name: 'card20', layers: [], symbols: 'FBH', value: 3 },
  { name: 'card21', layers: [], symbols: 'FBF', value: 3 },
  { name: 'card22', layers: [], symbols: 'FHB', value: 5 },
  { name: 'card23', layers: [], symbols: 'FHH', value: 5 },
  { name: 'card24', layers: [], symbols: 'FHF', value: 5 },
  { name: 'card25', layers: [], symbols: 'FFB', value: 5 },
  { name: 'card26', layers: [], symbols: 'FFH', value: 5 },
  { name: 'card27', layers: [], symbols: 'FFF', value: 10 },
  { name: 'card28', layers: [], symbols: 'WHW', value: 10 },
  { name: 'card29', layers: [], symbols: 'HWB', value: 10 },
  { name: 'card30', layers: [], symbols: 'WBW', value: 10 },
  { name: 'card31', layers: [], symbols: 'BBB', value: 10 },
  { name: 'card32', layers: [], symbols: 'BBH', value: 10 },
  { name: 'card33', layers: [], symbols: 'BBF', value: 10 },
  { name: 'card34', layers: [], symbols: 'BHB', value: 10 },
  { name: 'card35', layers: [], symbols: 'BHH', value: 5 },
  { name: 'card36', layers: [], symbols: 'BHF', value: 5 },
  { name: 'card37', layers: [], symbols: 'BFB', value: 5 },
  { name: 'card38', layers: [], symbols: 'BFH', value: 5 },
  { name: 'card39', layers: [], symbols: 'BFF', value: 5 },
  { name: 'card40', layers: [], symbols: 'HBB', value: 3 },
  { name: 'card41', layers: [], symbols: 'HBH', value: 3 },
  { name: 'card42', layers: [], symbols: 'HBF', value: 3 },
  { name: 'card43', layers: [], symbols: 'HHB', value: 3 },
  { name: 'card44', layers: [], symbols: 'HHH', value: 3 },
  { name: 'card45', layers: [], symbols: 'HHF', value: 3 },
  { name: 'card46', layers: [], symbols: 'HFB', value: 2 },
  { name: 'card47', layers: [], symbols: 'HFH', value: 2 },
  { name: 'card48', layers: [], symbols: 'HFF', value: 2 },
  { name: 'card49', layers: [], symbols: 'FBB', value: 2 },
  { name: 'card50', layers: [], symbols: 'FBH', value: 2 },
  { name: 'card51', layers: [], symbols: 'FBF', value: 2 },
  { name: 'card52', layers: [], symbols: 'FHB', value: 2 },
  { name: 'card53', layers: [], symbols: 'FHH', value: 1 },
  { name: 'card54', layers: [], symbols: 'FHF', value: 1 },
  { name: 'card55', layers: [], symbols: 'FFB', value: 1 },
  { name: 'card56', layers: [], symbols: 'FFH', value: 1 },
  { name: 'card57', layers: [], symbols: 'FFF', value: 1 },
  { name: 'card58', layers: [], symbols: 'BWF', value: 1 },
  { name: 'card59', layers: [], symbols: 'WFW', value: 1 },
  { name: 'card60', layers: [], symbols: 'FWH', value: 1 },
  { name: 'card61', layers: ["Background", "Auras", "Plate", "Shapes", "Subplate", "Big Bee"], symbols: '', value: 0 },
  { name: 'card62', layers: ["Background", "Auras", "Plate", "Shapes", "Subplate", "Big Queen"], symbols: '', value: 0 },
  { name: 'card63', layers: ["How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 1"], symbols: '', value: 0 },
  { name: 'card64', layers: ["How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 2"], symbols: '', value: 0 },
  { name: 'card65', layers: ["How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 3"], symbols: '', value: 0 },
  { name: 'card66', layers: ["How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 4"], symbols: '', value: 0 },
  { name: 'cardback', layers: ["Card Back"], symbols: '', value: 0 }
];

var RECIPES_AS_PREVIEWS = []
function shallowCopyObject(originalObject) {
  var shallowCopy = {};
  for (var key in originalObject) {
    if (originalObject.hasOwnProperty(key)) {
      shallowCopy[key] = originalObject[key];
    }
  }
  return shallowCopy;
}

for (var m = 0; m < 5; m++) {
  var recipe = shallowCopyObject(RECIPES[m*9]);
  recipe.layers = recipe.layers.slice(); // Ensure layers array is copied correctly
  recipe.layers.push(LAYERS.CUTLINE);
  recipe.name = "preview_" + recipe.name;
  RECIPES_AS_PREVIEWS.push(recipe);
}
RECIPES = RECIPES.concat(RECIPES_AS_PREVIEWS);
RECIPES = RECIPES.concat([
  { name: 'preview_cardback', layers: ["Card Back", "Cutline"], symbols: '', value: 0 },
  { name: 'preview_card61', layers: ["Cutline", "Background", "Auras", "Plate", "Shapes", "Subplate", "Big Bee"], symbols: '', value: 0 },
  { name: 'preview_card62', layers: ["Cutline", "Background", "Auras", "Plate", "Shapes", "Subplate", "Big Queen"], symbols: '', value: 0 },
  { name: 'preview_card63', layers: ["Cutline", "How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 1"], symbols: '', value: 0 },
  { name: 'preview_card64', layers: ["Cutline", "How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 2"], symbols: '', value: 0 },
  { name: 'preview_card65', layers: ["Cutline", "How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 3"], symbols: '', value: 0 },
  { name: 'preview_card65', layers: ["Cutline", "How to Play", "HTPBackground", "Beeline", "Beeline Title", "Beeline Step 4"], symbols: '', value: 0 },
]);

const destFolder = Folder.selectDialog("Select the folder to export to");

for (var i = 0; i < RECIPES.length; i++) {
  var recipe = RECIPES[i];
  hideAllLayers();
  
  for (var j = 0; j < recipe.layers.length; j++) {
    showLayer(recipe.layers[j]);
  }
  
  if (recipe.symbols.length) {
    showLayer(LAYERS.ICONS);
    var symbols = recipe.symbols.split("");
    for (var k = 0; k < symbols.length; k++) {
      showLayer(LAYERS["SIDE"+ (k+1)]);
      showLayer(LAYERS["SIDE" + (k + 1) + symbols[k]]);
    }
  }
  
  if (recipe.value > 0) {
    var layers_to_show = [
      LAYERS.NUMERICAL_VALUES,
      LAYERS.SHAPES,
      LAYERS.NUMBER_HOLDER,
      LAYERS.DASHED_LINE,
      LAYERS.BACKGROUND,
      LAYERS.AURAS,
      LAYERS.SUBPLATE,
      LAYERS.PLATE
    ]
    for (var l = 0;l < layers_to_show.length;l++) {
      showLayer(layers_to_show[l]);
    }
    showLayer(LAYERS["VALUE_" + recipe.value]);
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