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

@app.get("/api/states/{state_id}/districts")
def get_state_districts(state_id: str):
    """Returns GeoJSON FeatureCollection of districts for a given state."""
    # We only have authentic data for Uttar Pradesh
    if state_id.lower().replace(" ", "-") == "uttar-pradesh":
        try:
            data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "real_up_75_districts.geojson")
            with open(data_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            return {"error": "Data unavailable"}
    
    return {"error": "Data unavailable"}

@app.get("/api/districts/{district_id}/boundary")
def get_district_boundary(district_id: str):
    """Returns real district boundary geometry."""
    if district_id.lower().replace(" ", "-") == "gautam-buddha-nagar":
        try:
            data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "real_gbn_boundary.geojson")
            with open(data_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            return {"error": "Data unavailable"}
    
    return {"error": "Data unavailable"}

@app.get("/api/districts/{district_id}/parcels")
def get_district_parcels(district_id: str):
    """Returns granular cadastral plots."""
    if district_id.lower().replace(" ", "-") == "gautam-buddha-nagar":
        return get_parcels()
    return {"error": "Data unavailable"}

@app.get("/api/districts/{district_id}/highways")
def get_district_highways(district_id: str):
    """Returns real highway geometries."""
    if district_id.lower().replace(" ", "-") == "gautam-buddha-nagar":
        try:
            data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "real_gbn_highways.geojson")
            with open(data_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            return {"error": "Data unavailable"}
            
    return {"error": "Data unavailable"}

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
