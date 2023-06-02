const raceList = document.getElementById('race-list');
const addRaceButton = document.getElementById('add-race-button');
const raceModal = document.getElementById('race-modal');
const modalTitle = document.getElementById('modal-title');
const raceForm = document.getElementById('race-form');

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

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => openEditRaceModal(race.id));
                listItem.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteRace(race.id));
                listItem.appendChild(deleteButton);
            });
        })
        .catch(error => {
            console.error('Error fetching races:', error);
        });
}

// Other functions defined (openRaceModal, openEditRaceModal, closeRaceModal, handleRaceFormSubmit, deleteRace, getBoatTypeLabel)

// Add event listeners
addRaceButton.addEventListener('click', openRaceModal);
raceModal.addEventListener('click', function(event) {
    if (event.target === raceModal || event.target.classList.contains('close')) {
        closeRaceModal();
    }
});
raceForm.addEventListener('submit', handleRaceFormSubmit);

// Display races on page load
displayRaces();
