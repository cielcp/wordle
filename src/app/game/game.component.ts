import { Component, OnInit } from '@angular/core';
import { WordleService } from '../wordle.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],

})
export class GameComponent implements OnInit {
    targetWord: string = '';
    guesses: { word: string, inWord: number, inPlace: number, lengthHint: string }[] = [];
    currentGuess: string = '';
    message: string = ''; 

    constructor(private wordleService: WordleService) { }

    ngOnInit(): void {
        this.startNewGame();
    }

    startNewGame(): void {
        this.guesses = [];
        this.getWord();
        this.message = '';
    }

    getWord(): void {
      this.wordleService.getRandomWord().subscribe(
        (data: any) => {
          this.targetWord = data.word;
        },
        (error) => {
          console.error('Error fetching random word:', error);
        }
      );
    }

    onGuess(): void {
        if (!this.currentGuess){
            return;
        }

        const guessChars = this.currentGuess.split('');
        const targetChars = this.targetWord.split('');

        const inWord = guessChars.filter(char => targetChars.includes(char)).length;
        const inPlace = guessChars.filter((char, i) => char === targetChars[i]).length;
        const lengthHint = this.currentGuess.length === this.targetWord.length ?
        'Correct length' :
        (this.currentGuess.length > this.targetWord.length ? 'Too long' : 'Too short');
        
        this.guesses.push({
            word: this.currentGuess,
            inWord,
            inPlace,
            lengthHint,
        });

        if (this.currentGuess === this.targetWord) {
            this.message = "You win! The correct word was " + this.targetWord;
        }
        
        this.currentGuess = '';
    }
}
