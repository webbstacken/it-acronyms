# YASWS (Yet Another Static Web Site)

A lightweight static web application for hosting various tools and utilities, built with vanilla JavaScript and a custom MVC-like framework.

## Overview

YASWS was created as a platform to implement and experiment with different web-based tools and utilities. The project uses pure JavaScript (with minimal dependencies on Bootstrap and D3), focusing on simplicity and modularity.

## Features

- **CVSS Decoder**: Parses and explains Common Vulnerability Scoring System (CVSS) strings for versions 2.0, 3.0, 3.1, and 4.0
- **Knowledge Base**: A growing collection of IT terms and concepts
- **Snake Game**: A classic snake game implementation
- **Spelling Alphabet**: Converts text to phonetic alphabet representations
- **Speech to Text**: A proof of concept for assisting hearing-impaired individuals with real-time speech transcription

## Technical Stack

- HTML5
- Vanilla JavaScript (ES6+)
- Custom SPA framework with MVC-like patterns
- Bootstrap for styling
- D3.js for visualizations

## Project Structure

```
yasws/
├── static/
│   ├── css/       # Stylesheets
│   ├── data/      # Application data
│   ├── images/    # Image assets
│   └── js/        # JavaScript modules and libraries
├── ATTRIBUTION.md # AI contribution details
├── LICENSE        # License information
├── index.html     # Main entry point
├── README.md      # Project documentation
└── robots.txt     # Search engine crawler rules
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/webbstacken/yasws.git
```
2. Serve with any static web server:
```bash
python -m http.server 8000
```
Then access the site at http://localhost:8000 in your web browser.

Or use VS Code's Live Server extension.

3. Open with 'Alt+L Alt+O' or right-click and select "Open with Live Server"

## Future Plans

- Expand the knowledge base with more IT terms
- Add more tools and utilities
- Improve documentation
- Add test coverage

## Disclaimer

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

All tools and results are provided for informational purposes only. Users should independently verify results for critical applications.

Parts of this project were developed with assistance from GitHub Copilot AI. See ATTRIBUTION.md for details.

## License

This project is licensed under the MIT License - see the LICENSE file for details.