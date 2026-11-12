# WebVOWL

This repository is a fork of the WebVOWL-Legacy github [repository](https://github.com/WebVOWL/WebVOWL-Legacy) for the ODINI project.

## Running The Service Locally

To run this service locally, you must do the all following steps:

1. Clone this repository:
   ```bash
   git clone https://gitlab.com/odini_dev/webvowl-odini.git
   ```
2. Go to the root of the repository:
   ```bash
   cd webvowl-odini
   ```
3. Build Docker image:
   ```bash
   docker build . -t webvowl
   ```
4. Run Docker image:
   ```bash
   docker run -p 3000:3000 webvowl
   ```
