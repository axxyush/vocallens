# VocalLens

This repository contains the source code for the UB SLI project [VocalLens](https://vocallens.vercel.app).

## Setup

This section describes the development setup. To start, clone the repository:

```bash
git clone --recurse-submodules git@github.com:mattrrubino/vocal-lens.git
```

Then, follow the steps for frontend and/or backend development below.

### Frontend

To work on the frontend, you must first install [Node.js and npm](https://nodejs.org/en). The recommended versions are Node.js 20.15.1 and npm 10.7.0.
Then, execute the following from the project root directory:

```bash
cd frontend
npm i
npm start
```

The frontend will be available at <http://localhost:3000>.

### Backend

To work on the backend, you must first create a user access token on [HuggingFace](https://huggingface.co/settings/tokens) and accept the following gated models:
1. <https://huggingface.co/pyannote/segmentation-3.0>
2. <https://huggingface.co/pyannote/speaker-diarization-3.1>
3. <https://huggingface.co/pyannote/speaker-diarization>
4. <https://huggingface.co/pyannote/segmentation>

Next, navigate to the installation directory:

```bash
cd backend/install
```

Then, run one of the following based on your operating system:

```bash
sudo ./install_deps_debian.sh
```

```bash
./install_deps_macos.sh
```

Finally, run the main installation script with your HuggingFace access token:

```bash
./install.sh {TOKEN}
```

To start the server, execute the following from the `backend` directory:

```bash
. venv/bin/activate
python src/main.py
```

The server will be available at <http://localhost:8080>.

