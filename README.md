# 🌳 TreeScout

**TreeScout** is an intelligent geospatial web application that helps users identify the most suitable locations for tree planting. By analyzing satellite and environmental data from multiple APIs, TreeScout scores land areas based on land cover, soil quality, proximity to buffer zones, and solar exposure — providing actionable insights for environmental efforts and urban planning.

---

## 🚀 Features

- 🛰 **Real-time Environmental Data**: Integrated with Sentinel, Overpass (OpenStreetMap), and ISRIC (SoilGrids) APIs.
- 🧠 **Weighted Scoring System**: Combines key environmental factors with customizable weightings.
- 📍 **Location Insights**: View detailed suitability data for a chosen coordinate or region.


---

## 📦 Tech Stack

- **Frontend**: React, Tailwind CSS
- **APIs Used**:
  - 🛰 **Sentinel** – Satellite data (optional/experimental)
  - 🗺 **Google maps API** – Land use, roads, and proximity to man-made features
  - 🧪 **ISRIC SoilGrids** – Soil depth, texture, organic carbon, pH, etc.


---

## ⚖️ Suitability Scoring

TreeScout evaluates locations using a custom scoring algorithm with the following components:

| Factor            | Description                                      |
|-------------------|--------------------------------------------------|
| **Land Cover**    | Urban, forest, agriculture, water, etc.         |
| **Soil Quality**  | Based on ISRIC SoilGrids parameters             |
| **Buffer Zones**  | Proximity to roads, buildings, and water bodies |
| **Solar Exposure**| Average sunlight availability (via Sentinel)    |

Weights can be adjusted in the `SuitabilityContext`.

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/treescout.git
cd treescout
npm install
npm run dev
