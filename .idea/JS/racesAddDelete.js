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
                listItem.innerHTML = `ID: ${race.id} - ${race.name}`;
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

// Function to open the race modal for adding a new race
function openRaceModal() {
    modalTitle.textContent = 'Add Race';
    raceForm.reset();
    raceModal.style.display = 'block';
}

// Function to open the race modal for editing a race
function openEditRaceModal(id) {
    modalTitle.textContent = 'Edit Race';
    fetch(`http://localhost:8080/races/${id}`)
        .then(response => response.json())
        .then(race => {
            document.getElementById('race-id').value = race.id;
            document.getElementById('name').value = race.name;
            raceModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching race:', error);
        });
}

// Function to close the race modal
function closeRaceModal() {
    raceModal.style.display = 'none';
}

// Function to handle race form submission (create or update)
function handleRaceFormSubmit(event) {
    event.preventDefault();

    const raceId = document.getElementById('race-id').value;
    const raceName = document.getElementById('name').value;

    const race = {
        name: raceName
    };

    let request;

    if (raceId) {
        request = fetch(`http://localhost:8080/races/${raceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(race)
        });
    } else {
        request = fetch('http://localhost:8080/races', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(race)
        });
    }

    request
        .then(response => {
            if (response.ok) {
                closeRaceModal();
                displayRaces();
            } else {
                console.error('Error saving race:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error saving race:', error);
        });
}

// Function to delete a race
function deleteRace(id) {
    fetch(`http://localhost:8080/races/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                displayRaces();
            } else {
                console.error('Error deleting race:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting race:', error);
        });
}

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
