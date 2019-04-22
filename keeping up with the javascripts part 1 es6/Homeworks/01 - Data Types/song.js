/*
 * Homework #1: Data Types
 * Keeping Up With the Javascripts - Part 1: ES6
 * Pirple
 * 
 * Here Comes the Sun - The Beatles
 * 
 * JavaScript file to describe information about the song
 * and about the band
 * 
 * Alejandro Mohamad
 */

var artist = "The Beatles"; // Artist Name
var song = "Here Comes the Sun"; // Song Name
var genre = "Rock and Roll"; // Genre of the Song
var durationInSeconds = 185; // Duration in seconds of the Song
var yearReleased = 1969; // Year when eleased
var bandMembers = ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"]; // Members of the band
var songIsAmazing = true; // The song is truly amazing
var releasedAlbums = {
  1963: "Please Please Me",
  1963: "With the Beatles",
  1964: "A Hard Day's Night",
  1964: "Beatles for Sale",
  1965: "Help!",
  1965: "Rubber Soul",
  1966: "Revolver",
  1967: "Sgt. Pepper's Lonely Hearts Club Band",
  1967: "Magical Mystery Tour",
  1968: "The White Album",
  1969: "Yellow Submarine",
  1969: "Abbey Road",
  1970: "Let It Be",
}
// JS Object with the studio albums of the band

// This is where the information of the song & band is presented to the console
console.log(artist);
console.log(song);
console.log(genre);
console.log(durationInSeconds);
console.log(yearReleased);
console.log(bandMembers);
console.log(bandMembers[3]);
console.log(songIsAmazing);
console.log(releasedAlbums);
console.log(releasedAlbums[1969]);
