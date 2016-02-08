var SEQUENCES_REGEX = /^[atcg\r\n]*$/i;
var BASE_PAIR_COMPLEMENT = {
  'a': 't',
  't': 'a',
  'c': 'g',
  'g': 'c'
};

var sequencesTextarea = document.querySelector('#sequences textarea');
var sequencesError = document.querySelector('#sequences span');
var resultsTextarea = document.querySelector('#results textarea');
var lastSequencesValue = '';

sequencesTextarea.addEventListener('keyup', function(event) {
  resultsTextarea.value = '';

  // ensure sequences are valid
  if (SEQUENCES_REGEX.test(sequencesTextarea.value)) {
    sequencesError.textContent = "";
  } else {
    sequencesError.textContent = "Each sequence must only consist of A, C " +
      "T, and G.";
    return;
  }

  var sequences = sequencesTextarea.value.split(/\r?\n/);
  sequences.forEach(function(seq) {
    if (seq.length > 0) {
      var seqLower = seq.toLowerCase()
      var results = convertToOligoA(seqLower) + "\n" +
                    convertToOligoB(seqLower) + "\n" +
                    "---\n";

      resultsTextarea.value += results;
    }
  });
});

/* Converts the given sequence to Oligo A form. */
function convertToOligoA(seq) {
  var startsWithG = seq[0] === 'g';

  if (startsWithG) {
    return 'CACC' + seq;
  } else {
    return 'CACCG' + seq;
  }
}

/* Converts the given sequence to Oligo B form. */
function convertToOligoB(seq) {
  var startsWithG = seq[0] === 'g';
  var seqRC = reverseComplement(seq);

  if (startsWithG) {
    return 'AAAC' + seqRC;
  } else {
    return 'AAAC' + seqRC + 'C';
  }
}

/* Returns the reverse compliment of the given sequence. */
function reverseComplement(seq) {
  var complement = seq.split('').map(function(basePair) {
    return BASE_PAIR_COMPLEMENT[basePair];
  });
  return complement.reverse().join('');
}
