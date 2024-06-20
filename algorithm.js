class Card {
  constructor() {
    this.sides = [];
    this.value = 0;
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
    this.deck = [...this.deck, ...this.deck.map(card => card.clone())];

    const numerical_sequence = [
      ...Array.from({ length: 9 }, () => 1),
      ...Array.from({ length: 6 }, () => 2),
      ...Array.from({ length: 5 }, () => 3),
      ...Array.from({ length: 4 }, () => 5),
      ...Array.from({ length: 3 }, () => 10)
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
    console.log(`Side ${index + 1}: ${JSON.stringify(count)}`);
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
  } else {
    console.log("No duplicate cards found.");
  }
}

// Function to print the deck in a tabular format
function printDeck(deck) {
  console.log('Card\tSide 1\tSide 2\tSide 3\tNumber');
  console.log('----------------------------------');
  deck.forEach((card, index) => {
    let sides = card.sides.map(side => side === null ? '-' : side).join('\t');
    let number = card.value;
    console.log(`Card ${index + 1}\t${sides}\t${number}`);
  });
}

// Run the test for equal occurrences of B, H, and F
let testResult = testEqualLetterOccurrences(filled_deck.deck);
console.log("Test for equal occurrences of B, H, and F in each side:", testResult ? "Passed" : "Failed");

// Run the test for duplicate cards
testForDuplicateCards(filled_deck.deck);

// Print the deck in a tabular format
printDeck(filled_deck.deck);