// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * dnaBases.length)];
};


// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};


// Mutates a random DNA base
const mutateRandBase = (base) => {
    let mutatedBase = base;
    const dnaBases = ['A', 'T', 'C', 'G'];
    do {
        mutatedBase = dnaBases[Math.floor(Math.random() * dnaBases.length)];
    } while (mutatedBase === base);
    return mutatedBase;
};


// Rounds an integer to 2 decimals
const roundTo = (n, place) => +(Math.round(n + "e+" + place) + "e-" + place);


// Factory function to create multiple organism objects
const pAequorFactory = (num, dnaArray) => {
    return {
        specimenNum : num,
        dna : dnaArray,
        mutate(){
            let i = Math.floor(Math.random() * 15);
            this.dna[i] = mutateRandBase(this.dna[i]);
            return this.dna;    
        },
        compareDNA(pAequor){
            let hits = 0;
            for(let i = 0 ; i < this.dna.length ; i++){
                if(this.dna[i] === pAequor.dna[i]){
                    hits +=1;
                }; 
            };
            console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${roundTo((hits/this.dna.length) * 100, 2) }% DNA in common`);
        }
    }
};


// create sample objects from pAequorFactory
const makeMeSamples = (num) => {
    const sampleObjects = [];
    for(let i=1 ; i <= num ; i++){
        sampleObjects.push(pAequorFactory(i, mockUpStrand()));
    }
    return sampleObjects;
};


let samples = makeMeSamples(2);
console.log(...samples);
samples[0].compareDNA(samples[1]);
  
  