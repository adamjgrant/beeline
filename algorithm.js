class Card {
  constructor(sides=[], value=0) {
    this.sides = sides;
    this.value = value;
  }
  set twelve_oclock(value) {
    this.sides[0] = value;
  }

  set two_oclock(value) {
    this.sides[1] = value;
  }

  set three_oclock(value) {
    this.sides[2] = value;
  }

  set numerical_value(value) {
    this.value = value;
  }

  clone() {
    const newCard = new Card();
    newCard.sides = [...this.sides];
    newCard.value = this.value;
    return newCard;
  }
}

class Deck {
  constructor() {
    this.possible_values = "BHF".split("");
    this.deck = []
    this.initiate_deck();
  }

  initiate_deck() {
    // With permutations of BHF, the deck will naturally have 27 variations.
    // With alternating directions of the numerical sequence, this is doubled to 54.
    // In order to have symmetry with these two conditions where there are no
    // duplicate cards, half of the deck needs to be an even number, so we add 
    // six extra cards rotating through BHF with wildcards 
    // 
    // We add three to each of the two iterations because we also need to keep the incidence
    // rate of B, H, and F equal, which requires using them in alternating positions in a multiple
    // of three cards.
    let symmetry_cards = [
      new Card("BHF".split("")),
      new Card("HFB".split("")),
      new Card("FBH".split(""))
    ]

    let symmetry_card_set_1 = symmetry_cards.map(card => card.clone());
    let symmetry_card_set_2 = symmetry_cards.map(card => card.clone());

    // Stub in wild values.
    symmetry_card_set_1[0].twelve_oclock = "*";
    symmetry_card_set_1[0].three_oclock = "*";
    symmetry_card_set_1[1].two_oclock = "*";
    symmetry_card_set_1[2].twelve_oclock = "*";
    symmetry_card_set_1[2].three_oclock = "*";

    symmetry_card_set_2[0].two_oclock = "*";
    symmetry_card_set_2[1].twelve_oclock = "*";
    symmetry_card_set_2[1].three_oclock = "*";
    symmetry_card_set_2[2].two_oclock = "*";

    let index = 0;
    this.possible_values.forEach(twelve_oclock => {
      this.possible_values.forEach(two_oclock => {
        this.possible_values.forEach(three_oclock => {
          const card = new Card();
          card.twelve_oclock = twelve_oclock;
          card.two_oclock = two_oclock;
          card.three_oclock = three_oclock;
          this.deck[index] = card;
          index++;
        });
      });
    });
    this.deck = [...this.deck, ...symmetry_card_set_1, ...this.deck.map(card => card.clone()), ...symmetry_card_set_2];

    const numerical_sequence = [
      ...Array.from({ length: 8 }, () => 1),
      ...Array.from({ length: 7 }, () => 2),
      ...Array.from({ length: 6 }, () => 3),
      ...Array.from({ length: 5 }, () => 5),
      ...Array.from({ length: 4 }, () => 10)
    ];
    let _numerical_sequence = [...numerical_sequence, ...numerical_sequence.reverse()];
    _numerical_sequence.forEach((value, index) => {
      this.deck[index].numerical_value = value;
    });
  }
}

let filled_deck = new Deck();

// Function to count occurrences of B, H, and F in each side of the deck
function countLetters(deck, letters) {
  let counts = Array.from({ length: deck[0].sides.length }, () => ({ B: 0, H: 0, F: 0 }));

  for (let card of deck) {
    card.sides.forEach((side, index) => {
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
    console.log(`Side ${index + 1}: ${JSON.stringify(count)}\n`);
  });

  return true;
}

// Function to check for duplicate cards
function testForDuplicateCards(deck) {
  let cardMap = new Map();
  let duplicates = [];

  deck.forEach((card, index) => {
    let cardKey = card.sides.join('') + card.value;
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
    console.log("\n");
  } else {
    console.log("Passed: No duplicate cards found.\n");
  }
}

// Function to print the deck in a tabular format
function printDeck(deck) {
  console.log('|Card|Side 1|Side 2|Side 3|Number|');
  console.log('|---|---|---|---|---|');
  deck.forEach((card, index) => {
    let sides = card.sides.map(side => side === null ? '-' : side).join('|');
    let number = card.value;
    console.log(`|Card ${index + 1}|${sides}|${number}|`);
  });
}

// Run the test for equal occurrences of B, H, and F
let testResult = testEqualLetterOccurrences(filled_deck.deck);
console.log(`${testResult ? "Passed" : "Failed"}: Test for equal occurrences of B, H, and F in each side.\n`);

// Run the test for duplicate cards
testForDuplicateCards(filled_deck.deck);

// Print the deck in a tabular format
printDeck(filled_deck.deck);