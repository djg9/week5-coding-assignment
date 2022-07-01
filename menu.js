
// Artist class
class Artist {
    constructor(name, favSong) {
        this.name = name;
        this.favSong = favSong;
    }

    blurb() {
        return `${this.name} is best known for ${this.topHit}`;
    }
}

// Genre class
class Genre {
    constructor(name) {
        this.name = name;
        this.artists = [];
    }

    blurb() {
        return `You are a fan of ${this.artists.length} artists in the ${this.name} genre.`;
    }

    addArtist(artist) {
        if(artist instanceof Artist) {
            this.artists.push(artist);
        } else {
            console.log('Error: Argument is not an instance of Artist');
        }
    }
}

// Menu class
class Menu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !== 0) {
            switch(selection) {
                case '1':
                    this.addGenre();
                    break;
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
                case '4':
                    this.displayAllGenres();
                    break;
                default:
                    selection = 0;
            }

            selection = this.showMainMenuOptions();
        }

        alert('You have left the menu');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Add a genre
            2) View a genre
            3) Delete a genre
            4) Display all genres
        `);
    }

    addGenre() {
        let name = prompt(`Enter a genre you like`);

        this.genres.push(new Genre(name));
    }

    viewGenre() {
        let index = prompt('Enter index of genre you want to view');

        if(index > -1 && index < this.genres.length) {
            this.genreSelected = this.genres[index];

            let description = 'Genre: ' + this.genreSelected.name + '\n';

            for(let i = 0; i < this.genreSelected.artists.length; i++) {
                description += i + ') ' + this.genreSelected.artists[i].name + ' - ' + this.genreSelected.artists[i].favSong + '\n';
            }

            let selectedOption = this.showGenreMenuOptions(description);

            switch(selectedOption) {
                case '1':
                    this.addArtist();
                    break;
                case '2':
                    this.deleteArtist();
            }
        }
    }

    showGenreMenuOptions(genreInfo) {
        return prompt(`
            0) Back
            1) Add Artist
            2) Delete Artist
            -----------------
            ${genreInfo}
        `);
    }

    addArtist() {
        let name = prompt('Enter artist name');
        let song = prompt('Enter your favorite song by this artist');

        this.genreSelected.artists.push(new Artist(name, song));
    }

    deleteArtist() {
        let index = prompt('Enter index of artist you want to delete');

        if(index > -1 && index < this.genreSelected.artists.length) {
            this.genreSelected.artists.splice(index, 1);
        }
    }

    deleteGenre() {
        let index = prompt('Enter index of genre you want to delete');

        if(index > -1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }
    }

    displayAllGenres() {
        let genreList = '';

        for(let i = 0; i < this.genres.length; i++) {
            genreList += i + ') ' + this.genres[i].name + '\n';
        }

        alert(genreList);
    }
}

var menu = new Menu();
menu.start();
