# PDFDOC2MD

An open-source script  to convert a batch od documents from Doc, Docx and PDF format to Markdown (MD). Uses Pandoc and pdf2md libraries.

## Use it

- Clone this repo
- Install Pandoc on your system (not just npm install, it's a system depedency)
- npm install
- Place your documents (formats allows: doc, docx and pdf) in the ./documents/input folder
- node convert.mjs
- You markdown files should be in the output folder
- Every run is logged to ./logs/run-log-timestamp.txt, where timestamp is the time the conversion was run at

## Tech Stack

- [node.js](https://nodejs.org) – running evnironment
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript) – language
- [Pandoc](https://pandoc.org/) – document converter (multiplatform)
- [pdf2md](https://github.com/opengovsg/pdf2md/) – pdf to markdown converter library for node.js

## Contributing

Papermark is an open-source project and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

Please feel free to submit issues or bugs.

## License

docpdf2md - A script to batch convert doc, docx and pdf documents to markdown (MD) format.
Copyright (C) 2023  Asaf Prihadash TailorVJ.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

[GPLv3](LICENSE.md)
