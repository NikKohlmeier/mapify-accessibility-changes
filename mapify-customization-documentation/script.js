/*
* This is to be inserted into the Mapify Embeds plugin's Custom Content tab 
*/

window.addEventListener('DOMContentLoaded', () => {

    // Add tabindex to form elements
    const formElements = [
        document.getElementById('mpfy-iti-search'),              // Search input
        document.querySelector('[name="mpfy_search_radius"]'),   // Search radius
        document.getElementById('mpfy-iti-tag'),                 // Filter select
        document.getElementById('mpfy-iti-submit'),              // Submit button
    ];

    formElements.forEach((el, index) => {
        if (el) {
            el.setAttribute('tabindex', index + 1);
            // Add a class to select while we're at it
            el.classList.add('mpfy-iti-form-element');
            console.log(`Set index: ${index} for element: ${el} now has a tabindex of: ${el.tabIndex} and classes: ${el.classList}`);
        }
    });

    // Select and hide map
    const mapCanvas = document.querySelector('#mpfy-canvas-0');

    // Make sure there's a map!
    if (mapCanvas) {
        mapCanvas.style.display = 'none';
        // Create the image
        const img = document.createElement('div');
        // Give the image some attributes
        img.style.backgroundImage = 'url(https://michigansstdev.wpenginepowered.com/wp-content/uploads/2024/03/michigan-static-map-v2.png)';
        img.classList = 'michigan-static-map';
        // Select the map and hide it
        const mapDiv = document.querySelector('.mpfy-map-canvas-shell-outer');
        mapDiv.style.display = 'none';
        const mapDivParent = document.querySelector('.mpfy-map-canvas-shell-outer').parentNode;

        // Handle OOS message
        // Create element, add class, add content
        const oosMessage = document.createElement('div');
        oosMessage.classList = 'oos-message';
        oosMessage.innerHTML = `
            Because of national system maintenance by the American Association of Motor Vehicle Administrators (AAMVA), driver’s license/ID transactions won’t be able to be completed online or at self-service stations 
            
            <!-- IMPORTANT: Edit the content between the strong tags -->
            <strong>from 5 a.m. through 12 p.m. Sunday, April 28.</strong>
                
            Vehicle transactions will still be available.
            `;
        // Attach it to the map container
        mapDivParent.insertBefore(oosMessage, mapDiv);

        // Insert the image before the map
        mapDivParent.insertBefore(img, mapDiv);

        const searchForm = document.querySelector('.mpfy-search-form');
        // Get the search form input and make it required, preventing a submit when it's blank (displays a populated map)
        const searchFormInput = document.querySelector('.mpfy-search-input');
        searchFormInput.required = true;

        // Add an event listener for the submit
        searchForm.addEventListener('submit', () => {
            // Close the keyboard on mobile with blur
            searchFormInput.blur();
            // Wait for render searched kiosks
            setTimeout(() => {
                img.remove();
                mapCanvas.style.display = 'block';
                mapDiv.style.display = 'block';
            }, 2000);
        });
    }
});
