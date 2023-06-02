const boatList = document.getElementById('boat-list');
const addBoatButton = document.getElementById('add-boat-button');
const boatModal = document.getElementById('boat-modal');
const modalTitle = document.getElementById('modal-title');
const boatForm = document.getElementById('boat-form');

// Function to fetch and display boats
function displayBoats() {
    fetch('http://localhost:8080/boats')
        .then(response => response.json())
        .then(boats => {
            boatList.innerHTML = '';
            boats.forEach(boat => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `ID: ${boat.id} - ${boat.name} - ${getBoatTypeLabel(boat.type)}`;
                boatList.appendChild(listItem);

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => openEditBoatModal(boat.id));
                listItem.appendChild(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteBoat(boat.id));
                listItem.appendChild(deleteButton);
            });
        })
        .catch(error => {
            console.error('Error fetching boats:', error);
        });
}

// Function to open the boat modal for adding a new boat
function openBoatModal() {
    modalTitle.textContent = 'Add Boat';
    boatForm.reset();
    boatModal.style.display = 'block';
}

// Function to open the boat modal for editing a boat
function openEditBoatModal(id) {
    modalTitle.textContent = 'Edit Boat';
    fetch(`http://localhost:8080/boats/${id}`)
        .then(response => response.json())
        .then(boat => {
            document.getElementById('boat-id').value = boat.id;
            document.getElementById('name').value = boat.name;
            document.getElementById('type').value = boat.type;
            boatModal.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching boat:', error);
        });
}

// Function to close the boat modal
function closeBoatModal() {
    boatModal.style.display = 'none';
}

// Function to handle boat form submission (create or update)
function handleBoatFormSubmit(event) {
    event.preventDefault();

    const boatId = document.getElementById('boat-id').value;
    const boatName = document.getElementById('name').value;
    const boatType = document.getElementById('type').value;

    const boat = {
        name: boatName,
        type: boatType
    };

    let request;

    if (boatId) {
        request = fetch(`http://localhost:8080/boats/${boatId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boat)
        });
    } else {
        request = fetch('http://localhost:8080/boats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boat)
        });
    }

    request
        .then(response => {
            if (response.ok) {
                closeBoatModal();
                displayBoats();
            } else {
                console.error('Error saving boat:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error saving boat:', error);
        });
}

// Function to delete a boat
function deleteBoat(id) {
    fetch(`http://localhost:8080/boats/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                displayBoats();
            } else {
                console.error('Error deleting boat:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error deleting boat:', error);
        });
}

// Function to get the boat type label based on the boat type value
function getBoatTypeLabel(type) {
    switch (type) {
        case '1':
            return 'Longer than 40 feet';
        case '2':
            return '25 or less feet';
        case '3':
            return '25-40 feet';
        default:
            return 'Unknown';
    }
}

// Add event listeners
addBoatButton.addEventListener('click', openBoatModal);
boatModal.addEventListener('click', function(event) {
    if (event.target === boatModal || event.target.classList.contains('close')) {
        closeBoatModal();
    }
});
boatForm.addEventListener('submit', handleBoatFormSubmit);

// Display boats on page load
displayBoats();
