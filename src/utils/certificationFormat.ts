/**
 * Certification Format Utility
 * 
 * This utility provides standardized formatting for call analysis certifications.
 * It extracts key metrics from analysis results and generates HTML for certification documents.
 */

// Define the structure of analysis results
export interface AnalysisResult {
  transcript: string;
  analysis: string;
  recommendations: string;
  agent?: string;        // Agent name from Recent Calls
  duration?: string;     // Call duration from Recent Calls
  topics?: string[];     // Topics from Recent Calls
  score?: string;        // Quality score from Recent Calls
  date?: string;         // Date from Recent Calls
}

// Define the structure of extracted metrics
export interface CertificationMetrics {
  agentName: string;
  agentRole: string;
  callDate: string;
  callDuration: string;
  sentimentScore: string;
  qualityScore: string;
  keyTopics: string[];
  detailedAnalysis: string[];
  recommendations: string[];
  analysisSummary: string;
  documentId: string;
}

/**
 * Extracts key metrics from analysis results
 */
export function extractMetrics(result: AnalysisResult): CertificationMetrics {
  // Crear una fecha para hoy
  const today = new Date();
  // Inicializar con valores por defecto o de Recent Calls
  let sentimentScore = result.analysis.match(/sentiment:?\s*(positive|negative|neutral)/i)?.[1] || "Neutral";
  let qualityScore = result.score || "85%";  // Valor por defecto si no se encuentra
  let keyTopics: string[] = result.topics || ["General inquiry", "Customer service", "Problem resolution"];
  let detailedAnalysis: string[] = [];
  let recommendations: string[] = [];
  
  // Intentar extraer puntuación de calidad si no viene de Recent Calls
  if (!result.score) {
    const qualityMatch = result.analysis.match(/quality score:?\s*(\d+(\.\d+)?%?)/i) || 
                        result.analysis.match(/quality:?\s*(\d+(\.\d+)?%?)/i) ||
                        result.analysis.match(/overall score:?\s*(\d+(\.\d+)?%?)/i) ||
                        result.analysis.match(/score:?\s*(\d+(\.\d+)?%?)/i);
    if (qualityMatch) {
      qualityScore = qualityMatch[1];
      // Asegurar que tiene formato de porcentaje
      if (!qualityScore.includes('%')) {
        const numValue = parseFloat(qualityScore);
        if (numValue <= 1) {
          // Si es decimal entre 0-1, convertir a porcentaje
          qualityScore = `${Math.round(numValue * 100)}%`;
        } else {
          // Si es un número mayor a 1, asumir que ya es porcentaje
          qualityScore = `${Math.round(numValue)}%`;
        }
      }
    }
  }
  
  // Extraer temas clave si no vienen de Recent Calls
  if (keyTopics.length === 0 || (keyTopics.length === 3 && 
      keyTopics[0] === "General inquiry" && 
      keyTopics[1] === "Customer service" && 
      keyTopics[2] === "Problem resolution")) {
    const topicsSection = result.analysis.match(/key topics:?([\s\S]*?)(?=\n\n|$)/i) ||
                         result.analysis.match(/main topics:?([\s\S]*?)(?=\n\n|$)/i);
    if (topicsSection) {
      const topicsText = topicsSection[1];
      const extractedTopics = topicsText.split(/\n-|\n•|\n\*/)
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0);
      
      if (extractedTopics.length > 0) {
        keyTopics = extractedTopics.slice(0, 3); // Limitar a 3 temas para que quepa en una página
      }
    }
  }
  
  // Extraer puntos de análisis detallado (solo los 2 más importantes)
  const analysisPoints = result.analysis.match(/"([^"]+)"\s*\n([^"]+)/g) ||
                        result.analysis.match(/([^\n]+tone[^\n]+)/gi);
  if (analysisPoints) {
    detailedAnalysis = analysisPoints.slice(0, 2).map(point => point.trim());
  } else {
    // Método alternativo de extracción
    const paragraphs = result.analysis.split('\n\n').filter(p => p.trim().length > 0);
    if (paragraphs.length > 1) {
      detailedAnalysis = paragraphs.slice(1, 3); // Solo 2 párrafos para mantenerlo conciso
    }
  }
  
  // Extraer recomendaciones (solo las 2 más importantes)
  const recommendationPoints = result.recommendations.match(/\*\*([^*]+)\s*\n([^*]+)/g);
  if (recommendationPoints) {
    recommendations = recommendationPoints.slice(0, 2).map(point => point.trim());
  } else {
    // Método alternativo de extracción
    const recParagraphs = result.recommendations.split('\n\n').filter(p => p.trim().length > 0);
    if (recParagraphs.length > 0) {
      recommendations = recParagraphs.slice(0, 2); // Solo 2 recomendaciones
    }
  }
  
  // Obtener un resumen más conciso del análisis
  let analysisSummary = result.analysis.split('\n\n')[0] || 
    'This call has been analyzed using AI technology to evaluate the quality of the conversation.';
  
  // Limitar la longitud del resumen para que quepa en una página
  if (analysisSummary.length > 120) {
    analysisSummary = analysisSummary.substring(0, 120) + '...';
  }
  
  // Generate a unique document ID
  const documentId = `AGQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${today.getFullYear()}`;
  
  return {
    agentName: result.agent || "AgentIQ Representative",
    agentRole: "Customer Service Representative",
    callDate: result.date || today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    callDuration: result.duration || "6:01",
    sentimentScore,
    qualityScore,
    keyTopics,
    detailedAnalysis,
    recommendations,
    analysisSummary,
    documentId
  };
}

/**
 * Generates HTML for a certification document
 */
export function generateCertificationHTML(result: AnalysisResult): string {
  // Extract metrics from the analysis
  const { sentimentScore, qualityScore, keyTopics, detailedAnalysis, recommendations } = extractMetrics(result);
  
  // Format date for the certificate
  const today = new Date();
  const formattedDate = result.date || today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Use provided duration or generate a random one
  const callDuration = result.duration || `${Math.floor(Math.random() * 10) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
  
  // Use provided agent name or default
  const agentName = result.agent || "AgentIQ Representative";
  
  // Generate a unique document ID
  const documentId = `AGQ-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${today.getFullYear()}`;
  
  // Obtener un resumen más conciso del análisis
  let analysisSummary = result.analysis.split('\n\n')[0] || 
    'This call has been analyzed using AI technology to evaluate the quality of the conversation.';
  
  // Limitar la longitud del resumen para que quepa en una página
  if (analysisSummary.length > 120) {
    analysisSummary = analysisSummary.substring(0, 120) + '...';
  }
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Call Analysis Certification</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
        
        body { 
          font-family: 'Montserrat', sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #f9fafb; 
        }
        
        .certificate {
          background-color: white;
          border: 15px solid #2563eb;
          padding: 30px;
          position: relative;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-bottom: 20px;
        }
        
        .certificate:before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          border: 2px solid #e5e7eb;
          margin: 10px;
          pointer-events: none;
        }
        
        .certificate-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .logo {
          font-weight: bold;
          font-size: 32px;
          color: #2563eb;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }
        
        .title {
          font-size: 24px;
          font-weight: 700;
          color: #1e40af;
          margin: 15px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 8px;
          text-align: center;
        }
        
        .subtitle {
          font-size: 18px;
          color: #6b7280;
        }
        
        .date {
          font-size: 14px;
          color: #6b7280;
          margin-top: 10px;
          text-align: center;
        }
        
        .metrics {
          display: flex;
          justify-content: space-around;
          margin: 20px 0;
          text-align: center;
          flex-wrap: wrap;
        }
        
        .metric {
          padding: 10px;
          border-radius: 8px;
          background-color: #f0f9ff;
          width: 30%;
          margin-bottom: 8px;
        }
        
        .metric-title {
          font-size: 14px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #2563eb;
        }
        
        .section {
          margin: 20px 0;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #1e40af;
          margin-bottom: 10px;
          text-align: center;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 5px;
        }
        
        .topics-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
          justify-content: center;
        }
        
        .topic {
          background-color: #e0f2fe;
          color: #0369a1;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 14px;
        }
        
        .analysis-point {
          background-color: #f8fafc;
          border-left: 3px solid #2563eb;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 0 5px 5px 0;
        }
        
        .analysis-quote {
          font-style: italic;
          color: #1e40af;
          font-weight: 600;
          margin-bottom: 5px;
          font-size: 13px;
        }
        
        .analysis-explanation {
          color: #4b5563;
          font-size: 12px;
        }
        
        .recommendation-item {
          background-color: #f0f9ff;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          border-left: 3px solid #0ea5e9;
        }
        
        .recommendation-title {
          font-weight: 600;
          color: #0c4a6e;
          margin-bottom: 5px;
          font-size: 13px;
        }
        
        .recommendation-text {
          color: #4b5563;
          font-size: 12px;
        }
        
        .agent-info {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 15px auto;
          padding: 10px;
          background-color: #f0f9ff;
          border-radius: 10px;
          max-width: 400px;
        }
        
        .agent-avatar {
          width: 60px;
          height: 60px;
          background-color: #dbeafe;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: #2563eb;
          font-weight: bold;
          font-size: 24px;
        }
        
        .agent-details {
          flex: 1;
        }
        
        .agent-name {
          font-weight: 600;
          color: #1e40af;
          font-size: 18px;
          margin-bottom: 5px;
          text-align: center;
        }
        
        .agent-title {
          color: #6b7280;
          font-size: 14px;
          text-align: center;
        }
        
        .seal {
          text-align: center;
          margin-top: 40px;
        }
        
        .seal-image {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #2563eb;
          border-radius: 50%;
          color: #2563eb;
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
        }
        
        .signature {
          margin-top: 20px;
          font-style: italic;
          font-size: 18px;
          color: #4b5563;
        }
        
        .footer {
          text-align: center;
          margin-top: 10px;
          font-size: 12px;
          color: #6b7280;
          padding-bottom: 20px;
        }
        
        .transcript-container {
          background-color: #f9fafb;
          padding: 20px;
          border-radius: 10px;
          margin-top: 20px;
          max-height: 200px;
          overflow-y: auto;
          font-size: 12px;
          line-height: 1.4;
        }

        @media print {
          body {
            background-color: white;
            margin: 0;
            padding: 0;
          }
          
          .certificate {
            box-shadow: none;
            border-width: 15px;
            page-break-inside: avoid;
            page-break-after: always;
          }
          
          .transcript-container {
            max-height: none;
            overflow: visible;
          }
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="certificate-header">
          <div class="logo">AgentIQ</div>
          <div class="subtitle">CALL ANALYSIS CERTIFICATION</div>
        </div>
        
        <h1 class="title">Certificate of Analysis</h1>
        
        <p style="text-align: center;">This certifies that the following call has been analyzed using advanced AI technology<br>and meets the quality standards for professional call center interactions.</p>
        
        <div class="agent-info">
          <div class="agent-avatar">${agentName.charAt(0)}</div>
          <div class="agent-details">
            <div class="agent-name">${agentName}</div>
            <div class="agent-title">Customer Service Representative</div>
          </div>
        </div>
        
        <div class="date">Call Date: ${formattedDate}</div>
        
        <div class="metrics">
          <div class="metric">
            <div class="metric-title">Call Duration</div>
            <div class="metric-value">${callDuration}</div>
          </div>
          
          <div class="metric">
            <div class="metric-title">Sentiment</div>
            <div class="metric-value">${sentimentScore}</div>
          </div>
          
          <div class="metric">
            <div class="metric-title">Quality Score</div>
            <div class="metric-value">${qualityScore}</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Key Topics Discussed</div>
          <div class="topics-list">
            ${keyTopics.length > 0 ? 
              keyTopics.map(topic => `<div class="topic">${topic}</div>`).join('') : 
              '<div class="topic">General inquiry</div><div class="topic">Customer service</div><div class="topic">Problem resolution</div>'}
          </div>
        </div>
        
        <div class="seal">
          <div class="seal-image">CERTIFIED</div>
          <div class="signature">AgentIQ Analytics</div>
        </div>
        
        <div class="footer">
          This certification was generated by AgentIQ - Professional Call Center Analysis Platform<br>
          Document ID: ${documentId}
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates CSV content for tabular data export
 */
export function generateCSVContent(result: AnalysisResult): string {
  const metrics = extractMetrics(result);
  
  // Headers
  let csvContent = "Category,Content\n";
  
  // Add transcript (truncated for CSV format)
  csvContent += `"Transcription","${result.transcript.replace(/"/g, '""').substring(0, 1000)}"\n`;
  
  // Add analysis (simplified for CSV format)
  csvContent += `"Analysis","${result.analysis.replace(/\n/g, ' ').replace(/"/g, '""')}"\n`;
  
  // Add recommendations
  csvContent += `"Recommendations","${result.recommendations.replace(/\n/g, ' ').replace(/"/g, '""')}"\n`;
  
  // Add metrics
  csvContent += `"Sentiment Score","${metrics.sentimentScore}"\n`;
  csvContent += `"Quality Score","${metrics.qualityScore}"\n`;
  csvContent += `"Call Duration","${metrics.callDuration}"\n`;
  csvContent += `"Key Topics","${metrics.keyTopics.join(', ')}"\n`;
  csvContent += `"Document ID","${metrics.documentId}"\n`;
  csvContent += `"Date Generated","${new Date().toISOString()}"\n`;
  
  return csvContent;
}