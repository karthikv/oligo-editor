var expect = chai.expect;

describe('Oligo Editor', function() {
  it('should convert to Oligo A', function() {
    var expected = {
      'tctttacttcaagtcgtttc': 'CACCGtctttacttcaagtcgtttc',
      'tctaggtacaacttttggca': 'CACCGtctaggtacaacttttggca',
      'acaattctaggtacaacttt': 'CACCGacaattctaggtacaacttt',
      'gaaagtggctatgctcaaaa': 'CACCgaaagtggctatgctcaaaa',
      'atgagagtaagaggaaggga': 'CACCGatgagagtaagaggaaggga',
      'atgaaatgaatgagagtaag': 'CACCGatgaaatgaatgagagtaag',
      'aatgagagtaagaggaaggg': 'CACCGaatgagagtaagaggaaggg'
    };

    for (var seq in expected) {
      if (expected.hasOwnProperty(seq)) {
        expect(convertToOligoA(seq)).to.equal(expected[seq]);
      }
    }
  });

  it('should convert to Oligo B', function() {
    var expected = {
      'tctttacttcaagtcgtttc': 'AAACgaaacgacttgaagtaaagaC',
      'tctaggtacaacttttggca': 'AAACtgccaaaagttgtacctagaC',
      'acaattctaggtacaacttt': 'AAACaaagttgtacctagaattgtC',
      'gaaagtggctatgctcaaaa': 'AAACttttgagcatagccactttc',
      'atgagagtaagaggaaggga': 'AAACtcccttcctcttactctcatC',
      'atgaaatgaatgagagtaag': 'AAACcttactctcattcatttcatC',
      'aatgagagtaagaggaaggg': 'AAACcccttcctcttactctcattC'
    };

    for (var seq in expected) {
      if (expected.hasOwnProperty(seq)) {
        expect(convertToOligoB(seq)).to.equal(expected[seq]);
      }
    }
  });

  it('should convert end-to-end', function(done) {
    var sequencesTextarea = document.querySelector("#sequences textarea");
    sequencesTextarea.value = 'tctttacttcaagtcgtttc\n' +
      'tctaggtacaacttttggca\n' +
      'acaattctaggtacaacttt\n' +
      'gaaagtggctatgctcaaaa\n' +
      'atgagagtaagaggaaggga\n' +
      'atgaaatgaatgagagtaag\n' +
      'aatgagagtaagaggaaggg\n';

    var event = new Event('keyup');
    sequencesTextarea.dispatchEvent(event);

    var resultsTextarea = document.querySelector("#results textarea");
    var expectedResult = 'CACCGtctttacttcaagtcgtttc\n' +
      'AAACgaaacgacttgaagtaaagaC\n' +
      '---\n' +
      'CACCGtctaggtacaacttttggca\n' +
      'AAACtgccaaaagttgtacctagaC\n' +
      '---\n' +
      'CACCGacaattctaggtacaacttt\n' +
      'AAACaaagttgtacctagaattgtC\n' +
      '---\n' +
      'CACCgaaagtggctatgctcaaaa\n' +
      'AAACttttgagcatagccactttc\n' +
      '---\n' +
      'CACCGatgagagtaagaggaaggga\n' +
      'AAACtcccttcctcttactctcatC\n' +
      '---\n' +
      'CACCGatgaaatgaatgagagtaag\n' +
      'AAACcttactctcattcatttcatC\n' +
      '---\n' +
      'CACCGaatgagagtaagaggaaggg\n' +
      'AAACcccttcctcttactctcattC\n' +
      '---\n';

    setTimeout(function() {
      expect(resultsTextarea.value).to.equal(expectedResult);
      done();
    }, 10);
  });
});
