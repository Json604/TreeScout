export const calculatePerviousScore = (landCoverData) => {
  if (!landCoverData || !landCoverData.elements) return 0;

  const perviousTags = ['forest', 'meadow', 'grass', 'orchard', 'vineyard'];
  let perviousCount = 0;

  landCoverData.elements.forEach((el) => {
    const landuse = el.tags?.landuse || '';
    if (perviousTags.includes(landuse)) perviousCount++;
  });

  const score = perviousCount / landCoverData.elements.length || 0;
  return Math.min(Math.max(score, 0), 1);
};


export const evaluateSoilParams = (soilData) => {
  if (!soilData || !soilData.properties) return 0;

  const clay = soilData.properties.clay?.mean?.[0]?.values?.[0]?.value ?? 0;
  const ph = soilData.properties.phh2o?.mean?.[0]?.values?.[0]?.value ?? 0;


  const clayScore = 1 - Math.abs(25 - clay) / 25;
  const phScore = 1 - Math.abs(6.8 - ph) / 1.5;

  const averageScore = (clayScore + phScore) / 2;
  return Math.min(Math.max(averageScore, 0), 1);
};

export const bufferCheck = (location, bufferData) => {
  return Math.random(); 
};

export const fetchSolarData = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=${lat}&location.longitude=${lng}&requiredQuality=HIGH&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.solarPotential?.maxSunshineHoursPerYear || 2000;  
};

export const fetchAirQualityData = async (lat, lng) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?location.latitude=${lat}&location.longitude=${lng}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.indexes?.[0]?.aqi || 100;  
};



export const normalizeScores = (scores) => {
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  if (min === max) return scores.map(() => 0.5);
  return scores.map(score => (score - min) / (max - min));
};

export const fetchSentinelData = async (
  bbox,
  startDate,
  endDate
) => {
  try {
    const apiKey = import.meta.env.VITE_SENTINEL_HUB_API_KEY;
    const url = `https://services.sentinel-hub.com/api/v1/process`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        input: {
          bounds: { bbox },
          data: [{
            type: 'sentinel-2-l2a',
            dataFilter: { timeRange: { from: startDate, to: endDate } }
          }]
        },
        output: {
          width: 512,
          height: 512
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Sentinel error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Sentinel fetch error:', error);
    throw error;
  }
};

export const fetchOsmLandCover = async (
  bbox
) => {
  try {
    const overpassUrl = import.meta.env.VITE_OVERPASS_API_URL;
    const query = `
      [out:json];
      (
        way["landuse"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
        relation["landuse"](${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]});
      );
      out body;
      >;
      out skel qt;
    `;

    const response = await fetch(overpassUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error(`Overpass error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Overpass fetch error:', error);
    throw error;
  }
};

export const fetchSoilData = async (location) => {
  try {
    const isricUrl = import.meta.env.VITE_ISRIC_API_URL;
    const url = `${isricUrl}/properties/query?lon=${location.lng}&lat=${location.lat}&property=clay&property=sand&property=silt&property=phh2o&depth=0-5cm&value=mean`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`ISRIC error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ISRIC fetch error:', error);
    throw error;
  }
};