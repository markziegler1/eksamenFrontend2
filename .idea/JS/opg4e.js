const raceDropdown = document.getElementById('race-dropdown');
const selectedRaceDiv = document.getElementById('selected-race');

// Function to fetch and display races
function displayRaces() {
    fetch('http://localhost:8080/races')
        .then(response => response.json())
        .then(races => {
            // Add a default option
            const defaultOption = document.createElement('option');
            defaultOption.textContent = "--Please choose a race--";
            defaultOption.value = "";
            raceDropdown.appendChild(defaultOption);
            // Populate the dropdown with the fetched races
            races.forEach(race => {
                const option = document.createElement('option');
                option.value = race.id;
                option.textContent = `ID: ${race.id} - Boat Type: ${getBoatTypeLabel(race.boatType)} - Date: ${race.date} - Points: ${race.points}`;
                raceDropdown.appendChild(option);
            });
            // Handle change event for the dropdown
            raceDropdown.addEventListener('change', function() {
                const selectedRaceId = this.value;
                if (selectedRaceId) {
                    const selectedRace = races.find(race => race.id.toString() === selectedRaceId);
                    if (selectedRace) {
                        selectedRaceDiv.textContent = `ID: ${selectedRace.id} - Boat Type: ${getBoatTypeLabel(selectedRace.boatType)} - Date: ${selectedRace.date} - Points: ${selectedRace.points}`;
                    }
                } else {
                    selectedRaceDiv.textContent = '';
                }
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
