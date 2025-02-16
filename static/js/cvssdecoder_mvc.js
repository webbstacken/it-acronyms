/**
 * CVSS Decoder MVC Module
 * 
 * Provides the MVC structure for the CVSS decoder functionality:
 * - View: Input form and result display
 * - Controller: Event handling and user interaction
 * - Model: CVSS decoding logic (via CVSSDecoder class)
 * 
 * Features:
 * - Real-time CVSS string decoding
 * - Support for CVSS v2.0, v3.0, v3.1, and v4.0
 * - Error handling and validation
 * - Example strings for each version
 * 
 * AI Assistance Notice:
 * This code was developed with assistance from GitHub Copilot.
 * The AI helped with:
 * - MVC pattern implementation
 * - HTML template generation
 * - Event handling setup
 * - Error handling logic
 * - Documentation
 * 
 * See ATTRIBUTION.md for detailed information about AI contributions.
 */

let decoder = null;

const updateDecoder = async () => {
    if (!decoder) {
        decoder = new CVSSDecoder();
    }
}

const addContent = async (document) => {
    await updateDecoder();    

    let text = document.getElementById("centerId").innerHTML;  
    text += '<div class="jumbotron jumbotron-fluid">';        
    text += '  <div class="container">';              
    text += '      <div class="text-muted small">';
    text += '          CVSS:2.0/AV:N/AC:L/Au:N/C:P/I:P/A:C</br>';
    text += '          CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H</br>';
    text += '          CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H</br>';
    text += '          CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H</br>';
    text += '      </div>';  
    text += '      </br>';
    text += '      <div class="input-group mb-3">';
    text += '          <input type="text" id="cvssInput" class="form-control" placeholder="Enter a CVSS 2.0, 3.0, 3.1, or 4.0 string, see examples above"></input>';
    text += '      </div>';   
    text += '      <pre id="cvssOutput" class="text-secondary bg-light p-3 rounded"></pre>';
    text += '      <div class="text-muted small mt-3">';
    text += '          <a href="https://www.first.org/cvss/v2/guide" target="_blank" class="link-primary">CVSS v2.0 Specification</a></br>';
    text += '          <a href="https://www.first.org/cvss/v3.0/specification-document" target="_blank" class="link-primary">CVSS v3.0 Specification</a></br>';
    text += '          <a href="https://www.first.org/cvss/v3.1/specification-document" target="_blank" class="link-primary">CVSS v3.1 Specification</a></br>';
    text += '          <a href="https://www.first.org/cvss/v4.0/specification-document" target="_blank" class="link-primary">CVSS v4.0 Specification</a></br>';
    text += '      </div>';  
    text += '  </div>';
    text += '</div>';  
    document.getElementById("centerId").innerHTML = text;
    
    // Set up event listener after content is added
    setupEventListener(document);
}

const setupView = async (document) => {
    await addContent(document);      
}

const setupEventListener = (document) => {
    const input = document.getElementById("cvssInput");
    if (input) {
        input.addEventListener("input", () => {
            try {
                const cvssString = input.value.trim();
                if (cvssString) {
                    const decodedResult = decoder.decode(cvssString);
                    document.getElementById("cvssOutput").innerText = decodedResult;
                } else {
                    document.getElementById("cvssOutput").innerText = '';
                }
            } catch (error) {
                document.getElementById("cvssOutput").innerText = `Error: ${error.message}`;
            }
        });
    }
}

export async function initCVSSDecoder(document) {  
    await setupView(document);
}