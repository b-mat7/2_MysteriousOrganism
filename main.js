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
const mutateRandBase = base => {
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
        
        // changes random DNA base into a different base
        mutate(){
            let i = Math.floor(Math.random() * 15);
            this.dna[i] = mutateRandBase(this.dna[i]);
            return this.dna;    
        },
        
        // compares each base and returns match %
        compareDNA(pAequor){
            let hits = 0;
            for(let i = 0 ; i < this.dna.length ; i++){
                if(this.dna[i] === pAequor.dna[i]){
                    hits +=1;
                }; 
            };
            console.log(`Specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${roundTo((hits/this.dna.length) * 100, 2) }% DNA in common`);
        },

        // returns true only of 60% of bases are 'C' or 'G'
        willLikelySurvive(){
            const cgItems = this.dna.filter(item => item === 'C' || item === 'G');
            console.log(...cgItems);
            console.log(cgItems.length / this.dna.length);
            return (cgItems.length / this.dna.length >= 0.6) ? true : false;
        }
    }
};


// create sample objects from pAequorFactory
const makeSamples = num => {
    const sampleObjects = [];
    for(let i=1 ; i <= num ; i++){
        sampleObjects.push(pAequorFactory(i, mockUpStrand()));
    }
    return sampleObjects;
};


// create surviveable sample objects from pAequorFactory
const makeSurviveableSamples = num => {
    const sampleObjects = [];
    let i = 1;
    do {
        let testObj = pAequorFactory(i, mockUpStrand());
        testObj.willLikelySurvive() === true ? sampleObjects.push(testObj) : false;
        i ++;
    } while(sampleObjects.length < num);
    return sampleObjects;
};



let samples = makeSurviveableSamples(30);
console.log(...samples);
// samples[0].compareDNA(samples[1]);
// console.log(samples[0].willLikelySurvive());  