# Project Overview
Smart-Land-Intelligence-Analytics-Platform is an AI-powered geospatial decision support platform designed for analyzing Government Land Information System (GLIS) data using Machine Learning, GIS, and Data Analytics.

# Tech Stack (Inferred & Proposed)
- **Frontend**: React (Vite), React-Leaflet (for mapping and geospatial visualization).
- **Backend**: Node.js (Express) or Python (FastAPI/Django) depending on ML integration requirements.
- **Database**: PostgreSQL with PostGIS (for geospatial data) or MongoDB.
- **AI/ML**: Python (Scikit-learn, TensorFlow/PyTorch) for predictive modeling and land intelligence.
- **GIS**: Leaflet, QGIS/ArcGIS for spatial data processing.

# Folder Architecture
- `/frontend`: User interface, components, and mapping visualizations.
- `/backend`: API services, server logic, and database connections.
- `/ai-model`: Machine learning notebooks, scripts, models, and training pipelines.
- `/gis`: Geospatial data (shapefiles, GeoJSON) and map configurations.
- `/database`: Database schemas, migrations, and seeding scripts.
- `/dataset`: Raw and processed data for training and analytics.
- `/documentation`: Project documentation, architecture diagrams, and API specs.

# 4-Phase Milestone Roadmap
- **Phase 1: Foundation & Data Integration**: Setup repository architecture, integrate initial GLIS datasets, establish basic frontend map rendering.
- **Phase 2: Core Analytics & GIS**: Implement geospatial queries, filtering mechanisms, and foundational backend APIs.
- **Phase 3: AI/ML Integration**: Train, evaluate, and deploy machine learning models for land intelligence and predictive insights.
- **Phase 4: Optimization & Deployment**: UI/UX polish, performance tuning (especially for large map datasets), user testing, and production deployment.

# Coding Conventions & Architecture Rules
1. **Naming Conventions**: Use camelCase for variables/functions, PascalCase for React components, snake_case for Python scripts.
2. **Documentation**: Document all major functions, APIs, and complex logic blocks. Maintain up-to-date READMEs in subdirectories.
3. **Modularity**: Write modular, reusable code. Avoid monolithic components; break UI into smaller functional pieces.
4. **Git Workflow**: Use feature branches (`feature/XYZ`), descriptive commit messages, and pull requests for code reviews.
5. **Geospatial Performance**: Ensure map components are optimized for rendering large datasets (e.g., clustering, vector tiles).
