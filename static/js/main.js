document.addEventListener('DOMContentLoaded', function () {
    // Function to get the selected animal's ID
    function getSelectedAnimalId() {
        const selectedAnimalIdInput = document.querySelector('#selected-animal-id');

        if (selectedAnimalIdInput && selectedAnimalIdInput.value) {
            const selectedAnimalId = parseInt(selectedAnimalIdInput.value, 10);

            if (!isNaN(selectedAnimalId)) {
                return selectedAnimalId;
            }
        }

        console.error('Unable to determine the selected animal\'s ID');
        return -1;
    }

    const addForm = document.querySelector('#add-form');

    if (addForm) {
        addForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.querySelector('#name').value;
            const type = document.querySelector('#type').value;
            const age = document.querySelector('#age').value;
            const species = document.querySelector('#species').value;
            const image_url = document.querySelector('#image_url').value;

            const newAnimalData = {
                name: name,
                type: type,
                age: age,
                species: species,
                image_url: image_url
            };

            // Call the addAnimal function to add a new animal
            addAnimal(newAnimalData);
        });
    }

    const resetButton = document.querySelector('#reset-button');

    if (resetButton) {
        resetButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Reset input fields in the form
            document.querySelector('#name').value = '';
            document.querySelector('#type').value = '';
            document.querySelector('#age').value = '';
            document.querySelector('#species').value = '';
            document.querySelector('#image_url').value = '';
        });
    }

    const updateButton = document.querySelector('#update-button');
    const deleteButton = document.querySelector('#delete-button');

    if (updateButton) {
        updateButton.addEventListener('click', function () {
            const animalId = getSelectedAnimalId();

            // Extract updated data from the form
            const updatedName = document.querySelector('#updated-name').value;
            const updatedType = document.querySelector('#updated-type').value;
            const updatedAge = document.querySelector('#updated-age').value;
            const updatedSpecies = document.querySelector('#updated-species').value;
            const updatedImageUrl = document.querySelector('#updated-image-url').value;

            // Create an object with the updated data
            const updatedData = {
                name: updatedName,
                type: updatedType,
                age: updatedAge,
                species: updatedSpecies,
                image_url: updatedImageUrl
            };

            // Call the updateAnimalById function to update an animal
            updateAnimalById(animalId, updatedData);
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', function () {
            const animalId = getSelectedAnimalId();

            // Call the deleteAnimalById function to delete an animal
            deleteAnimalById(animalId);
        });
    }

    function navigateToPage(pageUrl) {
        axios.get(pageUrl)
            .then(response => {
                document.getElementById('content').innerHTML = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }

    const homeButton = document.querySelector('#home-button');
    const galleryButton = document.querySelector('#gallery-button');
    const addButton = document.querySelector('#add-button');
    const readButton = document.querySelector('#read-button');

    if (homeButton) {
        homeButton.addEventListener('click', function () {
            navigateToPage('/path/to/home.html');
        });
    }

    if (galleryButton) {
        galleryButton.addEventListener('click', function () {
            navigateToPage('/path/to/gallery.html');
        });
    }

    if (addButton) {
        addButton.addEventListener('click', function () {
            navigateToPage('/path/to/add.html');
        });
    }

    if (readButton) {
        readButton.addEventListener('click', function () {
            navigateToPage('/path/to/read.html');
        });
    }
});
