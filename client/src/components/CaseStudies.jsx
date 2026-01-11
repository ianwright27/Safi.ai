import React from 'react'; 

export default function CaseStudies() {
  return (
    <div className="case-studies" id="case-studies" style={{ padding: '3rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2f4f44' }}>Safi AI — Case Studies (V1)</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Background</h2>
        <p style={{ color: '#4b5f57', lineHeight: 1.6 }}>
          This case study documents the development of <strong>Safi AI v1</strong>, an early-warning system designed to predict smoke pollution events at a <strong>neighborhood level</strong>. Motivation came from repeated real-world exposure to smoke pollution caused by local burning activities, which often occurred in patterns but lacked any predictive tooling.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Objective</h2>
        <p style={{ color: '#4b5f57' }}>Determine whether simple, locally observable signals collected over time could be used to <strong>predict probability of smoke events before exposure occurs</strong>. Framed as a <strong>probability estimation problem</strong>, not a binary detection task.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Data Collection</h2>
        <p style={{ color: '#4b5f57' }}>Manual, structured observations over time capturing time window, day, weather, special occasions, and smoke presence. Prioritized realism, contextual accuracy, and human-observed ground truth.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Data Characteristics</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Small to medium-sized dataset</li>
          <li>Strong class imbalance</li>
          <li>Categorical + temporal features</li>
          <li>No continuous sensor data</li>
        </ul>
        <pre style={{ background: '#eef2f0', padding: '1rem', borderRadius: '12px', color: '#1f2a26' }}>
{`No Smoke  ███████████████████

Smoke        ███`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Key Challenge: Imbalanced Data</h2>
        <p style={{ color: '#4b5f57' }}>Dominant challenge: class imbalance. Binary framing misleading, naive classifiers appear accurate but are of poor real-world use.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Modeling Decision</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Output probability of smoke occurrence</li>
          <li>Allow alerts via thresholds</li>
          <li>Preserve uncertainty</li>
        </ul>
        <pre style={{ background: '#eef2f0', padding: '1rem', borderRadius: '12px', color: '#1f2a26' }}>
{`{
  "smoke_probability": 0.78,
  "alert": 1
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Model Development</h2>
        <p style={{ color: '#4b5f57' }}>All experimentation occurred in <strong>Jupyter Notebooks</strong>. Validated pipelines exported as production artifacts; notebook code excluded from deployment.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Feature Overview (V1)</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: '#4b5f57' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>Feature</th>
              <th style={{ textAlign: 'left', padding: '0.5rem 0' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.25rem 0' }}>Time window</td>
              <td style={{ padding: '0.25rem 0' }}>Minutes since midnight</td>
            </tr>
            <tr>
              <td style={{ padding: '0.25rem 0' }}>Day of week</td>
              <td style={{ padding: '0.25rem 0' }}>Categorical (e.g. Tuesday)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.25rem 0' }}>Weather condition</td>
              <td style={{ padding: '0.25rem 0' }}>Categorical (e.g. windy, cloudy)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.25rem 0' }}>Occasion</td>
              <td style={{ padding: '0.25rem 0' }}>Holiday or normal day</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Observations & Insights</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Temporal clustering of smoke events</li>
          <li>Weather strongly influences probability</li>
          <li>Special occasions alter risk patterns</li>
          <li>Time encoding as continuous minutes improved model behavior</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Limitations</h2>
        <ul style={{ color: '#4b5f57' }}>
          <li>Manual data collection limits scale</li>
          <li>Sparse positives restrict model complexity</li>
          <li>Reliance on user inputs introduces friction</li>
          <li>Not suitable for fine-grained air quality metrics</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Future Directions</h2>
        <p style={{ color: '#4b5f57' }}>Planned evolution includes automated sensing, temporal deep learning models, reduced or eliminated user inputs, continuous operation.</p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Reflection</h2>
        <p style={{ color: '#4b5f57' }}>Demonstrates applied ML under real constraints, thoughtful handling of imperfect data, interpretability over complexity, end-to-end system thinking.</p>
      </section>

      <section style={{ marginTop: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.4rem', color: '#2f4f44' }}>Why This Matters</h2>
        <p style={{ color: '#4b5f57' }}>Small datasets can still provide value. Probabilistic thinking improves decision-making. Engineering discipline matters more than hype.</p>
      </section>
    </div>
  );
}
