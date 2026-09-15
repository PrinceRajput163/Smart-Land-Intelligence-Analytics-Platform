import sys
import os
import importlib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json

# Add ai-model directory to path
ai_model_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "ai-model")
sys.path.append(ai_model_path)
    
# Import our model service
try:
    model_service = importlib.import_module("model_service")
    get_parcel_intelligence = model_service.get_parcel_intelligence
except Exception as e:
    print(f"Warning: Could not import model_service. {e}")
    def get_parcel_intelligence(parcel_id, props=None):
        return {"error": "Model service unavailable"}

app = FastAPI(title="GLIS GeoAI API")

# Setup CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "online", "region": "Gautam Buddha Nagar"}

@app.get("/api/parcels")
def get_parcels():
    """
    Returns the GeoJSON FeatureCollection of Jewar/GB Nagar government land parcels.
    In a production system, this would query PostGIS. 
    Here we load the mock data from frontend (since we don't have a backend DB seeded yet).
    """
    try:
        # Load the authentic osmnx parcels dataset
        data_path = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), 
            "data", "real_gbn_parcels.geojson"
        )
        
        with open(data_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Failed to load authentic parcels: {e}")
        # Fallback empty structure if user hasn't run fetch_authentic_data.py
        return {"type": "FeatureCollection", "features": []}

@app.get("/api/up/districts")
def get_up_districts():
    """Returns GeoJSON FeatureCollection of all 75 UP districts."""
    try:
        data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "real_up_75_districts.geojson")
        with open(data_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return {"error": "Districts data not found."}

@app.get("/api/up/districts/{district_name}")
def get_district_info(district_name: str):
    """Returns district-specific dossier."""
    districts = get_up_districts()
    if "features" in districts:
        for f in districts["features"]:
            if f.get("properties", {}).get("DISTRICT", "").lower() == district_name.lower().replace("-", " "):
                return f
    return {"error": "District not found"}

@app.get("/api/up/districts/gautam-buddha-nagar/parcels")
def get_gautam_buddha_nagar_parcels():
    """Returns granular cadastral plots (real OSM landuse boundaries)."""
    return get_parcels()

@app.get("/api/up/districts/gautam-buddha-nagar/highways")
def get_gautam_buddha_nagar_highways():
    """Returns real highway and motorway geometries."""
    try:
        data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "real_gbn_highways.geojson")
        with open(data_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        return {"type": "FeatureCollection", "features": []}

@app.get("/api/parcels/{parcel_id}/intelligence")
def get_intelligence(parcel_id: str):
    """
    Returns dynamic scoring, encroachment flags, and TreeSHAP attribution drivers.
    """
    intelligence = get_parcel_intelligence(parcel_id)
    return intelligence

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
