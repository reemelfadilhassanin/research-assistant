import React from 'react';

export function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
      color: '#e2e8f0',
      padding: '2rem 1rem 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.25rem' }}>🧑‍🔬</span>
              <h3 style={{
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                fontWeight: '600',
                margin: 0,
                color: '#ffffff'
              }}>
                Lumae
              </h3>
            </div>
            <p style={{
              margin: 0,
              lineHeight: '1.6',
              opacity: 0.8,
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>
              Empowering research with AI-powered document analysis and intelligent Q&A capabilities.
            </p>
          </div>
          
          <div>
            <h4 style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              Features
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>
              <li style={{ opacity: 0.8 }}>📄 PDF Document Upload</li>
              <li style={{ opacity: 0.8 }}>🤖 AI-Powered Analysis</li>
              <li style={{ opacity: 0.8 }}>💬 Interactive Chat Interface</li>
              <li style={{ opacity: 0.8 }}>🔍 Intelligent Search</li>
            </ul>
          </div>
          
          <div>
            <h4 style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#ffffff'
            }}>
              How It Works
            </h4>
            <ol style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              lineHeight: '1.8',
              fontSize: 'clamp(0.8rem, 2.5vw, 1rem)'
            }}>
              <li style={{ opacity: 0.8, marginBottom: '0.5rem' }}>
                <span style={{ 
                  background: '#333333',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  marginRight: '0.5rem'
                }}>1</span>
                Upload your PDF document
              </li>
              <li style={{ opacity: 0.8, marginBottom: '0.5rem' }}>
                <span style={{ 
                  background: '#333333',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  marginRight: '0.5rem'
                }}>2</span>
                AI processes the content
              </li>
              <li style={{ opacity: 0.8 }}>
                <span style={{ 
                  background: '#333333',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  marginRight: '0.5rem'
                }}>3</span>
                Ask questions and get answers
              </li>
            </ol>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #333333',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            margin: 0,
            opacity: 0.7,
            fontSize: 'clamp(0.75rem, 2vw, 0.9rem)'
          }}>
            © 2025 Lumae. Built with modern web technologies.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
              opacity: 0.7
            }}>
              Powered by AI
            </span>
            <div style={{
              display: 'flex',
              gap: '0.5rem'
            }}>
              <span style={{
                background: '#333333',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                fontWeight: '500'
              }}>
                LangChain
              </span>
              <span style={{
                background: '#333333',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                fontWeight: '500'
              }}>
                React
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
