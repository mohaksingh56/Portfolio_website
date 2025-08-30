export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'AI/ML Platform' | 'Healthcare AI' | 'Energy Systems' | 'Computer Vision' | 'Education Tech';
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  metrics?: {
    accuracy?: string;
    performance?: string;
    impact?: string;
  };
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'NeuroVision Transformer',
    description: 'Medical AI Platform for ASD detection with interpretable ViT architecture',
    longDescription: 'Advanced interpretable Vision Transformer for Autism Spectrum Disorder detection achieving 96.7% accuracy. Currently undergoing field testing in government hospitals with clinical-grade validation.',
    category: 'Healthcare AI',
    technologies: ['PyTorch', 'Vision Transformers', 'Medical Imaging', 'Clinical Validation', 'Government Deployment'],
    featured: true,
    metrics: {
      accuracy: '96.7%',
      performance: 'Clinical-grade',
      impact: 'Government Hospital Deployment'
    }
  },
  {
    id: '2',
    title: 'AutoML Studio',
    description: 'Enterprise ML Platform reducing development time by 90%',
    longDescription: 'Comprehensive no-code machine learning platform featuring automated feature engineering, hyperparameter tuning, and Neural Architecture Search (NAS) integration for enterprise deployment.',
    category: 'AI/ML Platform',
    technologies: ['AutoML', 'Neural Architecture Search', 'Feature Engineering', 'Enterprise Platform', 'No-Code ML'],
    featured: true,
    metrics: {
      performance: '90% faster development',
      impact: 'Enterprise-ready',
      accuracy: 'Automated optimization'
    }
  },
  {
    id: '3',
    title: 'Learnify',
    description: 'AI-powered Learning Platform with adaptive learning paths',
    longDescription: 'Intelligent educational platform leveraging machine learning to create personalized learning experiences and adaptive curriculum paths based on individual student performance.',
    category: 'Education Tech',
    technologies: ['Adaptive Learning', 'Personalization', 'Educational AI', 'Learning Analytics', 'Student Performance'],
    featured: true,
    metrics: {
      impact: 'Personalized Learning',
      performance: 'Adaptive Paths',
      accuracy: 'Performance-based'
    }
  },
  {
    id: '4',
    title: 'GridAI',
    description: 'Smart Energy Forecasting with transformer-based demand prediction',
    longDescription: 'Advanced transformer-based energy demand forecasting system achieving 94% accuracy with sub-50ms latency for real-time predictions in production energy environments.',
    category: 'Energy Systems',
    technologies: ['Transformers', 'Time Series', 'Energy Forecasting', 'Real-time Systems', 'Production Deployment'],
    featured: false,
    metrics: {
      accuracy: '94%',
      performance: 'Sub-50ms latency',
      impact: 'Production Energy Systems'
    }
  },
  {
    id: '5',
    title: 'FitAI Pro',
    description: 'CV-based Fitness Platform with 99.2% pose estimation accuracy',
    longDescription: 'Computer vision-powered fitness platform providing real-time form correction, personalized workout planning, and nutritional guidance using advanced pose estimation algorithms.',
    category: 'Computer Vision',
    technologies: ['Computer Vision', 'Pose Estimation', 'Mobile Edge', 'Real-time Processing', 'Fitness AI'],
    featured: false,
    metrics: {
      accuracy: '99.2%',
      performance: 'Real-time feedback',
      impact: 'Mobile edge deployment'
    }
  }
];

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'Lentit',
    position: 'Machine Learning Engineer Intern',
    duration: 'Mar 2025 – Jun 2025',
    location: 'Remote',
    description: [
      'Improved e-commerce demand forecasting accuracy by 18% using advanced time series models',
      'Implemented comprehensive MLflow & Prometheus monitoring pipelines for model performance tracking',
      'Optimized PySpark workflows, reducing ETL processing time by 45% for large-scale data operations',
      'Deployed AWS Lambda ML microservices achieving sub-100ms response times'
    ],
    technologies: ['PyTorch', 'MLflow', 'Prometheus', 'PySpark', 'AWS Lambda', 'Time Series Analysis'],
    achievements: [
      '18% improvement in demand forecasting accuracy',
      '45% reduction in ETL processing time',
      'Sub-100ms microservice response times',
      'Production-grade monitoring implementation'
    ]
  },
  {
    id: '2',
    company: 'Bennett University AI Lab',
    position: 'AI Research Engineer',
    duration: 'May 2024 – Apr 2025',
    location: 'Greater Noida, India',
    description: [
      'Architected distributed transformer training infrastructure utilizing 4×A100 GPUs, achieving 80% faster training',
      'Built TensorRT-optimized inference system delivering 15ms latency for real-time AI applications',
      'Led multi-modal AI research initiatives resulting in 3 peer-reviewed papers at NeurIPS & ICML conferences',
      'Mentored junior researchers and established best practices for reproducible AI research'
    ],
    technologies: ['PyTorch', 'TensorRT', 'A100 GPUs', 'Distributed Training', 'Multi-modal AI', 'Research Publications'],
    achievements: [
      '80% faster distributed training performance',
      '15ms inference latency with TensorRT optimization',
      '3 papers published at top-tier AI conferences',
      'Research team leadership and mentoring'
    ]
  }
];

export interface Achievement {
  id: string;
  title: string;
  year: string;
  description: string;
  impact: string;
  category: 'Competition' | 'Research' | 'Recognition' | 'Academic';
}

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Smart India Hackathon – National Champion',
    year: '2024',
    description: 'AI healthcare solution adopted by Ministry of Health',
    impact: 'Government adoption and nationwide deployment',
    category: 'Competition'
  },
  {
    id: '2',
    title: 'Microsoft AI Challenge – Finalist',
    year: '2025',
    description: 'GPT-powered enterprise assistant boosting productivity by 40%',
    impact: 'Enterprise productivity enhancement',
    category: 'Competition'
  },
  {
    id: '3',
    title: 'Google AI Fest – Youngest Finalist',
    year: '2023',
    description: 'AI-driven environmental monitoring platform',
    impact: 'Environmental sustainability focus',
    category: 'Competition'
  },
  {
    id: '4',
    title: 'Best Investor Pitch Award',
    year: '2024',
    description: 'Recognition for strategic vision and growth potential',
    impact: 'Investment and business strategy recognition',
    category: 'Recognition'
  },
  {
    id: '5',
    title: 'Dean\'s List Award (2×)',
    year: '2023-2024',
    description: 'Top 1% university ranking with 9.22/10 CGPA',
    impact: 'Academic excellence recognition',
    category: 'Academic'
  }
];

export interface TechCategory {
  name: string;
  technologies: string[];
  color: string;
}

export const techStack: TechCategory[] = [
  {
    name: 'AI/ML Frameworks',
    technologies: ['PyTorch', 'TensorFlow', 'JAX', 'Hugging Face', 'OpenCV', 'YOLO', 'Detectron2', 'CLIP', 'LangChain', 'LamaIndex'],
    color: '#4db6ac'
  },
  {
    name: 'MLOps & Cloud',
    technologies: ['Docker', 'Airflow', 'MLflow', 'AWS', 'GCP', 'Azure ML', 'Kubernetes', 'TensorRT', 'ONNX'],
    color: '#5c9bd5'
  },
  {
    name: 'Big Data & Analytics',
    technologies: ['Apache Spark', 'Dask', 'Ray', 'Kafka', 'PostgreSQL', 'MongoDB', 'Redis', 'InfluxDB'],
    color: '#7cb342'
  },
  {
    name: 'Programming & Tools',
    technologies: ['Python', 'C/C++', 'SQL', 'Git', 'Jupyter', 'Financial Time Series', 'Statistical Analysis'],
    color: '#9575cd'
  },
  {
    name: 'Specialized AI',
    technologies: ['Transformer Models', 'Reinforcement Learning (PPO/DQN)', 'GANs', 'Diffusion Models', 'Model Quantization'],
    color: '#ffca28'
  }
];

// Contact Information
export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export const contactInfo: ContactInfo = {
  email: 'singh.mohak@outlook.com',
  phone: '+91 9818543710',
  location: 'Delhi, India'
};

// Social Links
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: '1',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mohak-singh-78203b215/'
  },
  {
    id: '2',
    platform: 'GitHub',
    url: 'https://github.com/mohak-singh'
  },
  {
    id: '3',
    platform: 'Kaggle',
    url: 'https://kaggle.com/mohaksingh'
  },
  {
    id: '4',
    platform: 'Email',
    url: 'mailto:singh.mohak@outlook.com'
  }
];
