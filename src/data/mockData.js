// Mock data for TanahPulih - Malaysian Paddy Farming Platform

export const farmerProfile = {
  name: 'Ahmad Bin Hassan',
  role: 'Farmer',
  location: 'Selangor, Malaysia',
  avatar: null,
  farmSize: '5.2 Hectares',
  riceVariety: 'MR219',
  plantingDate: '12 May 2024',
  stats: {
    totalScans: 24,
    totalAlerts: 12,
    healthScore: 85,
  }
}

export const weatherData = {
  temperature: 32,
  condition: 'Sunny',
  humidity: 76,
  rainProbability: 20,
  wind: '12 km/h NE',
  uv: 'High',
  location: 'Selangor',
}

export const fieldStatus = {
  overall: 'Healthy',
  ndvi: 0.81,
  evi: 0.74,
  lastUpdated: '10 min ago',
  healthyPercent: 85,
  moderatePercent: 10,
  severePercent: 5,
  nitrogenPercent: 5,
  waterPercent: 5,
}

export const alerts = [
  {
    id: 1,
    type: 'weather',
    icon: 'rain',
    title: 'Heavy Rain Forecast',
    description: 'Expected tomorrow',
    risk: 'Medium',
    time: '2h ago',
    priority: 'medium',
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
  {
    id: 2,
    type: 'disease',
    icon: 'leaf',
    title: 'Possible Fungal Infection',
    description: 'Field B — Please inspect the field',
    risk: 'High',
    time: '4h ago',
    priority: 'high',
    color: '#E53935',
    bgColor: '#FFEBEE',
  },
  {
    id: 3,
    type: 'field',
    icon: 'nitrogen',
    title: 'Nitrogen Deficiency',
    description: 'Apply nitrogen fertilizer soon',
    risk: 'Low',
    time: '6h ago',
    priority: 'low',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
  },
  {
    id: 4,
    type: 'weather',
    icon: 'sun',
    title: 'High UV Index Alert',
    description: 'UV index 8 today — protect crops',
    risk: 'Low',
    time: '8h ago',
    priority: 'low',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
  },
  {
    id: 5,
    type: 'system',
    icon: 'update',
    title: 'Satellite Data Updated',
    description: 'New NDVI scan available for Field A',
    risk: null,
    time: '1d ago',
    priority: 'info',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
  },
]

export const recommendations = [
  {
    id: 1,
    icon: 'inspect',
    title: 'Inspect Field 0',
    description: 'Check for disease symptoms',
    priority: 'High Priority',
    priorityLevel: 'high',
    color: '#E53935',
    bgColor: '#FFEBEE',
    iconBg: '#FFEBEE',
  },
  {
    id: 2,
    icon: 'fertilize',
    title: 'Apply Fertilizer',
    description: 'Nitrogen recommended',
    priority: 'Medium Priority',
    priorityLevel: 'medium',
    color: '#FB8C00',
    bgColor: '#FFF3E0',
    iconBg: '#FFF3E0',
  },
  {
    id: 3,
    icon: 'rain',
    title: 'Monitor Rainfall',
    description: 'Heavy rain expected',
    priority: 'Medium Priority',
    priorityLevel: 'medium',
    color: '#2196F3',
    bgColor: '#E3F2FD',
    iconBg: '#E3F2FD',
  },
  {
    id: 4,
    icon: 'drain',
    title: 'Improve Drainage',
    description: 'Ensure water flow in the field',
    priority: 'Low Priority',
    priorityLevel: 'low',
    color: '#2E7D32',
    bgColor: '#E8F5E9',
    iconBg: '#E8F5E9',
  },
]

export const diagnosisResult = {
  disease: 'Brown Spot Disease',
  confidence: 92,
  riskLevel: 'Moderate',
  symptoms: [
    'Brown circular lesions on the leaves',
    'Yellow halo around spots',
    'Lesions enlarge under humid conditions',
  ],
  recommendations: [
    'Improve field drainage',
    'Monitor disease spreading',
    'Apply recommended treatment',
  ],
}

export const cropStatusData = {
  fields: [
    { id: 'A', name: 'Field A', ndvi: 0.81, evi: 0.74, status: 'healthy', area: '2.1 Ha' },
    { id: 'B', name: 'Field B', ndvi: 0.65, evi: 0.58, status: 'moderate', area: '1.8 Ha' },
    { id: 'C', name: 'Field C', ndvi: 0.88, evi: 0.82, status: 'healthy', area: '1.3 Ha' },
  ],

  ndviTrend: [
    { week: 'W1', value: 0.72 },
    { week: 'W2', value: 0.75 },
    { week: 'W3', value: 0.78 },
    { week: 'W4', value: 0.81 },
    { week: 'W5', value: 0.80 },
    { week: 'W6', value: 0.83 },
  ],
  eviTrend: [
    { week: 'W1', value: 0.60 },
    { week: 'W2', value: 0.64 },
    { week: 'W3', value: 0.68 },
    { week: 'W4', value: 0.74 },
    { week: 'W5', value: 0.72 },
    { week: 'W6', value: 0.76 },
  ],
}

export const chatMessages = [
  {
    id: 1,
    role: 'assistant',
    text: 'Hello Ahmad! 👋 How can I help you with your crops today?',
    time: '9:41 AM',
  }
]

export const suggestedQuestions = [
  'Why are my leaves turning yellow?',
  'How do I treat brown spot disease?',
  'Will rain affect fertilizer application?',
  'Best fertilizer for paddy growth?',
]

export const aiResponses = {
  'Why are my leaves turning yellow?': 'Yellow leaves in paddy can be caused by several factors:\n\n🌱 **Nitrogen Deficiency** — Most common cause. The older/lower leaves turn yellow first. Apply urea fertilizer at 45-60 kg/ha.\n\n💧 **Waterlogging** — Poor drainage causes root oxygen deprivation. Check field drainage.\n\n🦠 **Disease** — Rice tungro virus causes yellowing. Check for stunted growth alongside yellowing.\n\nBased on your field data, **Nitrogen deficiency** is the most likely cause. I recommend applying nitrogen fertilizer within 3-5 days.',
  'How do I treat brown spot disease?': 'Brown Spot Disease (*Cochliobolus miyabeanus*) treatment:\n\n1. **Fungicide Application** — Apply Mancozeb or Propiconazole at first sign of infection\n2. **Improve Nutrition** — Ensure adequate silicon and potassium\n3. **Drainage** — Improve field drainage to reduce humidity\n4. **Remove Infected Leaves** — Collect and dispose of heavily infected plant material\n5. **Monitor Weekly** — Track spread using the app scan feature\n\n⚠️ Act quickly — under humid conditions this disease spreads rapidly.',
  'Will rain affect fertilizer application?': 'Heavy rain can significantly affect fertilizer effectiveness:\n\n☔ **Avoid applying fertilizer** 24-48 hours before heavy rain (>25mm)\n🌧️ **Light rain** (5-10mm) after application is actually beneficial for absorption\n\n**For your field:** Rain is forecast tomorrow (20mm). I recommend:\n- **Do not apply** urea or granular fertilizer today\n- Wait 2 days after rain before applying\n- Consider foliar spray for urgent cases\n\n📅 Best window: 3-4 days from now (partly cloudy, 15-20°C)',
  'Best fertilizer for paddy growth?': 'For MR219 variety in Selangor, optimal fertilizer program:\n\n**Basal Application (transplanting):**\n- NPK 15:15:15 — 150 kg/ha\n\n**1st Top Dressing (21-28 DAS):**\n- Urea 46% N — 75 kg/ha\n\n**2nd Top Dressing (45-50 DAS):**\n- Urea — 50 kg/ha\n- MOP (Potassium) — 30 kg/ha\n\n**3rd Top Dressing (Panicle initiation):**\n- NPK 12:6:22 — 100 kg/ha\n\n💡 Pro tip: Split nitrogen applications increase efficiency by 20-30% vs single application.',
}

// Stakeholder dashboard data
export const stakeholderData = {
  regions: ['Selangor', 'Kedah', 'Perak', 'All Regions'],
  totalFarms: 128,
  totalAlerts: 342,
  avgHealthScore: 78,
  healthTrend: [
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 74 },
    { month: 'Mar', score: 71 },
    { month: 'Apr', score: 76 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 80 },
  ],
  alertsByType: [
    { name: 'Weather', value: 40, color: '#2196F3' },
    { name: 'Disease', value: 30, color: '#E53935' },
    { name: 'Nutrient', value: 15, color: '#FB8C00' },
    { name: 'Others', value: 10, color: '#9E9E9E' },
  ],
  farmsData: [
    { region: 'Selangor', farms: 45, healthy: 82, alerts: 112 },
    { region: 'Kedah', farms: 38, healthy: 75, alerts: 134 },
    { region: 'Perak', farms: 45, healthy: 79, alerts: 96 },
  ],
}
