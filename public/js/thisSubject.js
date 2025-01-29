    document.getElementById('edit-btn').addEventListener('click', function() {
        // Show the form and apply animation
        document.getElementById('edit-form-container').classList.remove('hidden');
        document.getElementById('edit-form-container').classList.add('show');
        document.querySelector('.attendance-buttons').style.display = 'none'; // Hide the buttons
        document.body.style.overflow = 'hidden'; // Prevent scrolling when the form is visible
    });

    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        // Hide the form and show the buttons again
        document.getElementById('edit-form-container').classList.remove('show');
        document.getElementById('edit-form-container').classList.add('hidden');
        document.querySelector('.attendance-buttons').style.display = 'flex';
        document.body.style.overflow = 'auto'; // Allow scrolling again
    });