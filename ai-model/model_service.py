import random


# GBN / Jewar–YEIDA corridor explainability factors. These are the human-readable
# drivers surfaced in the Decision Support drawer (Explainable AI section).
_POSITIVE_FACTORS = [
    "Distance to Yamuna Expressway (<800m)",
    "Distance to Jewar International Airport (<5km)",
    "Topographic Slope (<1.5% flat)",
    "Proximity to YEIDA Industrial Node",
]
_NEGATIVE_FACTORS = [
    "Wetland / Canal Hydrology Buffer Conflict",
    "High-Tension Transmission Corridor Buffer",
    "Fragmented Revenue Parcel Geometry",
]


def get_parcel_intelligence(parcel_id: str, properties: dict = None):
    """
    Deterministic (seeded) mock of the GeoAI inference for a single parcel.

    The return shape is the contract consumed by the frontend
    `DecisionSupportCard` component and merged onto each parcel feature's
    properties by `MapView`:

        suitability_score      int   0-100  (also drives the choropleth fill)
        risk_score             int   0-100
        ml_growth_prob         float 0-1
        temporal_delta         { builtup_2020_pct, builtup_2026_pct, encroachment_flag }
        shap_drivers           { positive: [{name, impact}], negative: [{name, impact}] }
        official_recommendation str

    In production this would load an XGBoost model and compute real TreeSHAP
    values. Seeding by `parcel_id` guarantees the map fill, the click-through
    detail card, and the /intelligence endpoint all agree for the same parcel.
    """
    rng = random.Random(parcel_id)

    growth_prob = round(rng.uniform(0.55, 0.95), 3)
    suitability = max(0, min(100, int(growth_prob * 100) - rng.randint(0, 12)))
    risk = max(0, min(100, 100 - suitability + rng.randint(-8, 18)))

    builtup_2020 = round(rng.uniform(4.0, 22.0), 1)
    builtup_growth = round(rng.uniform(3.0, 34.0), 1)
    builtup_2026 = round(builtup_2020 + builtup_growth, 1)
    encroachment_flag = builtup_growth >= 15.0 or risk >= 65

    # Two positive + two negative attribution drivers, deterministically chosen.
    pos = rng.sample(_POSITIVE_FACTORS, 3)
    neg = rng.sample(_NEGATIVE_FACTORS, 2)
    shap_positive = [
        {"name": name, "impact": f"+{round(rng.uniform(6.0, 25.0), 1)} pts"}
        for name in pos
    ]
    shap_negative = [
        {"name": name, "impact": f"-{round(rng.uniform(2.0, 11.0), 1)} pts"}
        for name in neg
    ]

    if encroachment_flag:
        recommendation = (
            f"High encroachment risk: +{builtup_growth}% built-up expansion since 2020. "
            "Flag for satellite delta verification and physical demarcation before any allotment."
        )
    elif suitability > 70:
        recommendation = (
            "Sanctioned for planned logistics/warehousing use with a mandatory 50m "
            "hydrological buffer along canal alignments."
        )
    else:
        recommendation = (
            "Conditional suitability. Requires manual land-use verification and "
            "infrastructure feasibility study prior to sanction."
        )

    return {
        "parcel_id": parcel_id,
        "suitability_score": suitability,
        "risk_score": risk,
        "ml_growth_prob": growth_prob,
        "temporal_delta": {
            "builtup_2020_pct": builtup_2020,
            "builtup_2026_pct": builtup_2026,
            "encroachment_flag": encroachment_flag,
        },
        "shap_drivers": {
            "positive": shap_positive,
            "negative": shap_negative,
        },
        "official_recommendation": recommendation,
        # ── Backward-compatible aliases (older callers / previous API shape) ──
        "growth_probability": growth_prob,
        "suitability_index": suitability,
        "recommendation": recommendation,
    }
