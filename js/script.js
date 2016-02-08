var SEQUENCES_REGEX = /^[atcg\r\n]*$/i;
var BASE_PAIR_COMPLEMENT = {
  'A': 'T',
  'T': 'A',
  'C': 'G',
  'G': 'C'
};

var sequencesTextarea = document.querySelector('#sequences textarea');
var sequencesError = document.querySelector('#sequences span');
var resultsTextarea = document.querySelector('#results textarea');
var lastSequencesValue = '';

sequences.addEventListener('keyup', function(event) {
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
    var seqUpper = seq.toUpperCase()
    var results = convertToOligoA(seqUpper) + "\n" +
                  convertToOligoB(seqUpper) + "\n" +
                  "---\n";

    resultsTextarea.value += results;
  });
});

/* Converts the given sequence to Oligo A form. */
function convertToOligoA(seq) {
  var startsWithG = seq[0] === 'G';

  if (startsWithG) {
    return 'CACC' + seq.toLowerCase();
  } else {
    return 'CACCG' + seq.toLowerCase();
  }
}

/* Converts the given sequence to Oligo B form. */
function convertToOligoB(seq) {
  var startsWithG = seq[0] === 'G';
  var seqRC = reverseComplement(seq);

  if (startsWithG) {
    return 'AAAC' + seqRC.toLowerCase();
  } else {
    return 'AAAC' + seqRC.toLowerCase() + 'C';
  }
}

/* Returns the reverse compliment of the given sequence. */
function reverseComplement(seq) {
  var complement = seq.split('').map(function(basePair) {
    return BASE_PAIR_COMPLEMENT[basePair];
  });
  return complement.reverse().join('');
}
