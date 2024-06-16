//Affiche l'heure
export function formatTime(d){

//Converti ISO en objet Date
let date = new Date(d);

//Converti en format heure et minute
let hours = String(date.getHours()).padStart(2, '0');
let minutes = String(date.getMinutes()).padStart(2, '0');

//heure:minute
let formatTime = `${hours}:${minutes}`;

//Affiche l'heure
return formatTime;
}

