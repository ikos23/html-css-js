import './component.css';

/** 
 * To be used to make regular `<input />` look like material input
 * with floating label.
 * 
 * Expected HTML is:
 * ```
 * <div>
 *   <label>Label Text</label>
 *   <input name="inputName" />
 * </div>
 * ```
 * 
 * @param nameAttr Input's `name` attribute is used to seek for the input element 
 * we want to change.
 */
function initMaterialInput(nameAttr) {
    const targetInput = document.querySelector(`input[name='${nameAttr}']`);

    if (!targetInput) throw new Error(`Input with name=${nameAttr} not found.`);

    // setup css
    targetInput.parentElement.classList.add("material-like-input-container"); // div
    targetInput.classList.add("material-like-input"); // input
    targetInput.previousElementSibling.classList.add("material-like-label"); // label

    // setup min required js
    targetInput.onfocus = handleFocus;
    targetInput.onblur = handleBlur;


    function handleFocus() {
        const label = targetInput.previousElementSibling;
        label.classList.add("material-like-label-focused");
    }

    function handleBlur() {
        if (!targetInput.value) {
            const label = targetInput.previousElementSibling;
            label.classList.remove("material-like-label-focused");
        }
    }

}

// usage example:
initMaterialInput("firstName");