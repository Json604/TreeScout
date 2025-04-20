# TreeScout - Tree Planting Site Suitability Analysis

TreeScout is a sophisticated web application that helps identify optimal tree planting locations across India through comprehensive environmental and geographical data analysis.

## Core Features

- **Interactive Map Interface**: Visualize site suitability data across India using Google Maps with custom heatmap overlays
- **Multi-factor Analysis**: Evaluate land cover, soil quality, buffer zones, and solar exposure
- **Detailed Site Reports**: Click on any grid cell to view comprehensive factor-by-factor suitability scores
- **Customizable Parameters**: Adjust analysis parameters, weights, and grid sizes to focus on specific requirements
- **Responsive Design**: Fully functional on both mobile and desktop devices
- **Light/Dark Theme**: User preference-based theme switching

## Technology Stack

### Front-End
- React (with functional components)
- React Router for navigation
- React Context API for state management
- Tailwind CSS for styling
- Google Maps JavaScript API
- Lucide React for icons

### Back-End (Serverless)
- AWS Lambda functions
- Node.js runtime
- Integration with multiple data sources:
  - Sentinel-2 L2A via Copernicus API
  - OpenStreetMap via Overpass API
  - ISRIC Soil Data Portal
  - Sentinel Hub Processing API

## Project Setup

### Prerequisites
1. Node.js and npm installed
2. API keys for:
   - Google Maps JavaScript API
   - Sentinel Hub
   - (Optional) AWS account for Lambda deployment

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/tree-scout.git
cd tree-scout
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your API keys (see `.env.example` for required variables)

4. Start the development server
```bash
npm run dev
```

## Environment Variables

Create a `.env` file with the following variables:

```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
VITE_SENTINEL_HUB_API_KEY=your_sentinel_hub_api_key_here
VITE_OVERPASS_API_URL=https://overpass-api.de/api/interpreter
VITE_ISRIC_API_URL=https://rest.isric.org/soilgrids/v2.0
VITE_SUITABILITY_API_URL=your_aws_lambda_function_url_here
```

## Folder Structure

```
/
├── public/               # Public assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── pages/            # Route-based page components
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── .env.example          # Example environment variables
└── README.md             # Project documentation
```

## Deployment

### Front-End
The front-end is configured for deployment on Vercel:

```bash
npm run build
```

### Back-End
The serverless functions should be deployed to AWS Lambda:

1. Package the Lambda function code
2. Create a new Lambda function in AWS Console
3. Configure API Gateway to expose the function endpoint
4. Update the `.env` file with the new function URL

## Future Enhancements

- Add support for custom regions beyond India
- Implement tree species recommendation based on site characteristics
- Add time-series analysis to track changes in suitability over time
- Develop a mobile app for field data collection and verification

## Credits

- Sentinel Hub for satellite imagery processing
- ISRIC for global soil data
- OpenStreetMap contributors for geographical data
- Google for Maps API

## License

[MIT License](LICENSE)