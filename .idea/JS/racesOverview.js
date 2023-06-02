const raceList = document.getElementById('race-list');

// Function to fetch and display races
function displayRaces() {
    fetch('http://localhost:8080/races')
        .then(response => response.json())
        .then(races => {
            raceList.innerHTML = '';
            races.forEach(race => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `ID: ${race.id} - Boat Type: ${getBoatTypeLabel(race.boatType)} - Date: ${race.date} - Points: ${race.points}`;
                raceList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching races:', error);
        });
}

// Function to get the boat type label based on the boat type value
function getBoatTypeLabel(type) {
    switch (type) {
        case 1:
            return 'Longer than 40 feet';
        case 2:
            return '25 or less feet';
        case 3:
            return '25-40 feet';
        default:
            return 'Unknown';
    }
}

// Display races on page load
displayRaces();
