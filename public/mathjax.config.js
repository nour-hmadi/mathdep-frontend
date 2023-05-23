window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
    },
    options: {
      skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      ignoreHtmlClass: 'tex2jax_ignore',
      processEscapes: true,
      renderActions: {
        find: [10, function (doc) {
          for (const item of doc.math) {
            // Handle custom rendering or manipulation of equations
          }
        }]
      }
    },
    loader: {
      load: ['input/tex', 'output/chtml', '[tex]/ams'],
      paths: {
        mathjax: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7',
      },
    },
  };
  