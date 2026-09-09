# Ocean Sentinel backend

FastAPI service for the non-UI parts of the prototype.

## Run

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Set the frontend `VITE_API_BASE_URL=http://localhost:8000/api/v1` and `VITE_DEMO_MODE=false` to use the backend.

## Implemented

- Real raster/image anomaly screening endpoint for TIFF and common image formats.
- Real AIS CSV parsing endpoint.
- Real multi-factor attribution calculation from supplied incident + vessel track data.
- Data-quality scoring from AIS observation count and gap rate.
- Configurable environmental connector for wind/current drift data.
- Optional model connector point through `OIL_SPILL_MODEL_PATH`; the shipped baseline is deliberately transparent and is not presented as a trained UNet.

## Important

A production learned segmentation model still requires trained weights. The UI now calls its local detector a **screening baseline** unless a backend model is configured. This avoids claiming that a model is running when no weights are present.
