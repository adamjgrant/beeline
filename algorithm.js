// Create a table with 62 rows and 7 columns. The first 60 rows are for the cards, and the last 2 rows are for the special cards.
let card_count = 62;
let special_card_count = 2;
let card_property_count = 7;

class Deck {
  constructor() {
    let empty_deck = Array.from({ length: card_count - special_card_count }, () => new Array(card_property_count).fill(null));
    empty_deck.push(...Array.from({ length: special_card_count }, () => new Array(card_property_count).fill("Special")));
    this.deck = empty_deck;
  }
  
  set_side_at_card_index(card=0, index=0, value) {
    this.deck[card][index] = value;
  }

  get_side_at_card_index(card=0, index=0) {
    return this.deck[card][index];
  }
  
  set_sides_at_card_index(card_index = 0, values = "BHFBHF") {
    const values_as_array = values.split("");
    this.set_side_at_card_index(card_index, 0, values_as_array[0]);
    this.set_side_at_card_index(card_index, 1, values_as_array[1]);
    this.set_side_at_card_index(card_index, 2, values_as_array[2]);
    this.set_side_at_card_index(card_index, 3, values_as_array[3]);
    this.set_side_at_card_index(card_index, 4, values_as_array[4]);
    this.set_side_at_card_index(card_index, 5, values_as_array[5]);
  }
  
  set_value_of_card(card=0, value = 1) {
    this.deck[card][6] = value;
  }
  
  apply_custom_rules(card_index) {
    let rule_index = card_index % 15;
    switch (rule_index) {
      case 0:
        this.set_sides_at_card_index(card_index, "BBBBBB");
        break;
      case 1:
        this.set_sides_at_card_index(card_index, "FFFFFF");
        break;
      case 2:
        this.set_sides_at_card_index(card_index, "HHHHHH");
        break;
      case 6:
        // Replace the first two non-B instances with B
        this.replace_non_instances(card_index, ['B'], 2);
        this.set_side_at_card_index(card_index, 0, 'F');
        break;
      case 7:
        // Replace the first three non-B instances with B
        this.replace_non_instances(card_index, ['B'], 1);
        this.set_side_at_card_index(card_index, 1, 'H');
        break;
      case 8:
        // Replace the first two non-F instances with F
        this.replace_non_instances(card_index, ['F'], 2);
        this.set_side_at_card_index(card_index, 0, 'B');
        break;
      case 9:
        // Replace the first three non-F instances with F
        this.replace_non_instances(card_index, ['F'], 3);
        break;
      case 10:
        // Replace the first two non-H instances with H
        this.replace_non_instances(card_index, ['H'], 1);
        this.set_side_at_card_index(card_index, 0, 'F');
        break;
      case 11:
        // Replace the first three non-H instances with H
        this.replace_non_instances(card_index, ['H'], 2);
        break;
      case 12:
        // For the first two non-B and non-F instances, replace with B and F respectively
        this.replace_non_instances(card_index, ['B', 'F'], 1);
        this.set_side_at_card_index(card_index, 2, 'H');
        break;
      case 13:
        // For the first two non-F and non-H instances, replace with F and H respectively
        this.replace_non_instances(card_index, ['F', 'H'], 1);
        this.set_side_at_card_index(card_index, 4, 'H');
        break;
      case 14:
        // For the first two non-H and non-B instances, replace with H and B respectively
        this.replace_non_instances(card_index, ['H', 'B'], 1);
        this.set_side_at_card_index(card_index, 5, 'B');
        break;
      default:
        // Do nothing for rows 3, 4, and 5
        break;
    }
  }

  replace_non_instances(card_index, chars, count) {
    let replacement_count = 0;
    for (let i = 0; i < this.deck[card_index].length; i++) {
      if (this.deck[card_index][i] !== 'Special' && !chars.includes(this.deck[card_index][i])) {
        this.deck[card_index][i] = chars[replacement_count % chars.length];
        replacement_count++;
        if (replacement_count >= count * chars.length) break;
      }
    }
  }
}

let filled_deck = new Deck();

let deck_length_without_special_cards = filled_deck.deck.length - special_card_count;
let sequence = "BHFBHF";
let card_index = 0;
let numerical_sequence = [10, 5, 5, 3, 3, 2, 2, 1, 1, 1, 1, 1];

// Initialize the first row of the table with the pattern BHFBHF.
// Fill in the subsequent rows by shifting the pattern to the left by one position for each row.
while (card_index < deck_length_without_special_cards) {
  filled_deck.set_sides_at_card_index(card_index, sequence);
  
  // Initialize the number column with the sequence 10, 5, 5, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 and cycle through this sequence.
  let this_number = numerical_sequence.shift();
  filled_deck.set_value_of_card(card_index, this_number);
  numerical_sequence.push(this_number);
  
  // Apply custom rules
  filled_deck.apply_custom_rules(card_index);

  card_index++;
  let sequence_as_array = sequence.split("");
  sequence_as_array.push(sequence_as_array.shift());
  sequence = sequence_as_array.join("");
}

// One off changes to prevent duplicate cards
function swap_letters_for_cards_for_side(card1, card2, side) {
  let [card_index1, card_index2] = [card1 - 1, card2 - 1];
  let side_index = side - 1;
  const card1_letter = filled_deck.get_side_at_card_index(card_index1, side_index);
  const card2_letter = filled_deck.get_side_at_card_index(card_index2, side_index);
  filled_deck.set_side_at_card_index(card_index1, side_index, card2_letter);
  filled_deck.set_side_at_card_index(card_index2, side_index, card1_letter);
}

swap_letters_for_cards_for_side(25, 24, 1);
swap_letters_for_cards_for_side(23, 22, 2);
swap_letters_for_cards_for_side(35, 21, 1);
swap_letters_for_cards_for_side(47, 20, 3);
swap_letters_for_cards_for_side(48, 19, 1);
swap_letters_for_cards_for_side(56, 18, 1);
swap_letters_for_cards_for_side(57, 17, 1);
swap_letters_for_cards_for_side(59, 16, 1);
swap_letters_for_cards_for_side(60, 14, 2);

// Special Cards (Rows 61 and 62): These cards don’t have anything on the sides. They just have an icon right in the center.

// Function to count occurrences of B, H, and F in each side of the deck, excluding the last element (number column)
function countLetters(deck, letters) {
  let counts = Array.from({ length: deck[0].length - 1 }, () => ({ B: 0, H: 0, F: 0 }));

  for (let card of deck) {
    if (card.includes("Special")) continue; // Skip special cards
    card.slice(0, -1).forEach((side, index) => { // Exclude the last element
      if (letters.includes(side)) {
        counts[index][side]++;
      }
    });
  }

  return counts;
}

// Function to check if all sides have equal occurrences of B, H, and F
function testEqualLetterOccurrences(deck) {
  let counts = countLetters(deck, ["B", "H", "F"]);
  let referenceCount = counts[0];

  for (let i = 1; i < counts.length; i++) {
    for (let letter in referenceCount) {
      if (referenceCount[letter] !== counts[i][letter]) {
        console.log(`Test failed for letter '${letter}' in side ${i + 1}.`);
        console.log(`Expected count: ${referenceCount[letter]}, Actual count: ${counts[i][letter]}`);
        console.log("Full counts:");
        counts.forEach((count, index) => {
          console.log(`Side ${index + 1}: ${JSON.stringify(count)}`);
        });
        return false;
      }
    }
  }

  console.log("Full counts:");
  counts.forEach((count, index) => {
    console.log(`Side ${index + 1}: ${JSON.stringify(count)}`);
  });

  return true;
}

// Run the test and log the result
let testResult = testEqualLetterOccurrences(filled_deck.deck);
console.log("Test for equal occurrences of B, H, and F in each side:", testResult ? "Passed" : "Failed");

// Function to check for duplicate cards
function testForDuplicateCards(deck) {
  let cardMap = new Map();
  let duplicates = [];

  deck.forEach((card, index) => {
    if (card.includes("Special")) return; // Skip special cards
    let cardKey = card.slice(0, -1).join('') + card[6];
    if (cardMap.has(cardKey)) {
      duplicates.push({ card: cardKey, indices: [cardMap.get(cardKey), index] });
    } else {
      cardMap.set(cardKey, index);
    }
  });

  if (duplicates.length > 0) {
    console.log("Duplicate cards found:");
    duplicates.forEach(dup => {
      console.log(`Card ${dup.indices[0] + 1} and Card ${dup.indices[1] + 1} are duplicates: ${dup.card}`);
    });
  } else {
    console.log("No duplicate cards found.");
  }
}

// Run the test for duplicate cards
testForDuplicateCards(filled_deck.deck);

// Print the deck in a tabular format
printDeck(filled_deck.deck);

// Function to print the deck in a tabular format
function printDeck(deck) {
  deck.forEach((card, index) => {
    if (card.includes("Special")) {
      console.log(`Card ${index + 1}\tSpecial`);
    }
    else {
      let sides = card.slice(0, -1).map(side => side === null ? '-' : side).join('\t');
      let number = card[6];
      console.log(`Card ${index + 1}\t${sides}\t${number}`);
    }
  });
}